import React from 'react'
import { Card, CardActions, CardContent, Skeleton, Stack, Box } from '@mui/material'

const CardGroupCommunitySkeleton: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Skeleton variant='rectangular' height={120} />

      <CardContent sx={{ padding: '12px !important' }}>
        <Skeleton variant='text' width='60%' height={20} sx={{ mb: '16px' }} />

        <Stack direction='row' spacing={3} sx={{ mb: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Skeleton variant='circular' width={16} height={16} />
            <Skeleton variant='text' width={60} height={16} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Skeleton variant='circular' width={16} height={16} />
            <Skeleton variant='text' width={60} height={16} />
          </Box>
        </Stack>

        <Skeleton variant='text' width='100%' height={16} />
        <Skeleton variant='text' width='80%' height={16} />
      </CardContent>

      <CardActions sx={{ padding: '12px !important' }}>
        <Skeleton variant='rectangular' width={90} height={36} />
        <Skeleton variant='rectangular' width={90} height={36} />
      </CardActions>
    </Card>
  )
}

export default CardGroupCommunitySkeleton
