import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  TextField,
  Autocomplete,
  DialogActions,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ISeafarerTravelDocumentForm } from '../../../contract/types/seafarer_travel_document_type'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TravelDocumentSchema = Yup.object().shape({
  document: Yup.string().required(),
  no: Yup.string().required(),
  date_of_issue: Yup.string().required(),
  country_of_issue: Yup.object().shape({
    id: Yup.number().required('country id is required'),
    name: Yup.string().required('')
  }),
  user_id: Yup.number().required(),
  valid_date: Yup.date().nullable(),
  is_lifetime: Yup.boolean().nullable(),
  required_document: Yup.string().required()
})

const SeafarerTravelDocumentForm = (props: ISeafarerTravelDocumentForm) => {
  const { type, user_id, seafarerTravelDocument, showModal, handleModalForm, loadTravelDocument } = props
  const id = seafarerTravelDocument?.id

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])

  const [countryOfIssue, setCountryOfIssue] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerTravelDocument?.country?.id,
          name: seafarerTravelDocument?.country?.name
        }
      : {}
  )
  const [validDateState, setValidDateState] = useState<any>()
  const [dateOfIssue, setDateOfIssue] = useState<any>()
  const [attachment, setAttachment] = useState<any>(null)

  const requiredDocumentType = [
    { id: 'passport', name: 'Passport' },
    { id: 'seaman_book', name: 'Seaman Book' },
    { id: 'usa_visa', name: 'Usa Visa' },
    { id: 'schengen_visa', name: 'Schengen Visa' }
  ]

  const formik = useFormik({
    initialValues: {
      document: type == 'edit' ? seafarerTravelDocument?.document : '',
      no: type == 'edit' ? seafarerTravelDocument?.no : '',
      date_of_issue: type == 'edit' ? dateOfIssue : null,
      country_of_issue: countryOfIssue,
      user_id: user_id,
      valid_date: type == 'edit' ? validDateState : null,
      is_lifetime: type == 'edit' ? seafarerTravelDocument?.is_lifetime : false,
      required_document: type == 'edit' ? seafarerTravelDocument?.required_document : 'other'
    },
    enableReinitialize: true,
    validationSchema: TravelDocumentSchema,
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
      })
      .catch(err => {
        toast.error(JSON.stringify(err.message))
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
        toast.error(JSON.stringify(err.message))
      })
  }

  useEffect(() => {
    formik.setErrors({})
    loadCountries()
  }, [])

  useEffect(() => {
    setValidDateState(seafarerTravelDocument?.valid_date ? new Date(seafarerTravelDocument?.valid_date) : null)
    setDateOfIssue(seafarerTravelDocument?.date_of_issue ? new Date(seafarerTravelDocument?.date_of_issue) : null)
  }, [seafarerTravelDocument, countries])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      date_of_issue: dateOfIssue,
      valid_date: validDateState
    })
  }, [dateOfIssue, validDateState])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      document:
        formik.values.required_document != 'other'
          ? requiredDocumentType.find(item => item.id == formik.values.required_document)?.name
          : formik.values.document
    })
  }, [formik.values.required_document])

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateTravelDocument(id, values)
    } else {
      createTravelDocument(values)
    }
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <IconButton
            size='small'
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            onClick={() => props.handleModalForm(type, undefined)}
          >
            <Icon width='24' height='24' icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
              {type == 'create' ? 'Add new ' : 'Update '} Travel Document
            </Typography>
            <Typography variant='body2'>Fulfill your Document Info here</Typography>
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
          <Grid container>
            <Grid item md={12} xs={12} mb={5}>
              <Autocomplete
                disablePortal
                id='country_of_issue'
                options={countries}
                defaultValue={countryOfIssue?.id ? countryOfIssue : ''}
                getOptionLabel={option => option.name || ''}
                renderInput={(params: any) => <TextField {...params} label='Country of Issue' variant='standard' />}
                onChange={(event: any, newValue: string | null) =>
                  newValue ? setCountryOfIssue(newValue) : setCountryOfIssue('')
                }
              />
              {formik.errors.country_of_issue && (
                <span style={{ color: 'red', textAlign: 'left' }}>
                  {JSON.stringify(formik.errors.country_of_issue)}
                </span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel>Required Document</InputLabel>
                <Select
                  fullWidth
                  value={formik.values.required_document == 'other' ? 'other' : formik.values.required_document}
                  label='Required Document'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='required_document'
                  id={'required_document'}
                  variant={'standard'}
                >
                  <MenuItem value={'seaman_book'}>Seaman Book</MenuItem>
                  <MenuItem value={'usa_visa'}>USA Visa</MenuItem>
                  <MenuItem value={'schengen_visa'}>Schengen Visa</MenuItem>
                  <MenuItem value={'passport'}>Passport</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.required_document && (
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.required_document}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                name='document'
                value={formik.values.document}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.values.required_document != 'other' ? true : false}
                id='document'
                label='Document'
                variant='standard'
                fullWidth
              />
              {formik.errors.document && (
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.document}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                name='no'
                value={formik.values.no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='no'
                label='No Document'
                variant='standard'
                fullWidth
              />
              {formik.errors.no && <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.no}</span>}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={dateOfIssue}
                id='date-issue-datepicker'
                onChange={(dateAwal: Date) => setDateOfIssue(dateAwal)}
                placeholderText=''
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={
                  <TextField
                    placeholder='Click to select a date'
                    label='Date Of Issue'
                    variant='standard'
                    id='date_of_issue'
                    name='date_of_issue'
                    fullWidth
                  ></TextField>
                }
              />

              {formik.errors.date_of_issue && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.date_of_issue)}</span>
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
                id='valid-date-datepicker'
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
                  onChange={e => setAttachment(e.target?.files ? e.target?.files[0] : null)}
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
            <div> {type == 'edit' ? 'Update ' : 'Create '} Travel Document </div>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SeafarerTravelDocumentForm
