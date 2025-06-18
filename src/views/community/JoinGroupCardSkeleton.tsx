import React from 'react'
import { Box, Skeleton, Stack, Divider } from '@mui/material'

const JoinGroupCardSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '24px 16px',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: 320
      }}
    >
      <Skeleton variant='text' width={120} height={28} sx={{ mx: 'auto', mb: 2 }} />

      {[1, 2, 3].map((_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Stack spacing={1} alignItems='center'>
            <Skeleton variant='circular' width={60} height={60} />
            <Skeleton variant='text' width={140} height={24} />

            <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
              <Skeleton variant='text' width={60} height={16} />
              <Skeleton variant='text' width={60} height={16} />
            </Stack>

            <Stack direction='row' spacing={1} mt={1}>
              <Skeleton variant='rectangular' width={90} height={36} sx={{ borderRadius: 1 }} />
              <Skeleton variant='rectangular' width={90} height={36} sx={{ borderRadius: 1 }} />
            </Stack>
          </Stack>

          {index !== 2 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}

      <Box display='flex' justifyContent='center' mt={1}>
        <Skeleton variant='text' width={80} height={24} />
      </Box>
    </Box>
  )
}

export default JoinGroupCardSkeleton
