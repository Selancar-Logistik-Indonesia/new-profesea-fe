import { Ref, forwardRef, ReactElement, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  IconButton,
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

const EditCandidateDialog = (props: DialogProps) => {
  const { candidate, visible, onCloseClick } = props
  const [onLoading, setOnLoading] = useState(false)

  const handleEditCandidate = async () => {
    setOnLoading(true)
    HttpClient.put(`/training/participant/update-status/${candidate.id}`, {
      status: 'canceled'
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
      })
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='xs' TransitionComponent={Transition}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography align='center' sx={{ fontSize: 16, fontWeight: 700 }}>
          Edit Participant Details
        </Typography>
        <IconButton size='small' onClick={onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography align='center' sx={{ fontSize: 18, color: '#666' }}>
            Update the participant's information as needed. Ensure all details are accurate before saving.
          </Typography>
          {/* kurang edit field */}
          <Button
            fullWidth
            variant='contained'
            size='small'
            color='primary'
            sx={{ textTransform: 'none' }}
            onClick={() => handleEditCandidate()}
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
    </Dialog>
  )
}

export default EditCandidateDialog
