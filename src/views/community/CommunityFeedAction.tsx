import { Icon } from '@iconify/react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ISocialFeed from 'src/contract/models/social_feed'
import { HttpClient } from 'src/services'
import ReportDialog from './ReportDialog'
import { IActionAbilities } from './PostCardCommunity'
import { handleClientScriptLoad } from 'next/script'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import { useAuth } from 'src/hooks/useAuth'
import { getCleanErrorMessage, getUserAvatar } from 'src/utils/helpers'

const CommunityFeedAction = ({ row, abilities }: { row: ISocialFeed; abilities: IActionAbilities }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)
  const [open, setOpen] = useState<boolean>(false)
  const [openReport, setOpenReport] = useState<boolean>(false)
  const [openPin, setOpenPin] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ReportDialog open={openReport} onClose={() => setOpenReport(false)} social_feed_id={row.id} />
      <PinPostDialog open={openPin} onClose={() => setOpenPin(false)} row={row} />
      <DeletePostDialog open={openDelete} onClose={() => setOpenDelete(false)} row={row} />
      <EditPostDialog open={openEdit} onClose={() => setOpenEdit(false)} item={row} />
      <Box>
        <IconButton
          id={`basic-button-${row.id}`}
          aria-controls={isOpen ? `basic-menu-${row.id}` : undefined}
          aria-haspopup='true'
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={handleOpenMenu}
        >
          <Icon icon='ph:dots-three-vertical' fontSize={20} color={'#404040'} />
        </IconButton>
        <Menu
          id={`basic-menu-${row.id}`}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem
            onClick={() => {
              setOpenPin(true)
              handleClose()
            }}
            sx={{ display: abilities.canPin ? 'flex' : 'none', alignItems: 'center', gap: '8px' }}
          >
            {row?.settings?.is_pinned ? 'Unpin Post' : 'Pin Post'}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenEdit(true)
              handleClose()
            }}
            sx={{ display: abilities.canEdit ? 'flex' : 'none', alignItems: 'center', gap: '8px' }}
          >
            Edit Post
          </MenuItem>
          <MenuItem
            onClick={() => setOpenReport(true)}
            sx={{ display: abilities.canReport ? 'flex' : 'none', alignItems: 'center', gap: '8px' }}
          >
            Report Post
          </MenuItem>
          <MenuItem
            onClick={() => setOpenDelete(true)}
            sx={{ display: abilities.canDelete ? 'flex' : 'none', alignItems: 'center', gap: '8px' }}
          >
            Delete Post
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

const PinPostDialog = ({ open, onClose, row }: { open: boolean; onClose: () => void; row: ISocialFeed }) => {
  const handlePin = () => {
    HttpClient.post(`/social-feed/${row.id}/pin`)
      .then(res => {
        if (res.status === 200) {
          toast.success('Post pinned.')

          setTimeout(() => {
            onClose()
            window.location.reload()
          }, 2000)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Failed to pin post.')
      })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          borderBottom: '1px solid ##F8F8F7',
          boxShadow: '0px 2px 10px 0px #00000014',
          alignItems: 'center',
          padding: '16px 0px'
        }}
      >
        <Typography sx={{ fontSize: '16px !important', fontWeight: 700, color: '#303030', mx: 'auto' }}>
          {row?.settings?.is_pinned ? 'Unpin post on community' : 'Pin post on community'}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ height: '40px', width: '40px', position: 'absolute', top: '9px', right: '16px' }}
        >
          <Icon icon='material-symbols:close' fontSize={24} />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#404040', textAlign: 'center' }}>
          {row?.settings?.is_pinned
            ? 'Are you sure want to unpin this post?'
            : 'Are you sure want to make this the first post members see when they visit the group?'}
        </Typography>
      </DialogContent>
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          borderTop: '1px solid ##F8F8F7',
          boxShadow: '0px 2px 10px 0px #00000014',
          alignItems: 'center',
          padding: '16px 16px'
        }}
      >
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            onClick={onClose}
            sx={{
              width: '100%',
              backgroundColor: '#F0F0F0',
              color: '#999999',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#FFFFFF' }
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button size='small' variant='contained' onClick={handlePin} sx={{ width: '100%', textTransform: 'none' }}>
            {row?.settings?.is_pinned ? 'Unpin' : 'Pin'}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}
const DeletePostDialog = ({ open, onClose, row }: { open: boolean; onClose: () => void; row: ISocialFeed }) => {
  const handleDelete = () => {
    HttpClient.del(`/social-feed/feed/${row.id}`)
      .then(res => {
        if (res.status === 200) {
          toast.success('Post deleted.')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Failed to delete post.')
      })

    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          borderBottom: '1px solid ##F8F8F7',
          boxShadow: '0px 2px 10px 0px #00000014',
          alignItems: 'center',
          padding: '16px 0px'
        }}
      >
        <Typography sx={{ fontSize: '16px !important', fontWeight: 700, color: '#303030', mx: 'auto' }}>
          Delete Post
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ height: '40px', width: '40px', position: 'absolute', top: '9px', right: '16px' }}
        >
          <Icon icon='material-symbols:close' fontSize={24} />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#404040', textAlign: 'center' }}>
          Are you sure want to delete this post?
        </Typography>
      </DialogContent>
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'center',
          borderTop: '1px solid ##F8F8F7',
          boxShadow: '0px 2px 10px 0px #00000014',
          alignItems: 'center',
          padding: '16px 16px'
        }}
      >
        <Grid item xs={6}>
          <Button
            size='small'
            variant='outlined'
            color='error'
            onClick={handleDelete}
            sx={{ width: '100%', textTransform: 'none' }}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button size='small' variant='contained' onClick={onClose} sx={{ width: '100%', textTransform: 'none' }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}

const EditPostDialog = (props: { item: ISocialFeed, open: boolean; onClose: () => void }) => {
  const { user } = useAuth()
  const { item, open, onClose } = props

  const { EditupdateStatus } = useSocialFeed()
  const [onLoading, setOnLoading] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    setContent(item.content)
  }, [item])

  const handleUpdateStatus = async () => {
    setOnLoading(true)
    try {
      await EditupdateStatus({
        id: item.id,
        content_type: item.content_type,
        attachments: item.attachments,
        content: content
      })

      await setContent('')
      window.location.reload()
    } catch (error) {
      alert(getCleanErrorMessage(error))
    }
    setOnLoading(false)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography color='primary' fontWeight='700' fontSize={16}>
            You're about to edit this post
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box mr={3} mt={1}>
              <Avatar src={getUserAvatar(user!)} alt={user?.name} sx={{ height: 50, width: 50 }} />
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
        </DialogContent>
        <DialogActions>
          <Button size='small' variant='contained' onClick={onClose}>
            Cancel
          </Button>
          <Button size='small' variant='contained' color='success' disabled={onLoading} onClick={handleUpdateStatus}>
            {onLoading ? <CircularProgress style={{ fontSize: 16 }} /> : 'Update post'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CommunityFeedAction
