import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const HeaderBannerView = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#E9F4FF',
        padding: '120px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        alignItems: 'center'
      }}
    >
      <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ mb: '32px', color: 'black', fontSize: 48, fontWeight: 800, width: '584px' }}>
          Maritime & Logistics Ecosystem Solutions
        </Typography>
        <Typography sx={{ mb: '32px', color: 'black', fontSize: 16, fontWeight: 400, width: '584px' }}>
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
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        Gambar
      </Grid>
    </Grid>
  )
}

export default HeaderBannerView
