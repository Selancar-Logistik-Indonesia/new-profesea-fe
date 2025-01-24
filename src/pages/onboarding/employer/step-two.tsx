import React, { ReactNode } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { EmployerProfileCard } from 'src/views/onboarding/ProfileCard'
import ProgressBar from 'src/views/onboarding/ProgressBar'
import CompanyAbout from 'src/layouts/components/onboarding/CompanyAbout'

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
          <Box sx={{ mt: '32px', pb: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ProgressBar current={2} total={3} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
                Tambahkan Biodata Perusahaan
              </Typography>
              <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
                Bagikan profil dan situs web perusahaan Anda agar kami dapat menyediakan daftar pekerjaan yang telah
                kami sesuaikan dan menghubungkan dengan talenta terbaik sesuai kebutuhan anda.
              </Typography>
            </Box>
            <CompanyAbout beforeLink='/onboarding/employer/step-one/2' nextLink='/onboarding/employer/step-three' />
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
        <EmployerProfileCard />
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
