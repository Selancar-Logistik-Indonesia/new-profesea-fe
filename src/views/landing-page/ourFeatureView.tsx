import { Icon } from '@iconify/react'
import { Box, Grid, Typography } from '@mui/material'

const OurFeatureView = () => {
  return (
    <Grid container sx={{ display: 'flex', flexWrap: 'nowrap', gap: '32px' }}>
      <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
        <Typography sx={{ color: '#303030', fontSize: 48, fontWeight: 700 }}>
          Advance Your Network with Our Innovative Features
        </Typography>
        <Grid
          container
          sx={{ backgroundColor: '#9DC7F2', borderRadius: '20px', display: 'flex', gap: '32px', p: '20px' }}
        >
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:chats-circle' color='white' fontSize={28} />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '20px'
                }}
              >
                Social Media
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '21px'
                }}
              >
                Place where you can share insights, showcase your skills, and connect with interesting fellow companies
                and other candidates in the industry.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:users-three' color='white' fontSize={28} />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '20px'
                }}
              >
                Community
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '21px'
                }}
              >
                Join our vibrant community where you can support and inspire each other to chart a successful career
                path.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            <Box sx={{ flexShrink: 0, height: '24px' }}>
              <Icon icon='ph:student' color='white' fontSize={28} />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: '20px'
                }}
              >
                Groups & Alumni
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '21px'
                }}
              >
                Build and maintain connections to help you stay ahead in this industry.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          backgroundColor: '#CBE2F9',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        GIF
      </Grid>
    </Grid>
  )
}

export default OurFeatureView
