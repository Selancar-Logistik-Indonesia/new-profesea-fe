import { Ref, forwardRef, ReactElement } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { Button, DialogActions } from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import Job from 'src/contract/models/job'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ViewProps = {
  selectedItem: Job | null
  openDialog: boolean
  setApply: (value: boolean) => void
  onClose: () => void
}

const CompleteDialog = (props: ViewProps) => {
  const handleApprove = async () => {
    try {
      const resp = await HttpClient.get(`/job/${props.selectedItem?.id}/apply`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      props.setApply(true)
      toast.success(`${props.selectedItem?.role_type?.name} applied successfully!`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog
      fullWidth
      open={props.openDialog}
      maxWidth='sm'
      scroll='body'
      onClose={props.onClose}
      TransitionComponent={Transition}
    >
      <form noValidate>
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
            <Typography variant='h6' color={'#32487A'} fontWeight='600'>
              Complete Apply for Job
            </Typography>
            <Typography variant='body2'>
              Are you sure complete this job's from {props.selectedItem?.company?.name}?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button onClick={handleApprove} variant='contained' color='success' sx={{ mr: 2 }} type='button' size='small'>
            <Icon fontSize='large' icon={'material-symbols:recommend'} color={'info'} style={{ margin: 3 }} />
            Yes
          </Button>
          <Button variant='outlined' size='small' color='secondary' onClick={props.onClose}>
            <Icon
              fontSize='large'
              icon={'material-symbols:cancel-outline'}
              color={'info'}
              style={{ fontSize: '18px', margin: 3 }}
            />
            No
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CompleteDialog
