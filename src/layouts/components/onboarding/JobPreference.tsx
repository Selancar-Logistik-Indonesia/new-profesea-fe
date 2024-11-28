import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, MenuItem, Select, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import JobCategory from 'src/contract/models/job_category'
import RoleType from 'src/contract/models/role_type'
import { toast } from 'react-hot-toast'

type FormData = {
  jobCategory: number
  roleType: number
}

const schema = yup.object().shape({
  jobCategory: yup.number().required().moreThan(0, 'Please select a valid Job Category'),
  roleType: yup.number().required().moreThan(0, 'Please select a valid Job Rank')
})

const JobPreference = ({ beforeLink, nextLink }: { beforeLink: string; nextLink: string }) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
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
  const { user, refreshSession } = useAuth()

  const [onLoading, setOnLoading] = useState(false)
  const [jobCategory, setJobCategory] = useState<JobCategory[] | null>(null)
  const [roleType, setRoleType] = useState<RoleType[] | null>(null)

  const selectJobCategory = watch('jobCategory') === 0 ? undefined : watch('jobCategory')

  const firstLoad = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/job-category', {
      page: 1,
      take: 1000,
      employee_type: user?.employee_type
    }).then(async response => {
      const data: JobCategory[] = await response.data.categories.data
      setJobCategory(data)
    })

    if (user && user.jobcategory) {
      setValue('jobCategory', user.jobcategory.id)
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

  useEffect(() => {
    getRoleType()
    firstLoad()
  }, [])

  useEffect(() => {
    getRoleType()
  }, [selectJobCategory])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/preference-job', {
      roletype_id: data.roleType,
      category_id: data.jobCategory,
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
        <FormControl fullWidth error={!!errors.jobCategory}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Kategori Pekerjaan <span style={{ color: '#F22' }}>*</span>
          </Typography>
          <Controller
            name='jobCategory'
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value || 0}>
                <MenuItem value={0} disabled>
                  Pilih Departemen Pekerjaan
                </MenuItem>
                {jobCategory &&
                  jobCategory.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
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
              <Select {...field} value={field.value || 0}>
                <MenuItem value={0} disabled>
                  {user?.employee_type === 'onship' ? 'Pilih Pangkat Pekerjaan' : 'Pilih Jabatan'}
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
