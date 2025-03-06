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
import { toLinkCase } from 'src/utils/helpers'

type FormData = {
  siupakk: File[] | null
  nib: File[] | null
  menkumham: File[] | null
}

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
              <Typography>Taruh dokumen disini...</Typography>
            ) : (
              <>
                <Icon icon='ph:upload' fontSize={24} />
                <Typography sx={{ color: '#303030', fontSize: 14, fontWeight: 700 }}>
                  Telusuri dokumen atau seret dan lepas di sini
                </Typography>
                <Typography sx={{ color: '#999999', fontSize: 12, fontWeight: 400 }}>
                  Format JPEG, PNG, and PDF, hingga 3MB
                </Typography>
              </>
            )}
          </Box>
        )
      }
    />
  )
}

const CompanyDocument = ({
  beforeLink,
  isEditCompany = false,
  onClose = () => {}
}: {
  beforeLink: string
  isEditCompany?: boolean
  onClose?: () => void
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit'
  })

  const router = useRouter()
  const { user } = useAuth()
  const [onLoading, setOnLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    setOnLoading(true)

    try {
      const documents = [
        { file: data.nib, name: 'NIB', type: 'M1' },
        { file: data.menkumham, name: 'Menkumham', type: 'M2' },
        { file: data.siupakk, name: 'SIUPAKK', type: 'M3' }
      ]

      const uploadPromises = documents
        .filter(doc => Array.isArray(doc.file) && doc.file.length > 0)
        .map(doc =>
          HttpClient.postFile('/user/document', {
            user_document: doc.file![0],
            document_name: doc.name,
            document_type: doc.type
          })
        )

      await Promise.all(uploadPromises)
      toast.success('Successfully saved profile')

      isEditCompany ? onClose() : onComplete()
    } catch (error) {
      toast.error('Failed to save profile: Failed to upload file')
    } finally {
      setOnLoading(false)
    }
  }

  const onComplete = () => {
    HttpClient.patch(`${AppConfig.baseUrl}/onboarding/complete`).then(response => {
      toast.success(response.data.message)
      router.push(`/company/${toLinkCase(user?.username)}/?onboarding=completed`)
    })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {user?.is_crewing === 1 ? (
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
        <Box sx={{ my: '32px', display: 'flex', justifyContent: isEditCompany ? 'flex-end' : 'space-between' }}>
          {isEditCompany != true && (
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
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {isEditCompany != true && (
              <Box sx={{ cursor: 'pointer' }} onClick={() => onComplete()}>
                <Typography
                  sx={{ color: '#999999', fontSize: 14, fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
                >
                  Skip for now
                </Typography>
              </Box>
            )}

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
              {onLoading ? <CircularProgress size={22} /> : isEditCompany ? 'Submit' : 'Continue'}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}

export default CompanyDocument
