import React from 'react'
import { Dialog, DialogContent, DialogTitle, Typography, Grid, Box, IconButton, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import GroupIcon from '@mui/icons-material/Group'
import { useTranslation } from 'react-i18next'

interface ContactDialogProps {
  open: boolean
  onClose: () => void
}

const ContactDialog: React.FC<ContactDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ m: 0, pt: '24px', px: '24px', pb: 0, fontWeight: 600, fontSize: 24 }}>
        {t('training_landing_page.contact_dialog_title')}
        <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '24px', mt: '24px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box display='flex' alignItems='flex-start' flexDirection='column' gap={2}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography fontWeight={600}>{t('training_landing_page.contact_dialog_title_left')}</Typography>
                <Typography color='text.secondary' mt={1}>
                  {t('training_landing_page.contact_dialog_description')}
                </Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: '24px', backgroundColor: '#2c3e73', textTransform: 'capitalize' }}
              startIcon={<WhatsAppIcon />}
              href='https://wa.me/6282328822292'
              target='_blank'
              rel='noopener noreferrer'
            >
              Whatsapp Now
            </Button>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box display='flex' alignItems='flex-start' flexDirection='column' gap={2}>
              <GroupIcon sx={{ fontSize: 40 }} />
              <Box>
                <Typography fontWeight={600}>{t('training_landing_page.contact_dialog_title_right')}</Typography>
                <Typography color='text.secondary' mt={1}>
                  {t('training_landing_page.contact_dialog_description_right')}
                </Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: '24px', backgroundColor: '#2c3e73', textTransform: 'capitalize' }}
              startIcon={<MailOutlineIcon />}
              href='mailto:Hello@profesea.id'
            >
              Contact via Email
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ContactDialog
