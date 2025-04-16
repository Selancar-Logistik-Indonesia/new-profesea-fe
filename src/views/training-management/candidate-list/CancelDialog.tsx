import { Ref, forwardRef, ReactElement, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Fade,
  FadeProps,
  IconButton,
  TextField,
  Typography
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
  visible: boolean
  onCloseClick: VoidFunction
  changeParams: (value?: string) => void
}

const CancelDialog = (props: DialogProps) => {
  const { candidate, visible, onCloseClick, changeParams } = props
  const [onLoading, setOnLoading] = useState(false)
  const [reason, setReason] = useState<string>('')

  const handleReject = async () => {
    setOnLoading(true)
    HttpClient.put(`/training/participant/update-status/${candidate.id}`, {
      status: 'canceled',
      cancel_reason: reason
    })
      .then(
        async () => {
          toast.success(`Successfully change ${candidate.fullname} status`)
        },
        error => {
          toast.error(`Failed to change ${candidate.fullname} status: ` + error.response.data.message)
        }
      )
      .finally(async () => {
        setOnLoading(false)
        await onCloseClick()
        changeParams('canceled')
      })
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='xs' TransitionComponent={Transition}>
      <DialogContent sx={{ p: '16px', position: 'relative' }}>
        <IconButton size='small' onClick={onCloseClick} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '24px', gap: '24px' }}>
          <Typography align='center' sx={{ fontSize: 16, fontWeight: 700 }}>
            Are you sure you want to remove this participant?
          </Typography>
          <TextField
            fullWidth
            maxRows={4}
            placeholder='Provide more details about the cancellation'
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
          <Button
            fullWidth
            variant='contained'
            size='small'
            color='error'
            sx={{ textTransform: 'none' }}
            onClick={() => handleReject()}
          >
            {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Delete'}
          </Button>
          <Button
            fullWidth
            variant='text'
            size='small'
            sx={{
              color: '#999',
              textTransform: 'none'
            }}
            onClick={onCloseClick}
          >
            Cancel
          </Button>
        </Box>
      </DialogContent>
      {/* <DialogActions sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}></DialogActions> */}
    </Dialog>
  )
}

export default CancelDialog
