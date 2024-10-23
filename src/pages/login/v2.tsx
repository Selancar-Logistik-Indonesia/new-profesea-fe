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
  InputAdornment
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
import { AppConfig } from 'src/configs/api'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const getSchema = (t: any) => {
  return yup.object().shape({
    email: yup.string().email(t('input_label_error_3')).required(t('input_label_error_1')),
    password: yup.string().min(7, t('input_label_error_2')).required(t('input_label_error_1'))
  })
}

const defaultValues = {
  password: '',
  email: ''
}

interface FormData {
  email: string
  password: string
}

interface CheckEmailResponse {
  available: boolean
  message: string
}

const LoginPage = () => {
  const { t } = useTranslation()
  const schema = getSchema(t)
  const auth = useAuth()

  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const check = searchParams.get('check')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false)
  const [openDialogMessage, setOpenDialogMessage] = useState<boolean>(false)

  const [onLoading, setOnLoading] = useState<boolean>(false)
  const [checkEmail, setCheckEmail] = useState<boolean>(check ? check === '1' : false)

  useEffect(() => {
    if (email && email !== '') {
      setValue('email', email)
    }
  }, [email])

  const {
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    auth.login({ email, password }, () => {
      setError('email', {
        type: 'manual',
        message: `${t('input_label_error_4')}`
      })
    })
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

    if (!result.available) {
      setOnLoading(false)
      setCheckEmail(true)
    } else {
      setOnLoading(false)
      setCheckEmail(false)
      setOpenDialogMessage(true)
    }
  }

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('login_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('login_description')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <meta property='og:title' content={`${themeConfig.templateName} - ${t('login_title')}`} />
        <meta property='og:description' content={`${themeConfig.templateName} - ${t('login_description')}`} />
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
                  Log in and start sail with us!
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
                    <Controller
                      name='email'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoFocus
                          label={t('input_label_1')}
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.email)}
                        />
                      )}
                    />
                    {errors.email && (
                      <Typography sx={{ color: 'error.main', m: '6px 4px 0', fontSize: 12 }}>
                        {errors.email.message}
                      </Typography>
                    )}
                  </FormControl>
                  {checkEmail && (
                    <FormControl fullWidth>
                      <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                        {t('input_label_2')}
                      </InputLabel>
                      <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <OutlinedInput
                            value={value}
                            onBlur={onBlur}
                            label={t('input_label_2')}
                            onChange={onChange}
                            id='auth-login-v2-password'
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
                        <Typography sx={{ color: 'error.main', ml: '4px', fontSize: 12 }} id=''>
                          {errors.password.message}
                        </Typography>
                      )}
                      <Typography
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '2%' }}
                      >
                        <LinkStyled href='/forgot-password'>
                          <span>{t('login_text_4')}</span>
                        </LinkStyled>
                      </Typography>
                    </FormControl>
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
                      Didn't have an account?
                    </Typography>
                    <Typography component={Link} href='/register/v2' sx={{ color: '#0B58A6', fontWeight: 700 }}>
                      Register here
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
                    By signing up, you acknowledge that you have read and understood, and agree to Profesea's{' '}
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
