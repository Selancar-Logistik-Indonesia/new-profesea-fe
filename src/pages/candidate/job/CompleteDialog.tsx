import { Ref, forwardRef, ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import { Button, CircularProgress, DialogActions } from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import Job from 'src/contract/models/job'
import { isAxiosError } from 'axios'

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
  const [onLoading, setOnLoading] = useState(false)

  const handleApprove = async () => {
    setOnLoading(true)
    try {
      const resp = await HttpClient.get(`/job/${props.selectedItem?.id}/apply`)

      if (resp.status !== 200) {
        props.setApply(false)
        throw new Error(resp.data.message ?? 'Something went wrong!')
      }

      toast.success(`${props.selectedItem?.role_type?.name} applied successfully!`)
      props.setApply(true)
      setOnLoading(false)
      props.onClose()
    } catch (error) {
      if (isAxiosError(error)) {
        if (error?.response?.status === 400) {
          toast.error(`${error?.response?.data?.message}`)
        }
      } else {
        toast.error('An error occurred while applying.')
      }
      props.setApply(false)
      setOnLoading(false)
      props.onClose()
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
          <Button
            onClick={handleApprove}
            variant='contained'
            color='success'
            sx={{ mr: 2 }}
            type='button'
            size='small'
            disabled={onLoading}
            startIcon={
              onLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Icon fontSize='large' icon={'material-symbols:recommend'} color={'info'} style={{ margin: 3 }} />
              )
            }
          >
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
