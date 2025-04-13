import { Ref, forwardRef, ReactElement, useState } from 'react'
import {
  Button,
  Dialog,
  Fade,
  FadeProps,
  IconButton,
  Typography,
  CircularProgress,
  DialogActions,
  DialogContent
} from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import ITrainingParticipant from 'src/contract/models/training_participant'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  candidate: ITrainingParticipant
  status: string
  visible: boolean
  onCloseClick: VoidFunction
  changeParams: (value?: string) => void
}

const ChangeStatusDialog = (props: DialogProps) => {
  const { candidate, status, visible, onCloseClick, changeParams } = props
  const [onLoading, setOnLoading] = useState(false)

  const handleProceed = async () => {
    setOnLoading(true)
    HttpClient.put(`/training/participant/update-status/${candidate.id}`, {
      status
    })
      .then(
        async () => {
          toast.success(`Successfully proceed ${candidate.fullname}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.fullname} status: ` + error.response.data.message)
        }
      )
      .finally(async () => {
        setOnLoading(false)
        await onCloseClick()
        changeParams(status)
      })
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='xs' TransitionComponent={Transition}>
      <DialogContent sx={{ p: '16px', position: 'relative' }}>
        <IconButton size='small' onClick={onCloseClick} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Typography align='center' sx={{ mt: '24px', fontSize: 16, fontWeight: 700 }}>
          Are you sure you want to proceed this participant to {status}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: '16px', display: 'flex', gap: '6px' }}>
        <Button
          fullWidth
          variant='contained'
          size='small'
          sx={{
            backgroundColor: '#F0F0F0',
            color: '#999',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#f0f0f0' }
          }}
          onClick={onCloseClick}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant='contained'
          size='small'
          sx={{ textTransform: 'none' }}
          onClick={() => handleProceed()}
        >
          {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangeStatusDialog
