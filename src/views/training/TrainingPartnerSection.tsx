import React from 'react'
import { Box, Card, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const TrainingPartnerSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        borderRadius: '16px',
        backgroundColor: '#f7f9fc',
        padding: '32px',
        overflow: 'hidden',
        flexWrap: 'wrap'
      }}
    >
      {/* Dekorasi Kiri Atas */}
      {!isMobile && (
        <Box
          component='img'
          src='/images/decoration-top-left.svg'
          alt='Dekorasi Atas'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: 'auto'
          }}
        />
      )}

      {/* Dekorasi Kiri Bawah */}
      {!isMobile && (
        <Box
          component='img'
          src='/images/decoration-bottom-left.svg'
          alt='Dekorasi Bawah'
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '120px',
            height: 'auto'
          }}
        />
      )}

      {/* Dekorasi mobile view */}
      {isMobile && (
        <Box
          component='img'
          src='/images/decoration-mobile-blue.svg'
          alt='Dekorasi Mobile Blue'
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'absolute',
            bottom: 0,
            left: 0,
            top: '-20px',
            // width: '100%',
            height: 'auto'
          }}
        />
      )}

      {isMobile && (
        <Box
          component='img'
          src='/images/decoration-mobile-yellow.svg'
          alt='Dekorasi Mobile Yellow'
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'absolute',
            bottom: 0,
            left: 0,
            top: '-20px',
            height: 'auto'
          }}
        />
      )}

      {/* Teks Kiri */}
      <Box sx={{ pl: isMobile ? '' : '100px', pt: isMobile ? '15px' : '', margin: 'auto' }}>
        <Typography sx={{ fontSize: isMobile ? '16px' : '24px', fontWeight: 700, color: '#32497A' }}>
          Collaborating with
        </Typography>
        <Typography
          sx={{ color: '#FE9602', fontSize: isMobile ? '16px' : '32px', fontWeight: 700, position: 'relative' }}
        >
          top training partners
          <Box
            component='img'
            src='/images/underline-wave.svg'
            alt='Underline'
            sx={{
              width: isMobile ? '81px' : '121px',
              display: 'block',
              mt: 1,
              position: 'absolute',
              top: isMobile ? '12px' : '27px',
              right: '-25px'
            }}
          />
        </Typography>
      </Box>

      {/* Logo Partner */}
      <Box
        sx={{
          mt: isMobile ? '24px' : '0px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto'
        }}
      >
        <img src='/images/partner1.png' alt='Focus Maritime' style={{ height: '48px' }} />
        <img src='/images/partner2.png' alt='HUGOS' style={{ height: '48px' }} />
        <img src='/images/partner3.png' alt='SEA-GIAT' style={{ height: '48px' }} />
        <img src='/images/partner4.png' alt='Logo 4' style={{ height: '48px' }} />
      </Box>
    </Card>
  )
}

export default TrainingPartnerSection
