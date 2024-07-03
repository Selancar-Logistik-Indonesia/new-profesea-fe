import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type BlockDialog = {
  name: string
  visible: boolean
  onCloseClick: VoidFunction
}

function shareLink(username: string, url: string, via: string) {
  try {
    if (via === 'WhatsApp') {
      const whatsappUrl = `whatsapp://send?text=Hi! Take a look at ${username} profile on Profesea! ${encodeURIComponent(
        url
      )}`
      window.open(whatsappUrl, '_blank')
    } else if (via === 'Email') {
      const subject = encodeURIComponent('Check out this profile.')
      const body = encodeURIComponent(`Hi! Take a look at ${username} profile on Profesea! ${url}`)
      const emailUrl = `mailto:?subject=${subject}&body=${body}`
      window.open(emailUrl, '_blank')
    } else {
      navigator.clipboard.writeText(url)
    }
  } catch (error) {
    console.error('Error sharing link:', error)
  }
}

const DialogShare = (props: BlockDialog) => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('md'))
  const shareUrl = window.location.href
  const [isCopy, setIsCopy] = useState(false)
  const [hover, setHover] = useState(false)
  const username = props.name

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setIsCopy(true)
      setTimeout(() => setIsCopy(false), 1500)
    } catch (error) {
      console.error('Failed to copy: ', error)
      setIsCopy(false)
    }
  }

  const ShareButton = (props: { icon: string; type: string; iconColor?: string }) => {
    const { icon, type, iconColor } = props

    return (
      <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <Box
          onClick={() => shareLink(username, shareUrl, type)}
          sx={{
            p: '6px',
            border: '0.5px solid #949EA2',
            borderRadius: '50%',
            color: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          <Icon icon={icon} style={{ color: iconColor ? iconColor : '' }} fontSize={48} />
        </Box>
        <Typography fontSize={14}>{type}</Typography>
      </Grid>
    )
  }

  return (
    <Dialog fullWidth open={props.visible} onClose={props.onCloseClick} TransitionComponent={Transition} maxWidth='md'>
      <DialogContent dividers sx={{ position: 'relative' }}>
        <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: '20px' }}>
          <Typography sx={{ color: 'primary.main', fontSize: 16, fontWeight: 'bold' }}>
            Where do you want to share?
          </Typography>
          <Grid container spacing={3} sx={{ mt: '5px' }}>
            <ShareButton icon='logos:whatsapp-icon' type='WhatsApp' />
            <ShareButton icon='ic:baseline-email' iconColor='#32497A' type='Email' />
            {xs && <ShareButton icon='material-symbols:share-outline' iconColor='#32497A' type='Copy Link' />}
          </Grid>
        </Box>
        {!xs && (
          <Box
            sx={{
              w: '100%',
              px: '12px',
              py: '10px',
              border: '0.5px solid #949EA2',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Typography sx={{ color: '#949EA2', fontSize: 14 }}>{shareUrl}</Typography>
            <Button
              variant={hover || isCopy ? 'outlined' : 'contained'}
              onClick={handleClickCopy}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              sx={{
                borderColor: isCopy ? '#29BA38' : 'primary.main',
                color: isCopy ? '#29BA38' : 'white',
                backgroundColor: isCopy || hover ? 'transparent' : undefined,
                '&:hover': {
                  borderColor: isCopy ? '#29BA38' : 'primary.main',
                  color: isCopy ? '#29BA38' : 'primary.main',
                  backgroundColor: 'transparent'
                },
                fontSize: 12
              }}
            >
              {isCopy ? 'Link copied' : 'Copy link'}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogShare
