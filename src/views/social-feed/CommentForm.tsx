import { useState } from 'react'
import { Avatar, Box, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import { getUserAvatar } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import { useSocialFeed } from 'src/hooks/useSocialFeed'

const CommentForm = (props: { feedId: number; replyable_type: 'feed' | 'comment', main_feed_id: number }) => {
  const [content, setContent] = useState('')
  const [onLoading, setOnLoading] = useState(false)
  const { user } = useAuth()
  const { postComment } = useSocialFeed()

  const handleSend = async () => {
    setOnLoading(true)
    try {
      await postComment(props.feedId, props.replyable_type, content, props.main_feed_id)
      setContent('')
    } catch (error) {}
    setOnLoading(false)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Avatar sx={{ height: 35, width: 35 }} src={getUserAvatar(user!)} />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          placeholder='Write a comment...'
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              setContent(prevContent => prevContent + '\n')
            }
          }}
          multiline
          minRows={1}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='start'
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  paddingLeft: '6px',
                  alignItems: 'center'
                }}
              >
                {onLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton color='primary' onClick={handleSend} sx={{ '&:hover': { backgroundColor: '#D8E6FF' } }}>
                    <Icon icon='ph:paper-plane-right-fill' fontSize={16} />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiInputBase-root': { p: '12px', borderRadius: '6px' },
            '& .MuiInputBase-input': { fontSize: '14px' }
          }}
        />
      </Box>
    </Box>
  )
}

export default CommentForm
