import { HttpClient } from 'src/services'
import { IDetailCommunityData } from './CommunityDetail'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const CommunityEdit = ({ community }: { community: IDetailCommunityData }) => {
  const [groupName, setGroupName] = useState(community?.name)
  const [visibility, setVisibility] = useState(community?.is_private ? 'private' : 'public')
  const [description, setDescription] = useState(community?.description)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(community?.banner_url)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    const validTypes = ['image/jpeg', 'image/png', 'image/pdg']
    const maxSize = 3 * 1024 * 1024 // 3MB

    if (selectedFile) {
      setFile(selectedFile)
      const previewUrl = URL.createObjectURL(selectedFile)
      setImagePreviewUrl(previewUrl)
      if (!validTypes.includes(selectedFile.type)) {
        setFileError('Invalid file type. Only JPEG, PNG, and PDG are allowed.')

        return
      }

      if (selectedFile.size > maxSize) {
        setFileError('File size exceeds 3MB. Please upload a smaller image.')

        return
      }

      setFileError(null)
    }
  }

  const handleSubmit = async () => {
    const isPrivate = visibility === 'private' ? '1' : '0'

    const formData = new FormData()
    formData.append('name', groupName)
    formData.append('is_private', isPrivate)
    formData.append('description', description)
    if (file) {
      formData.append('banner', file)
    }

    setIsSubmitting(true)
    try {
      await HttpClient.post(`/community/${community?.id}`, formData)
      toast.success('Successfully edited community.')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error('Error editing group:', error)
      toast.error('Failed to edit group. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl)
    }
  }, [imagePreviewUrl])

  return (
    <Card sx={{ borderRadius: '12px !important' }}>
      <CardHeader>Edit</CardHeader>
      <CardContent>
        {/* Upload Area */}
        <Box
          sx={{
            border: imagePreviewUrl ? 'none' : '2px dashed #ccc',
            borderRadius: 2,
            padding: 3,
            textAlign: 'center',
            mb: '24px',
            position: 'relative',
            height: 350,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: imagePreviewUrl ? '#f5f5f5' : 'transparent'
          }}
        >
          {imagePreviewUrl ? (
            <>
              <Box
                component='img'
                src={imagePreviewUrl}
                alt='Preview'
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  top: 0,
                  left: 0
                }}
              />

              {/* Close (X) Button */}
              <IconButton
                onClick={() => {
                  setFile(null)
                  setImagePreviewUrl(null)
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  zIndex: 20,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)'
                  }
                }}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </>
          ) : (
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <CloudUploadIcon fontSize='large' sx={{ color: 'gray', mb: '24px' }} />
              <Typography variant='body2' color='text.secondary' sx={{ mb: '16px' }}>
                Choose a file or drag & drop it here
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                JPEG, PNG, and PDG formats, up to 50MB
              </Typography>
              <Box mt={'32px'}>
                <Button variant='outlined' component='label'>
                  Browse File
                  <input hidden type='file' onChange={handleFileChange} />
                </Button>
              </Box>
              {file && (
                <Typography variant='body2' mt={1} color='green'>
                  Selected: {file.name}
                </Typography>
              )}
            </Box>
          )}

          {/* Invisible input area tetap aktif di atas */}
          <Box
            component='label'
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <input hidden type='file' accept='image/*' onChange={handleFileChange} />
          </Box>
        </Box>

        {fileError && (
          <Typography variant='body2' color='error' my={1}>
            {fileError}
          </Typography>
        )}

        {/* Group Name */}
        <Stack gap={'12px'} mb={'24px'}>
          <Typography fontSize={'14px'} fontWeight={700} color={'#525252'}>
            Community Name
          </Typography>
          <TextField
            fullWidth
            required
            size='small'
            placeholder='Enter your group`s name'
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </Stack>

        {/* Group Description */}
        <Stack gap={'12px'} mb={'24px'}>
          <Typography fontSize={'14px'} fontWeight={700} color={'#525252'}>
            Community Description
          </Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Enter a description to guide potential members…'
          />
        </Stack>

        <Stack gap={'12px'} mb={'24px'} sx={{ border: '1px solid #E7E7E7', borderRadius: '8px', padding: '12px' }}>
          <Typography fontSize={'14px'} fontWeight={700} color={'#525252'}>
            Communitty Visibility Settings
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'row' }}>
            <Typography fontSize={'14px'} fontWeight={600} color={'#525252'}>
              {visibility === 'private' ? 'Private' : 'Public'}
            </Typography>
            <Switch
              checked={visibility === 'private'}
              onChange={e => {
                setVisibility(e.target.checked ? 'private' : 'public')
              }}
            />
          </Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#868686' }}>
            {visibility === 'private'
              ? 'The group is private. Only approved members can find, view, and join the group.'
              : 'The group is public. Anyone can find, view, and request to join the group.'}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end !important' }}>
        <Button onClick={handleSubmit} variant='contained' size='small' sx={{ textTransform: 'none' }}>
          {isSubmitting ? <CircularProgress size={18} color='inherit' /> : 'Save Changes'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CommunityEdit
