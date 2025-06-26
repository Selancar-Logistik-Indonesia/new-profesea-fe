import { Icon } from '@iconify/react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  IconButton,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { forwardRef, ReactElement, Ref, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import { getOnboardingLink } from 'src/utils/helpers'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogProps = {
  employeeType: string
  visible: boolean
  onCloseClick: VoidFunction
}

const DialogConfirmation = (props: DialogProps) => {
  const { employeeType, visible, onCloseClick } = props

  const router = useRouter()
  const { user } = useAuth()
  const [onLoading, setOnLoading] = useState(false)

  const save = (data: { team_id: number; employee_type?: string }) => {
    const roleData = { ...data, next_step: 'step-one/1' }
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/role-selection', roleData).then(
      async response => {
        const tempUser = response.data.user
        toast.success('Successfully save role selection!')
        router.push(`/onboarding/${getOnboardingLink(tempUser!)}/${tempUser!.last_step}`)
      },
      error => {
        toast.error('Failed to save role selection: ' + error.response.data.message)
        if (user) {
          if (user.last_step === 'completed') {
            router.push('/home')
          }
          if (user.last_step !== 'completed' && user.last_step !== 'role-selection') {
            router.push(`/onboarding/${getOnboardingLink(user)}/${user.last_step}`)
          }
          if (user.last_step === 'role-selection') {
            router.push(`/${user.last_step}`)
          }
        }
      }
    )
  }

  async function onSubmit() {
    setOnLoading(true)

    let data
    if (employeeType === 'pelaut') {
      data = {
        team_id: 2,
        employee_type: 'onship'
      }
    } else if (employeeType === 'profesional') {
      data = {
        team_id: 2,
        employee_type: 'offship'
      }
    } else if (employeeType === 'hospitality') {
      data = {
        team_id: 2,
        employee_type: 'onship'
      }
    } else {
      toast.error('Employee type not found')

      return
    }

    await save(data)
    setOnLoading(false)
  }

  return (
    <Dialog fullWidth open={visible} maxWidth='xs' TransitionComponent={Transition}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ mb: '16px', color: '#404040', fontSize: 16, fontWeight: 700 }}>Pilih Peran</Typography>
        <IconButton size='small' onClick={onCloseClick}>
          <Icon icon='mdi:close' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '40px' }}>
        <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 400, textAlign: 'center' }}>
          Apakah Anda yakin dengan pilihan sebagai <b>{employeeType}</b>?
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
        <Button fullWidth variant='contained' size='small' sx={{ textTransform: 'none' }} onClick={() => onSubmit()}>
          {onLoading ? <CircularProgress size={25} style={{ color: 'white' }} /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmation
