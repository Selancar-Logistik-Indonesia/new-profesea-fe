import { Icon } from '@iconify/react'
import { Button, Dialog, DialogContent, Grid, IconButton, Typography } from '@mui/material'
import { toast } from 'react-hot-toast'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'

type DialogProps = {
  job: Job
  visible: boolean
  refetch: VoidFunction
  onCloseClick: VoidFunction
}

const DialogDelete = (props: DialogProps) => {
  const { job, visible, refetch, onCloseClick } = props

  const handleDelete = async () => {
    try {
      const resp = await HttpClient.del(`/job/${job.id}`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }
      onCloseClick()
      toast.success(
        `${job.job_title ? job.job_title : job.role_type.name} on job's ${job.company.name} deleted successfully!`
      )
    } catch (error) {
      console.error(error)
    }
    refetch()
  }

  return (
    <Dialog maxWidth='xs' fullWidth={true} open={visible} onClose={onCloseClick}>
      <DialogContent sx={{ position: 'relative', p: '16px' }}>
        <IconButton size='small' onClick={onCloseClick} sx={{ position: 'absolute', right: '16px', top: '16px' }}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Grid container gap={4}>
          <Grid item xs={12}>
            <Typography sx={{ mb: '16px', color: '#404040', fontSize: 16, fontWeight: 700 }}>Delete Job</Typography>
            <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400, textAlign: 'center' }}>
              Are you sure you want to delete this job
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <Button
              fullWidth
              size='small'
              variant='contained'
              color='inherit'
              sx={{ fontSize: 14, fontWeight: 400 }}
              onClick={onCloseClick}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              size='small'
              variant='contained'
              color='error'
              sx={{ fontSize: 14, fontWeight: 400 }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete
