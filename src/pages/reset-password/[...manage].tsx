// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { useForm } from 'react-hook-form'
import { HttpClient } from 'src/services'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import Head from 'next/head'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useRouter } from 'next/router'


const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

type FormData = {
  password: string
  password_confirmation: string
}

const ResetPassword = () => {
  const router = useRouter();
  const param = router.query.manage as any[];
  const token = (param != undefined) ? param[0] : null;
  const email = (param != undefined) ? param[1] : null;


  console.log(token);
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  const schema = yup.object().shape({
    password: yup.string().min(8).required(),
    password_confirmation: yup.string().min(8).required()
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm<FormData>({
      mode: 'onBlur',
      resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
      const { password, password_confirmation } = data
      const json = {
          "token": token,
          "email": email,
          "password": password,
          "password_confirmation": password_confirmation,
      };

      try {
          const response = await HttpClient.post('/auth/reset-password', json);
          if (response.status != 200) {
              alert(response.data?.message ?? "Something went wrong");
          }

          toast.success("password changed successfully");

          router.push('/login')
      } catch (error) {
          toast.error(`Opps ${getCleanErrorMessage(error)}`);
      }
  }

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - Forgot Password Page`}</title>
      </Head>
      <Box sx={{
        position: 'fit',
        width: '100%',
        height: '100%',
        backgroundImage: "url(/images/bglogin.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <Box className='content-right'>
        {!hidden ? (
          <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            
          </Box>
        ) : null}
        <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
          <Box
            sx={{
              p: 7,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper'
            }}
          >
            <BoxWrapper>
              <Box sx={{ mb: 10, maxWidth: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                <Link href='/'>
                  <Box
                    component="img"
                    src='/images/logoprofesea.png'
                    sx={{ width: 225, mt: 5 }}
                  >
                  </Box>
                </Link>
              </Box>
              <Box sx={{ mb: 6 }}>
                <TypographyStyled variant='h5'>Reset Password !</TypographyStyled>
                <Typography variant='body2'>
                  Enter your new password
                </Typography>
              </Box>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth sx={{mb:5}}>
                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                        New Password
                    </InputLabel>
                    <OutlinedInput
                        sx={{ mb: 3 }}
                        label='New Password'
                        id='password'
                        error={Boolean(errors.password)}
                        type={showPassword ? 'text' : 'password'}
                        {...register("password")}
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
                    {errors.password && (
                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                            {(errors as any).password?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{mb:5}}>
                    <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password_confirmation)}>
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        sx={{ mb: 3 }}
                        label='Password'
                        id='password_confirmation'
                        error={Boolean(errors.password_confirmation)}
                        type={showPassword ? 'text' : 'password'}
                        {...register("password_confirmation")}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={() => setShowPassword(!showPassword)}>
                                    <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password_confirmation && (
                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                            {(errors as any).password_confirmation?.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
                  Submit
                </Button>
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LinkStyled href='/login'>
                    <Icon icon='mdi:chevron-left' fontSize='2rem' />
                    <span>Back to login</span>
                  </LinkStyled>
                </Typography>
              </form>
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </Box>
    </>
  )
}

ResetPassword.guestGuard = true
ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPassword
