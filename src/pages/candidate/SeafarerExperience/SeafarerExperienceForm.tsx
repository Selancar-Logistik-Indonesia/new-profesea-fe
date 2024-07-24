import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

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
import DatePicker from 'react-datepicker'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ISeafarerExperienceForm } from './../../../contract/types/seafarer_experience_type'

const ExperienceSchema = Yup.object().shape({
  user_id: Yup.number(),
  rank_id: Yup.object().shape({
    id: Yup.number().required('Rank is required'),
    name: Yup.string().required('')
  }),
  vessel_type_id: Yup.object().shape({
    id: Yup.number().required('Vessel type is required'),
    name: Yup.string().required('')
  }),
  vessel_name: Yup.string().required('Vessel Name is reqiured'),
  grt: Yup.number().nullable(),
  dwt: Yup.number().nullable(),
  me_power: Yup.number().nullable(),
  sign_in: Yup.string().required('Sign in is required'),
  sign_off: Yup.string().required('Sign off is required'),
  company: Yup.string().required('Company is required')
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

  const [rankId, setRankId] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerExperience?.rank_id,
          name: seafarerExperience?.rank
        }
      : ''
  )
  const [vesselTypeId, setVesselTypeId] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerExperience?.vessel_type_id,
          name: seafarerExperience?.vessel_type
        }
      : ''
  )

  const [signIn, setSignIn] = useState<any>(null)
  const [signOff, setSignOff] = useState<any>(null)

  const [vesselTypes, setVesselTypes] = useState([])
  const [ranks, setRanks] = useState([])

  let initialValues = {
    user_id: user_id,
    rank_id: rankId,
    vessel_type_id: vesselTypeId,
    vessel_name: '' as any,
    grt: '' as any,
    dwt: '' as any,
    me_power: '' as any,
    sign_in: signIn as any,
    sign_off: signOff as any,
    company: '' as any
  }

  if (type == 'edit') {
    initialValues = {
      user_id: user_id,
      rank_id: rankId,
      vessel_type_id: vesselTypeId,
      vessel_name: seafarerExperience?.vessel_name,
      grt: seafarerExperience?.grt,
      dwt: seafarerExperience?.dwt,
      me_power: seafarerExperience?.me_power,
      sign_in: seafarerExperience?.sign_in,
      sign_off: seafarerExperience?.sign_off,
      company: seafarerExperience?.company
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: ExperienceSchema,
    onSubmit: (values, {resetForm}) => {
      handleSubmit(values)
      resetForm()
      resetState()
    }
  })

  const resetState = () => {
    if(type != 'edit'){
      setRankId('')
      setVesselTypeId('')
      setSignIn(null)
      setSignOff(null)
    }
  }

  const loadVesselTypes = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/vessel-type?page=1&take=100')
      .then(response => {
        const vesselTypes = response?.data?.vesselTypes?.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          }
        })

        setVesselTypes(vesselTypes)
      })
      .catch(err => {
        toast.error(' err ' + JSON.stringify(err))
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

        setRanks(roleTypes)
      })
      .catch(err => {
        toast.error(' err ' + JSON.stringify(err))
      })
  }

  const createExperience = (values: any) => {
    HttpClient.post(AppConfig.baseUrl + '/seafarer-experiences/', {
      user_id: values.user_id,
      rank_id: values.rank_id.id,
      vessel_type_id: values.vessel_type_id.id,
      vessel_name: values.vessel_name,
      grt: values.grt,
      dwt: values.dwt,
      me_power: values.me_power,
      sign_in: values.sign_in,
      sign_off: values.sign_off,
      company: values.company
    })
      .then(() => {
        toast.success('create experience success')
        handleModalForm(type, undefined)
        loadExperience()
      })
      .catch(err => {
        toast.error(JSON.stringify(err))
      })
  }

  const updateExperience = (id: number, values: any) => {
    HttpClient.patch(AppConfig.baseUrl + '/seafarer-experiences/' + id, {
      user_id: values.user_id,
      rank_id: values.rank_id.id,
      vessel_type_id: values.vessel_type_id.id,
      vessel_name: values.vessel_name,
      grt: values.grt,
      dwt: values.dwt,
      me_power: values.me_power,
      sign_in: values.sign_in,
      sign_off: values.sign_off,
      company: values.company
    })
      .then(() => {
        toast.success('update experience success')
        handleModalForm(type, undefined)
        loadExperience()
      })
      .catch(err => {
        toast.error(JSON.stringify(err))
      })
  }

  useEffect(() => {
    if (type == 'edit') {
      setSignIn(seafarerExperience?.sign_in ? new Date(seafarerExperience?.sign_in) : null)
      setSignOff(seafarerExperience?.sign_off ? new Date(seafarerExperience?.sign_off) : null)
    } else {
      setSignIn(null)
      setSignOff(null)
    }
  }, [seafarerExperience])

  useEffect(() => {
    if (signIn) {
      formik.setValues({
        ...formik.values,
        sign_in: signIn
      })
    }
  }, [signIn])

  useEffect(() => {
    if (signOff) {
      formik.setValues({
        ...formik.values,
        sign_off: signOff
      })
    }
  }, [signOff])

  useEffect(() => {
    loadRanks()
    loadVesselTypes()
  }, [])

  const handleSubmit = (values: any) => {
    if (type == 'edit') {
      updateExperience(id ? id : 0, values)
    } else {
      createExperience(values)
    }
  }

  return (
    <Dialog fullWidth open={showModal} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <form
        onSubmit={formik.handleSubmit}
        onReset={() => {
          formik.resetForm()
        }}
      >
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
              <Autocomplete
                id='autocomplete-vessel-type'
                disablePortal
                options={vesselTypes}
                getOptionLabel={(option: any) => option.name}
                defaultValue={vesselTypeId?.id ? vesselTypeId : ''}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={formik.errors.vessel_type_id ? true : false}
                    label='Vessel Type * '
                    variant='standard'
                  />
                )}
                onChange={(event: any, newValue: any) =>
                  newValue?.id ? setVesselTypeId(newValue) : setVesselTypeId('')
                }
              />
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <Autocomplete
                id='autocomplete-rank'
                disablePortal
                options={ranks}
                getOptionLabel={(option: any) => option.name}
                defaultValue={rankId?.id ? rankId : ''}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={formik.errors.rank_id ? true : false}
                    label='Rank / Position * '
                    variant='standard'
                  />
                )}
                onChange={(event: any, newValue: any) => (newValue?.id ? setRankId(newValue) : setRankId(''))}
              />
            </Grid>
            <Grid item md={12} xs={12} mb={5}>
              <TextField
                error={formik.errors.vessel_name ? true : false}
                value={formik.values.vessel_name}
                defaultValue={type == 'edit' ? seafarerExperience?.vessel_name : ''}
                id='vessel_name'
                name={'vessel_name'}
                label='Vessel Name * '
                variant='standard'
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item container md={12} xs={12} mb={5}>
              <Grid item md={4} xs={12}>
                <TextField
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
                customInput={
                  <TextField
                    error={formik.errors.sign_in ? true : false}
                    label='Sign In Date * '
                    variant='standard'
                    id='sign_in'
                    name='sign_in'
                    fullWidth
                    InputProps={{
                      readOnly: true
                    }}
                  />
                }
              />
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
                customInput={
                  <TextField
                    error={formik.errors.sign_off ? true : false}
                    label='Sign Off Date * '
                    variant='standard'
                    fullWidth
                    id='sign_off'
                    name='sign_off'
                    InputProps={{
                      readOnly: true
                    }}
                  />
                }
              />
            </Grid>
            <Grid item container md={12} xs={12} mb={5}>
              <TextField
                error={formik.errors.company ? true : false}
                value={formik.values.company}
                defaultValue={type == 'edit' ? seafarerExperience?.company : ''}
                id='company'
                name={'company'}
                label='Company * '
                variant='standard'
                onChange={formik.handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type='reset'
            variant='contained'
            style={{ margin: '10px 10px', backgroundColor: 'grey' }}
            size='small'
          >
            Reset
          </Button>
          <Button
            disabled={Object.keys(formik.errors).length > 0 ? true : false}
            type='submit'
            variant='contained'
            style={{ margin: '10px 0' }}
            size='small'
          >
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
