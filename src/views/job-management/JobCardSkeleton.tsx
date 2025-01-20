import { Box, Grid, Skeleton } from '@mui/material'

const JobCardSkeleton = () => {
  return (
    <Box sx={{ p: '16px', border: '1.5px solid #E7E7E7', borderRadius: '6px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Skeleton variant='text' width={200} height={32} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Skeleton variant='text' width={180} height={24} />
              <Skeleton variant='text' width={160} height={24} />
              <Skeleton variant='text' width={170} height={24} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Skeleton variant='rounded' width={84} height={22} />
            <Skeleton variant='circular' width={24} height={24} />
          </Box>
        </Box>
        <Grid
          container
          sx={{
            display: 'flex',
            flexWrap: 1,
            justifyContent: 'space-between',
            borderRadius: '6px',
            backgroundColor: '#F8F8F7',
            p: '12px'
          }}
        >
          <Skeleton variant='rectangular' width='30%' sx={{ borderRadius: '6px', height: 80 }} />
          <Skeleton variant='rectangular' width='30%' sx={{ borderRadius: '6px', height: 80 }} />
          <Skeleton variant='rectangular' width='30%' sx={{ borderRadius: '6px', height: 80 }} />
        </Grid>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Skeleton variant='text' width={200} height={24} />
            <Skeleton variant='text' width={100} height={24} />
          </Box>
          <Skeleton variant='rounded' width='100%' height={6} />
        </Grid>
      </Box>
    </Box>
  )
}

export default JobCardSkeleton
