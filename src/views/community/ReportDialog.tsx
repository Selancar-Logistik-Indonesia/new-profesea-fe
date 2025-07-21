import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IReportReason } from 'src/contract/models/report'
import { HttpClient } from 'src/services'

const ReportDialog = ({
  open,
  onClose,
  social_feed_id
}: {
  open: boolean
  onClose: () => void
  social_feed_id: number
}) => {
  const [reasons, setReasons] = useState<IReportReason[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedReason, setSelectedReason] = useState<number[]>([])

  const handleSubmit = () => {
    setLoading(true)
    HttpClient.post('/report', {
      social_feed_id: social_feed_id,
      reasons_id: selectedReason
    })
      .then(() => {
        toast.success('This post has been successfully reported.')
        setSelectedReason([])
    })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false)
        onClose()
      })
  }

  useEffect(() => {
    if (open) {
      HttpClient.get('/report/reasons').then(res => setReasons(res.data.reasons))
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs' fullWidth>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid ##F8F8F7',
          boxShadow: '0px 2px 10px 0px #00000014',
          alignItems: 'center'
        }}
      >
        <DialogTitle sx={{ fontSize: 16, fontWeight: 700, color: '#303030', alignSelf: 'center' }}>
          Report This Post
        </DialogTitle>
        <IconButton onClick={onClose} sx={{ width: 40, height: 40 }}>
          <Icon icon='material-symbols:close' fontSize={22} />
        </IconButton>
      </Box>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#2D3436' }}>
            Why are you reporting this post?
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#525252' }}>Select one reason below:</Typography>
        </Box>
        <Grid container spacing={1}>
          {reasons?.map(reason => {
            return (
              <Grid item key={reason.id} xs={4}>
                <Chip
                  variant={selectedReason.includes(reason.id) ? 'filled' : 'outlined'}
                  label={reason.reason}
                  onClick={() => {
                    selectedReason.includes(reason.id)
                      ? setSelectedReason(selectedReason.filter(id => id !== reason.id))
                      : setSelectedReason([...selectedReason, reason.id])
                  }}
                  sx={{fontSize:14, fontWeight:700, color:'#444B4E'}}
                />
              </Grid>
            )
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} size='small' sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={loading || selectedReason.length === 0}
          size='small'
          sx={{ textTransform: 'none' }}
        >
          {loading ? 'Submitting' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReportDialog
