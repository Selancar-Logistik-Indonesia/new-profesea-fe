import { Box, Grid, Stack, Typography } from '@mui/material'

const TrainingPartner = () => {
  return (
    <Box>
      <Box
        sx={{
          p: 4,
          backgroundColor: '#FFF',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }} fontSize={18}>
          Training Partners
        </Typography>
      </Box>
      <Stack spacing={3} mt={2}>
        <Grid item sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <img
            alt='logo'
            src={'/images/training-partner1.jpg'}
            style={{
              width: '100%',
              aspectRatio: '1',
              backgroundColor: '#FFF',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Grid>
        <Grid item sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <img
            alt='logo'
            src={'/images/training-partner2.jpg'}
            style={{
              width: '100%',
              aspectRatio: '1',
              backgroundColor: '#FFF',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            p: '12px',
            backgroundColor: '#FFF',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <img
            alt='logo'
            src={'/images/training-partner3.jpg'}
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover'
            }}
          />
        </Grid>
      </Stack>
    </Box>
  )
}

export default TrainingPartner
