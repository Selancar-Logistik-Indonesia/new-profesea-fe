import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'

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
import { ISeafarerTravelDocumentForm } from './SeafarerTravelDocumentInterface'
import DatePicker from 'react-datepicker'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TravelDocumentSchema = Yup.object().shape({
  document: Yup.string().required(),
  no: Yup.string().required(),
  date_of_issue: Yup.date().required(),
  country_of_issue: Yup.number().required(),
  user_id: Yup.number().required(),
  valid_date: Yup.number().nullable(),
  is_lifetime: Yup.boolean().nullable(),
  required_document: Yup.string().required()
})

const SeafarerTravelDocumentForm = (props: ISeafarerTravelDocumentForm) => {
  const { type, user_id, seafarerTravelDocument, showModal, handleModalForm, loadTravelDocument } = props
  const id = seafarerTravelDocument?.id

  const [requiredDocument, setRequiredDocument] = useState(
    type == 'edit' ? seafarerTravelDocument?.required_document : ''
  )

  const [validDateState, setValidDateState] = useState<any>(
    seafarerTravelDocument?.valid_date == null ? null : new Date(seafarerTravelDocument?.valid_date)
  )

  const [dateOfIssue, setDateOfIssue] = useState<any>(
    seafarerTravelDocument?.date_of_issue == null ? null : new Date(seafarerTravelDocument?.date_of_issue)
  )

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])

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
      date_of_issue: type == 'edit' ? seafarerTravelDocument?.date_of_issue : null,
      country_of_issue: type == 'edit' ? seafarerTravelDocument?.country_of_issue : '',
      user_id: user_id,
      valid_date: type == 'edit' ? seafarerTravelDocument?.valid_date : null,
      is_lifetime: type == 'edit' ? seafarerTravelDocument?.is_lifetime : false,
      required_document: type == 'edit' ? seafarerTravelDocument?.required_document : 'other'
    },
    enableReinitialize: true,
    validationSchema: TravelDocumentSchema,
    onSubmit: values => {
      handleSubmit(values)
      handleModalForm()
      loadTravelDocument()
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

  const createTravelDocument = (values: any) => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-travel-documents/', {
      document: values.document,
      no: values.noDocument,
      date_of_issue: values.dateOfIssue,
      country_of_issue: values.countryOfIssue,
      user_id: values.user_id,
      valid_date: values.validDate,
      is_lifetime: values.isLifetime,
      required_document: values.requiredDocument
    })
      .then(res => {
        handleModalForm()
        toast('create travel document success', { icon: 'success' })
      })
      .catch(err => {
        handleModalForm()
        toast(JSON.stringify(err), { icon: 'danger' })
      })
  }

  const updateTravelDocument = (id?: number, values: any) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-travel-documents/' + id, {
      document: values.document,
      no: values.noDocument,
      date_of_issue: values.dateOfIssue,
      country_of_issue: values.countryOfIssue,
      user_id: values.user_id,
      valid_date: values.validDate,
      is_lifetime: values.isLifetime,
      required_document: values.requiredDocument
    })
      .then(res => {
        toast('create travel document success', { icon: 'success' })
      })
      .catch(err => {
        toast(JSON.stringify(err), { icon: 'danger' })
      })
  }

  useEffect(() => {
    loadCountries()
  }, [])

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
            onClick={e => props.handleModalForm(e)}
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
              <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }} fullWidth>
                <InputLabel>Required Document</InputLabel>
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
                id='basic-input'
                onChange={(dateAwal: Date) => setDateOfIssue(dateAwal)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={
                  <TextField
                    label='Date Of Issue'
                    variant='standard'
                    id='date_of_issue'
                    name='date_of_issue'
                    fullWidth
                  />
                }
              />
              {formik.errors.date_of_issue && (
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.date_of_issue}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              {/* <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={countries.map(e => e.name)}
                defaultValue={countries.find((item: any) => item.id == seafarerTravelDocument?.country_of_issue)?.name}
                getOptionLabel={(option: string) => option}
                renderInput={(params: any) => <TextField {...params} label='Country of Issue' variant='standard' />}
                onChange={(event: any, newValue: string | null) =>
                  newValue
                    ? setCountryOfIssue(countries.find((item: any) => item.name == newValue)?.id)
                    : setCountryOfIssue(undefined)
                }
              /> */}
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
                <span style={{ color: 'red', textAlign: 'left' }}>{formik.errors.valid_date}</span>
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
