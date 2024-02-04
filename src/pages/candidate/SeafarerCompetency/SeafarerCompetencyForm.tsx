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
  FormControlLabel
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { ISeafarerCompetencyForm } from './SeafarerCompetencyInterface'
import DatePicker from 'react-datepicker'
import * as Yup from 'yup'

const CompetencySchema = Yup.object().shape({
  user_id: Yup.number().required(),
  country_id: Yup.object().required(),
  coc_id: Yup.object().required(),
  certificate_number: Yup.string().required(),
  is_lifetime: Yup.boolean().nullable()
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerCompetencyForm = (props: ISeafarerCompetencyForm) => {
  const { type, seafarerCompetency, showModal, user_id, loadCompetency, handleModalForm } = props
  const id = seafarerCompetency?.id

  const [validDateState, setValidDateState] = useState<any>()
  const [attachment, setAttachment] = useState(null)

  const [coc, setCoc] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerCompetency?.competency?.id,
          title: seafarerCompetency?.competency?.title
        }
      : {}
  )
  const [countryOfIssue, setCountryOfIssue] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerCompetency?.country_id,
          name: seafarerCompetency?.country
        }
      : {}
  )

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])
  const [proficiencies, setProficiencies] = useState([])

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      country_id: countryOfIssue,
      coc_id: coc,
      certificate_number: type == 'edit' ? seafarerCompetency?.certificate_number : '',
      valid_date: type == 'edit' ? validDateState : null,
      is_lifetime: type == 'edit' ? (seafarerCompetency?.is_lifetime ? true : false) : false
    },
    enableReinitialize: true,
    validationSchema: CompetencySchema,
    onSubmit: values => {
      handleSubmit(values)
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
        toast.error(' err load countries ' + JSON.stringify(err.message))
      })
  }

  const loadCertificateProficiencies = () => {
    HttpClient.get(AppConfig.baseUrl + '/licensi/all/')
      .then(response => {
        const certificates = response.data.licensiescoc.map((item: any) => {
          return {
            id: item.id,
            title: item.title
          }
        })

        setProficiencies(certificates)
      })
      .catch(err => {
        toast.error(' err load Certificate ' + JSON.stringify(err.message))
      })
  }

  const createCompetency = (values: any) => {
    const formData = new FormData()
    formData.append('user_id', values.user_id)
    formData.append('country_id', values.country_id.id)
    formData.append('coc_id', values.coc_id.id)
    formData.append('certificate_number', values.certificate_number)
    if (values.valid_date) {
      formData.append('valid_until', !values.is_lifetime ? values.valid_date : null)
    }
    formData.append('is_lifetime', values.is_lifetime ? 1 : 0)
    formData.append('attachment', attachment)

    HttpClient.post(AppConfig.baseUrl + '/seafarer-competencies/', formData)
      .then(res => {
        toast.success('create competency success')
        loadCompetency()
        handleModalForm()
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
      })
  }

  const updateCompetency = (id?: number, values?: any) => {
    const formData = new FormData()
    formData.append('user_id', values.user_id)
    formData.append('country_id', values.country_id.id)
    formData.append('coc_id', values.coc_id.id)
    formData.append('certificate_number', values.certificate_number)
    if (values.valid_date) {
      formData.append('valid_until', !values.is_lifetime ? values.valid_date : null)
    }
    formData.append('is_lifetime', values.is_lifetime ? 1 : 0)
    formData.append('attachment', attachment)

    HttpClient.post(AppConfig.baseUrl + '/seafarer-competencies/' + id, formData)
      .then(res => {
        toast.success('update competency success')
        loadCompetency()
        handleModalForm()
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
      })
  }

  useEffect(() => {
    setValidDateState(
      seafarerCompetency?.valid_until
        ? seafarerCompetency?.valid_until == 'lifetime'
          ? null
          : new Date(seafarerCompetency?.valid_until)
        : null
    )
  }, [seafarerCompetency])

  useEffect(() => {
    loadCountries()
    loadCertificateProficiencies()
  }, [])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      valid_date: validDateState ? new Date(validDateState) : null
    })
  }, [formik.values.is_lifetime, validDateState])

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateCompetency(id, values)
    } else {
      createCompetency(values)
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
              {type == 'create' ? 'Add new ' : 'Update '} competency
            </Typography>
            <Typography variant='body2'>Fulfill your competency Info here</Typography>
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
              <Autocomplete
                id='autocomplete-competency'
                disablePortal
                options={proficiencies}
                getOptionLabel={(option: any) => option.title}
                defaultValue={coc?.id ? coc : ''}
                renderInput={params => <TextField {...params} label='Certificate of competency' variant='standard' />}
                onChange={(event: any, newValue: any) => (newValue?.id ? setCoc(newValue) : setCoc(''))}
              />
              {formik.errors.coc_id && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.coc_id)}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <Autocomplete
                disablePortal
                id='combo-box-countries-competency'
                options={countries}
                defaultValue={countryOfIssue?.id ? countryOfIssue : ''}
                getOptionLabel={option => option.name}
                renderInput={(params: any) => <TextField {...params} label='Country of Issue' variant='standard' />}
                onChange={(event: any, newValue: string | null) =>
                  newValue ? setCountryOfIssue(newValue) : setCountryOfIssue('')
                }
              />
              {formik.errors.country_id && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.country_id)}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                value={formik.values.certificate_number}
                defaultValue={type == 'edit' ? seafarerCompetency?.certificate_number : ''}
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
              <DatePicker
                disabled={formik.values.is_lifetime ? true : false}
                dateFormat='dd/MM/yyyy'
                selected={validDateState}
                onChange={(date: Date) => setValidDateState(date)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                id='valid_date'
                name='valid_date'
                customInput={<TextField label='Valid Date' variant='standard' fullWidth />}
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
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.is_lifetime)}</span>
              )}
            </Grid>
            <Grid>
              <Button
                component='label'
                variant='contained'
                size='small'
                fullWidth
                startIcon={
                  <Icon icon='material-symbols:cloud-upload' width='16' height='16' style={{ color: 'white' }} />
                }
              >
                Upload file <span>{attachment ? ' : ' + attachment?.name : ''}</span>
                <input
                  style={{ visibility: 'hidden' }}
                  type='file'
                  name='attachment'
                  onChange={e => setAttachment(e.target?.files[0])}
                />
              </Button>
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
            <div> {type == 'edit' ? 'Update ' : 'Create '} Competency</div>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SeafarerCompetencyForm
