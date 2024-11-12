import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import debounce from 'src/utils/debounce'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import Countries from 'src/contract/models/country'
import { toast } from 'react-hot-toast'
import Industry from 'src/contract/models/industry'

type FormData = {
  companyName: string
  username: string
  industry: number
  phone: string
  country: number
}

const schema = yup.object().shape({
  companyName: yup.string().required(),
  username: yup.string().required(),
  industry: yup.number().required().moreThan(0, 'Please select a valid industry category'),
  phone: yup.string().required(),
  country: yup.number().required().moreThan(0, 'Please select a valid country code')
})

const EmployerBasicInformationOne = ({ nextLink }: { nextLink: string }) => {
  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      companyName: '',
      username: '',
      industry: 0,
      phone: '',
      country: 0
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()
  const [country, setCountry] = useState<Countries[] | null>(null)

  const username = watch('username')
  const [onLoadingCheck, setOnLoadingCheck] = useState(false)
  const [onLoading, setOnLoading] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [industry, setIndustry] = useState<Industry[] | null>(null)

  const firstLoad = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const data = response.data.countries
      setCountry(data)
    })
    await HttpClient.get(AppConfig.baseUrl + '/public/data/industry?search=').then(response => {
      const data = response.data.industries
      setIndustry(data)
    })

    if (user) {
      setValue('companyName', user.name)
      setValue('username', user.username)
      setValue('industry', user.industry_id ?? 0)
      setValue('phone', user.phone)
      setValue('country', user.country_id)
    }
  }

  useEffect(() => {
    firstLoad()
  }, [user])

  const usernameCheck = useCallback(
    debounce(username => {
      setOnLoadingCheck(true)
      HttpClient.get(AppConfig.baseUrl + '/user-management/check-username/?username=' + username)
        .then(response => {
          const available = response.data.available
          if (available) {
            setUsernameAvailable(true)
            clearErrors('username')
          } else {
            setUsernameAvailable(false)
            setError('username', {
              type: 'manual',
              message: 'Username is already taken'
            })
          }
        })
        .finally(() => setOnLoadingCheck(false))
    }, 500),
    []
  )

  useEffect(() => {
    if (username && username !== '') {
      usernameCheck(username)
    }
  }, [username])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/user-data', {
      name: data.companyName,
      username: data.username,
      industry_id: data.industry,
      country_id: data.country,
      phone: data.phone,
      next_step: 'step-one/2'
    })
      .then(
        async () => {
          toast.success('Successfully save profile')
          await refreshSession()
          router.push(nextLink)
        },
        error => {
          toast.error('Failed to save profile: ' + error.response.data.message)
        }
      )
      .finally(() => setOnLoading(false))
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormControl fullWidth error={!!errors.companyName}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Company Name <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='companyName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Enter your company's name"
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.username}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            User Name <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder='Enter your username'
                error={!!errors.username}
                helperText={
                  usernameAvailable && !onLoadingCheck ? (
                    <span style={{ color: 'green' }}>Username is available</span>
                  ) : (
                    errors.username?.message
                  )
                }
                InputProps={{
                  endAdornment: onLoadingCheck ? (
                    <CircularProgress size={20} />
                  ) : usernameAvailable === true ? (
                    <Icon icon='fluent:presence-available-20-regular' color='green' fontSize={20} />
                  ) : null
                }}
              />
            )}
          />
        </FormControl>
        <FormControl error={!!errors.industry}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Industry Category <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='industry'
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value || 0}>
                <MenuItem value={0} disabled>
                  Choose Indusrty Category
                </MenuItem>
                {industry &&
                  industry.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ mb: '2px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Phone Number <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Typography sx={{ mb: '6px', color: '#666666', fontSize: 12, fontWeight: 400, fontStyle: 'italic' }}>
            Your phone number must be connected to WhatsApp so our team can reach you easily.
          </Typography>
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <FormControl error={!!errors.country}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <Select {...field} value={field.value || 0}>
                    <MenuItem value={0} disabled>
                      Country
                    </MenuItem>
                    {country &&
                      country.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.iso} (+{item.phonecode})
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.phone}>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder='Enter your phone number'
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={{ flexGrow: 1 }}
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: '32px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type='submit'
          variant='contained'
          sx={{
            width: '120px',
            boxShadow: 0,
            color: '#FFF',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#BFBFBF' }
          }}
        >
          {onLoading ? <CircularProgress size={14} /> : 'Continue'}
        </Button>
      </Box>
    </form>
  )
}

export default EmployerBasicInformationOne
