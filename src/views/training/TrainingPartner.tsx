import { Box, Card, Grid, Stack, Typography } from '@mui/material'

const TrainingPartner = () => {
  return (
    <Card>
      <Stack direction={'column'} gap={'24px'} sx={{ padding: '24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 'bold', color: '#32497A' }} fontSize={16}>
            Training Partners
          </Typography>
        </Box>
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
    </Card>
  )
}

export default TrainingPartner
