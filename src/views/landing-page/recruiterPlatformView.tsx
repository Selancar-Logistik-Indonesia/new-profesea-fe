import { Icon } from '@iconify/react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const RecruiterPlatformView = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#2E50A2',
        borderRadius: { xs: 0, md: '20px' },
        overflow: 'hidden'
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(/images/recruiter-platform-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: { xs: '100% 0%', md: '100% center' },
          width: '100%',
          height: { xs: '226px', md: '100%' }
        }}
      />
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '24px', md: '54px 40px' } }}
      >
        <Typography
          sx={{ mb: { xs: '12px', md: '24px' }, color: 'white', fontSize: { xs: 14, md: 20 }, fontWeight: 400 }}
        >
          Profesea For Employer
        </Typography>
        <Typography sx={{ mb: '16px', color: 'white', fontSize: { xs: 32, md: 48 }, fontWeight: 700 }}>
          Search <span style={{ color: '#FE9602' }}>Smarter</span>, Hire{' '}
          <span style={{ color: '#FE9602' }}>Faster</span>
        </Typography>
        <Typography
          sx={{ mb: { xs: '24px', md: '39px' }, color: 'white', fontSize: { xs: 14, md: 16 }, fontWeight: 400 }}
        >
          Use advanced filters and smart recommendations to streamline your hiring process.
        </Typography>
        <Grid container gap='20px' sx={{ mb: { xs: '24px', md: '39px' } }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:note-pencil' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '24px'
              }}
            >
              Post job online, <span style={{ fontWeight: 700 }}>no more paperwork.</span>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:funnel-simple' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '24px'
              }}
            >
              Use our <span style={{ fontWeight: 700 }}>quick filtering system</span> for seafarer recruitment.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:sparkle' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '24px'
              }}
            >
              Receive <span style={{ fontWeight: 700 }}>personalized candidate</span> recommendation.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:currency-circle-dollar' color='#90C7E6' fontSize={24} />
            </Box>
            <Typography
              sx={{
                flexGrow: 1,
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '24px'
              }}
            >
              <span style={{ fontWeight: 700 }}>Optimize talent acquisiton with Recuiter Star!</span> Our subscription
              plan for companies.
            </Typography>
          </Grid>
        </Grid>
        <Button
          component={Link}
          href='/register'
          variant='contained'
          size='large'
          sx={{
            width: 'fit-content',
            backgroundColor: '#FFF',
            color: '#1F57C3',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          Learn more
        </Button>
      </Grid>
    </Grid>
  )
}

export default RecruiterPlatformView
