import { useState, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  InputAdornment,
  Alert,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Checkbox
} from '@mui/material'
import { styled } from '@mui/material/styles'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'next/navigation'

import DialogGoogleLogin from './DialogGoogleLogin'
import DialogMessage from './DialogMessage'
import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AppConfig } from 'src/configs/api'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))

const getSchema = (t: any) => {
  return yup.object().shape({
    email: yup.string().email(t('input_label_error_3')).required(t('input_label_error_1')),
    password: yup.string().min(7, t('input_label_error_2')).required(t('input_label_error_1')),
    password2: yup.string().required(t('input_label_error_1'))
  })
}

interface FormData {
  email: string
  password: string
  password2: string
  tos: string
}

interface CheckEmailResponse {
  available: boolean
  message: string
}

const LoginPage = () => {
  const { t } = useTranslation()
  const schema = getSchema(t)
  const auth = useAuth()
  const router = useRouter()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const check = searchParams.get('check')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPassword2, setShowPassword2] = useState<boolean>(false)
  const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false)
  const [openDialogMessage, setOpenDialogMessage] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(false)
  const [checkEmail, setCheckEmail] = useState<boolean>(false)

  useEffect(() => {
    if (email && email !== '') {
      setValue('email', email)
    }

    if (check && check === '1') {
      setCheckEmail(true)
    }
  }, [email, check])

  const {
    control,
    register,
    setValue,
    getValues,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const post = async (json: any) => {
    HttpClient.post(AppConfig.baseUrl + '/auth/register/v2', json).then(
      () => {
        toast.success('Successfully submited!')
        router.push('/registersuccess')
      },
      error => {
        toast.error('Registrastion Failed ' + error.response.data.message)
      }
    )
  }

  const onSubmit = (data: FormData) => {
    const { email, password, password2, tos } = data
    const lowerCaseEmail = email.toLowerCase()

    if (tos == '') {
      toast.error(`${t('input_label_error_5')}`)

      return
    }

    if (password !== password2) {
      toast.error(`${t('input_label_error_6')}`)

      return
    }

    try {
      post({
        email: lowerCaseEmail,
        password: password,
        password_confirmation: password2
      })
    } catch (e) {
      alert(e)
    }
  }

  const onChecking = async (email: string) => {
    if (!email && email === '') {
      setError('email', {
        type: 'manual',
        message: `${t('input_label_error_1')}`
      })
      return
    }

    setOnLoading(true)
    const response = await fetch(AppConfig.baseUrl + `/public/data/check-email?email=${email}`)
    const result: CheckEmailResponse = await response.json()

    console.log(result)

    if (result.available) {
      setOnLoading(false)
      setCheckEmail(true)
    } else {
      setOnLoading(false)
      setCheckEmail(false)
      setOpenDialogMessage(true)
    }

    // if (email === 'mikhailyuwankho@gmail.com') {
    //   setOnLoading(true)
    //   setTimeout(() => {
    //     setCheckEmail(false)
    //     setOnLoading(false)
    //     setOpenDialogMessage(true)
    //   }, 3000)
    // } else {
    //   setOnLoading(true)
    //   setTimeout(() => {
    //     setCheckEmail(true)
    //     setOnLoading(false)
    //   }, 3000)
    // }
  }

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('register_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('register_description')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <meta property='og:title' content={`${themeConfig.templateName} - ${t('register_title')}`} />
        <meta property='og:description' content={`${themeConfig.templateName} - ${t('register_description')}`} />
        <meta property='og:image' content='images/logosamudera.png' />
      </Head>
      <Grid container sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url(/images/bg-login.jpeg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '150%',
            backgroundPosition: '60% 0%'
          }}
        />
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              width: '495px'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <Link href='/'>
                <Box component='img' src='/images/logosamudera.png' sx={{ width: '143px', height: 'auto' }} />
              </Link>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignContent: 'center',
                  gap: '6px'
                }}
              >
                <Typography
                  sx={{ textAlign: 'center', color: '#404040', fontSize: 32, fontWeight: 700, lineHeight: '38.4px' }}
                >
                  Welcome to Profesea!
                </Typography>
                <Typography
                  sx={{ textAlign: 'center', color: '#999', fontSize: 16, fontWeight: 400, lineHeight: '21px' }}
                >
                  Register and start sail with us!
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: '444px',
                p: '24px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}
                >
                  <FormControl fullWidth>
                    <TextField
                      autoFocus
                      label={t('input_label_1')}
                      {...register('email')}
                      error={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <Typography sx={{ color: 'error.main', m: '6px 4px 0', fontSize: 12 }}>
                        {errors.email.message}
                      </Typography>
                    )}
                  </FormControl>
                  {checkEmail && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                          {t('input_label_2')}
                        </InputLabel>
                        <OutlinedInput
                          {...register('password')}
                          label={t('input_label_2')}
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
                        {errors.password && (
                          <Typography sx={{ color: 'error.main', ml: '4px', fontSize: 12 }}>
                            {errors.password.message}
                          </Typography>
                        )}
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel htmlFor='auth-login-v2-password2' error={Boolean(errors.password2)}>
                          {t('input_label_6')}
                        </InputLabel>
                        <OutlinedInput
                          {...register('password2')}
                          label={t('input_label_6')}
                          error={Boolean(errors.password2)}
                          type={showPassword2 ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => setShowPassword2(!showPassword2)}
                              >
                                <Icon icon={showPassword2 ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.password2 && (
                          <Typography sx={{ color: 'error.main', ml: '4px', fontSize: 12 }}>
                            {errors.password2.message}
                          </Typography>
                        )}
                      </FormControl>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'left',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '2px'
                        }}
                      >
                        <Controller
                          name='tos'
                          control={control}
                          render={({ field }) => <Checkbox {...field} {...register('tos')} />}
                        />

                        <Typography sx={{ color: '#404040', fontSize: 12, fontWeight: 400 }}>
                          Saya menerima{' '}
                          <Box component='span' sx={{ color: '#0B58A6', fontWeight: 400 }}>
                            Syarat & Ketentuan{' '}
                          </Box>{' '}
                          dan{' '}
                          <Box component='span' sx={{ color: '#0B58A6', fontWeight: 400 }}>
                            Kebijakan Privasi{' '}
                          </Box>
                          yang berlaku.
                        </Typography>
                      </Box>
                    </>
                  )}
                  {checkEmail ? (
                    <Button disabled={auth.loading} fullWidth size='large' type='submit' variant='contained'>
                      {auth.loading ? <CircularProgress color='primary' /> : 'Log in'}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      disabled={onLoading}
                      size='large'
                      type='button'
                      variant='contained'
                      onClick={() => {
                        const emailValue = getValues('email')
                        onChecking(emailValue)
                      }}
                    >
                      {onLoading ? <CircularProgress color='primary' /> : 'Continue'}
                    </Button>
                  )}
                  {!checkEmail && (
                    <>
                      <Divider role='presentation'>
                        <Typography sx={{ mx: '10px', textAlign: 'center', fontSize: 14, fontWeight: 400 }}>
                          {t('login_text_5')}
                        </Typography>
                      </Divider>
                      <Button
                        fullWidth
                        size='large'
                        variant='outlined'
                        component={Link}
                        href='https://apifix.profesea.id/auth/google?team_id=1&type=onship'
                        startIcon={<Icon icon='devicon:google' fontSize={20} />}
                      >
                        Continue with Google
                      </Button>
                    </>
                  )}
                </Box>
              </form>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {!checkEmail && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      gap: '2px'
                    }}
                  >
                    <Typography sx={{ textAlign: 'center', fontSize: 12, fontWeight: 400, color: '#404040' }}>
                      Already have an account?
                    </Typography>
                    <Typography component={Link} href='/login/v2' sx={{ color: '#0B58A6', fontWeight: 700 }}>
                      Log in here
                    </Typography>
                  </Box>
                )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Typography sx={{ color: '#404040', fontSize: 12, fontWeight: 400 }}>
                    By Registering, you acknowledge that you have read and understood, and agree to Profesea's{' '}
                    <Box component='span' sx={{ color: '#0B58A6', fontWeight: 400 }}>
                      Terms{' '}
                    </Box>{' '}
                    and{' '}
                    <Box component='span' sx={{ color: '#0B58A6', fontWeight: 400 }}>
                      Privacy Policy.
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DialogGoogleLogin
        visible={openModalGoogle}
        onCloseClick={() => {
          setOpenModalGoogle(!openModalGoogle)
        }}
      />
      <DialogMessage
        email={getValues('email')}
        visible={openDialogMessage}
        onCloseClick={() => {
          setOpenDialogMessage(!openDialogMessage)
        }}
      />
    </>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
