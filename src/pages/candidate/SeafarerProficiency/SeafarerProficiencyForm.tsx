import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'

import {
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
  country_id: Yup.number().required(),
  cop_id: Yup.number().required(),
  certificate_number: Yup.string().required(),
  valid_date: Yup.date(),
  is_lifetime: Yup.boolean().required(),
  filename: Yup.string()
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerProficiencyForm = (props: ISeafarerProficiencyForm) => {
  const { type, seafarerProficiency, showModal, user_id } = props
  const id = seafarerProficiency?.id

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])
  const [proficiencies, setProficiencies] = useState([])

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      country_id: 0,
      cop_id: 0,
      certificate_number: '',
      valid_date: new Date(),
      is_lifetime: false,
      filename: ''
    },
    enableReinitialize: true,
    validationSchema: ProficiencySchema,
    onSubmit: values => {
      alert(JSON.stringify(values))
      //onSubmit(values)
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
      valid_date: values.valid_date,
      is_lifetime: values.is_lifetime,
      filename: values.filename
    })
      .then(res => {
        toast('create proficiency success', { icon: 'success' })
      })
      .catch(err => {})
  }

  const updateProficiency = (id?: number, values?: any) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-proficiencies/' + id, {
      user_id: values.user_id,
      country_id: values.country_id,
      cop_id: values.cop_id,
      certificate_number: values.certificate_number,
      valid_date: values.valid_date,
      is_lifetime: values.is_lifetime,
      filename: values.filename
    })
      .then(res => {
        toast('create proficiency success', { icon: 'success' })
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
    if (seafarerProficiency) {
      formik.setValues({
        user_id: user_id,
        country_id: type == 'edit' ? seafarerProficiency?.country_id : 0,
        cop_id: type == 'edit' ? seafarerProficiency?.cop_id : 0,
        certificate_number: type == 'edit' ? seafarerProficiency?.certificate_number : '',
        valid_date: type == 'edit' ? new Date(String(seafarerProficiency?.valid_until)) : new Date(),
        is_lifetime: type == 'edit' ? seafarerProficiency?.is_lifetime : false,
        filename: type == 'edit' ? seafarerProficiency?.filename : ''
      })
    }
  }, [seafarerProficiency])

  const onSubmit = (values: any) => {
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
              <Select
                fullWidth
                value={requiredDocument}
                label='Required Document'
                onChange={e => setRequiredDocument(e.target.value)}
                name='requiredDocument'
                variant={'standard'}
              >
                <MenuItem value={'seaman_book'}>Seaman Book</MenuItem>
                <MenuItem value={'usa_visa'}>USA Visa</MenuItem>
                <MenuItem value={'schengen_visa'}>Schengen Visa</MenuItem>
                <MenuItem value={'passport'}>Passport</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
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
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={countries.map((e: any) => e.name)}
                defaultValue={countries.find((item: any) => item.id == seafarerProficiency?.country_id)?.name}
                getOptionLabel={(option: string) => option}
                renderInput={(params: any) => <TextField {...params} label='Country of Issue' variant='standard' />}
                onChange={(event: any, newValue: string | null) =>
                  newValue
                    ? formik.handleChange(() => countries.find((item: any) => item.name == newValue)?.id)
                    : formik.handleChange(() => undefined)
                }
              />
            </Grid>
            {formik.errors.country_id && (
              <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.country_id}</span>
            )}
            <Grid item md={12} xs={12} mb={5}>
              <DatePicker
                disabled={formik.values.is_lifetime ? true : false}
                dateFormat='dd/MM/yyyy'
                //selected={formik.values.valid_date}
                id='basic-input'
                onChange={(dateAwal: Date) => formik.handleChange(() => dateAwal)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={<TextField label='Valid Date' variant='standard' fullWidth />}
              />
              {formik.errors.valid_date && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.valid_date)}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <FormControlLabel
                control={<Checkbox onChange={formik.handleChange} value={formik.values.is_lifetime} />}
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
