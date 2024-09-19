import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  TextField,
  Typography
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import FeedCard from './FeedCard'
import ISocialFeed from 'src/contract/models/social_feed'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { getCleanErrorMessage } from 'src/utils/helpers'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const ButtonRepost = (props: { post: ISocialFeed; isXs?: boolean }) => {
  const { post, isXs } = props
  const [dialogOpen, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')
  const { updateStatus } = useSocialFeed()

  const handleUpdateStatus = async () => {
    setIsLoading(true)
    try {
      await updateStatus({
        content_type: 'text',
        content: content,
        feed_repost: JSON.stringify(post)
      })

      setContent('')
      setOpenDialog(false)
    } catch (error) {
      alert(getCleanErrorMessage(error))
    }

    setIsLoading(false)
  }

  return (
    <>
      <Button
        onClick={() => setOpenDialog(!dialogOpen)}
        sx={{
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'none'
        }}
        color='primary'
        startIcon={isXs ? undefined : <Icon icon='ph:repeat' fontSize={16} />}
      >
        Repost
      </Button>
      <Dialog
        fullWidth
        open={dialogOpen}
        onClose={() => setOpenDialog(!dialogOpen)}
        TransitionComponent={Transition}
        maxWidth='md'
      >
        <DialogTitle>
          <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
            Repost Feed
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FeedCard item={post} withBottomArea={false} />
          <TextField
            disabled={isLoading}
            sx={{ mt: 4 }}
            rows={2}
            value={content}
            multiline
            fullWidth
            placeholder='Write a caption'
            variant='standard'
            onChange={e => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ mt: '10px' }}>
          <Button size='small' variant='contained' onClick={() => setOpenDialog(!dialogOpen)}>
            Cancel
          </Button>
          <Button size='small' variant='contained' color='success' disabled={isLoading} onClick={handleUpdateStatus}>
            {isLoading ? <CircularProgress /> : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ButtonRepost
