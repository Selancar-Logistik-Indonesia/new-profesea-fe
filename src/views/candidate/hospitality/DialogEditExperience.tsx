import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { Controller, useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import {
  CircularProgress,
  Checkbox,
  useMediaQuery,
  SwipeableDrawer,
  FormControl,
  Select,
  MenuItem
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTheme } from '@mui/material/styles'

import moment from 'moment'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import JobCategory from 'src/contract/models/job_category'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  selectedItem: any
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
}

type FormData = {
  noExperience: boolean
  company: string | null
  roleType: number | null
  position: string | null
  workPlace: string | null
  signIn: string | null
  signOff: string | null
  location: number | null
  description: string | null
  isCurrent: boolean | null
}

const schema = yup.object().shape({
  noExperience: yup.boolean().required(),
  company: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  roleType: yup.number().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  position: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  location: yup.number().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  workPlace: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  description: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  isCurrent: yup.boolean().when('noExperience', {
    is: false,
    then: schema => schema.notRequired(),
    otherwise: schema => schema.notRequired()
  }),
  signIn: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  signOff: yup.string().when('isCurrent', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  })
})

const DialogEditExperience = (props: DialogProps) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      noExperience: false,
      company: null,
      roleType: null,
      position: null,
      workPlace: null,
      signIn: null,
      signOff: null,
      description: null,
      isCurrent: false
    },
    resolver: yupResolver(schema)
  })
  const { selectedItem } = props

  const { user } = useAuth()
  const { refetch, setRefetch } = useProfileCompletion()
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [onLoading, setOnLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [selectedFile, setSelectedFile] = useState()

  const [category, setCategory] = useState<number | null>(null)
  const [roleType, setRoleType] = useState<RoleType[] | null>(null)
  const [positions, setPositions] = useState<VesselType[] | null>(null)
  const [locations, setLocation] = useState<any>()

  const time = new Date()
  const selectedRoleType = watch('roleType') === 0 ? undefined : watch('roleType')
  const isCurrent = watch('isCurrent')

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)

      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)

    HttpClient.postFile(AppConfig.baseUrl + `/user/experience/${selectedItem?.id}`, {
      role_type: data.roleType,
      position: data.position,
      institution: data.company,
      location: data.location,
      work_place: data.workPlace,
      start_date: data.signIn,
      end_date: isCurrent ? null : data.signOff,
      description: data.description,
      is_current: data.isCurrent,
      logo: selectedFile,
      still_here: 0
    })
      .then(
        async () => {
          props.onCloseClick()
          reset()
          setRefetch(!refetch)
          toast.success(` Work Experience submited successfully!`)
        },
        error => {
          toast.error('Failed to save work experience: ' + error.response.data.message)
          console.log(error)
        }
      )
      .finally(() => {
        setOnLoading(false)
        props.onStateChange()
      })
  }

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }
    setSelectedFile(e.target.files[0])
  }

  const firstLoad = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/job-category', {
      page: 1,
      take: 100,
      employee_type: 'onship'
    }).then(async response => {
      const data: JobCategory[] = await response.data.categories.data
      data?.forEach(cat => {
        if (cat.name == 'Cruise Hospitality') setCategory(cat.id)
      })
    })

    await HttpClient.get(AppConfig.baseUrl + '/public/data/country').then(async response => {
      const data = await response.data.countries
      setLocation(data)
    })

    if (user) {
      setValue('noExperience', user.no_experience)
    }
  }

  const getPositions = () => {
    if (getValues('roleType') !== null) {
      HttpClient.get(
        AppConfig.baseUrl + `/public/data/positions?page=1&take=1000&role_type_id=${getValues('roleType')}`
      ).then(async response => {
        const data = await response.data.positions.data
        setPositions(data)
      })
    }
  }

  const getRoleType = () => {
    if (category !== null) {
      HttpClient.get(
        AppConfig.baseUrl + `/public/data/role-type?page=1&take=1000&employee_type=onship&category_id=${category}`
      )
        .then(async response => {
          const data: RoleType[] = await response.data.roleTypes.data
          setRoleType(data)
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    firstLoad()
  }, [])

  useEffect(() => {
    getRoleType()
  }, [category])

  useEffect(() => {
    getPositions()
  }, [selectedRoleType])

  useEffect(() => {
    if (selectedItem) {
      setValue('company', selectedItem.institution)
      setValue('description', selectedItem.description)
      setValue('isCurrent', selectedItem.is_current)
      setValue('location', selectedItem.country_id)
      setValue('position', selectedItem.position)
      setValue('roleType', selectedItem.role_type_id)
      setValue('signIn', selectedItem.start_date)
      setValue('signOff', selectedItem.end_date)
      setValue('workPlace', selectedItem.work_place)
    }
  }, [selectedItem, positions, roleType])

  useEffect(() => {
    if (selectedItem) {
      setValue('company', selectedItem.institution)
      setValue('description', selectedItem.description)
      setValue('isCurrent', selectedItem.is_current)
      setValue('location', selectedItem.country_id)
      setValue('position', selectedItem.position)
      setValue('roleType', selectedItem.role_type_id)
      setValue('signIn', selectedItem.start_date)
      setValue('signOff', selectedItem.end_date)
      setValue('workPlace', selectedItem.work_place)
    }
  }, [])

  const renderForm = () => {
    return (
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {/* header */}
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  Edit Work Experience
                </Typography>
              </Box>
              <IconButton
                size='small'
                onClick={() => {
                  props.onCloseClick()
                  reset()
                }}
              >
                <Icon icon='mdi:close' fontSize={'16px'} />
              </IconButton>
            </Box>
          )}

          <Grid container spacing={6} py={'24px'}>
            {/* work place */}
            <Grid item md={6} xs={12}>
              <FormControl fullWidth error={!!errors.workPlace}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Hotel / Restaurant / Cruise Line Name <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='workPlace'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder='Enter Hotel / Restaurant / Cruise Line Name....'
                      error={!!errors.workPlace}
                      helperText={errors.workPlace?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* commmpany name */}
            <Grid item md={6} xs={12}>
              <FormControl fullWidth error={!!errors.company}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Company Name <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='company'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder='Enter Company Name...'
                      error={!!errors.company}
                      helperText={errors.company?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* role type */}
            <Grid item md={6} xs={12}>
              <FormControl fullWidth error={!!errors.roleType}>
                <Typography sx={{ mb: '6px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Role Type <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='roleType'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} value={field.value || 0}>
                      <MenuItem value={0} disabled>
                        Select Role Type
                      </MenuItem>
                      {roleType &&
                        roleType.map(item => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* position / job title */}
            <Grid item md={6} xs={12}>
              <FormControl fullWidth error={!!errors.position}>
                <Typography sx={{ mb: '6px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Job Title <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='position'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} value={field.value || 0}>
                      <MenuItem value={0} disabled>
                        Select Job Title
                      </MenuItem>
                      {positions &&
                        positions.map((item: any) => (
                          <MenuItem key={item.id} value={item.position}>
                            {item.position}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* is current */}
            <Grid item md={12} xs={12}>
              <FormControl fullWidth error={!!errors.isCurrent}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                  <Controller
                    name='isCurrent'
                    control={control}
                    render={({ field }) => <Checkbox {...field} defaultChecked={!!field.value} />}
                  />
                  <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                    I'm currently working in this company
                  </Typography>
                </Box>
              </FormControl>
            </Grid>

            {/* start date */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.signIn}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Start Date <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='signIn'
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        {...field}
                        format='DD/MM/YYYY'
                        openTo='year'
                        views={['year', 'month', 'day']}
                        maxDate={moment(time)}
                        value={moment(field.value)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.signIn,
                            helperText: errors.signIn?.message
                          }
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </FormControl>
            </Grid>

            {/* end date */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.signOff}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  End Date <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='signOff'
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        disabled={isCurrent ? true : false}
                        {...field}
                        format='DD/MM/YYYY'
                        openTo='year'
                        views={['year', 'month', 'day']}
                        value={moment(field.value)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.signOff,
                            helperText: errors.signOff?.message
                          }
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </FormControl>
            </Grid>

            {/* location */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.location}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Location <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='location'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} value={field.value || 0}>
                      <MenuItem value={0} disabled>
                        Location
                      </MenuItem>
                      {locations &&
                        locations.map((item: any) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* description */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.description}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Description <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder='Description'
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid container item xs={12} md={12}>
                <Grid item xs={2} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <label htmlFor='input-logo-desktop'>
                    {preview ? (
                      <img
                        alt='logo'
                        src={preview}
                        style={{
                          maxWidth: '100%',
                          width: isMobile ? '60px' : '100px',
                          height: isMobile ? '60px' : '100px',
                          padding: 0,
                          margin: 0
                        }}
                      />
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: isMobile ? '60px' : '100px',
                            height: isMobile ? '60px' : '100px',
                            borderRadius: '6px',
                            background: '#DADADA'
                          }}
                        >
                          <Icon icon='iconoir:camera' fontSize={'26px'} />
                        </Box>
                      </>
                    )}
                  </label>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='input-logo-desktop'
                    onChange={onSelectFile}
                    type='file'
                  ></input>
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={10}
                  sx={{ display: 'flex', flexDirection: 'column', gap: '3px', justifyContent: 'center' }}
                >
                  <Typography fontSize={12} fontWeight={700} color={'#404040'}>
                    Click Image to change Institution Logo
                  </Typography>
                  <Typography fontSize={12} fontWeight={400} color={'#404040'}>
                    Allowed JPG, GIF or PNG
                  </Typography>
                  <Typography fontSize={12} fontWeight={400} color={'#F22'}>
                    Max size of 800k
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' type='submit' style={{ textTransform: 'capitalize', width: '109px' }}>
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Save'}
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
          open={props?.visible}
          onClose={() => {
            props.onCloseClick()
            reset()
            reset()
          }}
          onOpen={() => {
            props.onCloseClick()
            reset()
            reset()
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography fontSize={16} fontWeight={700} color={'#32497A'}>
                Add Travel Document
              </Typography>
              <IconButton
                size='small'
                sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                onClick={() => {
                  props.onCloseClick()
                  reset()
                  reset()
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
    <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      {renderForm()}
    </Dialog>
  )
}

export default DialogEditExperience
