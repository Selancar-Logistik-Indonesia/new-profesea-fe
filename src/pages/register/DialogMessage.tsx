import { Ref, forwardRef, ReactElement } from 'react'
import { FadeProps } from '@mui/material/Fade'
import { Box, Button, Dialog, DialogContent, Fade, Typography } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type BlockDialog = {
  email: string
  visible: boolean
  onCloseClick: VoidFunction
}

const DialogMessage = (props: BlockDialog) => {
  const { t } = useTranslation()
  const handleClose = async () => {
    props.onCloseClick()
  }

  return (
    <Dialog maxWidth='sm' open={props.visible} onClose={props.onCloseClick} TransitionComponent={Transition}>
      <DialogContent sx={{ p: '24px', width: '400px', textAlign: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{t('register_page.dialog.title')}</Typography>
        <Typography sx={{ mt: '6px', fontSize: 14, fontWeight: 400 }}>
          {t('register_page.dialog.description')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            mt: '16px'
          }}
        >
          <Button
            fullWidth
            variant='contained'
            sx={{
              h: '33px',
              backgroundColor: '#D8E6FF',
              color: '#32497A',
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 400,
              '&:hover': { backgroundColor: '#A6C6FF' }
            }}
            onClick={handleClose}
          >
            {t('register_page.dialog.cancel')}
          </Button>
          <Button
            fullWidth
            variant='contained'
            component={Link}
            href={`/login/v2/?email=${props.email}&checked=1`}
            sx={{
              h: '33px',
              backgroundColor: '#32497A',
              color: 'white',
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 400
            }}
          >
            {t('register_page.dialog.continue')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DialogMessage
