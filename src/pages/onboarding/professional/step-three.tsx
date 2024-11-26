import React, { ReactNode } from 'react'
import { Box, Grid } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { ProfessionalProfileCard } from 'src/views/onboarding/ProfileCard'
import ProgressBar from 'src/views/onboarding/ProgressBar'
import JobPreference from 'src/layouts/components/onboarding/JobPreference'

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
          <Box component='img' src='/images/logosamudera.png' sx={{ width: '143px', height: 'auto' }} />
          <Box sx={{ my: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ProgressBar current={3} total={5} />
            <JobPreference
              beforeLink='/onboarding/professional/step-two'
              nextLink='/onboarding/professional/step-four'
            />
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
        <ProfessionalProfileCard />
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
