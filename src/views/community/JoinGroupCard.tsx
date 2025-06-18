import React, { useEffect } from 'react'
import { Box, Typography, Avatar, Button, Divider, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services'
import JoinGroupCardSkeleton from './JoinGroupCardSkeleton'

interface Group {
  id: string
  name: string
  image: string
  members: number
  discussions: number
  is_joined: boolean
}

const JoinGroupCard = () => {
  const [loading, setLoading] = React.useState(false)
  const [communities, setCommunities] = React.useState<Group[]>([])

  const fetchCommunities = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get(`/community?take=3&page=1`)

      setCommunities(
        response.data?.data.map((d: any) => {
          return {
            id: d?.id,
            name: d?.name,
            image: d?.banner_url,
            members: d?.total_members,
            discussions: d?.total_feeds,
            is_joined: d?.is_joined
          }
        }) || []
      )
    } catch (error) {
      console.error('Failed to fetch communities', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommunities()
  }, [])

  if (loading) {
    return <JoinGroupCardSkeleton />
  }
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
        width: '100%',
        maxWidth: 320
      }}
    >
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 700,
          textAlign: 'center',
          mb: 2
        }}
      >
        Join group
      </Typography>

      {communities.map((group, index) => (
        <Box key={group.id + index} sx={{ mb: 2 }}>
          <Stack spacing={1} alignItems='center' gap={'12px'}>
            <Avatar src={group.image} sx={{ width: 60, height: 60 }} />
            <Typography fontSize={'16px'} fontWeight={700} color={'#2D3436'}>
              {group.name}
            </Typography>

            <Stack direction='row' spacing={1} alignItems='center'>
              <Icon icon='ph:user-thin' fontSize={16} color='#999' />
              <Typography variant='body2' color='text.secondary'>
                {group.members} members
              </Typography>
              <Icon icon='bi:chat-dots' fontSize={16} color='#999' style={{ marginLeft: '10px' }} />
              <Typography variant='body2' color='text.secondary'>
                {group.discussions} discussions
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} sx={{ width: '100%' }}>
              <Button variant='outlined' size='small' sx={{ textTransform: 'none', flex: 1 }}>
                View group
              </Button>
              {!group?.is_joined && (
                <Button variant='contained' size='small' sx={{ textTransform: 'none', flex: 1 }}>
                  Join group
                </Button>
              )}
            </Stack>
          </Stack>
          <Divider sx={{ my: '16px' }} />
        </Box>
      ))}

      <Box display='flex' justifyContent='center' mt={1}>
        <Button size='small' endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none' }}>
          Show all
        </Button>
      </Box>
    </Box>
  )
}

export default JoinGroupCard
