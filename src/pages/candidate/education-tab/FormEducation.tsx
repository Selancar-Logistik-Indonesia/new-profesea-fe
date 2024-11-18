import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Box,
  useMediaQuery,
  Typography,
  Button,
  CircularProgress
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Degree from 'src/contract/models/degree'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { Icon } from '@iconify/react'
import { useTheme } from '@mui/material/styles'
import Institution from 'src/contract/models/institution'
import debounce from 'src/utils/debounce'
import { HttpClient } from 'src/services'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { AppConfig } from 'src/configs/api'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'

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

interface IFormEducation {
  onClose: VoidFunction
  getUserEducation: VoidFunction
}

const FormEducation: React.FC<IFormEducation> = ({ onClose, getUserEducation }) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onBlur'
  })
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [isCurrentEducation, setIsCurrentEducation] = useState<boolean>(false)
  const [selectedFileLogo, setSelectedFileLogo] = useState<File>()
  const [previewLogo, setPreviewLogo] = useState()
  const [onLoading, setOnLoading] = useState(false)
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [loadingGetInstitutions, setLoadingGetInstitutions] = useState(false)
  const [educationsOptions, setEducationOptions] = useState([])
  const [userEduId, setUserEduId] = useState('')

  const handleSearchInstitutions = useCallback(
    debounce((value: string) => {
      getInstitutions(value)
    }, 500),
    []
  )

  const getInstitutions = async (search = '') => {
    const response = await HttpClient.get(`institutions?page=1&take=12&search=${search}`)

    if (response.status != 200) {
      throw response.data.message ?? 'Something went wrong!'
    }
    setLoadingGetInstitutions(false)
    setInstitutions(response.data.institutions)
  }

  const onSubmit = async (data: FormData) => {
    console.log(data)
    setOnLoading(true)
    const { major, title } = data
    const json = {
      title: title,
      major: major,
      degree: userEduId,
      logo: selectedFileLogo,
      still_here: isCurrentEducation ? 1 : 0,
      start_date: moment(startDate).format('YYYY-MM-DD') || null,
      end_date: !isCurrentEducation && endDate ? moment(endDate).format('YYYY-MM-DD') : null,
      is_current: isCurrentEducation
    }

    try {
      await HttpClient.postFile('/user/education', json)

      onClose()
      getUserEducation()
      toast.success(` Education submited successfully!`)
    } catch (error) {
      alert(`Opps ${getCleanErrorMessage(error)}`)
    }

    setOnLoading(false)
  }

  const onSelectFile = (e: any) => {
    console.log(e)
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileLogo(undefined)

      return
    }

    // I've kept this example simple by using the first image instead of multiple
    console.log(e.target.files[0])
    setSelectedFileLogo(e.target.files[0])
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
    setEducationOptions(data)
  }

  useEffect(() => {
    combobox()
  }, [])

  useEffect(() => {
    if (!selectedFileLogo) {
      setPreviewLogo(undefined)
      return
    }

    const objectUrl: any = URL.createObjectURL(selectedFileLogo)
    setPreviewLogo(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFileLogo])
  return (
    <>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
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
              id='combo-box-institution'
              freeSolo
              options={institutions.map(e => e.institution_name)}
              loading={loadingGetInstitutions}
              renderInput={params => (
                <TextField
                  {...register('title')}
                  {...params}
                  variant='outlined'
                  onChange={e => {
                    setLoadingGetInstitutions(true)
                    handleSearchInstitutions(e?.target?.value)
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
              options={educationsOptions}
              {...register('degree')}
              getOptionLabel={(option: Degree) => option.name}
              renderInput={params => <TextField {...params} variant='outlined' />}
              onChange={(event: any, newValue: Degree | null) =>
                newValue?.name ? setUserEduId(newValue.name) : setUserEduId('')
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
                onChange={(date: any) => setStartDate(date)}
                value={startDate ? moment(startDate) : null}
                slotProps={{
                  textField: { variant: 'outlined', fullWidth: true, id: 'input-startdate', ...register('startdate') }
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
                onChange={(date: any) => setEndDate(date)}
                value={!isCurrentEducation && endDate}
                slotProps={{
                  textField: { variant: 'outlined', fullWidth: true, id: 'input-enddate', ...register('enddate') }
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
            <Grid container item xs={12} md={12} justifyContent={'left'} spacing={4}>
              <Grid item xs={2} md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <label htmlFor='input-logo-mobile'>
                  {previewLogo ? (
                    <img
                      alt='logo'
                      src={previewLogo}
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
                  id='input-logo-mobile'
                  onChange={onSelectFile}
                  type='file'
                ></input>
              </Grid>
              <Grid
                item
                xs={10}
                md={11}
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
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant='contained'
                  type='submit'
                  sx={{ textTransform: 'capitalize', width: '120px !important' }}
                >
                  {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Save'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default FormEducation
