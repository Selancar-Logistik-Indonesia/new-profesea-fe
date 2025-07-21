import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
  Link
} from '@mui/material'
import { Icon } from '@iconify/react'
import ISocialFeed from 'src/contract/models/social_feed'
import ImageListFeed from '../social-feed/ImageListFeed'
import { getUrl, getUserAvatar, toTitleCase } from 'src/utils/helpers'
import moment from 'moment'
import ButtonLike from '../social-feed/ButtonLike'
import { useEffect, useState } from 'react'
import CommentAreaView from '../social-feed/CommentAreaView'
import { useAuth } from 'src/hooks/useAuth'
import CommunityFeedAction from './CommunityFeedAction'
import ButtonShare from '../social-feed/ButtonShare'
import { useSearchParams } from 'next/navigation'
import { usePublicData } from 'src/hooks/usePublicData'

interface IPostCardCommunityProps {
  feed: ISocialFeed
  isPage?: boolean
}

export interface IActionAbilities {
  canDelete: boolean
  canReport: boolean
  canPin: boolean
  canEdit: boolean
}

const PostCardCommunity: React.FC<IPostCardCommunityProps> = ({ feed, isPage }) => {
  const { user } = useAuth()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))
  const [isLike, setIsLike] = useState(Boolean(feed.liked_at))
  const params = useSearchParams()
  const insideDetail = params.get('id')
  const [shareUrl, setShareUrl] = useState<string | null>(null)

  const [abilities, setAbilities] = useState<IActionAbilities>({
    canDelete: feed?.user?.id === user?.id || user?.role === 'admin' || user?.id === feed?.community?.user_id,
    canReport: feed?.user?.id !== user?.id || user?.role !== 'admin',
    canPin: user?.role === 'admin' || user?.id === feed?.community?.user_id,
    canEdit: feed?.user?.id === user?.id
  })

  const { unauthenticatedUserAction } = usePublicData()

  useEffect(() => {
    setAbilities({
      canDelete: feed?.user?.id === user?.id || user?.role === 'admin' || user?.id === feed?.community?.user_id,
      canReport: user !== null && feed?.user?.id !== user?.id && user?.role !== 'admin',
      canPin: user?.role === 'admin' || user?.id === feed?.community?.user_id,
      canEdit: feed?.user?.id === user?.id
    })
  }, [])

  useEffect(() => {
    setShareUrl(getUrl(`/community/feed/${feed.id}`))
  }, [feed.id])

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: user?.role === 'admin' || isPage ? '100%' : 600,
        margin: 'auto',
        borderRadius: '12px',
        background: '#FFF',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
        padding: '0px 0px 8px 0px'
      }}
    >
      <Box
        sx={{
          display: feed?.settings?.is_pinned ? 'flex' : 'none',
          alignItems: 'center',
          gap: '4px',
          ml: 3,
          padding: '8px'
        }}
      >
        <Icon icon='ph:push-pin-simple-fill' fontSize={18} />
        <Typography>Pinned Post</Typography>
      </Box>
      <CardHeader
        sx={{ padding: feed?.settings?.is_pinned ? '0px 16px 0px 16px !important' : '' }}
        avatar={<Avatar alt='profile-picture' src={getUserAvatar(feed.user)} sx={{ width: 36, height: 36 }} />}
        action={<CommunityFeedAction row={feed} abilities={abilities} />}
        title={
          insideDetail ? (
            <Typography
              component={Link}
              href={feed?.user?.team_id != 2 ? `/company/${feed?.user?.username}` : `/profile/${feed?.user?.username}`}
              sx={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#2D3436',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              {toTitleCase(feed.user.name)}
            </Typography>
          ) : (
            <Typography
              component={Link}
              href={`/community/${feed?.community?.id}`}
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#2D3436',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
              fontWeight='bold'
            >
              {feed?.community?.name}
            </Typography>
          )
        }
        subheader={
          <Stack direction='row' spacing={1} alignItems='center'>
            {insideDetail ? (
              ''
            ) : (
              <>
                <Typography
                  component={Link}
                  href={
                    feed?.user?.team_id != 2 ? `/company/${feed?.user?.username}` : `/profile/${feed?.user?.username}`
                  }
                  sx={{
                    fontSize: '12px',
                    fontWeight: '400',
                    color: '#5E5E5E',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  {toTitleCase(feed.user.name)}
                </Typography>
                <span>•</span>
              </>
            )}
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '400',
                color: '#5E5E5E'
              }}
            >
              {moment(feed.created_at).fromNow()}
            </Typography>
            <span>•</span>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: '400',
                color: '#5E5E5E',
                gap: '4px'
              }}
            >
              <Icon icon={feed?.community?.is_private ? 'ph:lock-key' : 'ph:globe-hemisphere-west'} fontSize={'14px'} />
              {feed?.community?.is_private ? 'Private Group' : 'Public Group'}
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            color: '#1F1F1F',
            lineHeight: '1.5',
            textAlign: 'justify',
            whiteSpace: 'pre-line',
            mb: feed?.content_type !== 'text' ? '8px' : '0px'
          }}
        >
          {feed?.content}
        </Typography>
        <Box sx={{ mx: '-24px', display: 'flex', flexDirection: 'column' }}>
          {feed.content_type !== 'text' && <ImageListFeed item={feed} />}
        </Box>
      </CardContent>

      <Box my={'16px'}>
        <Stack direction='row' spacing={3} alignItems='center' justifyContent={'space-between'} px={'24px'}>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 400, color: '#32497A', gap: 1 }}
          >
            <Icon icon='ph:thumbs-up' fontSize={16} />
            {feed?.count_likes}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 400, color: '#32497A', gap: 1 }}
          >
            <Icon icon='ci:chat-circle' fontSize={16} />
            {feed?.count_comments}
          </Typography>
        </Stack>
      </Box>

      <Divider />
      <Box display='flex' justifyContent='space-between' mt={'8px'} px={'24px'} sx={{ alignItems: 'center' }}>
        <Box flex={1} textAlign='left'>
          <ButtonLike
            item={{
              id: feed.id,
              count_likes: feed.count_likes,
              liked_at: feed.liked_at,
              isLiked: isLike,
              setIsLiked: setIsLike,
              set_count_likes: (count: number) => {
                feed.count_likes = count
              }
            }}
            likeableType='feed'
            isXs={isXs}
            customAction={!user ? unauthenticatedUserAction : undefined}
          />
        </Box>
        <Box flex={1} textAlign='center'>
          <Button
            startIcon={<Icon icon={'majesticons:chat-line'} fontSize={16} />}
            size='small'
            sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize', color: '#32497A' }}
          >
            Comment
          </Button>
        </Box>
        <Box flex={1} textAlign='right'>
          {shareUrl && <ButtonShare feedPage={shareUrl} isXs={isXs} />}
        </Box>
      </Box>

      {/* comment area */}
      <Box px={'24px'} py={user ? '16px' : '0px'}>
        <CommentAreaView item={feed} />
      </Box>
    </Card>
  )
}

export default PostCardCommunity
