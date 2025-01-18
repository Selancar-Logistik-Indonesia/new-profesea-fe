import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'

import {
  Autocomplete,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Fade,
  FadeProps,
  Typography,
  TextField,
  useMediaQuery,
  InputLabel,
  SwipeableDrawer
} from '@mui/material'
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ISeafarerExperienceForm } from './../../../contract/types/seafarer_experience_type'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import moment from 'moment'
import { useTheme } from '@mui/material/styles'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'

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
  const { refetch, setRefetch } = useProfileCompletion()

  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))

  const { type, seafarerExperience, showModal, user_id, handleModalForm, loadExperience } = props
  const id = seafarerExperience?.id

  const [rankId, setRankId] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerExperience?.rank_id,
          name: seafarerExperience?.rank?.name
        }
      : {}
  )
  const [vesselTypeId, setVesselTypeId] = useState<any>(
    type == 'edit'
      ? {
          id: seafarerExperience?.vessel_type_id,
          name: seafarerExperience?.vessel_type?.name
        }
      : {}
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
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values)
      resetForm()
      resetState()
    }
  })

  const resetState = () => {
    if (type != 'edit') {
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
        setRefetch(!refetch)
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
        setRefetch(!refetch)
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

  const renderForm = () => {
    return (
      <form
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
                  {type == 'create' ? 'Add  Sea Experience' : 'Edit Sea Experience'}
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
            <Grid item xs={12} md={12}>
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
                Vessel Type
              </InputLabel>
              <Autocomplete
                id='autocomplete-vessel-type'
                disablePortal
                options={vesselTypes}
                getOptionLabel={(option: any) => option.name || ''}
                // defaultValue={vesselTypeId?.id ? vesselTypeId : ''}
                defaultValue={vesselTypeId}
                renderInput={params => (
                  <TextField {...params} error={formik.errors.vessel_type_id ? true : false} variant='outlined' />
                )}
                onChange={(event: any, newValue: any) =>
                  newValue?.id ? setVesselTypeId(newValue) : setVesselTypeId('')
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
                Vessel Name
              </InputLabel>
              <TextField
                error={formik.errors.vessel_name ? true : false}
                value={formik.values.vessel_name}
                defaultValue={type == 'edit' ? seafarerExperience?.vessel_name : ''}
                id='vessel_name'
                name={'vessel_name'}
                variant='outlined'
                onChange={formik.handleChange}
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
                Rank / Position
              </InputLabel>
              <Autocomplete
                id='autocomplete-rank'
                disablePortal
                options={ranks}
                getOptionLabel={(option: any) => option.name || ''}
                defaultValue={rankId?.id ? rankId : ''}
                renderInput={params => (
                  <TextField {...params} error={formik.errors.rank_id ? true : false} variant='outlined' />
                )}
                onChange={(event: any, newValue: any) => (newValue?.id ? setRankId(newValue) : setRankId(''))}
              />
            </Grid>

            <Grid container item xs={12} md={12} spacing={6}>
              <Grid item xs={12} md={4}>
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
                  GRT
                </InputLabel>
                <TextField
                  defaultValue={type == 'edit' ? seafarerExperience?.grt : ''}
                  id='grt'
                  name={'grt'}
                  variant='outlined'
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
                  DWT
                </InputLabel>
                <TextField
                  defaultValue={type == 'edit' ? seafarerExperience?.dwt : ''}
                  id='dwt'
                  name={'dwt'}
                  variant='outlined'
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
                  ME Power
                </InputLabel>
                <TextField
                  defaultValue={type == 'edit' ? seafarerExperience?.me_power : ''}
                  id='me_power'
                  name={'me_power'}
                  variant='outlined'
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item md={12} xs={12} spacing={6}>
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
                  Sign In Date
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    format='DD/MM/YYYY'
                    openTo='month'
                    views={['year', 'month', 'day']}
                    className='sign_in'
                    name='sign_in'
                    onChange={date => setSignIn(date)}
                    value={signIn ? moment(signIn) : null}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        id: 'basic-input',
                        'aria-readonly': true,
                        name: 'sign_in',
                        error: formik.errors.sign_in ? true : false
                      }
                    }}
                  />
                </LocalizationProvider>
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
                  Sign Off Date
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    format='DD/MM/YYYY'
                    openTo='month'
                    views={['year', 'month', 'day']}
                    className='sign_off'
                    name='sign_off'
                    onChange={date => setSignOff(date)}
                    value={signOff ? moment(signOff) : null}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        id: 'basic-input',
                        'aria-readonly': true,
                        name: 'sign_off',
                        error: formik.errors.sign_off ? true : false
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
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
                Company
              </InputLabel>
              <TextField
                error={formik.errors.company ? true : false}
                value={formik.values.company}
                defaultValue={type == 'edit' ? seafarerExperience?.company : ''}
                id='company'
                name={'company'}
                variant='outlined'
                onChange={formik.handleChange}
                fullWidth
              />
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

export default SeafarerExperienceForm
