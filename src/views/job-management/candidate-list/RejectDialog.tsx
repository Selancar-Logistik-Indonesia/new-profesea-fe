import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { HttpClient } from 'src/services'
import Reject_Reason from 'src/contract/models/reject_reason'
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
  refetch: VoidFunction
}

const RejectDialog = (props: DialogProps) => {
  const { candidate, visible, onCloseClick, refetch } = props
  const [rejectReasons, getRejectReasons] = useState<Reject_Reason[] | null>(null)
  const [onLoading, setOnLoading] = useState(false)

  const [reason, setReason] = useState<string>('')
  const [otherReason, setOtherReason] = useState<string | null>(null)

  const firstLoad = () => {
    HttpClient.get('/public/data/reject-reasons').then(response => {
      getRejectReasons(response.data.reject_reasons)
    })
  }

  useEffect(() => {
    firstLoad()
  }, [])

  const handleReject = async () => {
    setOnLoading(true)
    HttpClient.patch(`/job/appllicant/reject`, { applicant_id: candidate.id, reason, other_reason: otherReason })
      .then(
        async () => {
          toast.success(`Successfully change ${candidate.user.name} status`)
        },
        error => {
          toast.error(`Failed to change ${candidate.user.name} status: ` + error.response.data.message)
        }
      )
      .finally(async () => {
        setOnLoading(false)
        await onCloseClick()
        refetch()
      })
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='xs' TransitionComponent={Transition}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Not Suitable</Typography>
        <IconButton size='small' onClick={onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '40px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography align='center' sx={{ fontSize: 14, fontWeight: 400 }}>
            Why is this candidate not suitable for the position?
          </Typography>
          <Select displayEmpty size='small' value={reason} onChange={value => setReason(value.target.value)}>
            <MenuItem value='' disabled>
              Choose Reason
            </MenuItem>
            {rejectReasons &&
              rejectReasons.map(item => (
                <MenuItem key={item.id} value={item.reason}>
                  {item.reason}
                </MenuItem>
              ))}
            <MenuItem value='others'>Others</MenuItem>
          </Select>
          {reason === 'others' && (
            <TextField
              fullWidth
              size='small'
              maxRows={2}
              placeholder='Other reason'
              value={otherReason}
              onChange={e => setOtherReason(e.target.value)}
            />
          )}
        </Box>
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
          color='error'
          sx={{ textTransform: 'none' }}
          onClick={() => handleReject()}
        >
          {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RejectDialog
