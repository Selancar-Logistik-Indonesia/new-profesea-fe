import React, { ReactNode } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { SeafarerProfileCard } from 'src/views/onboarding/ProfileCard'
import ProgressBar from 'src/views/onboarding/ProgressBar'
import SeafarerExperience from 'src/layouts/components/onboarding/SeafarerExperience'

const Onboarding = () => {

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          p: '44px 32px',
          height: '100%',
          backgroundColor: '#FAFAFA',
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Box sx={{ width: '480px', display: 'flex', flexDirection: 'column' }}>
          <Box component='img' src='/images/logoprofesea.png' sx={{ width: '143px', height: 'auto' }} />
          <Box sx={{ my: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ProgressBar current={6} total={6} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
                Bagikan Pengalaman Terakhir Maritim Anda
              </Typography>
              <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
                Dengan menginformasikan pekerjaan terkini atau pengalaman terakhir Anda, kami akan membantu Anda
                menemukan peluang yang disesuaikan dengan keterampilan dan keinginan Anda.
              </Typography>
            </Box>
            <SeafarerExperience beforeLink='/onboarding/seafarer/step-five' />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          background: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SeafarerProfileCard />
      </Grid>
    </Grid>
  )
}

Onboarding.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Onboarding.acl = {
  action: 'read',
  subject: 'on-boarding'
}
export default Onboarding
