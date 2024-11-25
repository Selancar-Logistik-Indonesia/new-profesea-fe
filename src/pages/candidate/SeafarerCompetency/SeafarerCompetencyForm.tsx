import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

import {
  Autocomplete,
  Button,
  Box,
  Checkbox,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  DialogActions,
  TextField,
  FormControlLabel,
  useMediaQuery,
  InputLabel,
  SwipeableDrawer
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { ISeafarerCompetencyForm } from './../../../contract/types/seafarer_competency_type'
// import DatePicker from 'react-datepicker'
import * as Yup from 'yup'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import moment from 'moment'
import { useTheme } from '@mui/material/styles'

const CompetencySchema = Yup.object().shape({
  user_id: Yup.number().required('User Data is required'),
  country_id: Yup.object().shape({
    id: Yup.number().required('Country is required'),
    name: Yup.string().required('')
  }),
  coc_id: Yup.object().shape({
    id: Yup.number().required('Certificate of Competency is required'),
    title: Yup.string().required('')
  }),
  certificate_number: Yup.string().required('Certificate Number is required'),
  is_lifetime: Yup.boolean().nullable()
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerCompetencyForm = (props: ISeafarerCompetencyForm) => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const { type, seafarerCompetency, showModal, user_id, loadCompetency, handleModalForm } = props
  const id = seafarerCompetency?.id

  const [validDateState, setValidDateState] = useState<any>(null)
  const [preview, setPreview] = useState<any>()
  const [attachment, setAttachment] = useState<any>(null)

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
          name: seafarerCompetency?.country?.name
        }
      : {}
  )

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])
  const [competencies, setCompetencies] = useState([])

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      country_id: countryOfIssue,
      coc_id: coc,
      certificate_number: type == 'edit' ? seafarerCompetency?.certificate_number : '',
      valid_date: type == 'edit' ? validDateState : null,
      is_lifetime: type == 'edit' ? (seafarerCompetency?.is_lifetime ? true : false) : false
    },
    validationSchema: CompetencySchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values)
      resetForm()
      resetState()
    }
  })

  const resetState = () => {
    if (type != 'edit') {
      setCountryOfIssue('')
      setCoc('')
      setValidDateState(null)
      setAttachment(null)
    }
  }

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

        setCompetencies(certificates)
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
      formData.append('valid_until', !values.is_lifetime ? values.valid_date.toISOString().split('T')[0] : null)
    }
    formData.append('is_lifetime', values.is_lifetime ? String(1) : String(0))
    formData.append('attachment', attachment ? attachment : '')

    HttpClient.post(AppConfig.baseUrl + '/seafarer-competencies/', formData)
      .then(() => {
        toast.success('create competency success')
        loadCompetency()
        handleModalForm(type, undefined)
      })
      .catch(err => {
        toast.error(JSON.stringify(err.response.data.message || err.message), {
          style: {
            zIndex: 10000
          }
        })
      })
  }

  const updateCompetency = (id?: number, values?: any) => {
    const formData = new FormData()
    formData.append('user_id', values.user_id)
    formData.append('country_id', values.country_id.id)
    formData.append('coc_id', values.coc_id.id)
    formData.append('certificate_number', values.certificate_number)
    if (values.valid_date) {
      formData.append('valid_until', !values.is_lifetime ? values.valid_date.toISOString().split('T')[0] : null)
    }
    formData.append('is_lifetime', values.is_lifetime ? String(1) : String(0))
    formData.append('attachment', attachment ? attachment : '')

    HttpClient.post(AppConfig.baseUrl + '/seafarer-competencies/' + id, formData)
      .then(() => {
        toast.success('update competency success')
        loadCompetency()
        handleModalForm(type, undefined)
      })
      .catch(err => {
        toast.error(JSON.stringify(err.response.data.message || err.message))
      })
  }

  /* eslint-disable */
  useEffect(() => {
    if (seafarerCompetency?.is_lifetime) {
      setValidDateState(null)
    } else {
      setValidDateState(seafarerCompetency?.valid_until ? new Date(seafarerCompetency?.valid_until) : null)
    }
  }, [seafarerCompetency])
  /* eslint-enable */

  useEffect(() => {
    loadCountries()
    loadCertificateProficiencies()
  }, [])

  useEffect(() => {
    if (validDateState && formik.values.is_lifetime == false) {
      formik.setValues({
        ...formik.values,
        valid_date: validDateState ? new Date(validDateState) : null
      })
    }
  }, [formik.values.is_lifetime, validDateState])

  // bikin merah
  // useEffect(() => {
  //   if (coc) {
  //     formik.setValues({
  //       ...formik.values,
  //       coc_id: coc
  //     })
  //   }
  // }, [coc])

  useEffect(() => {
    if (!attachment) {
      setPreview(
        seafarerCompetency?.filename
          ? process.env.NEXT_PUBLIC_BASE_API?.replace('/api', '') +
              '/storage/user-documents/' +
              seafarerCompetency?.user_id +
              '/competency/' +
              seafarerCompetency?.filename
          : undefined
      )

      return
    }
    const objectUrl: any = URL.createObjectURL(attachment)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [attachment])

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateCompetency(id, values)
    } else {
      createCompetency(values)
    }
  }

  const renderForm = () => {
    return (
      <form
        noValidate
        onSubmit={formik.handleSubmit}
        onReset={() => {
          formik.resetForm()
        }}
      >
        {/* <DialogTitle>
          <IconButton
            size='small'
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={() => props.handleModalForm(type, undefined)}
          >
            <Icon width='24' height='24' icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              {type == 'create' ? 'Add new ' : 'Update '} competency
            </Typography>
            <Typography variant='body2'>Fulfill your competency Info here</Typography>
          </Box>
        </DialogTitle> */}
        <DialogContent>
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  {type == 'create' ? 'Add Certificate' : 'Edit Certificate'}
                </Typography>
              </Box>
              <IconButton
                size='small'
                onClick={() => {
                  props.handleModalForm(type, undefined)
                  resetState()
                }}
              >
                <Icon icon='mdi:close' fontSize={'16px'} />
              </IconButton>
            </Box>
          )}
          <Grid container spacing={6} py={'24px'}>
            <Grid item md={12} xs={12}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Certificate of competency
              </InputLabel>
              <Autocomplete
                id='autocomplete-competency'
                disablePortal
                options={competencies}
                getOptionLabel={(option: any) => option.title || ''}
                defaultValue={coc?.id ? coc : ''}
                value={coc?.id ? coc : ''}
                renderInput={params => (
                  <TextField {...params} error={formik.errors.coc_id ? true : false} variant='outlined' />
                )}
                onChange={(event: any, newValue: any) => (newValue?.id ? setCoc(newValue) : setCoc(''))}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Country of Issue
              </InputLabel>
              <Autocomplete
                disablePortal
                id='combo-box-countries-competency'
                options={countries}
                defaultValue={countryOfIssue?.id ? countryOfIssue : ''}
                getOptionLabel={option => option.name || ''}
                renderInput={(params: any) => (
                  <TextField {...params} error={formik.errors.country_id ? true : false} variant='outlined' />
                )}
                onChange={(event: any, newValue: string | null) =>
                  newValue ? setCountryOfIssue(newValue) : setCountryOfIssue('')
                }
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Certificate Number
              </InputLabel>
              <TextField
                value={formik.values.certificate_number}
                defaultValue={type == 'edit' ? seafarerCompetency?.certificate_number : ''}
                id='certificateNumber'
                name={'certificate_number'}
                variant='outlined'
                onChange={formik.handleChange}
                fullWidth
                error={formik.errors.certificate_number ? true : false}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Valid Date
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disabled={formik.values.is_lifetime ? true : false}
                  openTo='month'
                  views={['year', 'month', 'day']}
                  format='DD/MM/YYYY'
                  className='valid_date'
                  name='valid_date'
                  onChange={date => setValidDateState(date)}
                  value={validDateState ? moment(validDateState) : null}
                  slotProps={{
                    textField: { variant: 'outlined', fullWidth: true, id: 'basic-input', 'aria-readonly': true }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
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
            <Grid item md={12} xs={12} mt={2}>
              <Grid item xs={12} md={12} container justifyContent={'left'}>
                <Grid sx={{ marginRight: '20px' }}>
                  <label htmlFor='x'>
                    {preview?.split('.').pop() == 'pdf' ? (
                      <>
                        <a style={{ textDecoration: 'underline', cursor: 'pointer' }}> change file </a>
                        <object data={preview ? preview : null} width='150' height='200'></object>
                      </>
                    ) : (
                      <img
                        alt='logo'
                        src={preview ? preview : '/images/uploadimage.jpeg'}
                        style={{
                          maxWidth: '100%',
                          height: '120px',
                          padding: 0,
                          margin: 0
                        }}
                      />
                    )}
                  </label>
                  <input
                    accept='application/pdf,,image/*'
                    style={{ display: 'none' }}
                    id='x'
                    name='attachment'
                    onChange={e => setAttachment(e.target?.files ? e.target?.files[0] : null)}
                    type='file'
                  ></input>
                  <div>{attachment?.name}</div>
                </Grid>
                <Grid xs={4}>
                  <Box sx={{ marginTop: '20px', marginLeft: '5px' }}>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      <strong>Click to change Document File.</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed PDF.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Max size of 800K. Aspect Ratio 1:1
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12} mb={5} sx={{ color: 'red', margin: '-10px -25px' }}>
              <ul>
                {formik.isSubmitting &&
                  Object.entries(formik.errors).map((item: any) => {
                    return <li key={item[0]}>{JSON.stringify(item[1])}</li>
                  })}
              </ul>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={Object.keys(formik.errors).length > 0 ? true : false}
            type='submit'
            variant='contained'
            style={{ textTransform: 'capitalize' }}
          >
            <div> {type == 'edit' ? 'Save Changes' : 'Save'}</div>
          </Button>
        </DialogActions>
      </form>
    )
  }

  if (isMobile) {
    return (
      <>
        <SwipeableDrawer
          anchor='bottom'
          open={showModal}
          onClose={() => {
            props.handleModalForm(type, undefined)
            resetState()
          }}
          onOpen={() => {
            props.handleModalForm(type, undefined)
            resetState()
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                {type == 'create' ? 'Add Certificate' : 'Edit Certificate'}
              </Typography>
              <IconButton
                size='small'
                sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={() => {
                  props.handleModalForm(type, undefined)
                  resetState()
                }}
              >
                <Icon icon='mdi:close' />
              </IconButton>
            </Box>
            <Box sx={{ px: '16px', py: '24px', marginBottom: '60px' }}>{renderForm()}</Box>
          </Box>
        </SwipeableDrawer>
      </>
    )
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      {renderForm()}
    </Dialog>
  )
}

export default SeafarerCompetencyForm
