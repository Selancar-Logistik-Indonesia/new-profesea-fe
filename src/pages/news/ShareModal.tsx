import React from 'react'
import { Modal, Typography, IconButton, Button, InputBase, Stack, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'

interface ShareModalProps {
  open: boolean
  onClose: () => void
  shareUrl: string
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  minWidth: 400,
  maxWidth: '100vw'
}

export default function ShareModal({ open, onClose, shareUrl }: ShareModalProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch (err) {
      // fallback or error handling
    }
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const handleEmail = () => {
    window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`)
  }

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant='h6' sx={{ fontWeight: 700, mb: 3, color: '#25396F' }}>
          Where do you want to share?
        </Typography>
        <Stack direction='row' spacing={6} mb={3}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleWhatsApp}
          >
            <WhatsAppIcon sx={{ fontSize: 48, color: '#25D366', mb: 1 }} />
            <Typography variant='body2' sx={{ color: '#25396F', fontWeight: 500 }}>
              WhatsApp
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleFacebook}
          >
            <FacebookIcon sx={{ fontSize: 48, color: '#1877F3', mb: 1 }} />
            <Typography variant='body2' sx={{ color: '#25396F', fontWeight: 500 }}>
              Facebook
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleEmail}
          >
            <EmailIcon sx={{ fontSize: 48, color: '#25396F', mb: 1 }} />
            <Typography variant='body2' sx={{ color: '#25396F', fontWeight: 500 }}>
              Email
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E0E0E0',
            borderRadius: 2,
            px: 2,
            py: 1,
            mt: 2
          }}
        >
          <InputBase value={shareUrl} readOnly sx={{ flex: 1, fontSize: 18, color: '#25396F' }} />
          <Button
            variant='contained'
            sx={{
              ml: 2,
              borderRadius: 2,
              background: '#25396F',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.2,
              fontSize: 16
            }}
            onClick={handleCopy}
          >
            Copy link
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
