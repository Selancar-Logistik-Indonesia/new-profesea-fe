import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { AppConfig } from 'src/configs/api'

type FormData = {
  openToWork: number
  availableDate: string
}

const schema = yup.object().shape({
  openToWork: yup.number().required(),
  availableDate: yup.string().optional()
})

const StatusAvailability = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      openToWork: 0,
      availableDate: ''
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()

  const isOpen = watch('openToWork') === 1
  const time = new Date()
  const [onLoading, setOnLoading] = useState(false)

  const firstLoad = async () => {
    if (user && user.field_preference) {
      setValue('openToWork', user.field_preference.open_to_opp)
      setValue('availableDate', user.field_preference.available_date)
    }
  }

  useEffect(() => {
    if (isOpen === false) {
      setValue('availableDate', '')
    }
  }, [isOpen])

  useEffect(() => {
    firstLoad()
  }, [])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/availability', {
      open_to_work: data.openToWork,
      available_date: data.availableDate,
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
            Beritahu kami kapan Anda siap bekerja
          </Typography>
          <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
            Pilih waktu kapan Anda bersedia untuk bekerja, agar kami dapat menyesuaikan rekomendasi pekerjaan dan
            peluang jaringan yang tepat bagi Anda.
          </Typography>
        </Box>
        <FormControl fullWidth error={!!errors.openToWork}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Status <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='openToWork'
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
                    Siap Bekerja
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
                    Belum Siap
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </FormControl>
        {isOpen && user?.employee_type === 'onship' && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
                Atur Tanggal Berlayar Anda
              </Typography>
              <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
                Beri tahu kami kapan Anda siap untuk memulai pelayaran berikutnya.
              </Typography>
            </Box>
            <FormControl fullWidth error={!!errors.availableDate}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Tanggal Tersedia
              </Typography>
              <Controller
                name='availableDate'
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      {...field}
                      format='DD/MM/YYYY'
                      openTo='year'
                      views={['year', 'month', 'day']}
                      minDate={moment(time)}
                      value={moment(field.value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.availableDate,
                          helperText: errors.availableDate?.message
                        }
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
          </>
        )}
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

export default StatusAvailability
