import Box from '@mui/material/Box'
import { Avatar, Button, Card, CircularProgress, TextField } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { getCleanErrorMessage, getUserAvatar } from 'src/utils/helpers';
import { useSocialFeed } from 'src/hooks/useSocialFeed';
import { useState } from 'react';
// import ButtonUploadVideo from './ButtonUploadVideo';
// import ButtonUploadPhoto from './ButtonUploadPhoto';

const PostFeedUpdate = (props: { feed: any }) => {
  const { user } = useAuth()
  const { EditupdateStatus } = useSocialFeed()
  const [content, setContent] = useState(props.feed?.content)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateStatus = async () => {
    setIsLoading(true)
    try {
      await EditupdateStatus({
        content_type: 'text',
        content: content,
        id: props.feed.id
      })
      window.location.reload()

      setContent('')
    } catch (error) {
      alert(getCleanErrorMessage(error))
    }

    setIsLoading(false)
  }

  return (
    <Card
      sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF', padding: { xs: 3, md: 5 } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box mr={3} mt={1}>
          <Avatar src={getUserAvatar(user!)} alt='profile-picture' sx={{ height: 50, width: 50 }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            value={content}
            multiline
            fullWidth 
            rows={3}
            placeholder='Start a post'
            variant='standard'
            onChange={e => setContent(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, alignItems: 'end' }}>
        {/* <Box>
          <ButtonUploadPhoto />
          <ButtonUploadVideo />
        </Box> */}
        <Box flexGrow={1} textAlign='right'>
          <Button
            sx={{ width: 45 }}
            disabled={isLoading}
            onClick={handleUpdateStatus}
            size='small'
            color='primary'
            variant='contained'
          >
            {isLoading ? <CircularProgress /> : 'Post'}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default PostFeedUpdate
