import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const HeaderBannerView = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#E9F4FF',
        padding: { xs: '48px', md: '120px' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: '54px',
        flexWrap: 'nowrap',
        alignItems: 'center'
      }}
    >
      <Grid item sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', md: '584px' } }}>
        <Typography sx={{ mb: '32px', color: 'black', fontSize: { xs: 32, md: 48 }, fontWeight: 800, width: '100%' }}>
          Maritime & Logistics Ecosystem Solutions
        </Typography>
        <Typography sx={{ mb: '32px', color: 'black', fontSize: 16, fontWeight: 400, width: '100%' }}>
          Discover limitless opportunities with our innovative all-in-one social media platform, connecting you to a
          vast network of maritime and logistics communities.
        </Typography>
        <Button
          component={Link}
          href='/register'
          variant='contained'
          size='large'
          sx={{
            width: 'fit-content',
            textTransform: 'none'
          }}
        >
          Join Now
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
      >
        Gambar
      </Grid>
    </Grid>
  )
}

export default HeaderBannerView
