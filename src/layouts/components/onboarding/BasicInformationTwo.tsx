import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import Countries from 'src/contract/models/country'
import City from 'src/contract/models/city'
import { toast } from 'react-hot-toast'

type FormData = {
  country: number
  city: number
  address: string
}

const schema = yup.object().shape({
  country: yup.number().required(),
  city: yup.number().required().moreThan(0, 'Please select a valid city'),
  address: yup.string().required()
})

const BasicInformationTwo = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      country: 100,
      city: 0,
      address: ''
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()
  //   const [country, setCountry] = useState<Countries[] | null>(null)
  const [city, setCity] = useState<City[] | null>(null)

  const [onLoading, setOnLoading] = useState(false)

  const firstLoad = async () => {
    // await HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
    //   const data = response.data.countries
    //   setCountry(data)
    // })
    await HttpClient.get(AppConfig.baseUrl + '/public/data/city?country_id=100').then(response => {
      const data = response.data.cities
      setCity(data)
    })

    if (user && user.address) {
      //   setValue('country', user.address.country_id)
      setValue('city', user.address.city_id)
      setValue('address', user.address.address)
    }
  }

  useEffect(() => {
    firstLoad()
  }, [refreshSession])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/address', {
      country_id: data.country,
      city_id: data.city,
      address: data.address,
      next_step: 'step-two'
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
        <FormControl error={!!errors.country}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Negara <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              <Select {...field} value={100} disabled>
                <MenuItem value={100}>Indonesia</MenuItem>
                {/* {country &&
                  country.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.nicename}
                    </MenuItem>
                  ))} */}
              </Select>
            )}
          />
        </FormControl>
        <FormControl error={!!errors.city}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Kota <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value || 0}>
                <MenuItem value={0} disabled>
                  Pilih Kota
                </MenuItem>
                {city &&
                  city.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.city_name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.address}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Alamat <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                maxRows={3}
                placeholder='Masukan alamat lengkap anda'
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={{ flexGrow: 1 }}
              />
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ my: '32px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          component={Link}
          href={beforeLink}
          variant='outlined'
          sx={{
            width: '120px',
            boxShadow: 0,
            color: '#32497A',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#BFBFBF' }
          }}
        >
          Back
        </Button>
        <Button
          type='submit'
          variant='contained'
          disabled={onLoading}
          sx={{
            width: '120px',
            boxShadow: 0,
            color: '#FFF',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#BFBFBF' }
          }}
        >
          {onLoading ? <CircularProgress size={22} /> : 'Continue'}
        </Button>
      </Box>
    </form>
  )
}

export default BasicInformationTwo
