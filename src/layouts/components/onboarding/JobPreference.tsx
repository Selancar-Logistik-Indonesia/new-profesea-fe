import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import JobCategory from 'src/contract/models/job_category'
import RoleType, { IJobPositions } from 'src/contract/models/role_type'
import { toast } from 'react-hot-toast'

type FormData = {
  jobCategory: number
  roleType: number
  position:number
}

const schema = yup.object().shape({
  jobCategory: yup.number().required().moreThan(0, 'Please select a valid Job Category'),
  roleType: yup.number().required().moreThan(0, 'Please select a valid Job Rank'),
  position: yup.number().required().moreThan(0, 'Please select a valid Job Position')
})

const JobPreference = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
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
      jobCategory: 0,
      roleType: 0
    },
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const { user, refreshSession, settings } = useAuth()
  const [onLoading, setOnLoading] = useState(false)
  const [jobCategory, setJobCategory] = useState<JobCategory[] | null>(null)
  const [roleType, setRoleType] = useState<RoleType[] | null>(null)
  const [positions, setPositions] = useState<IJobPositions[] | null>(null)

  const selectJobCategory = watch('jobCategory') === 0 ? undefined : watch('jobCategory')
  const selectedRoleType = watch('roleType') === 0 ? undefined : watch('roleType')

  const firstLoad = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/job-category', {
      page: 1,
      take: 1000,
      employee_type: user?.employee_type
    }).then(async response => {
      const data: JobCategory[] = await response.data.categories.data

      if(settings?.is_hospitality) {
        data?.forEach(cat => {
          if(cat.name == 'Cruise Hospitality') setValue('jobCategory', cat.id)
        })
      }

      setJobCategory(data)
    })

    

    if (user && user.field_preference && user.field_preference.job_category) {
      setValue('jobCategory', user.field_preference.job_category.id)
    }
    
    if (user && user.field_preference && user.field_preference.role_type) {
      setValue('roleType', user.field_preference.role_type.id)
    }
  }

  const getRoleType = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/role-type', {
      page: 1,
      take: 1000,
      employee_type: user?.employee_type,
      category_id: selectJobCategory
    }).then(async response => {
      const data: RoleType[] = await response.data.roleTypes.data
      setRoleType(data)
    })
  }

  const getPositions = () => {
    if(getValues('roleType') !== null && getValues('roleType') !== 0) {
      HttpClient.get(AppConfig.baseUrl + '/public/data/positions', {
        page:1,
        take:100,
        role_type_id: getValues('roleType')
      }).then(res => {
        const data = res.data.positions.data
        setPositions(data)
      })
    }
  }

  useEffect(() => {
    getRoleType()
    firstLoad()
  }, [settings])

  useEffect(() => {
    getRoleType()
  }, [selectJobCategory])

  useEffect(() => {
    getPositions()
  }, [selectedRoleType])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/preference-job', {
      roletype_id: data.roleType,
      category_id: data.jobCategory,
      job_position_id:data.position,
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
            {user?.employee_type === 'onship'
              ? 'Atur Preferensi Departemen Pekerjaan Anda'
              : 'Atur Preferensi Kategori Pekerjaan Anda'}
          </Typography>
          <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
            {user?.employee_type === 'onship'
              ? 'Tentukan peran spesifik Anda sebagai Pelaut, baik di dek, kapal pesiar, mesin, atau departemen lainnya, untuk mendapatkan rekomendasi pekerjaan yang disesuaikan dan kesempatan jaringan sesuai dengan keterampilan Anda.'
              : 'Pilih bidang profesional Anda—lepas pantai, teknik, manajemen, atau lainnya—untuk menerima rekomendasi pekerjaan dan peluang jaringan yang disesuaikan.'}
          </Typography>
        </Box>
        <FormControl disabled={settings?.is_hospitality} fullWidth error={!!errors.jobCategory}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Kategori Pekerjaan <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='jobCategory'
            control={control}
            render={({ field }) => (
              <Autocomplete
              disabled={settings?.is_hospitality}
                {...field}
                autoHighlight
                options={jobCategory || []}
                getOptionLabel={option => option.name || ''}
                value={jobCategory?.find(jobCategory => jobCategory.id === field.value) || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder='Pilih Departemen Pekerjaan'
                    error={!!errors.jobCategory}
                    helperText={errors.jobCategory?.message}
                  />
                )}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )}
                noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
              />
            )}
          />
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
            Atur Preferensi Anda untuk Bekerja
          </Typography>
          <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
            {user?.employee_type === 'onship'
              ? 'Pilih jabatan yang Anda inginkan untuk membantu kami menyesuaikan rekomendasi pekerjaan dan peluang jaringan yang sesuai dengan keahlian Anda.'
              : 'Pilih jabatan Anda. Tentukan peran profesional spesifik Anda untuk membantu kami menyesuaikan rekomendasi pekerjaan dan peluang jaringan yang sesuai dengan keahlian Anda.'}
          </Typography>
        </Box>
        <FormControl fullWidth error={!!errors.roleType}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            {user?.employee_type === 'onship' ? 'Pangkat Pekerjaan' : 'Jabatan'}
            <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='roleType'
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                autoHighlight
                options={roleType || []}
                getOptionLabel={option => option.name || ''}
                value={roleType?.find(roleType => roleType.id === field.value) || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder={user?.employee_type === 'onship' ? 'Pilih Pangkat Pekerjaan' : 'Pilih Jabatan'}
                    error={!!errors.roleType}
                    helperText={errors.roleType?.message}
                  />
                )}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )}
                noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.roleType} sx={{display: settings?.is_hospitality ? '' : 'none'}}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Posisi
            <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='position'
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                autoHighlight
                options={positions || []}
                getOptionLabel={option => option.position || ''}
                value={positions?.find(position => position.id === field.value) || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder={'Posisi Pekerjaan'}
                    error={!!errors.position}
                    helperText={errors.position?.message}
                  />
                )}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.id} value={option.id}>
                    {option.position}
                  </MenuItem>
                )}
                noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
              />
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

export default JobPreference
