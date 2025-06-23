import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
    IconButton,
    Stack,
    CircularProgress,
    Autocomplete,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
  } from '@mui/material'
  import CloseIcon from '@mui/icons-material/Close'
  import CloudUploadIcon from '@mui/icons-material/CloudUpload'
  import { useEffect, useState } from 'react'
  import { HttpClient } from 'src/services'
  import toast from 'react-hot-toast'
  import { useAuth } from 'src/hooks/useAuth'
  import { IUser } from 'src/contract/models/user'
  
  interface EditGroupDialog {
    open: boolean
    onClose: (show: boolean) => void
    community: any
  }
  
  export default function EditGroupDialog(props: EditGroupDialog) {
    const { user } = useAuth()
    const { open, onClose, community } = props
    const [admin, setAdmin] = useState<IUser | null>(community?.owner)
    const [groupName, setGroupName] = useState(community?.name)
    const [visibility, setVisibility] = useState(community?.is_private ? 'private' : 'public')
    const [description, setDescription] = useState(community?.description)
    const [file, setFile] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(community?.banner_url)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fileError, setFileError] = useState<string | null>(null)
  
    const [users, setUsers] = useState<IUser[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
  
    const fetchUsers = () => {
      setLoading(true)
      HttpClient.get('/user-management', {
        page: 1,
        take: 10,
        search: search,
        active: true
      })
        .then(res => {
          if (res.status == 200) {
            setUsers(res.data.users.data)
          }
        })
        .finally(() => {
          setLoading(false)
        })

        
    }

  
    const handleInputChange = (_: any, value: string) => {
      setSearch(value)
      if (value.trim().length > 0) {
        fetchUsers()
      } else {
        setUsers([])
      }
    }
  
    //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files?.[0]
    //     if (selectedFile) {
    //       setFile(selectedFile)
  
    //       const validTypes = ['image/jpeg', 'image/png', 'image/pdg']
    //       if (validTypes.includes(selectedFile.type)) {
    //         const previewUrl = URL.createObjectURL(selectedFile)
    //         setImagePreviewUrl(previewUrl)
    //       } else {
    //         setImagePreviewUrl(null)
    //       }
    //     }
    //   }
  
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
  
    const handleClose = () => {
      onClose(false)
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
      formData.append('admin_id', admin?.id.toString() || '0')
  
      setIsSubmitting(true)
      try {
        await HttpClient.post(`/community/${community?.id}`, formData)
        handleClose()
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } catch (error) {
        console.error('Error creating group:', error)
        toast.error('Failed to create group. Please try again.')
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
      <>
        <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
          <DialogTitle sx={{ padding: '16px 24px', position: 'relative' }}>
            <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 700, color: '#1F1F1F' }}>
              Edit Commmunity
            </Typography>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
  
          <DialogContent dividers>
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
  
            {/* Admin Name - input khusus super admin */}
            {user?.role === 'admin' && (
              <Autocomplete
                value={admin}
                options={users}
                getOptionLabel={option => `${option.name}`}
                onInputChange={handleInputChange}
                onChange={(_, value) => setAdmin(value)}
                renderOption={(props, option) => (
                  <ListItem {...props} key={option.id}>
                    <ListItemAvatar>
                      <Avatar src={option.photo}>{option.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={option.name} />
                  </ListItem>
                )}
                renderInput={params => (
                  <Stack gap={'12px'} mb={'24px'}>
                    <Typography fontSize={'14px'} fontWeight={700} color={'#525252'}>
                      Community Admin <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      {...params}
                      // label='Search User'
                      placeholder='Select the admin of this community'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? <CircularProgress color='inherit' size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  </Stack>
                )}
                noOptionsText={search ? 'No users found' : 'Start typing to search...'}
              />
            )}
  
            {/* Group Name */}
            <Stack gap={'12px'} mb={'24px'}>
              <Typography fontSize={'14px'} fontWeight={700} color={'#525252'}>
                Community Name <span style={{ color: 'red' }}>*</span>
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
  
            {/* Community Visibility */}
            <Stack gap={'12px'} mb={'24px'}>
              <Typography fontSize={'14px'} fontWeight={700} color={'#525252'}>
                Community Visibility <span style={{ color: 'red' }}>*</span>
              </Typography>
              <RadioGroup row value={visibility} onChange={e => setVisibility(e.target.value)}>
                <FormControlLabel value='public' control={<Radio />} label='Public group' />
                <FormControlLabel value='private' control={<Radio />} label='Private group' />
              </RadioGroup>
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
          </DialogContent>
  
          <DialogActions sx={{ padding: '20px !important' }}>
            <Button size='small' sx={{ textTransform: 'capitalize' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size='small'
              variant='contained'
              sx={{ textTransform: 'capitalize' }}
              onClick={handleSubmit}
              disabled={!groupName || !visibility || isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={18} color='inherit' /> : 'Create Group'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  