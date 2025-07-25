import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  TextField,
  Autocomplete,
  DialogActions,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  SwipeableDrawer
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTheme } from '@mui/material/styles'

import { ISeafarerTravelDocumentForm } from '../../../contract/types/seafarer_travel_document_type'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import moment from 'moment'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'
import { useAuth } from 'src/hooks/useAuth'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TravelDocumentSchema = Yup.object().shape({
  document: Yup.string().optional(),
  no: Yup.string().required('Document Number is required'),
  date_of_issue: Yup.string().required('Date of Issue is required'),
  country_of_issue: Yup.object().shape({
    id: Yup.number().required('Country is required'),
    name: Yup.string().required('')
  }),
  user_id: Yup.number(),
  valid_date: Yup.string().nullable(),
  is_lifetime: Yup.boolean().nullable(),
  required_document: Yup.string().required('Document Required Type is required')
})

const SeafarerTravelDocumentForm = (props: ISeafarerTravelDocumentForm) => {
  const { settings } = useAuth()
  const { refetch, setRefetch } = useProfileCompletion()
  const { type, user_id, seafarerTravelDocument, showModal, handleModalForm, loadTravelDocument } = props
  const id = seafarerTravelDocument?.id

  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])

  const [countryOfIssue, setCountryOfIssue] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerTravelDocument?.country?.id,
          name: seafarerTravelDocument?.country?.name
        }
      : ''
  )

  const [validDateState, setValidDateState] = useState<any>()
  const [preview, setPreview] = useState<any>()
  console.log(preview)
  const [dateOfIssue, setDateOfIssue] = useState<any>()
  const [attachment, setAttachment] = useState<any>()

  // const requiredDocumentType = [
  //   { id: 'passport', name: 'Passport' },
  //   { id: 'seaman_book', name: 'Seaman Book' },
  //   { id: 'usa_visa', name: 'Usa Visa' },
  //   { id: 'schengen_visa', name: 'Schengen Visa' }
  // ]

  const hospitalityOptions = [
    { id: 'seaman_book', name: 'Seaman Book' },
    { id: 'passport', name: 'Passport' },
  ]

  const nonHospitalityOptions = [
    { id: 'seaman_book', name: 'Seaman Book' },
    { id: 'usa_visa', name: 'USA Visa' },
    { id: 'schengen_visa', name: 'Schengen Visa' },
    { id: 'passport', name: 'Passport' },
  ]

  const documentOptions = settings?.is_hospitality ? hospitalityOptions : nonHospitalityOptions

  let initialValues = {
    document: '' as string | undefined,
    no: '' as string | undefined,
    date_of_issue: dateOfIssue as any,
    country_of_issue: countryOfIssue as any,
    user_id: user_id as number | undefined,
    valid_date: validDateState as any,
    is_lifetime: false as boolean | undefined,
    required_document: 'other' as string | undefined
  }

  if (type == 'edit') {
    initialValues = {
      document: seafarerTravelDocument?.document,
      no: seafarerTravelDocument?.no,
      date_of_issue: seafarerTravelDocument?.date_of_issue,
      country_of_issue: {
        id: seafarerTravelDocument?.country?.id,
        name: seafarerTravelDocument?.country?.name
      },
      user_id: user_id,
      valid_date: seafarerTravelDocument?.valid_date,
      is_lifetime: seafarerTravelDocument?.is_lifetime,
      required_document: seafarerTravelDocument?.required_document
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: TravelDocumentSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values)
      resetForm()
      resetState()
    }
  })

  const resetState = () => {
    if (type != 'edit') {
      setCountryOfIssue('')
      setDateOfIssue(null)
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
        toast.error(' err ' + JSON.stringify(err.message))
      })
  }

  const createTravelDocument = (values: any) => {
    const formData = new FormData()
    formData.append('required_document', values.required_document)
    formData.append('document', values.document)
    formData.append('no', values.no)
    formData.append('user_id', values.user_id)
    formData.append('country_of_issue', values.country_of_issue.id)
    if (values.date_of_issue) {
      formData.append('date_of_issue', values.date_of_issue.toISOString().split('T')[0])
    }
    if (values.valid_date) {
      formData.append('valid_date', !values.is_lifetime ? values.valid_date.toISOString().split('T')[0] : null)
    }
    formData.append('is_lifetime', values.is_lifetime ? String(1) : String(0))
    formData.append('attachment', attachment ? attachment : '')
    HttpClient.post(AppConfig.baseUrl + '/seafarer-travel-documents/', formData)
      .then(() => {
        toast.success('create travel document success')
        handleModalForm(type, undefined)
        loadTravelDocument()
        setRefetch(!refetch)
      })
      .catch(err => {
        toast.error(JSON.stringify(err.response.data.message || err.message))
      })
  }

  const updateTravelDocument = (id?: number, values?: any) => {
    const formData = new FormData()
    formData.append('required_document', values.required_document)
    formData.append('document', values.document)
    formData.append('no', values.no)
    formData.append('user_id', values.user_id)
    formData.append('country_of_issue', values.country_of_issue.id)
    if (values.date_of_issue) {
      formData.append('date_of_issue', values.date_of_issue.toISOString().split('T')[0])
    }
    if (values.valid_date) {
      formData.append('valid_date', !values.is_lifetime ? values.valid_date.toISOString().split('T')[0] : null)
    }
    formData.append('is_lifetime', values.is_lifetime ? String(1) : String(0))
    formData.append('attachment', attachment ? attachment : '')
    HttpClient.post(AppConfig.baseUrl + '/seafarer-travel-documents/' + id, formData)
      .then(() => {
        toast.success('update travel document success')
        handleModalForm(type, undefined)
        loadTravelDocument()
      })
      .catch(err => {
        toast.error(JSON.stringify(err.response.data.message || err.message))
      })
  }

  useEffect(() => {
    loadCountries()
  }, [])

  useEffect(() => {
    if (type == 'edit') {
      setValidDateState(seafarerTravelDocument?.valid_date ? new Date(seafarerTravelDocument?.valid_date) : null)
      setDateOfIssue(seafarerTravelDocument?.date_of_issue ? new Date(seafarerTravelDocument?.date_of_issue) : null)
    }
  }, [seafarerTravelDocument])

  useEffect(() => {
    if (dateOfIssue) {
      formik.setValues({
        ...formik.values,
        date_of_issue: dateOfIssue
      })
    }
  }, [dateOfIssue])

  useEffect(() => {
    if (validDateState) {
      formik.setValues({
        ...formik.values,
        valid_date: validDateState
      })
    }
  }, [validDateState])

  const handleChangeRequireDocument = (e: any) => {
    let documentName: string | undefined = 'Please Input document'

    if (e.target.value != 'other') {
      documentName = documentOptions.find(item => item.id == e.target.value)?.name
    } else {
      documentName = 'Please Input document'
    }

    formik.setValues({
      ...formik.values,
      required_document: e.target.value,
      document: documentName
    })
  }

  useEffect(() => {
    if (!attachment) {
      setPreview(
        seafarerTravelDocument?.filename
          ? process.env.NEXT_PUBLIC_BASE_API?.replace('/api', '') +
              '/storage/user-documents/' +
              seafarerTravelDocument?.user_id +
              '/travel-documents/' +
              seafarerTravelDocument?.filename
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
      updateTravelDocument(id, values)
    } else {
      createTravelDocument(values)
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
        <DialogContent>
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  {type == 'create' ? 'Add  Travel Document' : 'Edit Travel Document'}
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
            <Grid item xs={12} md={6}>
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
                id='autocomplete-country-of-issue'
                options={countries}
                defaultValue={countryOfIssue?.id ? countryOfIssue : ''}
                getOptionLabel={option => option.name || ''}
                renderInput={(params: any) => (
                  <TextField {...params} error={formik.errors.country_of_issue ? true : false} variant='outlined' />
                )}
                onChange={(event: any, newValue: string | null) =>
                  newValue ? setCountryOfIssue(newValue) : setCountryOfIssue('')
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                Required Document
              </InputLabel>

              <Select
                error={formik.errors.required_document ? true : false}
                fullWidth
                value={formik.values.required_document}
                onChange={e => {
                  formik.handleChange(e)
                  handleChangeRequireDocument(e)
                }}
                onBlur={formik.handleBlur}
                name='required_document'
                id={'required_document'}
                variant={'outlined'}
              >
                {documentOptions.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
                <MenuItem value={'other'}>
                  Other
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6} sx={{display: formik.values.required_document != 'other' ? 'none' : ''}}>
              <InputLabel
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
                Document
              </InputLabel>
              <TextField
                error={formik.errors.document ? true : false}
                name='document'
                value={formik.values.document}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.values.required_document != 'other' ? true : false}
                id='document'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                Document Number
              </InputLabel>
              <TextField
                error={formik.errors.no ? true : false}
                name='no'
                value={formik.values.no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='no'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                Date of Issue
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  format='DD/MM/YYYY'
                  openTo='month'
                  views={['year', 'month', 'day']}
                  className='date_of_issue'
                  name='date_of_issue'
                  onChange={date => setDateOfIssue(date)}
                  value={dateOfIssue ? moment(dateOfIssue) : null}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      fullWidth: true,
                      id: 'basic-input',
                      'aria-readonly': true,
                      name: 'date_of_issue',
                      error: formik.errors.date_of_issue ? true : false
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
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
                  format='DD/MM/YYYY'
                  openTo='month'
                  views={['year', 'month', 'day']}
                  className='valid-date-datepicker'
                  name='valid_date'
                  onChange={date => setValidDateState(date)}
                  value={validDateState ? moment(validDateState) : null}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      fullWidth: true,
                      id: 'basic-input',
                      'aria-readonly': true,
                      name: 'valid_date'
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <FormControlLabel
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
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Typography sx={{ textAlign: 'left', color: '#262525', fontSize: '12px', fontWeight: 700 }}>
                  <strong>Click to change Document File.</strong>
                </Typography>
                <Box sx={{ display: 'flex', gap: '15px' }}>
                  {/* <Box>
                    <label htmlFor='file-upload'>
                      <Button
                        variant='contained'
                        sx={{
                          background: '#F8F8F7',
                          textTransform: 'capitalize',
                          color: 'black',
                          padding: '8px',
                          width: '100%'
                        }}
                      >
                        <Icon
                          icon={'material-symbols-light:upload-sharp'}
                          fontSize={'16px'}
                          style={{ marginRight: '10px' }}
                        />
                        <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Upload Document</Typography>
                      </Button>
                    </label>
                    <input
                      accept='application/pdf,,image/*'
                      style={{ display: 'none' }}
                      id='file-upload'
                      name='attachment'
                      onChange={e => setAttachment(e.target?.files ? e.target?.files[0] : null)}
                      type='file'
                    ></input>
                    <div>{attachment?.name}</div>
                  </Box> */}
                  <div>
                    <Button
                      variant='contained'
                      sx={{
                        background: '#F8F8F7',
                        textTransform: 'capitalize',
                        color: 'black',
                        padding: '8px',
                        width: '100%',
                        zIndex: 1
                      }}
                    >
                      <Icon
                        icon='material-symbols-light:upload-sharp'
                        fontSize='16px'
                        style={{ marginRight: '10px' }}
                      />
                      <input
                        accept='application/pdf,image/*'
                        style={{
                          position: 'absolute',
                          opacity: 0,
                          cursor: 'pointer',
                          zIndex: 2
                        }}
                        onChange={e => setAttachment(e.target?.files ? e.target?.files[0] : null)}
                        type='file'
                      />
                      <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Upload Document</Typography>
                    </Button>
                  </div>
                  <Box>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed JPG, PNG, or PDF.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      <span style={{ color: 'red' }}>Max size of 800K.</span>
                    </Typography>
                    <div>{attachment?.name}</div>
                  </Box>
                </Box>
              </Box>
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
            sx={{ textTransform: 'capitalize' }}
          >
            {type == 'edit' ? 'Save Changes' : 'Save'}
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
                {type == 'create' ? 'Add  Travel Document' : 'Edit Travel Document'}
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

export default SeafarerTravelDocumentForm
