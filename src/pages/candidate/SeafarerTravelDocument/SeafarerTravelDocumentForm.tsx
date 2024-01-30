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

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerTravelDocumentForm = (props: ISeafarerTravelDocumentForm) => {
  const { type, user_id, seafarerTravelDocument, showModal, handleModalForm } = props
  const id = seafarerTravelDocument?.id

  const [document, setDocument] = useState(type == 'edit' ? seafarerTravelDocument?.document : '')
  const [noDocument, setNoDocument] = useState(type == 'edit' ? seafarerTravelDocument?.no : '')
  const [dateOfIssue, setDateOfIssue] = useState(type == 'edit' ? seafarerTravelDocument?.date_of_issue : null)
  const [countryOfIssue, setCountryOfIssue] = useState(type == 'edit' ? seafarerTravelDocument?.country_of_issue : 0)
  const [validDate, setValidDate] = useState(type == 'edit' ? seafarerTravelDocument?.valid_date : null)
  const [isLifetime, setIsLifeTime] = useState(type == 'edit' ? seafarerTravelDocument?.is_lifetime : '')
  const [requiredDocument, setRequiredDocument] = useState(
    type == 'edit' ? seafarerTravelDocument?.required_document : ''
  )

  const [countries, setCountries] = useState<{ id?: number; name: string }[]>([])

  const requiredDocumentType = [
    { id: 'passport', name: 'Passport' },
    { id: 'seaman_book', name: 'Seaman Book' },
    { id: 'usa_visa', name: 'Usa Visa' },
    { id: 'schengen_visa', name: 'Schengen Visa' }
  ]

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

  const createTravelDocument = () => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-travel-documents/', {
      document: document,
      no: noDocument,
      date_of_issue: dateOfIssue,
      country_of_issue: countryOfIssue,
      user_id: user_id,
      valid_date: validDate,
      is_lifetime: isLifetime,
      required_document: requiredDocument
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

  const updateTravelDocument = (id?: number) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-travel-documents/' + id, {
      document: document,
      no: noDocument,
      date_of_issue: dateOfIssue,
      country_of_issue: countryOfIssue,
      user_id: user_id,
      valid_date: validDate,
      is_lifetime: isLifetime,
      required_document: requiredDocument
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

  const onSubmit = () => {
    if (type == 'edit') {
      updateTravelDocument(id)
    } else {
      createTravelDocument()
    }
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <form noValidate autoComplete='off'>
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
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                value={
                  requiredDocument != 'other'
                    ? requiredDocumentType.find(item => item.id == requiredDocument)?.name
                    : ''
                }
                id='document'
                label='Document'
                variant='standard'
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                value={type == 'edit' ? seafarerTravelDocument?.no : ''}
                id='noDocument'
                label='No Document'
                variant='standard'
                fullWidth
              />
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
                customInput={<TextField label='Date Of Issue' variant='standard' fullWidth />}
              />
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <Autocomplete
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
              />
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <DatePicker
                disabled={isLifetime ? true : false}
                dateFormat='dd/MM/yyyy'
                selected={validDate}
                id='basic-input'
                onChange={(dateAwal: Date) => setValidDate(dateAwal)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                customInput={<TextField label='Valid Date' variant='standard' fullWidth />}
              />
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <FormControlLabel
                control={
                  <Checkbox onClick={() => setIsLifeTime(!isLifetime)} defaultChecked={isLifetime ? true : false} />
                }
                label='Lifetime'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' style={{ margin: '10px 0' }} size='small'>
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
