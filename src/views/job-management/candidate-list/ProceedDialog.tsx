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
  DialogContent,
  DialogTitle
} from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import Applicant from 'src/contract/models/applicant'
import { Icon } from '@iconify/react'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  candidate: Applicant
  visible: boolean
  onCloseClick: VoidFunction
  changeParams: (value?: string) => void
}

const ProceedDialog = (props: DialogProps) => {
  const { candidate, visible, onCloseClick, changeParams } = props
  const [onLoading, setOnLoading] = useState(false)

  const handleProceed = async () => {
    setOnLoading(true)
    HttpClient.patch(`/job/appllicant/${candidate.status === 'PR' ? 'approve' : 'proceed'}`, {
      applicant_id: candidate.id
    })
      .then(
        async () => {
          toast.success(`Successfully proceed ${candidate.user.name}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.user.name} status: ` + error.response.data.message)
        }
      )
      .finally(async () => {
        setOnLoading(false)
        await onCloseClick()
        changeParams(candidate.status === 'PR' ? 'AP' : 'PR')
      })
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='xs' TransitionComponent={Transition}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton size='small' onClick={onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '40px' }}>
        <Typography align='center' sx={{ fontSize: 14, fontWeight: 400 }}>
          Would you like to proceed with this candidate to the next step?
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

export default ProceedDialog
