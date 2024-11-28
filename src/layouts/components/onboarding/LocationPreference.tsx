import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import City from 'src/contract/models/city'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

type FormData = {
  city: number
}

const schema = yup.object().shape({
  city: yup.number().required()
})

const LocationPreference = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: { city: 0 },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()

  const [city, setCity] = useState<City[]>()
  const [onLoading, setOnLoading] = useState(false)

  const firstLoad = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/public/data/city?country_id=100').then(response => {
      const data = response.data.cities
      setCity(data)
    })

    if (user && user.field_preference && user.field_preference.city) {
      setValue('city', user.field_preference.city.id)
    }
  }

  useEffect(() => {
    firstLoad()
  }, [])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/preference-location', {
      city_id: data.city,
      next_step: 'step-five'
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

export default LocationPreference
