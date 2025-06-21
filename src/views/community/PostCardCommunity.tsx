import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Divider,
  Stack,
  Button
} from '@mui/material'
import { Icon } from '@iconify/react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import LockIcon from '@mui/icons-material/Lock'
import ISocialFeed from 'src/contract/models/social_feed'
import ImageListFeed from '../social-feed/ImageListFeed'
import { getUserAvatar, toTitleCase } from 'src/utils/helpers'
import moment from 'moment'

interface IPostCardCommunityProps {
  feed: ISocialFeed
}

const PostCardCommunity: React.FC<IPostCardCommunityProps> = ({ feed }) => {
  
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: 'auto',
        borderRadius: '12px',
        background: '#FFF',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
        padding: '24px 0px 16px 0px'
      }}
    >
      <CardHeader
        avatar={<Avatar alt='profile-picture' src={getUserAvatar(feed.user)} sx={{ width: 36, height: 36 }} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#2D3436'
            }}
            fontWeight='bold'
          >
            {feed?.community?.name}
          </Typography>
        }
        subheader={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '400',
                color: '#5E5E5E'
              }}
            >
              {toTitleCase(feed.user.name)}
            </Typography>
            <span>•</span>
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
                gap: '2px'
              }}
            >
              <LockIcon sx={{ color: 'gray', width: '13px', height: '13px' }} />
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
            mb: '24px'
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
            sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 400, color: '#32497A' }}
          >
            <ThumbUpAltOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
            {feed?.count_likes}
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 400, color: '#32497A' }}
          >
            <ChatBubbleOutlineOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
            {feed?.count_comments}
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Box display='flex' justifyContent='space-between' mt={'16px'} px={'24px'}>
        <Box flex={1} textAlign='left'>
          {/* if liked use this icon => material-symbols-light:thumb-up */}
          <Button
            startIcon={<Icon icon={'material-symbols-light:thumb-up-outline'} fontSize={16} />}
            size='small'
            sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize', color: '#32497A' }}
          >
            Like
          </Button>
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
          <Button
            startIcon={<Icon icon={'famicons:paper-plane-outline'} fontSize={16} />}
            size='small'
            sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize', color: '#32497A' }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default PostCardCommunity
