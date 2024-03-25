import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  FadeProps,
  IconButton,
  Typography
} from '@mui/material'
import Link from 'next/link'
import React, { ReactElement, Ref, forwardRef } from 'react'
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ViewProps = {
  openDialog: boolean
  selectedItem: any | undefined
  onClose: () => void
}

const CertificateDialog = (props: ViewProps) => {
  return (
    <Dialog
      fullWidth
      open={props.openDialog}
      maxWidth='sm'
      scroll='body'
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton size='small' onClick={props.onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ textAlign: 'center' }}>
          <Typography>Match the certificates you have to your profile to stand out to the company</Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          gap: 10
        }}
      >
        <Button onClick={props.onClose} variant='contained' color='error' sx={{ mr: 2 }} type='button' size='small'>
          Close
        </Button>
        <Button variant='contained' LinkComponent={Link} href='/candidate' size='small' color='success'>
          Add Certificate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CertificateDialog
