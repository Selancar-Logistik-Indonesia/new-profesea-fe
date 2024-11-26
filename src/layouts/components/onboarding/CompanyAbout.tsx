import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

type FormData = {
  website: string
  about: string
}

const schema = yup.object().shape({
  website: yup.string().notRequired(),
  about: yup.string().notRequired()
})

const CompanyAbout = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      website: '',
      about: ''
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()
  const [onLoading, setOnLoading] = useState(false)

  const firstLoad = async () => {
    if (user) {
      setValue('website', user.website ?? '')
      setValue('about', user.about ?? '')
    }
  }

  useEffect(() => {
    firstLoad()
  }, [refreshSession])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/company-about', {
      website: data.website,
      about: data.about,
      next_step: 'step-three'
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
        <FormControl fullWidth error={!!errors.website}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Situs Web <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='website'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder='Masukkan Situs Web perusahaan Anda'
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.about}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Tentang Perusahaan
          </Typography>
          <Controller
            name='about'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                maxRows={3}
                placeholder='Tulis sesuatu tentang perusahaan Anda....'
                error={!!errors.about}
                helperText={errors.about?.message}
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

export default CompanyAbout
