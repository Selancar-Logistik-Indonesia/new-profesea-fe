import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import position from 'src/contract/models/role_type'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import RoleType from 'src/contract/models/role_type'
import { toLinkCase } from 'src/utils/helpers'

type FormData = {
  noExperience: boolean
  position: string | null
  company: string | null
  isCurrent: boolean | null
  signIn: string
  signOff: string
  description: string | null
}

const schema = yup.object().shape({
  noExperience: yup.boolean().required(),
  position: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  company: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  isCurrent: yup.boolean().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  signIn: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  signOff: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.nullable(),
    otherwise: schema => schema.notRequired()
  }),
  description: yup.string().notRequired()
})

const ProfessionalExperience = ({ beforeLink }: { beforeLink: string }) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      noExperience: true,
      position: null,
      company: null,
      isCurrent: null,
      signIn: '',
      signOff: '',
      description: null
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()

  const [onLoading, setOnLoading] = useState(false)
  const [position, setPosition] = useState<position[] | null>(null)

  const time = new Date()
  const noExperience = watch('noExperience')
  const isCurrent = watch('isCurrent')

  const firstLoad = async () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/role-type?page=1&take=1000&employee_type=offship').then(
      async response => {
        const data: RoleType[] = await response.data.roleTypes.data
        setPosition(data)
      }
    )

    if (user) {
      setValue('noExperience', user.no_experience)
    }
  }

  useEffect(() => {
    firstLoad()
  }, [])

  useEffect(() => {
    if (noExperience === true) {
      setValue('position', null)
      setValue('company', null)
      setValue('isCurrent', null)
      setValue('signIn', '')
      setValue('signOff', '')
      setValue('description', null)
    }

    if (isCurrent === true) {
      setValue('signOff', '')
    }
  }, [noExperience, isCurrent])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.post(AppConfig.baseUrl + '/onboarding/experience-professional', {
      no_experience: data.noExperience,
      position: data.position,
      institution: data.company,
      is_current: data.isCurrent,
      start_date: data.signIn,
      end_date: data.signOff,
      description: data.description
    })
      .then(
        async () => {
          toast.success('Successfully save profile')
          await refreshSession()
          router.push(`/profile/${user?.id}/${toLinkCase(user?.username)}/?onboarding=completed`)
        },
        error => {
          toast.error('Failed to save profile: ' + error.response.data.message)
        }
      )
      .finally(() => setOnLoading(false))
  }

  const onSkip = () => {
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/complete').then(async response => {
      await toast.success(response.data.message)
      router.push(`/profile/${user?.id}/${toLinkCase(user?.username)}/?onboarding=completed`)
    })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormControl error={!!errors.noExperience}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Pengalaman <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='noExperience'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Box sx={{ display: 'flex', gap: '6px' }}>
                <Box
                  onClick={() => onChange(false)}
                  sx={{
                    p: '10px 24px',
                    border: value ? '1px solid #DBDBDB' : '1px solid #0B58A6',
                    backgroundColor: value ? 'transparent' : '#F2F8FE',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  <Typography sx={{ color: value ? '#BFBFBF' : '#0B58A6', fontSize: 14, fontWeight: 400 }}>
                    Ya, saya memiliki pengalaman bekerja
                  </Typography>
                </Box>
                <Box
                  onClick={() => onChange(true)}
                  sx={{
                    p: '10px 24px',
                    border: value ? '1px solid #0B58A6' : '1px solid #DBDBDB',
                    backgroundColor: value ? '#F2F8FE' : 'transparent',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  <Typography sx={{ color: value ? '#0B58A6' : '#BFBFBF', fontSize: 14, fontWeight: 400 }}>
                    Tidak, saya belum memiliki pengalaman bekerja
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </FormControl>
        {!noExperience && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormControl fullWidth error={!!errors.position}>
              <Typography sx={{ mb: '6px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Jabatan <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='position'
                control={control}
                render={({ field }) => (
                  <Select {...field} value={field.value || 0}>
                    <MenuItem value={0} disabled>
                      Pilih Jabatan
                    </MenuItem>
                    {position &&
                      position.map(item => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.company}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Perusahaan <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='company'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder='Masukan nama perusahaan anda'
                    error={!!errors.company}
                    helperText={errors.company?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.isCurrent}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Controller name='isCurrent' control={control} render={({ field }) => <Checkbox {...field} />} />
                <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                  Saya saat ini bekerja di perusahaan ini
                </Typography>
              </Box>
            </FormControl>
            <FormControl fullWidth error={!!errors.signIn}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Tanggal Mulai <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='signIn'
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      {...field}
                      format='DD/MM/YYYY'
                      openTo='year'
                      views={['year', 'month', 'day']}
                      maxDate={moment(time)}
                      value={moment(field.value)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.signIn,
                          helperText: errors.signIn?.message
                        }
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </FormControl>
            {!isCurrent && (
              <FormControl fullWidth error={!!errors.signOff}>
                <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                  Tanggal Berhenti <span style={{ color: '#F22' }}>*</span>
                </Typography>
                <Controller
                  name='signOff'
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        {...field}
                        format='DD/MM/YYYY'
                        openTo='year'
                        views={['year', 'month', 'day']}
                        value={moment(field.value)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.signOff,
                            helperText: errors.signOff?.message
                          }
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth error={!!errors.description}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>Deskripsi</Typography>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    maxRows={3}
                    placeholder='Tulis deskirpsi pekerjaan anda...'
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    sx={{ flexGrow: 1 }}
                  />
                )}
              />
            </FormControl>
          </Box>
        )}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => onSkip()}>
            <Typography
              sx={{ color: '#999999', fontSize: 14, fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
            >
              Skip
            </Typography>
          </Box>
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

export default ProfessionalExperience
