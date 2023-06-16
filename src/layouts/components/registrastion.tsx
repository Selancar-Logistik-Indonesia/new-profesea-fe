// ** React Imports
import { ReactNode, useState } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import { FormHelperText, Grid } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const Registration = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

  const {
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  return (
    <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
      <Grid container spacing={2} sx={{ mb:2 }}>
        <Grid item md={12} xs={12}>
          <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{ mb: 6 }} />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField id="Position" label="Position" variant="outlined" fullWidth sx={{ mb: 6 }} />
        </Grid>
        <Grid item md={2} xs={12} >
          <TextField id="Code" label="Code" variant="outlined" fullWidth sx={{ mb: 6 }} />
        </Grid>
        <Grid item md={4} xs={12} >
          <TextField id="Code" label="Phone" variant="outlined" fullWidth sx={{ mb: 6 }} />
        </Grid>
        <Grid item md={6} xs={12} >
          <TextField id="Username" label="Username" variant="outlined" fullWidth sx={{ mb: 6 }} />
        </Grid>
        <Grid item md={6} xs={12} >
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Password
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}

              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  sx={{ mb: 6 }}
                  label='Password'
                  onChange={onChange}
                  id='password1'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {(errors as any).password?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12} >
          <TextField id="Email" label="Email" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={6} xs={12} >
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Password
            </InputLabel>
            <Controller
              name='password2'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label='Password'
                  onChange={onChange}
                  sx={{ mb: 6 }}
                  id='password2'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {(errors as any).password?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item md={2} xs={12} >
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} startIcon={<Icon icon={'mdi:arrow-left'} />} >
            PREVIOUS
          </Button>
        </Grid>

        <Grid item md={8} xs={0} ></Grid>
        <Grid item md={2} xs={12} >
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} startIcon={<Icon icon={'mdi:arrow-right'} />} >
            NEXT
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
        <Checkbox></Checkbox>
        <Typography sx={{ color: 'primary.main', fontWeight: 'bold', marginTop: '10px' }}>
          Term Of Service,
        </Typography>
        <Typography sx={{ marginTop: '10px', color: 'text.secondary' }}> i read and accept</Typography>

      </Box>
      <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
        <Checkbox></Checkbox>
        <Typography sx={{ color: 'primary.main', fontWeight: 'bold', marginTop: '10px' }}>
          Privacy Police,
        </Typography>
        <Typography sx={{ marginTop: '10px', color: 'text.secondary' }}> i read and accept</Typography>

      </Box>
    </form>
  )
}

Registration.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Registration.guestGuard = true

export default Registration
