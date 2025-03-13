import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { AppConfig } from 'src/configs/api'

type FormData = {
  isCrewing: number
}

const schema = yup.object().shape({
  isCrewing: yup.number().required()
})

const CompanyCrewing = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      isCrewing: 0
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()
  const [onLoading, setOnLoading] = useState(false)

  const firstLoad = async () => {
    if (user) {
      setValue('isCrewing', user.is_crewing)
    }
  }

  useEffect(() => {
    firstLoad()
  }, [])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)

    HttpClient.patch(AppConfig.baseUrl + '/onboarding/isCrewing', {
      is_crewing: data.isCrewing,
      next_step: 'step-four'
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormControl fullWidth error={!!errors.isCrewing}>
          <Controller
            name='isCrewing'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ display: 'flex', gap: '6px' }}>
                <Box
                  onClick={() => onChange(1)}
                  sx={{
                    p: '10px 24px',
                    border: value === 1 ? '1px solid #0B58A6' : '1px solid #DBDBDB',
                    backgroundColor: value === 1 ? '#F2F8FE' : 'transparent',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  <Typography sx={{ color: value === 1 ? '#0B58A6' : '#BFBFBF', fontSize: 14, fontWeight: 400 }}>
                    Ya
                  </Typography>
                </Box>
                <Box
                  onClick={() => onChange(0)}
                  sx={{
                    p: '10px 24px',
                    border: value === 0 ? '1px solid #0B58A6' : '1px solid #DBDBDB',
                    backgroundColor: value === 0 ? '#F2F8FE' : 'transparent',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  <Typography sx={{ color: value === 0 ? '#0B58A6' : '#BFBFBF', fontSize: 14, fontWeight: 400 }}>
                    Tidak
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </FormControl>
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
      </Box>
    </form>
  )
}

export default CompanyCrewing
