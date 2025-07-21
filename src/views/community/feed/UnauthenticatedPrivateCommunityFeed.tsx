import { Icon } from '@iconify/react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Community } from 'src/contract/models/community'
import { useAuth } from 'src/hooks/useAuth'
import { usePublicData } from 'src/hooks/usePublicData'

type Props = {
  community?: Community
}

const UnauthenticatedPrivateCommunityFeed = ({ community }: Props) => {
  const router = useRouter()
  const { user } = useAuth()
  const { unauthenticatedUserAction, setCustomLoginCardHeader } = usePublicData()

  const redirectToCommunityPage = (communityId?: number) => {
    router.push(`/community/${communityId}`)
  }

  useEffect(() => {
    setCustomLoginCardHeader(
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Avatar src={community?.banner || '/images/logoprofesea.png'} sx={{ width: 120, height: 120 }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>Sign in to Profesea to Join {community?.name}</Typography>
      </Box>
    )
  }, [])

  return (
    <Card sx={{ width: 600 }}>
      <CardMedia sx={{ height: 140, backgroundSize: 'contain' }} image={community?.banner} title='green iguana' />
      <CardContent sx={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography
            component='div'
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: '700',
              color: '#404040',
              gap: '10px'
            }}
          >
            <Icon icon={'ph:lock-key'} fontSize={'24px'} />
            This post is private
          </Typography>
          {user ? (
            <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '20px' }}>
              This post is only visible to members of{' '}
              <Link sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => redirectToCommunityPage(community?.id)}>
                {community?.name || ''}
              </Link>
            </Typography>
          ) : (
            <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '20px' }}>
              Join{' '}
              <Link sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => redirectToCommunityPage(community?.id)}>
                {community?.name || ''}
              </Link>{' '}
              to view this post.
              <br />
              Log in or create an account first.
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Button
            size='small'
            sx={{ width: '100%', py: 2, textTransform: 'none', fontSize: '14px' }}
            variant='contained'
            onClick={user ? () => redirectToCommunityPage(community?.id) : unauthenticatedUserAction}
          >
            {user ? 'Join Group' : 'Log In'}
          </Button>
          <Button size='small' sx={{ width: '100%', py: 2, textTransform: 'none' }} onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UnauthenticatedPrivateCommunityFeed
