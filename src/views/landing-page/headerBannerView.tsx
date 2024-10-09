import { Avatar, Box, Button, Card, Divider, Grid, Typography } from '@mui/material'
import Link from 'next/link'

const personData = [
  {
    name: 'John Doe',
    position: 'Captain',
    company: 'Global Maritime Co.',
    quotes:
      'Profesea has been a game-changer for my career. I found the perfect training programs to upgrade my certifications and it helped me connect with top employers across the globe. Highly recommended!'
  },
  {
    name: 'Michael Tan',
    position: 'Seafarer',
    company: null,
    quotes:
      'Thanks to Profesea, I was able to easily discover training centers that met my needs and land a better job after getting my certifications. It’s truly a one-stop solution for maritime professionals.'
  },
  {
    name: 'Anna Smith',
    position: 'HR Manager',
    company: 'SeaLogix Logistics',
    quotes:
      'Finding qualified talent used to be a struggle, but Profesea has streamlined the process. The platform’s candidate matching tool saved us time and connected us with the best maritime talents.'
  }
]

const PersonCard = ({ item }: { item: any }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'rgba(191, 191, 191, 0.20)',
        padding: '24px',
        border: '1px solid white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        height: '100%'
      }}
    >
      <Typography
        sx={{
          WebkitTextStrokeWidth: 1,
          WebkitTextStrokeColor: 'var(--Neutral-0, #FFF)',
          color: 'transparent',
          fontFamily: 'Recoleta',
          lineHeight: 1,
          fontSize: 64,
          fontWeight: 700
        }}
      >
        “
      </Typography>
      <Typography
        sx={{
          color: 'white',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '21px',
          textAlign: 'justify'
        }}
      >
        "{item.quotes}"
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Avatar
          src='/images/no-image.jpg'
          alt={item.name}
          sx={{ border: '3px solid white', width: '76px', height: '76px' }}
        >
          {item.name}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 700 }}>{item.name}</Typography>
          <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 400 }}>{`${item.position}${
            item.company ? `, ${item.company}` : ''
          }`}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

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
