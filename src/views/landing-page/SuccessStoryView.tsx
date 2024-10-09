import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material'
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
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(191, 191, 191, 0.2)',
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
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: '4px' }}>
            <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 700 }}>{item.name}</Typography>
            <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 400 }}>{`${item.position}${
              item.company ? `, ${item.company}` : ''
            }`}</Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}

const SuccessStoryView = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#739BE9',
        borderRadius: '20px',
        p: '64px 49px',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        gap: '32px'
      }}
    >
      <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'flex-start', flexDirection: 'column', gap: '32px' }}>
        <Typography sx={{ width: '185px', color: 'white', fontSize: 40, fontWeight: 700 }}>
          How they got onboard?
        </Typography>
        <Button
          component={Link}
          href='/register'
          variant='contained'
          size='large'
          sx={{
            backgroundColor: '#FFF',
            color: '#1F57C3',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
        >
          Learn more
        </Button>
      </Box>
      <Grid item container sx={{ flexGrow: 1, display: 'flex', flexWrap: 'nowrap' }} spacing={8}>
        {personData.map((person, i) => (
          <PersonCard key={i} item={person} />
        ))}
      </Grid>
    </Grid>
  )
}

export default SuccessStoryView
