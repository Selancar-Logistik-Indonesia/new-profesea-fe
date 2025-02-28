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

      toast.success(
        `${
          props.selectedItem?.category.employee_type === 'onship'
            ? props.selectedItem?.role_type?.name
            : props.selectedItem?.job_title ?? props.selectedItem?.role_type?.name
        } applied successfully!`
      )
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
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <IconButton size='small' onClick={props.onClose}>
              <Icon icon='mdi:close' fontSize={'16px'} />
            </IconButton>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography color={'#404040'} fontSize={16} fontWeight='700' sx={{ marginBottom: '28px' }}>
              Complete Apply for Job
            </Typography>
            <Typography color={'#404040'} fontSize={16} fontWeight='400'>
              Are you sure you want to apply for this job?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid #F0F0F0',
            paddingTop: '16px !important'
          }}
        >
          <Button
            variant='outlined'
            size='small'
            color='secondary'
            onClick={props.onClose}
            sx={{ textTransform: 'capitalize', flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            variant='contained'
            type='button'
            size='small'
            disabled={onLoading}
            sx={{ textTransform: 'capitalize', flex: 1 }}
          >
            {onLoading ? <CircularProgress /> : 'Apply Job'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CompleteDialog
