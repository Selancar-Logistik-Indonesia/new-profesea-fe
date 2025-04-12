import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  FadeProps,
  FormControl,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { AppConfig } from 'src/configs/api'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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

type FormData = {
  fullname: string
  email: string
  whatsapp: string
  address: string
}

const schema = yup.object().shape({
  fullname: yup.string().required(),
  email: yup.string().required(),
  whatsapp: yup.string().required(),
  address: yup.string().required()
})

const EditCandidateDialog = (props: DialogProps) => {
  const { candidate, visible, onCloseClick, changeParams } = props
  const [onLoading, setOnLoading] = useState(false)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (candidate) {
      setValue('fullname', candidate.fullname ?? '')
      setValue('email', candidate.email ?? '')
      setValue('whatsapp', candidate.whatsapp_number ?? '')
      setValue('address', candidate.address ?? '')
    }
  }, [candidate])

  const onSubmit = (data: FormData) => {
    setOnLoading(true)
    HttpClient.put(AppConfig.baseUrl + '/training/enroll/individual/' + candidate.id, {
      fullname: data.fullname,
      email: data.email,
      whatsapp_number: data.whatsapp,
      address: data.address
    })
      .then(
        async () => {
          toast.success(`Successfully edit ${candidate.fullname} data`)
        },
        error => {
          toast.error(`Failed to edit ${candidate.fullname} data: ` + error.response.data.message)
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
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Typography sx={{ fontSize: 18, color: '#666', fontWeight: 400 }}>
              Update the participant's information as needed. Ensure all details are accurate before saving.
            </Typography>
            <FormControl fullWidth error={!!errors.fullname}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Full Name <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='fullname'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder='Please input your full name'
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.email}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Email <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder='example@mail.com'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.whatsapp}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Whatsapp Number <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='whatsapp'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder='Whatsapp number'
                    error={!!errors.whatsapp}
                    helperText={errors.whatsapp?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth error={!!errors.address}>
              <Typography sx={{ mb: '12px', color: '#525252', fontSize: 12, fontWeight: 700 }}>
                Address <span style={{ color: '#F22' }}>*</span>
              </Typography>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder='Address'
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='small'
                color='primary'
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
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCandidateDialog
