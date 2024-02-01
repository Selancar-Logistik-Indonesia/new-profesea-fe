import { Ref, forwardRef, ReactElement, useState, useEffect, useRef } from 'react'

import {
  Autocomplete,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  TextField
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { ISeafarerExperienceForm } from './SeafarerExperienceInterface'
import DatePicker from 'react-datepicker'

import { useFormik } from 'formik'
import * as Yup from 'yup'

const ExperienceSchema = Yup.object().shape({
  user_id: Yup.number().required(),
  country_id: Yup.object().required(),
  rank_id: Yup.object().required(),
  vessel_type_id: Yup.object().required(),
  vessel_name: Yup.string().required(),
  grt: Yup.number().required(),
  dwt: Yup.number().required(),
  me_power: Yup.number().required(),
  sign_in: Yup.string().required(),
  sign_off: Yup.string().required(),
  company: Yup.string().required(),
  filename: Yup.string().nullable()
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const SeafarerExperienceForm = (props: ISeafarerExperienceForm) => {
  const { type, seafarerExperience, showModal, user_id, handleModalForm, loadExperience } = props
  const id = seafarerExperience?.id

  const [userId, setUserId] = useState()
  const [countryId, setCountryId] = useState({
    id: seafarerExperience?.country_id,
    name: seafarerExperience?.country
  })
  const [rankId, setRankId] = useState({
    id: seafarerExperience?.rank?.id,
    name: seafarerExperience?.rank?.name
  })
  const [vesselTypeId, setVesselTypeId] = useState({
    id: seafarerExperience?.vessel_type?.id,
    name: seafarerExperience?.vessel_type?.name
  })

  const [signIn, setSignIn] = useState<any>()
  const [signOff, setSignOff] = useState<any>()

  const [countries, setCountries] = useState([])
  const [vesselTypes, setVesselTypes] = useState([])
  const [ranks, setRanks] = useState([])

  const formik = useFormik({
    initialValues: {
      user_id: user_id,
      rank_id: type == 'edit' ? rankId : '',
      country_id: type == 'edit' ? countryId : '',
      vessel_type_id: type == 'edit' ? vesselTypeId : '',
      vessel_name: type == 'edit' ? seafarerExperience?.vessel_name : '',
      grt: type == 'edit' ? seafarerExperience?.grt : '',
      dwt: type == 'edit' ? seafarerExperience?.dwt : '',
      me_power: type == 'edit' ? seafarerExperience?.me_power : '',
      sign_in: type == 'edit' ? signIn : null,
      sign_off: type == 'edit' ? signOff : null,
      company: type == 'edit' ? seafarerExperience?.company : ''
    },
    enableReinitialize: true,
    validationSchema: ExperienceSchema,
    onSubmit: values => {
      handleSubmit(values)
      handleModalForm()
      loadExperience()
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

  const loadVesselTypes = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/vessel-type?page=1&take=100')
      .then(response => {
        const vesselTypes = response?.data?.vesselTypes.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          }
        })

        setCountries(vesselTypes)
      })
      .catch(err => {
        toast(' err ' + JSON.stringify(err))
      })
  }

  const loadRanks = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/role-type?page=1&take=100')
      .then(response => {
        const roleTypes = response?.data.roleTypes.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          }
        })

        setCountries(roleTypes)
      })
      .catch(err => {
        toast(' err ' + JSON.stringify(err))
      })
  }

  const createExperience = (values: any) => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-experiences/', {
      user_id: userId,
      rank_id: rankId,
      country_id: countryId,
      vessel_type_id: vesselTypeId,
      vessel_name: values.vesselName,
      grt: values.grt,
      dwt: values.dwt,
      me_power: values.mePower,
      sign_in: values.signIn,
      sign_off: values.signOff,
      company: values.company
    })
      .then(res => {
        toast('create experience success', { icon: 'success' })
      })
      .catch(err => {})
  }

  const updateExperience = (id: number, values: any) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-experiences/' + id, {
      user_id: userId,
      rank_id: rankId,
      country_id: countryId,
      vessel_type_id: vesselTypeId,
      vessel_name: values.vesselName,
      grt: values.grt,
      dwt: values.dwt,
      me_power: values.mePower,
      sign_in: values.signIn,
      sign_off: values.signOff,
      company: values.company
    })
      .then(res => {
        toast('create experience success', { icon: 'success' })
      })
      .catch(err => {
        toast(JSON.stringify(err), { icon: 'danger' })
      })
  }

  useEffect(() => {
    setSignIn(seafarerExperience?.sign_in ? new Date(seafarerExperience?.sign_in) : null)
    setSignOff(seafarerExperience?.sign_off ? new Date(seafarerExperience?.sign_off) : null)
  }, [seafarerExperience])

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      sign_in: signIn,
      sign_off: signOff
    })
  }, [signIn, signOff])

  useEffect(() => {
    loadCountries()
    loadRanks()
    loadVesselTypes()
  }, [])

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateExperience(id, values)
    } else {
      createExperience(values)
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
              {type == 'create' ? 'Add new ' : 'Update '} experience
            </Typography>
            <Typography variant='body2'>Fulfill your Experience Info here</Typography>
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
              <TextField
                value={formik.values.vessel_name}
                defaultValue={type == 'edit' ? seafarerExperience?.vessel_name : ''}
                id='vessel_name'
                name={'vessel_name'}
                label='Vessel Name'
                variant='standard'
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.vessel_name && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.vessel_name)}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <Autocomplete
                id='autocomplete-vessel-type'
                disablePortal
                options={vesselTypes}
                getOptionLabel={(option: any) => option.name}
                defaultValue={vesselTypes?.id ? vesselTypes : ''}
                renderInput={params => <TextField {...params} label='Vessel Type' variant='standard' />}
                onChange={(event: any, newValue: any) =>
                  newValue?.id ? setVesselTypeId(newValue) : setVesselTypeId(null)
                }
              />
              {formik.errors.vessel_type_id && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.vessel_type_id)}</span>
              )}
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <Autocomplete
                id='autocomplete-rank'
                disablePortal
                options={ranks}
                getOptionLabel={(option: any) => option.name}
                defaultValue={rankId?.id ? rankId : ''}
                renderInput={params => <TextField {...params} label='Rank / Position' variant='standard' />}
                onChange={(event: any, newValue: any) => (newValue?.id ? setRankId(newValue) : setRankId(null))}
              />
              {formik.errors.vessel_type_id && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.vessel_type_id)}</span>
              )}
            </Grid>
            <Grid item container md={12} xs={12} mb={5}>
              <Grid item md={4} xs={12}>
                <TextField
                  value={formik.values.grt}
                  defaultValue={type == 'edit' ? seafarerExperience?.grt : ''}
                  id='grt'
                  name={'grt'}
                  label='GRT'
                  variant='standard'
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  value={formik.values.grt}
                  defaultValue={type == 'edit' ? seafarerExperience?.dwt : ''}
                  id='dwt'
                  name={'dwt'}
                  label='DWT'
                  variant='standard'
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  value={formik.values.grt}
                  defaultValue={type == 'edit' ? seafarerExperience?.me_power : ''}
                  id='me_power'
                  name={'me_power'}
                  label='ME Power'
                  variant='standard'
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container md={12} xs={12} mb={5}>
              <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={signIn}
                onChange={(date: Date) => setSignIn(date)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                id='sign_in'
                name='sign_in'
                customInput={<TextField label='Sign In Date' variant='standard' fullWidth />}
              />
              {formik.errors.sign_in && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.sign_in)}</span>
              )}
            </Grid>
            <Grid item container md={12} xs={12} mb={5}>
              <DatePicker
                dateFormat='dd/MM/yyyy'
                selected={signOff}
                onChange={(date: Date) => setSignOff(date)}
                placeholderText='Click to select a date'
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                id='sign_off'
                name='sign_off'
                customInput={<TextField label='Sign Off Date' variant='standard' fullWidth />}
              />
              {formik.errors.sign_off && (
                <span style={{ color: 'red', textAlign: 'left' }}>{JSON.stringify(formik.errors.sign_off)}</span>
              )}
            </Grid>
            <Grid item container md={12} xs={12} mb={5}>
              <TextField
                value={formik.values.company}
                defaultValue={type == 'edit' ? seafarerExperience?.company : ''}
                id='company'
                name={'company'}
                label='Company'
                variant='standard'
                onChange={formik.handleChange}
                fullWidth
              />
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
            <div> {type == 'edit' ? 'Update ' : 'Create '} Experience</div>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SeafarerExperienceForm
