import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, FormControl, IconButton, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { AppConfig } from 'src/configs/api'
import { useDropzone } from 'react-dropzone'
import { Icon } from '@iconify/react'

type FormData = {
  isCrewing: number
  siupakk: File[] | null
  nib: File[] | null
  menkumham: File[] | null
}

const schema = yup.object().shape({
  isCrewing: yup.number().required()
})

const FileUpload = ({ name, control, setValue }: { name: string; control: any; setValue: any }) => {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
      'application/pdf': ['.pdf']
    },
    onDrop: acceptedFiles => {
      setValue(name, acceptedFiles)
      const file = acceptedFiles[0]
      if (file) {
        setFileInfo({ name: file.name, size: file.size })
      }
    }
  })

  const handleClear = () => {
    setFileInfo(null)
    setValue(name, null)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={() =>
        fileInfo ? (
          <Box {...getRootProps()} sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Icon icon='ph:file-text' fontSize={24} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700 }}>{fileInfo.name}</Typography>
                <Typography sx={{ color: '#999999', fontSize: 12, fontWeight: 400 }}>
                  {(fileInfo.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => handleClear()}>
              <Icon icon='ic:baseline-clear' />
            </IconButton>
          </Box>
        ) : (
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: '8px',
              height: '200px',
              p: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '8px',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>Drop files here...</Typography>
            ) : (
              <>
                <Icon icon='ph:upload' fontSize={24} />
                <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700 }}>
                  Choose a file or drag & drop it here
                </Typography>
                <Typography sx={{ color: '#999999', fontSize: 12, fontWeight: 400 }}>
                  JPEG, PNG, and PDF formats, up to 3MB
                </Typography>
              </>
            )}
          </Box>
        )
      }
    />
  )
}

const CompanyDocument = ({ beforeLink }: { beforeLink: string }) => {
  const {
    control,
    watch,
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

  const isOpen = watch('isCrewing') === 1
  const [onLoading, setOnLoading] = useState(false)

  const firstLoad = async () => {
    if (user && user.field_preference) {
      setValue('isCrewing', user.is_crewing)
    }
  }

  useEffect(() => {
    if (isOpen === false) {
      setValue('siupakk', null)
    } else {
      setValue('nib', null)
      setValue('menkumham', null)
    }
  }, [isOpen])

  useEffect(() => {
    firstLoad()
  }, [])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/isCrewing', {
      is_crewing: data.isCrewing
    })
      .then(
        async () => {
          const uploadPromises = []
          if (data.nib !== null) {
            uploadPromises.push(
              HttpClient.postFile('/user/document', {
                user_document: data.nib[0],
                document_name: 'NIB',
                document_type: 'M1'
              })
            )
          }
          if (data.menkumham !== null) {
            uploadPromises.push(
              HttpClient.postFile('/user/document', {
                user_document: data.menkumham[0],
                document_name: 'Menkumham',
                document_type: 'M2'
              })
            )
          }
          if (data.siupakk !== null) {
            uploadPromises.push(
              HttpClient.postFile('/user/document', {
                user_document: data.siupakk[0],
                document_name: 'SIUPAKK',
                document_type: 'M3'
              })
            )
          }

          console.log(data.siupakk, data.nib, data.menkumham)

          await Promise.all(uploadPromises)
          await refreshSession()
          toast.success('Successfully save profile')
          router.push(`/company/${user?.id}/${user?.username}`)
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
      router.push(`/company/${user?.id}/${user?.username}`)
    })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormControl fullWidth error={!!errors.isCrewing}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
            Are you a crewing company? <span style={{ color: '#F22' }}>*</span>
          </Typography>
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
                    Yes
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
                    No
                  </Typography>
                </Box>
              </Box>
            )}
          />
        </FormControl>
        {isOpen ? (
          <FormControl fullWidth error={!!errors.siupakk} sx={{ mb: 3 }}>
            <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>SIUPAKK</Typography>
            <FileUpload name='siupakk' control={control} setValue={setValue} />
          </FormControl>
        ) : (
          <>
            <FormControl fullWidth error={!!errors.nib} sx={{ mb: 3 }}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>NIB</Typography>
              <FileUpload name='nib' control={control} setValue={setValue} />
            </FormControl>
            <FormControl fullWidth error={!!errors.nib} sx={{ mb: 3 }}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>Menkumham</Typography>
              <FileUpload name='menkumham' control={control} setValue={setValue} />
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Box sx={{ cursor: 'pointer' }} onClick={() => onSkip()}>
              <Typography
                sx={{ color: '#999999', fontSize: 14, fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
              >
                Skip for now
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
      </Box>
    </form>
  )
}

export default CompanyDocument
