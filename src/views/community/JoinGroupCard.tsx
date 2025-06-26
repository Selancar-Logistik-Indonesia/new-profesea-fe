import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography, Avatar, Button, Divider, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services'
import JoinGroupCardSkeleton from './JoinGroupCardSkeleton'
import toast from 'react-hot-toast'
import { request } from 'http'

interface Group {
  id: string
  name: string
  image: string
  members: number
  discussions: number
  is_joined: boolean
  requested: boolean
  is_private: boolean
}

interface JoinGroupCardProps {
  setSelectedIndex: (index: any) => void
  showMore: () => void
}

const JoinGroupCard: React.FC<JoinGroupCardProps> = ({ setSelectedIndex, showMore }) => {
  const router = useRouter()
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
            is_joined: d?.is_joined,
            requested: d?.requested,
            is_private: d?.is_private
          }
        }) || []
      )
    } catch (error) {
      console.error('Failed to fetch communities', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGroup = async (id: any) => {
    let msg = 'Successfully joined the group!'

    try {
      await HttpClient.post(`/community/join-request?community_id=${id}`)

      const updatedGroup = communities.find(group => group.id === id)
      if (updatedGroup?.is_private) {
        msg = 'Your request to join the group has been sent. Please wait for approval.'
        setCommunities(prev =>
          prev.map(group => (group.id === id ? { ...group, requested: true, members: group.members + 1 } : group))
        )
      } else {
        setCommunities(prev =>
          prev.map(group => (group.id === id ? { ...group, is_joined: true, members: group.members + 1 } : group))
        )
      }

      toast.success(msg)
    } catch (error) {
      console.error('Failed to join group:', error)
      toast.error('Failed to join group. Please try again later.')
    }
  }

  const handleViewGroup = (id: any) => {
    router.push(`/community/?communityId=${id}`)
    setSelectedIndex(id)
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
              <Button
                variant='outlined'
                size='small'
                sx={{ textTransform: 'none', flex: 1 }}
                onClick={() => handleViewGroup(group.id)}
              >
                View group
              </Button>
              {!group?.is_joined && (
                <Button
                  variant='contained'
                  size='small'
                  sx={{ textTransform: 'none', flex: 1 }}
                  onClick={() => handleJoinGroup(group.id)}
                  disabled={group?.requested}
                >
                  {group?.requested ? ' Requested' : 'Join group'}
                </Button>
              )}
            </Stack>
          </Stack>
          <Divider sx={{ my: '16px' }} />
        </Box>
      ))}

      <Box display='flex' justifyContent='center' mt={1}>
        <Button size='small' endIcon={<ArrowForwardIcon />} sx={{ textTransform: 'none' }} onClick={() => showMore()}>
          Show all
        </Button>
      </Box>
    </Box>
  )
}

export default JoinGroupCard
