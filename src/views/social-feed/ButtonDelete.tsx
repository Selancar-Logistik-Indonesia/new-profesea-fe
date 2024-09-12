import { Icon } from '@iconify/react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  Typography
} from '@mui/material'

import { useState } from 'react'
import { useSocialFeed } from 'src/hooks/useSocialFeed'

type ButtonLikeParam = {
  id: number
  feedId?: number
  liked_at?: string
  count_likes: number
  deleteComment?: boolean
}

const ButtonDelete = (props: { item: ButtonLikeParam; variant?: 'no-icon' | 'settings' }) => {
  const { item, variant } = props
  const { deleteFeed, deleteComment } = useSocialFeed()
  const [dialogOpen, setOpenDialog] = useState(false)
  const [onLoading, setOnLoading] = useState(false)

  const handleClick = async () => {
    if (item.deleteComment) {
      setOnLoading(true)
      if (deleteComment !== undefined) {
        await deleteComment(item.id, item.feedId)
      }

      return
    }

    setOnLoading(true)
    await deleteFeed(item.id)
  }

  return (
    <>
      {variant === 'settings' ? (
        <ListItemButton disabled={onLoading} onClick={() => setOpenDialog(!dialogOpen)}>
          <Icon icon='fluent:delete-48-filled' fontSize={14} />
          <Typography sx={{ ml: 2 }}>Delete Post</Typography>
        </ListItemButton>
      ) : (
        <Button
          disabled={onLoading}
          sx={{
            color: variant ? 'error.main' : 'primary',
            fontSize: variant ? '12px' : '14px',
            fontWeight: variant ? 700 : 400,
            textTransform: 'none'
          }}
          variant={variant ? 'text' : undefined}
          size='small'
          onClick={() => setOpenDialog(!dialogOpen)}
          color='primary'
          startIcon={variant ? undefined : <Icon icon='fluent:delete-48-filled' fontSize={10} />}
        >
          Delete
        </Button>
      )}
      <Dialog open={dialogOpen} onClose={() => setOpenDialog(!dialogOpen)}>
        <DialogTitle>
          <Typography color='primary' fontWeight='700' fontSize={16}>
            You're about to delete this comment
          </Typography>
        </DialogTitle>
        <DialogContent>Are you sure you want to delete this comment.</DialogContent>
        <DialogActions>
          <Button size='small' variant='contained' onClick={() => setOpenDialog(!dialogOpen)}>
            Cancel
          </Button>
          <Button size='small' variant='contained' color='error' disabled={onLoading} onClick={handleClick}>
            {onLoading ? <CircularProgress style={{ fontSize: 16 }} /> : 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ButtonDelete
