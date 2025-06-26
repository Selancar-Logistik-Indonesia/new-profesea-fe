import React from 'react'
import { Box, Skeleton, Stack, Card, CardContent, Tabs, Tab } from '@mui/material'

const CommunityDetailSkeleton = () => {
  return (
    <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
      {/* Banner image */}
      <Skeleton variant='rectangular' height={300} width='100%' />

      <CardContent sx={{ p: '0px !important' }}>
        {/* Header Section */}
        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1} p={'24px'}>
          <Box width='100%'>
            <Skeleton variant='text' width={240} height={32} sx={{ mb: 1 }} />
            <Stack direction='row' spacing={3} alignItems='center'>
              <Skeleton variant='text' width={100} height={20} />
              <Skeleton variant='text' width={120} height={20} />
              <Skeleton variant='text' width={140} height={20} />
            </Stack>
          </Box>
          <Stack direction={'column'} spacing={2}>
            <Skeleton variant='rounded' width={120} height={36} />
            <Skeleton variant='rounded' width={120} height={36} />
          </Stack>
        </Stack>

        {/* Tabs */}
        <Tabs value={0} variant='fullWidth' sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
          <Tab label={<Skeleton variant='text' width={80} />} disabled />
          <Tab label={<Skeleton variant='text' width={100} />} disabled />
          <Tab label={<Skeleton variant='text' width={90} />} disabled />
        </Tabs>

        {/* About Box */}
        <Box p={'24px'}>
          <Box
            sx={{
              padding: '24px',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '6px'
            }}
          >
            <Skeleton variant='text' width={100} height={24} sx={{ mb: 1 }} />
            <Skeleton variant='text' width='100%' height={20} />
            <Skeleton variant='text' width='95%' height={20} />
            <Skeleton variant='text' width='90%' height={20} />
            <Skeleton variant='text' width='85%' height={20} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CommunityDetailSkeleton
