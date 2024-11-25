import { Ref, forwardRef, ReactElement, useState, useEffect, useCallback } from 'react'
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
import { CircularProgress, FormControlLabel, Checkbox, useMediaQuery, InputLabel } from '@mui/material'
import { Autocomplete } from '@mui/material'

import Degree from 'src/contract/models/degree'
import Institution from 'src/contract/models/institution'
import debounce from 'src/utils/debounce'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { AppConfig } from 'src/configs/api'

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTheme } from '@mui/material/styles'

import moment from 'moment'

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
  getUserEducation: VoidFunction
}

type FormData = {
  title: string
  titletext: string
  major: string
  degree: string
  start_date: string
  end_date: string
  institution: string
  startdate: string
  enddate: string
  is_current: boolean
}

const DialogAddEducation = (props: DialogProps) => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [onLoading, setOnLoading] = useState<'form' | 'institution' | ''>('')
  const [dateAwal, setDateAwal] = useState<any>(null)
  const [dateAkhir, setDateAkhir] = useState<any>(null)
  const [isCurrentEducation, setIsCurrentEducation] = useState<any>(false)
  const [preview, setPreview] = useState()
  const [Education, setEducation] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState()
  const [EduId, setEduId] = useState('')
  const [institutions, setInstitutions] = useState<Institution[]>([])

  const handleSearchInstitutions = useCallback(
    debounce((value: string) => {
      getInstitutions(value)
    }, 500),
    []
  )

  const getInstitutions = async (search = '') => {
    const res4 = await HttpClient.get(`institutions?page=1&take=12&search=${search}`)
    setOnLoading('')

    if (res4.status != 200) {
      throw res4.data.message ?? 'Something went wrong!'
    }

    setInstitutions(res4.data.institutions)
  }

  const combobox = async () => {
    let response
    let data

    response = await HttpClient.get(`/public/data/degree`)
    if (response.status !== 200) {
      throw new Error(response.data.message ?? 'Something went wrong!')
    }
    data = response.data.degrees.map((item: any) => ({
      name: item.name
    }))

    if (user.employee_type === 'onship') {
      response = await HttpClient.get(AppConfig.baseUrl + '/licensi/all/')
      if (response.status !== 200) {
        throw new Error(response.data.message ?? 'Something went wrong!')
      }
      data = data.concat(
        response.data.licensiescoc.map((item: any) => ({
          name: item.title
        }))
      )
    }
    setEducation(data)
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

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: FormData) => {
    const { major, title } = data
    const json = {
      title: title,
      major: major,
      degree: EduId,
      logo: selectedFile,
      still_here: isCurrentEducation ? 1 : 0,
      start_date: moment(dateAwal).format('YYYY-MM-DD') || null,
      end_date: !isCurrentEducation && dateAkhir ? moment(dateAkhir).format('YYYY-MM-DD') : null,
      is_current: isCurrentEducation
    }

    setOnLoading('form')

    try {
      const resp = await HttpClient.postFile('/user/education', json)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      props.onCloseClick()
      props.getUserEducation()
      toast.success(` Education submited successfully!`)
    } catch (error) {
      // throw   'Something went wrong!';

      // alert(`Opps ${getCleanErrorMessage(error)}`)
      toast.error(`Opps ${getCleanErrorMessage(error)}`);
    }

    setOnLoading('')
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

  return (
    <Dialog fullWidth open={props.visible} maxWidth='md' scroll='body' TransitionComponent={Transition}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography color={'#32487A'} fontWeight='700' fontSize={18}>
                Add Educational Info
              </Typography>
            </Box>
            <IconButton size='small' onClick={props.onCloseClick}>
              <Icon icon='mdi:close' fontSize={'16px'} />
            </IconButton>
          </Box>

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
                Institution Name
              </InputLabel>
              <Autocomplete
                freeSolo
                id='combo-box-demo'
                options={institutions.map(e => e.institution_name)}
                loading={onLoading == 'institution'}
                renderInput={params => (
                  <TextField
                    {...register('title')}
                    {...params}
                    variant='outlined'
                    onChange={e => {
                      setOnLoading('institution')
                      handleSearchInstitutions(e.target.value)
                    }}
                  />
                )}
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
                Education
              </InputLabel>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={Education}
                {...register('degree')}
                getOptionLabel={(option: Degree) => option.name}
                renderInput={params => <TextField {...params} variant='outlined' />}
                onChange={(event: any, newValue: Degree | null) =>
                  newValue?.name ? setEduId(newValue.name) : setEduId('')
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
                Major
              </InputLabel>
              <TextField id='major' variant='outlined' fullWidth {...register('major')} />
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
                End Date
              </InputLabel>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  views={['month', 'year']}
                  onChange={(date: any) => setDateAkhir(date)}
                  value={!isCurrentEducation && dateAkhir ? moment(dateAkhir) : null}
                  slotProps={{
                    textField: { variant: 'outlined', fullWidth: true, id: 'basic-input', ...register('enddate') }
                  }}
                  disabled={isCurrentEducation}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    name='is_current_experience'
                    id='is_current_experience'
                    onClick={() => setIsCurrentEducation(!isCurrentEducation)}
                    value={isCurrentEducation}
                    checked={isCurrentEducation}
                  />
                }
                label="I'm currently studying"
              />
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
          <Button variant='contained' type='submit' sx={{ textTransform: 'capitalize', width: '120px !important' }}>
            {onLoading == 'form' ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogAddEducation
