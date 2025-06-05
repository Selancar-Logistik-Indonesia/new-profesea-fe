import { Box, Typography, Container } from '@mui/material'

export default function BannerOnboarding() {
  return (
    <Container maxWidth='xl' sx={{ padding: '0px !important' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          borderRadius: '8px',
          overflow: 'hidden',
          minHeight: { xs: 200, md: 300 },
          boxShadow: 3
        }}
      >
        {/* Left side - Text content with gradient background */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '0 0 50%' },
            background: 'linear-gradient(180deg, #2662EC 0%, #00C0FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, md: 6 }
          }}
        >
          <Box sx={{ maxWidth: 500 }}>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
                fontSize: '20px',
                textAlign: 'center'
              }}
            >
              Welcome to The Community!
            </Typography>
            <Typography
              sx={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                textAlign: 'center'
              }}
            >
              You're not part of any groups yet — but that just means the fun is about to begin. Following groups is the
              best way to stay updated, share ideas, and connect with like-minded people.
            </Typography>
          </Box>
        </Box>

        {/* Right side - Image */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '0 0 50%' },
            minHeight: { xs: 250, md: 'auto' },
            backgroundImage: 'url(/images/banner-community.png?height=400&width=600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </Box>
    </Container>
  )
}
