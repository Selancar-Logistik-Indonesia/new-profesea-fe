import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { Icon } from '@iconify/react'
import DialogEditProfile from './DialogEditProfile'

const PhotoProfile = () => {
  const { user } = useAuth()

  const [previewImage, setPreviewImage] = useState('')
  const [openEditModalProfile, setOpenEditModalProfile] = useState(false)

  useEffect(() => {
    if (user) {
      setPreviewImage(user.photo)
    }
  }, [user])

  const handleProfileUpdate = (newPhotoUrl: string) => {
    setPreviewImage(newPhotoUrl)
  }

  return (
    <>
      <Box
        sx={{ position: 'relative', width: '104px', height: '104px', cursor: 'pointer' }}
        onClick={() => {
          setOpenEditModalProfile(true)
        }}
      >
        <Box
          sx={{
            width: '100px',
            height: '100px',
            border: '2px solid #FFF',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
            boxShadow: 4
          }}
        >
          <Box
            component='img'
            alt='profile-picture'
            src={previewImage ? previewImage : '/images/avatars/default-user-2.png'}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          {!previewImage && (
            <Typography
              sx={{
                color: '#FFF',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 500,
                zIndex: 1
              }}
            >
              add <br />
              picture
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: '-4px',
            bottom: '-4px',
            backgroundColor: '#FFF',
            borderRadius: '50%',
            p: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 4
          }}
        >
          <Icon icon='ph:camera' color='#666' fontSize={18} />
        </Box>
      </Box>
      <DialogEditProfile
        visible={openEditModalProfile}
        onCloseClick={() => setOpenEditModalProfile(!openEditModalProfile)}
        previewProfile={previewImage}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  )
}

export default PhotoProfile
