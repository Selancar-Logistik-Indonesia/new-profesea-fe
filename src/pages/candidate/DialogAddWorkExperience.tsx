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
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import { getCleanErrorMessage } from 'src/utils/helpers'
import {
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  InputLabel,
  SwipeableDrawer
} from '@mui/material'

import { AppConfig } from 'src/configs/api'
import VesselType from 'src/contract/models/vessel_type'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTheme } from '@mui/material/styles'

import moment from 'moment'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  visible: boolean
  onCloseClick: VoidFunction
  onStateChange: VoidFunction
  getUserExperience: VoidFunction
}

type FormData = {
  major: string
  degree: string
  start_date: string
  end_date: string
  institution: string
  short_description: string
  startdate: string
  enddate: string
  position: string
  is_current: boolean
}

const DialogAddWorkExperience = (props: DialogProps) => {
  const { refetch, setRefetch } = useProfileCompletion()
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [onLoading, setOnLoading] = useState(false)
  const [dateAwal, setDateAwal] = useState<any>(null)
  const [dateAkhir, setDateAkhir] = useState<any>(null)
  const [isCurrentExperience, setIsCurrentExperience] = useState(false)
  const [preview, setPreview] = useState()
  const [selectedFile, setSelectedFile] = useState()
  const [comboVessel, getComborVessel] = useState<any>([])
  const [idcomboVessel, setComboVessel] = useState<any>()
  const combobox = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/vessel-type?page=1&take=25&search').then(response => {
      const code = response.data.vesselTypes.data
      getComborVessel(code)
    })
  }
  useEffect(() => {
    combobox()
  }, [])
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)

      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // const schema = yup.object().shape({
  //     user_id: yup.string().required()
  // })

  const {
    register,
    // formState: { errors },
    handleSubmit,
    reset
  } = useForm<FormData>({
    mode: 'onBlur'
    // resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const { institution, major, position, short_description } = data

    const json = {
      institution: institution,
      major: major,
      position: position,
      still_here: 0,
      vessel: idcomboVessel,
      logo: selectedFile,
      start_date: moment(dateAwal).format('YYYY-MM-DD'),
      end_date: !isCurrentExperience && dateAkhir ? moment(dateAkhir).format('YYYY-MM-DD') : null,
      is_current: isCurrentExperience,
      description: short_description
    }
    setOnLoading(true)

    try {
      const resp = await HttpClient.postFile('/user/experience', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      props.onCloseClick()
      props.getUserExperience()
      reset()
      setDateAwal(null)
      setDateAkhir(null)
      setIsCurrentExperience(false)
      setRefetch(!refetch)
      toast.success(` Work Experience submited successfully!`)
    } catch (error) {
      alert(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false)
    props.onStateChange()
  }
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const renderForm = () => {
    return (
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                  Add Work Experience
                </Typography>
              </Box>
              <IconButton
                size='small'
                onClick={() => {
                  props.onCloseClick()
                  reset()
                  setDateAwal(null)
                  setDateAkhir(null)
                  setIsCurrentExperience(false)
                }}
              >
                <Icon icon='mdi:close' fontSize={'16px'} />
              </IconButton>
            </Box>
          )}

          <Grid container spacing={6} py={'24px'}>
            <Grid item md={6} xs={12}>
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
                Company Name
              </InputLabel>
              <TextField id='institution' variant='outlined' fullWidth {...register('institution')} />
            </Grid>
            <Grid item md={6} xs={12}>
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
                Position
              </InputLabel>
              <TextField id='Position' label='Position *' variant='outlined' fullWidth {...register('position')} />
            </Grid>
            <Grid item md={6} xs={12}>
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
                Start Date
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  views={['month', 'year']}
                  onChange={(date: any) => setDateAwal(date)}
                  value={dateAwal ? moment(dateAwal) : null}
                  slotProps={{
                    textField: { variant: 'outlined', fullWidth: true, id: 'basic-input', ...register('startdate') }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={6} xs={12}>
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
                End Date
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disabled={isCurrentExperience}
                  views={['month', 'year']}
                  onChange={(date: any) => setDateAkhir(date)}
                  value={dateAkhir ? moment(dateAkhir) : null}
                  slotProps={{
                    textField: { variant: 'outlined', fullWidth: true, id: 'basic-input', ...register('enddate') }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
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
                Description
              </InputLabel>
              <TextField
                id='short_description'
                variant='outlined'
                multiline
                maxRows={4}
                fullWidth
                {...register('short_description')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    name='is_current_experience'
                    id='is_current_experience'
                    onClick={() => setIsCurrentExperience(!isCurrentExperience)}
                    value={isCurrentExperience}
                    checked={isCurrentExperience}
                  />
                }
                label="I'm currently working in this company"
              />
            </Grid>
            {user.employee_type == 'onship' && (
              <Grid item md={12} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={comboVessel}
                  getOptionLabel={(option: any) => option.name}
                  // defaultValue={props.datauser?.field_preference?.vessel_type}
                  renderInput={params => <TextField {...params} label='Type of Vessel' variant='standard' />}
                  onChange={(event: any, newValue: VesselType | null) =>
                    newValue?.id ? setComboVessel(newValue.id) : setComboVessel(0)
                  }
                />
              </Grid>
            )}

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

            {/* <Grid item md={12} xs={12}>
              <Grid item xs={12} md={8} container justifyContent={'left'}>
                <Grid xs={6}>
                  <label htmlFor='x'>
                    <img
                      alt='logo'
                      src={preview ? preview : '/images/avatar.png'}
                      style={{
                        maxWidth: '100%',
                        height: '120px',
                        padding: 0,
                        margin: 0
                      }}
                    />
                  </label>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='x'
                    onChange={onSelectFile}
                    type='file'
                  ></input>
                </Grid>
                <Grid xs={6}>
                  <Box sx={{ marginTop: '20px', marginLeft: '5px' }}>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      <strong>Click Image to change Company Logo.</strong>
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Allowed JPG, GIF or PNG.
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left', color: '#262525', fontSize: '10px' }}>
                      Max size of 800K. Aspect Ratio 1:1
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid> */}
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
            setDateAwal(null)
            setDateAkhir(null)
            setIsCurrentExperience(false)
            reset()
          }}
          onOpen={() => {
            props.onCloseClick()
            reset()
            setDateAwal(null)
            setDateAkhir(null)
            setIsCurrentExperience(false)
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
                  setDateAwal(null)
                  setDateAkhir(null)
                  setIsCurrentExperience(false)
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

export default DialogAddWorkExperience
