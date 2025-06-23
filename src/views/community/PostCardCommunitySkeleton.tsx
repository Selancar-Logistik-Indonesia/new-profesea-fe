import { Box, Card, CardContent, CardHeader, IconButton, Divider, Stack, Skeleton } from '@mui/material'

const PostCardCommunitySkeleton = () => {
  return (
    <Card
      sx={{
        width: '100%',
        margin: 'auto',
        borderRadius: '12px',
        background: '#FFF',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
        padding: '24px 0px 16px 0px'
      }}
    >
      <CardHeader
        avatar={<Skeleton variant='circular' width={40} height={40} />}
        action={
          <IconButton disabled>
            <Skeleton variant='circular' width={24} height={24} />
          </IconButton>
        }
        title={<Skeleton variant='text' width={180} height={20} sx={{ fontSize: '16px' }} />}
        subheader={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Skeleton variant='text' width={120} height={16} sx={{ fontSize: '12px' }} />
            <span>•</span>
            <Skeleton variant='circular' width={13} height={13} />
            <Skeleton variant='text' width={80} height={16} sx={{ fontSize: '12px' }} />
          </Stack>
        }
      />
      <CardContent>
        <Skeleton variant='text' width='100%' height={16} sx={{ fontSize: '14px', mb: 1 }} />
        <Skeleton variant='text' width='90%' height={16} sx={{ fontSize: '14px', mb: 1 }} />
        <Skeleton variant='text' width='75%' height={16} sx={{ fontSize: '14px' }} />
      </CardContent>

      <Box my={'16px'}>
        <Stack direction='row' spacing={3} alignItems='center' justifyContent={'space-between'} px={'24px'}>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Skeleton variant='circular' width={20} height={20} />
            <Skeleton variant='text' width={30} height={16} />
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Skeleton variant='circular' width={20} height={20} />
            <Skeleton variant='text' width={20} height={16} />
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <Box display='flex' justifyContent='space-between' mt={'16px'} px={'24px'}>
        <Box flex={1} textAlign='left'>
          <Stack direction='row' alignItems='center' spacing={0.5}>
            <Skeleton variant='circular' width={16} height={16} />
            <Skeleton variant='text' width={40} height={16} />
          </Stack>
        </Box>
        <Box flex={1} textAlign='center'>
          <Stack direction='row' alignItems='center' justifyContent='center' spacing={0.5}>
            <Skeleton variant='circular' width={16} height={16} />
            <Skeleton variant='text' width={60} height={16} />
          </Stack>
        </Box>
        <Box flex={1} textAlign='right'>
          <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={0.5}>
            <Skeleton variant='circular' width={16} height={16} />
            <Skeleton variant='text' width={40} height={16} />
          </Stack>
        </Box>
      </Box>
    </Card>
  )
}

export default PostCardCommunitySkeleton
