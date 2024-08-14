import { Grid, GridProps, Typography, Box } from '@mui/material'

const Spinner = ({ sx }: { sx?: GridProps['sx'] }) => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <img alt='profesea logo' src='/images/pages/loading.gif' style={{ height: '150px' }} />
        <Typography sx={{ fontSize: 12, fontWeight: 300 }}>
          Setting sail... your experience will begin shortly!
        </Typography>
      </Box>
    </Grid>
  )
}

export default Spinner
