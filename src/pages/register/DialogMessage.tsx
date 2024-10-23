import { Ref, forwardRef, ReactElement } from 'react'
import { FadeProps } from '@mui/material/Fade'
import Icon from 'src/@core/components/icon'
import { Box, Button, Dialog, DialogActions, DialogContent, Fade, Grid, IconButton, Typography } from '@mui/material'

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
  const handleClose = async () => {
    props.onCloseClick()
  }
  return (
    <Dialog maxWidth='sm' open={props.visible} onClose={props.onCloseClick} TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative'
        }}
      >
        <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h6' color={'#32487A'} fontWeight='600'>
            Info
          </Typography>
          <Typography variant='body2'>Your email has been registered, Please Log in</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px'
        }}
      >
        <Button
          variant='contained'
          color='info'
          sx={{ mr: 2 }}
          type='button'
          size='small'
          href={`/login/v2/?check=1&email=${props.email}`}
        >
          Log in
        </Button>
        <Button onClick={handleClose} variant='contained' color='error' sx={{ mr: 2 }} type='button' size='small'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogMessage
