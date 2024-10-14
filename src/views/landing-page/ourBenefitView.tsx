import { Box, Grid, Typography } from '@mui/material'

const benefitData = [
  {
    img: '/images/our-benefit1.png',
    title: 'Social media and community discussion forums',
    description:
      'Exchange ideas and expand your network with various professionals in the maritime and logistics industry.'
  },
  {
    img: '/images/our-benefit2.png',
    title: 'Maritime Career Assistance',
    description: 'Reminder and scheduled certification directly to your email.'
  },
  {
    img: '/images/our-benefit3.png',
    title: 'Available Anytime',
    description: 'Make your availability known and get spotlight by recruiters immediately.'
  },
  {
    img: '/images/our-benefit4.png',
    title: 'Create Your CV Anywhere & Anytime',
    description: 'Create, update, and upload your CV and Certificate realtime.'
  },
  {
    img: '/images/our-benefit5.png',
    title: 'Connect with Companies',
    description: 'Fresh candidates are able to connect with companies that suit their qualifications.'
  }
]

const BenefitCard = ({ item }: { item: any }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        alignItems: 'center',
        gap: '12px',
        maxWidth: '379'
      }}
    >
      <Box component='img' src={item.img ?? '/images/no-image.jpg'} sx={{ width: '140px', aspectRatio: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '8px', md: '16px' } }}>
        <Typography
          sx={{
            color: '#2D3436',
            fontSize: 18,
            fontWeight: 700,
            maxWidth: '379px',
            textAlign: { xs: 'left', md: 'center' }
          }}
        >
          {item.title}
        </Typography>
        <Typography
          sx={{
            color: '#868686',
            fontSize: 16,
            fontWeight: 400,
            maxWidth: '379px',
            textAlign: { xs: 'left', md: 'center' }
          }}
        >
          {item.description}
        </Typography>
      </Box>
    </Grid>
  )
}

const OurBenefitView = () => {
  return (
    <Grid container sx={{ px: { xs: '24px', md: 0 }, display: 'flex', flexDirection: 'column', gap: '44px' }}>
      <Typography sx={{ color: '#2D3436', fontSize: { xs: 18, md: 32 }, fontWeight: 700 }} align='center'>
        Unlocking Opportunities with Profesea
      </Typography>
      <Grid item container sx={{ display: 'flex', justifyContent: 'center' }} spacing={8}>
        {benefitData.map((item, i) => (
          <BenefitCard key={i} item={item} />
        ))}
      </Grid>
    </Grid>
  )
}

export default OurBenefitView
