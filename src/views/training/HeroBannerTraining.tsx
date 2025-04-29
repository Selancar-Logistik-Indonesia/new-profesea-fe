import React, { useState } from 'react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import ContactDialog from './ContactDialog'

const HeroBanner: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [openDialog, setOpenDialog] = useState(false)

  const handleOnCloseDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  return (
    <>
      <ContactDialog open={openDialog} onClose={handleOnCloseDialog} />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: isMobile ? '100vh' : '70vh',
          backgroundImage: `url('/images/banner/training-banner-captain.png')`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center 30%' : 'center 10%', // 👈 Fokus ke bagian atas wajah
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          px: isMobile ? '24px' : '120px',
          py: isMobile ? 4 : 8,
          overflow: 'hidden'
        }}
      >
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: isMobile
              ? 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.1))'
              : 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
            zIndex: 1
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '600px',
            top: isMobile ? '150px' : ''
          }}
        >
          {!isMobile && (
            <Typography variant='body2' color='grey.300' gutterBottom>
              Homepage {'>'} All Training
            </Typography>
          )}

          <Typography
            variant='h4'
            fontWeight='bold'
            gutterBottom
            sx={{ fontSize: isMobile ? '24px' : '2.5rem', color: '#fff', textAlign: isMobile ? 'center' : 'left' }}
          >
            Get Your Seafarer Certificate from Our Premier Training
          </Typography>
          <Typography
            variant='body1'
            sx={{ mt: 2, color: '#fff', fontSize: isMobile ? '16px' : '', textAlign: isMobile ? 'center' : 'left' }}
          >
            Find the right course to advance your career at sea.
          </Typography>
          <Typography
            variant='body1'
            sx={{ mt: 2, color: '#fff', fontSize: isMobile ? '16px' : '', textAlign: isMobile ? 'center' : 'left' }}
          >
            Got questions? Reach out to us anytime! We’re here to help you navigate your journey.
          </Typography>
          <Button
            onClick={handleOpenDialog}
            variant='contained'
            sx={{
              width: isMobile ? '100%' : '300px',
              fontSize: isMobile ? '14px' : '16px',
              mt: 4,
              padding: isMobile ? '8px 12px' : '12px',
              borderRadius: '9px !important',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#1f38a8' }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default HeroBanner
