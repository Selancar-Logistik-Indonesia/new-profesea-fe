import { Ref, forwardRef, ReactElement, useState } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography
} from '@mui/material'
import Fade, { FadeProps } from '@mui/material/Fade'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { IUser } from 'src/contract/models/user'

interface IProps {
  selectedItem: IUser | undefined
  user_id: number
  visible: boolean
  loadRequest: VoidFunction
  onCloseClick: VoidFunction
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DialogProfileDeleteConfirmation = (props: IProps) => {
  const [onLoading, setOnLoading] = useState(false)

  const handleProfileDelete = () => {
    HttpClient.post(AppConfig.baseUrl + '/user/friend-request/decline', {
      user_id: props.user_id,
      friend_id: props.selectedItem?.id
    }).then(
      res => {
        toast.success(res.data.message)
        props.onCloseClick()
        setOnLoading(false)
        props.loadRequest()
      },
      () => {
        toast.error(' FAILED Decline friend request ')
        props.onCloseClick()
        setOnLoading(false)
      }
    )
  }

  return (
    <Dialog fullWidth open={props.visible} maxWidth='sm' scroll='body' TransitionComponent={Transition}>
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          height: '120px'
        }}
      >
        <IconButton size='small' sx={{ position: 'absolute', right: '1rem', top: '1rem' }} onClick={props.onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant='body2' color={'#32487A'} fontWeight='600' fontSize={18}>
            Are you sure want to Declining <b>{props?.selectedItem?.name}</b> friend request ?
          </Typography>
        </Box>
        <div></div>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' size='small' sx={{ mr: 2 }} type='button' onClick={() => handleProfileDelete()}>
          <Icon fontSize='large' icon={'solar:diskette-bold-duotone'} color={'info'} style={{ fontSize: '18px' }} />
          {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Yes'}
        </Button>
        <Button variant='outlined' size='small' color='error' onClick={props.onCloseClick}>
          <Icon fontSize='large' icon={'material-symbols:cancel-outline'} color={'info'} style={{ fontSize: '18px' }} />
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogProfileDeleteConfirmation
