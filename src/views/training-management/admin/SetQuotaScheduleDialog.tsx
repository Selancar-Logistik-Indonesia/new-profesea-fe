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
import Training from 'src/contract/models/training'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  training: Training
  candidate: ITrainingParticipant
  visible: boolean
  onCloseClick: VoidFunction
  changeParams: (value?: string) => void
}

const SetQuotaScheduleDialog = (props: DialogProps) => {
  const { training, candidate, visible, onCloseClick, changeParams } = props
  const [startSchedule, setStartSchedule] = useState<moment.Moment | null>()
  const [endSchedule, setEndSchedule] = useState<moment.Moment | null>()

  const [onLoading, setOnLoading] = useState(false)
  const today = moment()

  const handleSetSchedule = () => {
    if (!startSchedule || !endSchedule) return toast.error('Date is required!')

    const formattedStartDate = startSchedule.format('YYYY-MM-DD')
    const formattedEndDate = endSchedule.format('YYYY-MM-DD')
    setOnLoading(true)

    HttpClient.put(`/training/${training.id}/schedule`, {
      start_date: formattedStartDate,
      end_date: formattedEndDate
    })
      .then(
        async () => {
          toast.success(`Successfully updated schedule for training` + training.title)
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
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Set Training Schedule</Typography>
        <IconButton size='small' onClick={onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '16px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography sx={{ fontSize: 16, color: '#666', fontWeight: 400 }}>
            Select the official schedule date for this training. Make sure the date reflects the actual enrollment time.
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Start Date</Typography>
              <DatePicker
                format='DD/MM/YYYY'
                openTo='year'
                views={['year', 'month', 'day']}
                minDate={today}
                value={startSchedule}
                onChange={newValue => setStartSchedule(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>End Date</Typography>
              <DatePicker
                format='DD/MM/YYYY'
                openTo='year'
                views={['year', 'month', 'day']}
                minDate={today}
                value={endSchedule}
                onChange={newValue => setEndSchedule(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true
                  }
                }}
              />
            </Box>
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

export default SetQuotaScheduleDialog
