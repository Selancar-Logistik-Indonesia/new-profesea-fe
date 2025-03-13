// import { yupResolver } from '@hookform/resolvers/yup'
import {
  Grid,
  TextField,
  InputLabel,
  Autocomplete,
  Select,
  MenuItem,
  Typography,
  Button,
  useMediaQuery,
  CircularProgress
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import secureLocalStorage from 'react-secure-storage'
import { AppConfig } from 'src/configs/api'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { removeFirstZeroChar } from 'src/utils/helpers'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useTheme } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Industry from 'src/contract/models/industry'
import { useProfileCompletion } from 'src/hooks/useProfileCompletion'

type TFormPersonalData = {
  fullName: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string
  code: string
  website: string
  phone: string
  dateOfBirth: any
  address: string
  about: string
  usernamesosmed: string
  available: string
  facebook: string
  instagram: string
  linkedin: string
  gender: string
  noExperience: boolean
}

interface IPayloadPersonalDataSeafarer {
  country_id: string
  employee_type: string
  name: string
  gender: string
  address_country_id: string
  address_city_id: string
  address_address: string
  phone: string
  date_of_birth: any
  email: string
  about: string
}

const GENDER_OPTIONS = [
  {
    title: 'm',
    label: 'Male'
  },
  {
    title: 'f',
    label: 'Female'
  }
]

const FormPersonalData: React.FC = () => {
  const { refetch, setRefetch } = useProfileCompletion()

  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const userLocalStorage = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [user, setUser] = useState<IUser | null>(null)
  const [userFullname, setUserFullname] = useState('')
  const [gender, setGender] = useState<any>(null)

  const [userCountry, setUserCountry] = useState<any>(null)
  const [userCity, setUserCity] = useState<any>(null)
  const [userAddress, setUserAddress] = useState<any>('')
  const [userPhone, setUserPhone] = useState('')
  const [userPhoneCodeNumber, setUserPhoneCodeNumber] = useState<any>('')
  const [userDOB, setUserDOB] = useState<any>(null)
  const [userEmail, setUserEmail] = useState('')
  const [userAboutMe, setUserAboutMe] = useState('')
  const [userWebsite, setUserWebsite] = useState('')

  // all options
  const [countryOptions, setCountryOptions] = useState<any[]>([])
  const [codeOptions, setCodeOptions] = useState<any[]>([])
  const [cityOptions, setCityOptions] = useState<any[]>([])
  const [comboindustry, getComboIndustry] = useState<any>([])
  const [idindustry, setIndustry] = useState<any>()

  const { register, handleSubmit, setValue } = useForm<TFormPersonalData>({
    mode: 'onBlur'
  })

  function fetchUser() {
    HttpClient.get(AppConfig.baseUrl + '/user/' + userLocalStorage.id).then(response => {
      const resUser = response.data.user as IUser
      setUser(resUser)

      if (resUser?.address) {
        setUserCountry(resUser?.address?.country)
        setUserCity(resUser?.address?.city)
        handleSearchCity(resUser?.address?.country)
        setUserAddress(resUser?.address?.address)
      }

      setUserFullname(resUser?.name || '')
      setUserPhone(resUser?.phone || '')
      setUserPhoneCodeNumber(resUser?.country_id || '')
      setUserDOB(resUser?.date_of_birth ? new Date(resUser?.date_of_birth) : null)
      setUserEmail(resUser?.email || '')
      setUserAboutMe(resUser?.about || '')

      if (resUser?.role === 'Company') {
        setIndustry(resUser?.industry)
        setUserWebsite(resUser?.website as string)
      }

      if (resUser?.gender) {
        setGender(resUser?.gender == 'f' ? { title: 'f', label: 'Female' } : { title: 'm', label: 'Male' })
      }

      // set value for useForm
      setValue('fullName', resUser?.name || '')
      setValue('address', resUser?.address?.address || '')
      setValue('about', resUser?.about || '')
    })
  }

  const fetchOptions = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/country').then(response => {
      const code = response.data.countries
      setCountryOptions(code)
      setCodeOptions(code)
    })

    HttpClient.get(AppConfig.baseUrl + '/public/data/industry?search=').then(response => {
      const code = response.data.industries
      getComboIndustry(code)
    })
  }

  const handleSearchCity = async (country: any) => {
    setUserCountry(country)
    const response = await HttpClient.get('/public/data/city?search=&country_id=' + country?.id)

    if (response.status != 200) {
      throw response.data.message ?? 'Something went wrong!'
    }
    const cities = response.data.cities
    setCityOptions(cities)
  }

  const handleOnChangePhoneNumber = (input: string) => {
    setUserPhone(removeFirstZeroChar(input))
  }

  const handleOnChangeDateOfBirth = (input: any) => {
    setUserDOB(input)
  }

  const handleOnChangeGender = (value: any) => {
    setGender(value)
    setValue('gender', value ? value?.title : '')
  }

  const onSubmit = (data: TFormPersonalData) => {
    const { fullName, address, about, website } = data

    if (!fullName) {
      toast.error('Full name is required')

      return
    }

    if (!gender && user?.role !== 'Company') {
      toast.error('Gender is required')

      return
    }

    if (!userCountry) {
      toast.error('Country is required')

      return
    }

    if (!userCity) {
      toast.error('City is required')

      return
    }

    if (!address) {
      toast.error('Address is required')

      return
    }

    if (!userPhoneCodeNumber && !userPhone) {
      toast.error('Phone Number is required')

      return
    }

    if (user?.role !== 'Company' && !userDOB) {
      toast.error('Date Of Birth is required')

      return
    }

    if (!userEmail) {
      toast.error('Email is required')

      return
    }

    setLoadingSubmit(true)

    // const phoneCode = countryOptions.find(c => c?.id === userPhoneCodeNumber)?.phonecode

    let jsonDataCompany: any

    if (user?.role === 'Company') {
      // for company
      jsonDataCompany = {
        country_id: userCountry?.id,
        industry_id: idindustry?.id,
        name: fullName,
        phone: userPhone,
        website: website,
        about: about,
        address_country_id: userCountry?.id,
        address_city_id: userCity?.id,
        address_address: address,
        date_of_birth: null
        //team_id:props.datauser.team_id
      }
    }

    const jsonDataSeafarer: IPayloadPersonalDataSeafarer = {
      country_id: userCountry?.id,
      employee_type: user?.employee_type as string,
      name: fullName,
      gender: gender?.title,
      phone: userPhone,
      address_country_id: userCountry?.id,
      address_city_id: userCity?.id,
      address_address: userAddress,
      date_of_birth: moment(userDOB).format('YYYY-MM-DD'),
      email: userEmail,
      about: about
    }

    HttpClient.patch(
      AppConfig.baseUrl + '/user/update-profile',
      user?.role === 'Company' ? jsonDataCompany : jsonDataSeafarer
    ).then(
      response => {
        setRefetch(!refetch)
        setLoadingSubmit(false)
        toast.success(response?.data?.message)
      },
      error => {
        setLoadingSubmit(false)
        toast.error(' Failed Update Profile : ' + error.response.data.message)
      }
    )
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    fetchOptions()
  }, [])

  return (
    <>
      <form
        id='personal-data-form'
        className='personal-data-form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Grid container spacing={4}>
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
                {user?.role === 'Company' ? 'Company Name' : 'Full Name'}
              </InputLabel>
              <TextField
                id='fullName'
                required
                value={userFullname}
                defaultValue={userFullname}
                variant='outlined'
                fullWidth
                {...register('fullName')}
                onChange={e => setUserFullname(e.target.value)}
              />
            </Grid>

            {user?.role == 'Company' ? (
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
                  Industry
                </InputLabel>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={comboindustry}
                  value={idindustry}
                  getOptionLabel={(option: any) => option.name}
                  renderInput={params => <TextField {...params} variant='outlined' />}
                  onChange={(event: any, newValue: Industry | null) =>
                    newValue?.id ? setIndustry(newValue) : setIndustry(user?.industry)
                  }
                />
              </Grid>
            ) : (
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
                  Gender
                </InputLabel>
                <Autocomplete
                  disablePortal
                  id='gender-combo-box'
                  options={GENDER_OPTIONS}
                  isOptionEqualToValue={(option, value) => option?.title === value?.title}
                  value={gender}
                  getOptionLabel={options => options.label}
                  renderInput={params => (
                    <TextField {...params} required id='gender' variant='outlined' {...register('gender')} />
                  )}
                  onChange={(event, newValue) =>
                    newValue ? handleOnChangeGender(newValue) : handleOnChangeGender(null)
                  }
                />
              </Grid>
            )}
          </Grid>
          <Grid container spacing={4}>
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
                Country
              </InputLabel>
              <Autocomplete
                disablePortal
                id='country-combo-box'
                options={countryOptions}
                value={userCountry}
                getOptionLabel={(option: any) => option?.nicename}
                renderInput={params => (
                  <TextField {...params} required id='country' variant='outlined' {...register('country')} />
                )}
                onChange={(event, newValue) =>
                  newValue ? handleSearchCity(newValue) : handleSearchCity(user?.address?.country)
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
                City
              </InputLabel>
              <Autocomplete
                disablePortal
                id='city-combo-box'
                options={cityOptions}
                value={userCity}
                getOptionLabel={(option: any) => option?.city_name}
                renderInput={params => (
                  <TextField {...params} required id='city' variant='outlined' {...register('city')} />
                )}
                onChange={(event: any, newValue: any) =>
                  newValue ? setUserCity(newValue) : setUserCity(user?.address?.city)
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
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
                Address
              </InputLabel>
              <TextField
                id='address'
                required
                value={userAddress}
                defaultValue={userAddress}
                variant='outlined'
                fullWidth
                {...register('address')}
                onChange={e => setUserAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                required
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '6px',
                  '& .MuiFormLabel-asterisk': {
                    color: 'red'
                  }
                }}
              >
                Phone Number
              </InputLabel>
              <Typography sx={{ fontSize: '12px', fontStyle: 'italic', fontWeight: 400, color: '#666', mb: '6px' }}>
                Your phone number must be connected to WhatsApp so employers can reach you easily.
              </Typography>
              <Box sx={{ display: 'flex', gap: '12px' }}>
                <Select
                  size='small'
                  labelId='select-country-code'
                  id='select-country-code'
                  value={userPhoneCodeNumber}
                  onChange={e => setUserPhoneCodeNumber(e.target.value)}
                  variant='outlined'
                  sx={{ width: '72px' }}
                >
                  {codeOptions.map((item, index) => (
                    <MenuItem key={index} value={item?.id}>
                      +{item?.phonecode}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  id='phone'
                  required
                  value={userPhone}
                  variant='outlined'
                  fullWidth
                  {...register('phone')}
                  onChange={e => handleOnChangePhoneNumber(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            {user?.role === 'Company' ? (
              <Grid item xs={12} md={6}>
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
                  Website
                </InputLabel>
                <TextField
                  id='website'
                  value={userWebsite}
                  defaultValue={userWebsite}
                  variant='outlined'
                  fullWidth
                  {...register('website')}
                  onChange={e => setUserWebsite(e.target.value)}
                />
              </Grid>
            ) : (
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
                  Date Of Birth
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    format='DD/MM/YYYY'
                    openTo='month'
                    views={['year', 'month', 'day']}
                    onChange={(date: any) => handleOnChangeDateOfBirth(date)}
                    value={moment(userDOB)}
                    slotProps={{ textField: { variant: 'outlined', fullWidth: true, id: 'input-dob' } }}
                  />
                </LocalizationProvider>
              </Grid>
            )}

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
                Email
              </InputLabel>
              <TextField
                id='Email'
                required
                defaultValue={userEmail}
                value={userEmail}
                variant='outlined'
                fullWidth
                {...register('email')}
                onChange={e => setUserEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <InputLabel
                sx={{
                  fontFamily: 'Figtree',
                  fontSize: '12px',
                  fontWeight: 700,
                  mb: '12px'
                }}
              >
                {user?.role === 'Company' ? 'About Company' : 'About Me'}
              </InputLabel>
              <TextField
                id='about-me'
                fullWidth
                value={userAboutMe}
                defaultValue={userAboutMe}
                variant='outlined'
                multiline
                rows={4}
                {...register('about')}
                onChange={e => setUserAboutMe(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              form='personal-data-form'
              type='submit'
              variant='contained'
              sx={{
                width: isMobile ? '140px !important' : '212px !important',
                px: '16px',
                py: '8px',
                textTransform: 'capitalize',
                fontSize: '14px',
                fontWeight: 400
              }}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? <CircularProgress /> : ' Save Changes'}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}

export default FormPersonalData
