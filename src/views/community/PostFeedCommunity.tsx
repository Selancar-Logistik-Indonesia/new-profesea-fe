import { Icon } from '@iconify/react'
import { Avatar, Box, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { getUserAvatar } from 'src/utils/helpers'
import PostFeedDialog from '../social-feed/PostFeedDialog'

const PostFeedCommunity = () => {
  const { user } = useAuth()
  const [contentType, setContentType] = useState('text')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenDialogPostFeed, setIsOpenDialogPostFeed] = useState(false)

  const handleOnCloseDialogPostFeed = () => {
    setIsOpenDialogPostFeed(!isOpenDialogPostFeed)
  }

  const handleOpenDialogPostFeed = (contentType: string) => {
    setIsOpenDialogPostFeed(true)
    setContentType(contentType)
  }

  const handlePostFeed = async (
    content_type: string,
    content: string,
    attachments?: any,
    community_id?: any,
    is_anon?: boolean
  ) => {
    console.log(content_type, content, attachments, community_id, is_anon)
  }

  return (
    <>
      <PostFeedDialog
        contentTypeFromParent={contentType}
        isLoading={isLoading}
        isOpen={isOpenDialogPostFeed}
        onClose={handleOnCloseDialogPostFeed}
        user={user}
        handleUpdateStatus={handlePostFeed}
        isCommunity={true}
      />
      <Card
        sx={{
          border: 0,
          boxShadow: 0,
          color: 'common.white',
          backgroundColor: '#FFFFFF',
          padding: { xs: 3, md: 5 },
          borderRadius: '12px !important'
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid rgba(219, 219, 219, 1)', pb: '10px' }}
        >
          <Box mr={3} mt={1}>
            <Avatar src={getUserAvatar(user!)} alt='profile-picture' sx={{ height: 50, width: 50 }} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '10px'
            }}
          >
            <Button
              onClick={() => setIsOpenDialogPostFeed(true)}
              sx={{
                width: '100%',
                borderRadius: '30px !important',
                backgroundColor: 'rgba(240, 240, 240, 1)',
                textTransform: 'capitalize',
                justifyContent: 'flex-start !important',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(102, 102, 102, 1)'
              }}
            >
              Write something...
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, alignItems: 'end' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              onClick={() => handleOpenDialogPostFeed('images')}
              size='small'
              variant='text'
              sx={{ textDecoration: 'none', textTransform: 'capitalize' }}
            >
              <Icon icon='icon-park-outline:picture-album' fontSize={24} color='#4CAF50' />
              <div style={{ marginLeft: 5, fontWeight: 700, fontSize: '14px', color: 'rgba(94, 94, 94, 1)' }}>
                Photo
              </div>
            </Button>
            <Button
              onClick={() => handleOpenDialogPostFeed('videos')}
              size='small'
              variant='text'
              sx={{ textDecoration: 'none', textTransform: 'capitalize' }}
            >
              <Icon icon='icon-park-outline:video' fontSize={24} color='#FF5722' />
              <div style={{ marginLeft: 5, fontWeight: 700, fontSize: '14px', color: 'rgba(94, 94, 94, 1)' }}>
                Video
              </div>
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default PostFeedCommunity
