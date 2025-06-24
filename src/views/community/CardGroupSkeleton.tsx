import { Card, CardContent, CardActions, Skeleton, Box, Stack } from '@mui/material'

const CardGroupSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <Skeleton variant='rectangular' height={120} />

      <CardContent sx={{ padding: '12px !important' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 10,
            width: '90%'
          }}
        >
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'row' }}>
            <Skeleton variant='circular' width={24} height={24} />
            <Skeleton width={80} height={16} />
          </Box>
          <Box>
            <Skeleton variant='circular' width={32} height={32} />
          </Box>
        </Box>

        <Skeleton width='60%' height={20} sx={{ mb: '16px' }} />

        <Stack direction='row' spacing={3} sx={{ mb: 1, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Skeleton variant='circular' width={12} height={12} />
            <Skeleton width={60} height={14} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Skeleton variant='circular' width={12} height={12} />
            <Skeleton width={60} height={14} />
          </Box>
        </Stack>

        <Stack direction='row' spacing={3} sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Skeleton variant='circular' width={12} height={12} />
            <Skeleton width={60} height={14} />
          </Box>
        </Stack>

        <Skeleton width='100%' height={40} />
      </CardContent>

      <CardActions sx={{ padding: '12px !important' }}>
        <Skeleton variant='rectangular' height={36} width='100%' />
      </CardActions>
    </Card>
  )
}

export default CardGroupSkeleton
