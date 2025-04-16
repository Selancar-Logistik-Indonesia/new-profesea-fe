import { Grid, Skeleton } from '@mui/material'
import { Box } from '@mui/system'

const TrainingDetailsSkeleton = () => {
  return (<Grid container>
    {/* main detail */}
    <Grid item xs={9} spacing={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', mr: 4 }}>
        <Skeleton variant='rectangular' width={'100%'} height={'400px'} />

        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: '1.95rem',
            boxShadow: '0px 2px 10px 0px #00000014',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Skeleton variant='text' width={200} height={32} />
            <Skeleton variant='text' width={200} height={32} />
            <Skeleton variant='text' width={200} height={32} />
            <Skeleton variant='text' width={200} height={32} />
          </Box>

          <Box>
            <Skeleton variant='text' width={200} height={32} />
            <Skeleton variant='text' width={200} height={32} />
          </Box>
        </Box>
      </Box>
    </Grid>
    {/* action */}
    <Grid item xs={3} sx={{ position: 'sticky' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 10px 0px #00000014',
          borderRadius: '8px',
          padding: '1.45rem',
          gap: 2
        }}
      >
        <Skeleton variant='text' width={200} height={32} />
        <Skeleton variant='text' width={200} height={32} />
        <Skeleton variant='text' width={200} height={32} />
      </Box>
    </Grid>
  </Grid>)
  
}

export default TrainingDetailsSkeleton
