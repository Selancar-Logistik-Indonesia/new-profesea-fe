import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'

import {
  Autocomplete,
  Button,
  Box,
  Checkbox,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControlLabel
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { ISeafarerProficiencyForm } from './SeafarerProficiencyInterface'
import DatePicker from 'react-datepicker'
import * as Yup from 'yup'

const ProficiencySchema = Yup.object().shape({
  user_id: Yup.number().required(),
  country_id: Yup.number().required().min(1, 'Country must selected'),
  cop_id: Yup.number().required().min(1, 'Certificate of proficiency must be selected'),
  certificate_number: Yup.string().required(),
  is_lifetime: Yup.boolean().nullable(),
  filename: Yup.string().nullable()
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerProficiencyForm = (props: ISeafarerProficiencyForm) => {
  const { type, seafarerProficiency, showModal, user_id, loadProficiency, handleModalForm } = props
  const id = seafarerProficiency?.id

  const [validDateState, setValidDateState] = useState<any>(
    seafarerProficiency?.valid_until == null ? null : new Date(seafarerProficiency?.valid_until)
  )

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])
  const [proficiencies, setProficiencies] = useState([])

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      country_id: 0,
      cop_id: 0,
      certificate_number: '',
      valid_date: null,
      is_lifetime: false,
      filename: ''
    },
    enableReinitialize: true,
    validationSchema: ProficiencySchema,
    onSubmit: values => {
      handleSubmit(values)
      handleModalForm()
      loadProficiency()
    }
  })

  const loadCountries = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/country?page=1&take=100')
      .then(response => {
        const countries = response?.data?.countries.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          }
        })

        setCountries(countries)
      })
      .catch(err => {
        toast(' err ' + JSON.stringify(err))
      })
  }

  const loadCertificateProficiencies = () => {
    HttpClient.get(AppConfig.baseUrl + '/licensi/all')
      .then(response => {
        const certificates = response?.data?.licensiescop.map((item: any) => {
          return {
            id: item.id,
            title: item.title
          }
        })

        setProficiencies(certificates)
      })
      .catch(err => {
        toast(' err ' + JSON.stringify(err))
      })
  }

  const createProficiency = (values: any) => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-proficiencies/', {
      user_id: values.user_id,
      country_id: values.country_id,
      cop_id: values.cop_id,
      certificate_number: values.certificate_number,
      valid_until: !values.is_lifetime ? values.valid_date : null,
      is_lifetime: values.is_lifetime,
      filename: values.filename
    })
      .then(res => {
        toast('create proficiency success', { icon: 'success' })
      })
      .catch(err => {})
  }

  const updateProficiency = (id?: number, values?: any) => {
    console.log(' --> ', values)
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-proficiencies/' + id, {
      user_id: values.user_id,
      country_id: values.country_id,
      cop_id: values.cop_id,
      certificate_number: values.certificate_number,
      valid_until: !values.is_lifetime ? values.valid_date : null,
      is_lifetime: values.is_lifetime,
      filename: values.filename
    })
      .then(res => {
        toast('update proficiency success', { icon: 'success' })
      })
      .catch(err => {
        toast(JSON.stringify(err), { icon: 'danger' })
      })
  }

  useEffect(() => {
    loadCountries()
    loadCertificateProficiencies()
  }, [])

  useEffect(() => {
    formik.setValues({
      user_id: user_id,
      country_id: 0,
      cop_id: 0,
      certificate_number: '',
      valid_date: null,
      is_lifetime: false,
      filename: ''
    })
    if (seafarerProficiency && type == 'edit') {
      formik.setValues({
        user_id: user_id,
        country_id: type == 'edit' ? seafarerProficiency?.country_id : 0,
        cop_id: type == 'edit' ? seafarerProficiency?.cop_id : 0,
        certificate_number: type == 'edit' ? seafarerProficiency?.certificate_number : '',
        valid_date: type == 'edit' ? (validDateState ? new Date(validDateState) : null) : null,
        is_lifetime: type == 'edit' ? seafarerProficiency?.is_lifetime : false,
        filename: type == 'edit' ? seafarerProficiency?.filename : ''
      })
    }
  }, [seafarerProficiency])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      valid_date: validDateState ? new Date(validDateState) : null
    })
  }, [formik.values.is_lifetime, validDateState])

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateProficiency(id, values)
    } else {
      createProficiency(values)
    }
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <IconButton
            size='small'
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={e => props.handleModalForm(e)}
          >
            <Icon width='24' height='24' icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              {type == 'create' ? 'Add new ' : 'Update '} proficiency
            </Typography>
            <Typography variant='body2'>Fulfill your Proficiency Info here</Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(3)} !important`, `${theme.spacing(10)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(7.5)} !important`],
            height: '500px'
          }}
        >
          <Grid container md={12} xs={12}>
            <Grid item md={12} xs={12} mb={5}>
              <FormControlLabel
                sx={{ width: '100%', marginLeft: 0 }}
                labelPlacement='top'
                label='Certificate of Proficiency'
                control={
                  <Select
                    label='Certificate of Proficiency'
                    fullWidth
                    name='cop_id'
                    value={formik.values.cop_id}
                    onChange={formik.handleChange}
                    variant={'standard'}
                  >
                    {proficiencies.map((item: any) => (
                      <MenuItem value={item.id}>{item.title}</MenuItem>
                    ))}
                  </Select>
                }
              ></FormControlLabel>
              {/* <Autocomplete
                disablePortal
                options={proficiencies}
                getOptionLabel={(option: any) => option.title}
                defaultValue={copId}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Certificate of Proficiency'
                    variant='standard'
                    name='cop_id'
                    id='cop_id'
                  />
                )}
                onChange={(event: any, newValue: any) =>
                  newValue?.id ? setCopId(newValue.id) : setCopId(seafarerProficiency?.cop_id)
                }
              /> */}
              {formik.errors.cop_id && <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.cop_id}</span>}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                value={formik.values.certificate_number}
                defaultValue={type == 'edit' ? seafarerProficiency?.certificate_number : ''}
                id='certificateNumber'
                name={'certificate_number'}
                label='Certificate Number'
                variant='standard'
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.certificate_number && (
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.certificate_number}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <FormControlLabel
                sx={{ width: '100%', marginLeft: 0 }}
                labelPlacement='top'
                label='Country of Issue'
                control={
                  <Select
                    label='Country of Issue'
                    fullWidth
                    name='country_id'
                    id='country_id'
                    value={formik.values.country_id}
                    onChange={formik.handleChange}
                    variant={'standard'}
                  >
                    {countries.map((item: any) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                }
              ></FormControlLabel>
              {formik.errors.country_id && (
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.country_id}</span>
              )}
            </Grid>

            <Grid item md={12} xs={12} mb={5}>
              <DatePicker
                disabled={formik.values.is_lifetime ? true : false}
                dateFormat='dd/MM/yyyy'
                selected={validDateState}
                onChange={(date: Date) => setValidDateState(date)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={
                  <TextField label='Valid Date' variant='standard' fullWidth id='valid_date' name='valid_date' />
                }
              />
              {formik.errors.valid_date && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.valid_date)}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    name='is_lifetime'
                    id='is_lifetime'
                    onClick={formik.handleChange}
                    value={formik.values.is_lifetime}
                    checked={formik.values.is_lifetime}
                  />
                }
                label='Lifetime'
              />
              {formik.errors.is_lifetime && (
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.is_lifetime}</span>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' style={{ margin: '10px 0' }} size='small'>
            <Icon
              fontSize='small'
              icon={'solar:add-circle-bold-duotone'}
              color={'success'}
              style={{ fontSize: '18px' }}
            />
            <div> {type == 'edit' ? 'Update ' : 'Create '} Proficiency</div>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SeafarerProficiencyForm
