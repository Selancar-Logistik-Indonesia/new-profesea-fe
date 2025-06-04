import { useState } from 'react'
import {
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Link
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'
import Icon from 'src/@core/components/icon'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

type FormData = {
  old_password: string
  password: string
  password_confirmation: string
}

const schema = yup.object().shape({
  password: yup.string().min(5).required()
})

const ChangePassword = () => {
  const [onLoading, setOnLoading] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPassword2, setShowPassword2] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const { old_password, password, password_confirmation } = data

    if (password !== password_confirmation) {
      setError('password_confirmation', {
        type: 'manual',
        message: 'attribute must match with password.'
      })

      return null
    }

    HttpClient.post('/auth/change-password', {
      old_password: old_password,
      password: password,
      password_confirmation: password_confirmation
    })
      .then(
        async () => {
          toast.success('Successfully change password')
        },
        error => {
          toast.error('Failed to change password: ' + error.response.data.message)
        }
      )
      .finally(() => setOnLoading(false))
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid
        item
        container
        sx={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          border: '1px solid #F0F0F0',
          p: '24px',
          display: 'flex',
          gap: '24px'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Change Password</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400 }}>
            Forgot your password?{' '}
            <Link href='/forgot-password' target='_blank' sx={{ fontWeight: 700 }}>
              click here
            </Link>
          </Typography>
        </Box>
        <FormControl fullWidth error={!!errors.old_password}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 14, fontWeight: 600 }}>Current Password</Typography>
          <Controller
            name='old_password'
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                size='small'
                placeholder='Enter your current password'
                error={Boolean(errors.old_password)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={16} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.password}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 14, fontWeight: 600 }}>New Password</Typography>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                size='small'
                placeholder='Enter your new password'
                error={Boolean(errors.password)}
                type={showPassword2 ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => setShowPassword2(!showPassword2)}
                    >
                      <Icon icon={showPassword2 ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={16} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.password_confirmation}>
          <Typography sx={{ mb: '12px', color: '#525252', fontSize: 14, fontWeight: 600 }}>
            Confirm New Password
          </Typography>
          <Controller
            name='password_confirmation'
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                size='small'
                placeholder='Re-type new password'
                type='password'
                error={Boolean(errors.password_confirmation)}
              />
            )}
          />
          {errors.password_confirmation && (
            <FormHelperText sx={{ m: '8px 0 0 !important' }}>{errors.password_confirmation.message}</FormHelperText>
          )}
        </FormControl>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='submit'
            variant='contained'
            disabled={onLoading}
            sx={{
              boxShadow: 0,
              color: '#FFF',
              textTransform: 'none'
            }}
          >
            {onLoading ? <CircularProgress size={22} /> : 'Change Password'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ChangePassword
