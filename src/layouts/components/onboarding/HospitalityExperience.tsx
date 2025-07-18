import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
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
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'
import { toast } from 'react-hot-toast'
import { toLinkCase } from 'src/utils/helpers'
import JobCategory from 'src/contract/models/job_category'

type FormData = {
  noExperience: boolean
  company: string | null
  roleType: number | null
  position: string | null
  workPlace: string | null
  signIn: string | null
  signOff: string | null
  location: number | null
  description: string | null
  isCurrent: boolean | null
}

const schema = yup.object().shape({
  noExperience: yup.boolean().required(),
  company: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  roleType: yup.number().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  position: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  location: yup.number().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  workPlace: yup.string().when('noExperience', {
    is: false,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  }),
  description: yup.string().when('noExperience', {
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
  signOff: yup.string().when(['noExperience', 'isCurrent'], {
    is: (noExperience: boolean, isCurrent: boolean) => !noExperience && !isCurrent,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired()
  })
})

const HospitalityExperience = ({ beforeLink }: { beforeLink: string }) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      noExperience: true,
      company: null,
      roleType: null,
      position: null,
      workPlace: null,
      signIn: null,
      signOff: null,
      description: null,
      isCurrent: null
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession } = useAuth()
  const [category, setCategory] = useState<number | null>(null)
  const [onLoading, setOnLoading] = useState(false)
  const [roleType, setRoleType] = useState<RoleType[] | null>(null)
  const [positions, setPositions] = useState<VesselType[] | null>(null)
  const [locations, setLocation] = useState<any>()

  const time = new Date()
  const noExperience = watch('noExperience')
  const selectedRoleType = watch('roleType') === 0 ? undefined : watch('roleType')
  const isCurrent = watch('isCurrent')

  const firstLoad = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/job-category', {
      page: 1,
      take: 100,
      employee_type: 'onship'
    }).then(async response => {
      const data: JobCategory[] = await response.data.categories.data
      data?.forEach(cat => {
        if (cat.name == 'Cruise Hospitality') setCategory(cat.id)
      })
    })

    await HttpClient.get(AppConfig.baseUrl + '/public/data/country').then(async response => {
      const data = await response.data.countries
      setLocation(data)
    })

    if (user) {
      setValue('noExperience', user.no_experience)
    }
  }

  const getPositions = () => {
    if (getValues('roleType') !== null) {
      HttpClient.get(
        AppConfig.baseUrl + `/public/data/positions?page=1&take=1000&role_type_id=${getValues('roleType')}`
      ).then(async response => {
        const data = await response.data.positions.data
        setPositions(data)
      })
    }
  }

  const getRoleType = () => {
    if (category !== null) {
      HttpClient.get(
        AppConfig.baseUrl + `/public/data/role-type?page=1&take=1000&employee_type=onship&category_id=${category}`
      )
        .then(async response => {
          const data: RoleType[] = await response.data.roleTypes.data
          setRoleType(data)
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    firstLoad()
  }, [])

  useEffect(() => {
    getRoleType()
  }, [category])

  useEffect(() => {
    getPositions()
  }, [selectedRoleType])

  useEffect(() => {
    if (noExperience === true) {
      setValue('company', null)
      setValue('roleType', null)
      setValue('position', null)
      setValue('workPlace', null)
      setValue('location', null)
      setValue('signIn', null)
      setValue('signOff', null)
      setValue('description', null)
      setValue('isCurrent', null)
    }
  }, [noExperience])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)


    HttpClient.post(AppConfig.baseUrl + '/onboarding/experience-hospitality', {
      no_experience: data.noExperience,
      role_type: data.roleType,
      position: data.position,
      company: data.company,
      location: data.location,
      work_place: data.workPlace,
      start_date: data.signIn,
      end_date: isCurrent ? null : data.signOff,
      description: data.description,
      is_current: data.isCurrent
    })
      .then(
        async () => {
          toast.success('Successfully save profile')
          await refreshSession()
          router.push(`/profile/${toLinkCase(user?.username)}/?onboarding=completed`)
        },
        error => {
          toast.error('Failed to save profile: ' + error.response.data.message)
          console.log(error)
        }
      )
      .finally(() => setOnLoading(false))
  }

  const onSkip = () => {
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/complete').then(async response => {
      await toast.success(response.data.message)
      router.push(`/profile/${toLinkCase(user?.username)}/?onboarding=completed`)
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
                    Ya, saya memiliki pengalaman berlayar
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
                    Tidak, saya belum memiliki pengalaman berlayar
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </FormControl>

        {!noExperience && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <FormControl fullWidth error={!!errors.roleType}>
              <Typography sx={{ mb: '6px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Tipe Peran <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='roleType'
                control={control}
                render={({ field }) => (
                  <Select {...field} value={field.value || 0}>
                    <MenuItem value={0} disabled>
                      Pilih Tipe Peran
                    </MenuItem>
                    {roleType &&
                      roleType.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth error={!!errors.position}>
              <Typography sx={{ mb: '6px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Posisi <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='position'
                control={control}
                render={({ field }) => (
                  <Select {...field} value={field.value || 0}>
                    <MenuItem value={0} disabled>
                      Pilih Posisi Pekerjaan
                    </MenuItem>
                    {positions &&
                      positions.map((item: any) => (
                        <MenuItem key={item.id} value={item.position}>
                          {item.position}
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

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.workPlace}>
                  <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                    Nama Hotel / Restaurant / Jalur Kapal <span style={{ color: '#F22' }}>*</span>
                  </Typography>
                  <Controller
                    name='workPlace'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder='Masukan nama tempat kerja anda'
                        error={!!errors.workPlace}
                        helperText={errors.workPlace?.message}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.location}>
                  <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                    Lokasi <span style={{ color: '#F22' }}>*</span>
                  </Typography>
                  <Controller
                    name='location'
                    control={control}
                    render={({ field }) => (
                      <Select {...field} value={field.value || 0}>
                        <MenuItem value={0} disabled>
                          Pilih lokasi tempat kerja
                        </MenuItem>
                        {locations &&
                          locations.map((item: any) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth error={!!errors.isCurrent}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                <Controller
                  name='isCurrent'
                  control={control}
                  render={({ field }) => <Checkbox {...field} defaultChecked={false} />}
                />
                <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400 }}>
                  Saya saat ini bekerja di perusahaan ini
                </Typography>
              </Box>
            </FormControl>

            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.signIn}>
                  <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                    Tanggal Masuk <span style={{ color: '#F22' }}>*</span>
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.signOff}>
                  <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                    Tanggal Keluar <span style={{ color: '#F22' }}>*</span>
                  </Typography>
                  <Controller
                  
                    name='signOff'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                        disabled={isCurrent ? true : false}
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
              </Grid>
            </Grid>

            <FormControl fullWidth error={!!errors.description}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Deskripsi <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder='Tulis deskripsi'
                    error={!!errors.description}
                    helperText={errors.description?.message}
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

export default HospitalityExperience
