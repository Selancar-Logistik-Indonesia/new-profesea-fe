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

interface IPostCardCommunityProps {
  feed: ISocialFeed
}

const PostCardCommunity: React.FC<IPostCardCommunityProps> = () => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        borderRadius: '12px',
        background: '#FFF',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
        padding: '24px 0px 16px 0px'
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt='Komunitas Anak Kapal'
            src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e' // Ganti dengan URL kapal
          />
        }
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
            Komunitas Anak Kapal
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
              Ryza Muhammad • 3 hours ago
            </Typography>
            <span>•</span>
            <LockIcon sx={{ color: 'gray', width: '13px', height: '13px' }} />
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '400',
                color: '#5E5E5E'
              }}
            >
              Private group
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
            lineHeight: '1.5'
          }}
        >
          Banyak yang betah kerja di kapal karena gaji besar, tapi ada juga yang lebih nyaman kerja di darat untuk dekat
          keluarga. Kalau kalian, lebih suka yang mana? Dan kenapa? Diskusi yuk! 🧑‍✈️🚢
        </Typography>
      </CardContent>

      <Box my={'16px'}>
        <Stack direction='row' spacing={3} alignItems='center' justifyContent={'space-between'} px={'24px'}>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 400, color: '#32497A' }}
          >
            <ThumbUpAltOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
            100
          </Typography>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 400, color: '#32497A' }}
          >
            <ChatBubbleOutlineOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
            20
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
