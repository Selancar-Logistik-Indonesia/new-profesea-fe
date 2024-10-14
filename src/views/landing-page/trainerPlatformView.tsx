import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const TrainerPlatformView = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#4569B7',
        borderRadius: { xs: 0, md: '20px' },
        overflow: 'hidden',
        flexDirection: { xs: null, md: 'row-reverse' }
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '24px'
        }}
      >
        <Box component='img' src='/images/training-card.png' sx={{ width: '100%' }} />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', flexDirection: 'column', padding: { xs: '24px', md: '54px 40px' } }}
      >
        <Typography
          sx={{ mb: { xs: '12px', md: '24px' }, color: 'white', fontSize: { xs: 14, md: 20 }, fontWeight: 400 }}
        >
          Profesea as Training Platform
        </Typography>
        <Typography sx={{ mb: '16px', color: 'white', fontSize: { xs: 32, md: 48 }, fontWeight: 700 }}>
          Get Certified, Stay <span style={{ color: '#FE9602' }}>Competitive</span>
        </Typography>
        <Typography
          sx={{ mb: { xs: '24px', md: '72px' }, color: 'white', fontSize: { xs: 14, md: 16 }, fontWeight: 400 }}
        >
          Explore courses from officially recognized platforms and gain the certifications you need to excel. Want to
          grow with us? Become a trusted training partner today.
        </Typography>
        <Divider sx={{ mb: { xs: '24px', md: '12px' }, borderColor: 'white' }} />
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: '24px', display: 'flex' }}>
          <Grid item xs={6} md={4}>
            <Typography
              sx={{
                width: '100%',
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px'
              }}
            >
              <span style={{ fontWeight: 700 }}>Online booking partner</span> for maritime training center.
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography
              sx={{
                width: '100%',
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px'
              }}
            >
              <span style={{ fontWeight: 700 }}>Alternative marketing channel</span> that will amplify your training
              center's exposure.
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography
              sx={{
                width: '100%',
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px'
              }}
            >
              Partner for <span style={{ fontWeight: 700 }}>E-learning provider.</span>
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

export default TrainerPlatformView
