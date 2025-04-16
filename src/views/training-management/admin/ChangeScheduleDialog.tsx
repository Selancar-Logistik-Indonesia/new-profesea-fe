import { Ref, forwardRef, ReactElement, useState } from 'react'
import {
  Button,
  Dialog,
  Fade,
  FadeProps,
  IconButton,
  Typography,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Box
} from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import moment from 'moment'

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

const ChangeScheduleDialog = (props: DialogProps) => {
  const { candidate, visible, onCloseClick, changeParams } = props
  const [schedule, setSchedule] = useState<moment.Moment | null>()
  const [onLoading, setOnLoading] = useState(false)
  const today = moment()

  const handleSetSchedule = () => {
    if (!schedule) return toast.error('Date is required!')

    const formattedDate = schedule.format('YYYY-MM-DD')
    setOnLoading(true)

    HttpClient.patch(`/training/participants/${candidate.id}/schedule`, {
      schedule: formattedDate
    })
      .then(
        async () => {
          toast.success(`Successfully updated schedule for ${candidate.fullname}`)
        },
        error => {
          toast.error(`Failed to change ${candidate.fullname} schedule: ` + error.response.data.message)
        }
      )
      .finally(async () => {
        setOnLoading(false)
        await onCloseClick()
        changeParams('all')
      })
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='sm' TransitionComponent={Transition}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Edit Participant Details</Typography>
        <IconButton size='small' onClick={onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography sx={{ fontSize: 18, color: '#666', fontWeight: 400 }}>
            Select the official registration date for this participant. Make sure the date reflects the actual
            enrollment time.
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              format='DD/MM/YYYY'
              openTo='year'
              views={['year', 'month', 'day']}
              minDate={today}
              value={schedule}
              onChange={newValue => setSchedule(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true
                }
              }}
            />
          </LocalizationProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button
              fullWidth
              variant='contained'
              size='small'
              color='primary'
              onClick={handleSetSchedule}
              sx={{ textTransform: 'none' }}
            >
              {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Save'}
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
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeScheduleDialog
