// PostCard.tsx
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
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import LockIcon from '@mui/icons-material/Lock'

const PostCardCommunity = () => {
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
        title={<Typography fontWeight='bold'>Komunitas Anak Kapal</Typography>}
        subheader={
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body2' color='text.secondary'>
              Ryza Muhammad • 3 hours ago
            </Typography>
            <LockIcon fontSize='small' sx={{ color: 'gray' }} />
            <Typography variant='body2' color='text.secondary'>
              Private group
            </Typography>
          </Stack>
        }
      />
      <CardContent>
        <Typography variant='body1'>
          Banyak yang betah kerja di kapal karena gaji besar, tapi ada juga yang lebih nyaman kerja di darat untuk dekat
          keluarga. Kalau kalian, lebih suka yang mana? Dan kenapa? Diskusi yuk! 🧑‍✈️🚢
        </Typography>
      </CardContent>

      <Box px={2} pb={1}>
        <Stack direction='row' spacing={3} alignItems='center'>
          <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
            <ThumbUpAltOutlinedIcon fontSize='small' sx={{ mr: 0.5 }} />
            100
          </Typography>
          <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
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
