import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const TrainerPlatformView = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#4569B7',
        borderRadius: '20px',
        p: '64px 54px',
        display: 'flex',
        flexWrap: 'nowrap',
        gap: '63px'
      }}
    >
      <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ mb: '24px', color: 'white', fontSize: 20, fontWeight: 400 }}>
          Profesea as Training Platform
        </Typography>
        <Typography sx={{ mb: '16px', color: 'white', fontSize: 48, fontWeight: 700 }}>
          Get Certified, Stay <span style={{ color: '#FE9602' }}>Competitive</span>
        </Typography>
        <Typography sx={{ mb: '72px', color: 'white', fontSize: 16, fontWeight: 400 }}>
          Explore courses from officially recognized platforms and gain the certifications you need to excel. Want to
          grow with us? Become a trusted training partner today.
        </Typography>
        <Divider sx={{ mb: '12px', borderColor: 'white' }} />
        <Box sx={{ mb: '24px', display: 'flex', flexWrap: 'nowrap', gap: '24px' }}>
          <Typography
            sx={{
              flexBasis: '33.33%',
              flexGrow: 1,
              color: 'white',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '21px'
            }}
          >
            <span style={{ fontWeight: 700 }}>Online booking partner</span> for maritime training center.
          </Typography>
          <Typography
            sx={{
              flexBasis: '33.33%',
              flexGrow: 1,
              color: 'white',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '21px'
            }}
          >
            <span style={{ fontWeight: 700 }}>Alternative marketing channel</span> that will amplify your training
            center's exposure.
          </Typography>
          <Typography
            sx={{
              flexBasis: '33.33%',
              flexGrow: 1,
              color: 'white',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '21px'
            }}
          >
            Partner for <span style={{ fontWeight: 700 }}>E-learning provider.</span>
          </Typography>
        </Box>
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
      <Grid
        item
        xs={6}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box component='img' src='/images/training-card.png' sx={{ width: '480px', height: '320px' }} />
      </Grid>
    </Grid>
  )
}

export default TrainerPlatformView
