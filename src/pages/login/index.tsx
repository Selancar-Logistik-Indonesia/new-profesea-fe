import { useState, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { CircularProgress } from '@mui/material'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'

import DialogGoogleLogin from './DialogGoogleLogin'

import { useSearchParams } from 'next/navigation'
// import { toast } from 'react-hot-toast'
import DialogSuccess from '../loginevent/DialogSuccess'
import DialogMessage from './DialogMessage'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false)
  const [openDialogMessage, setOpenDialogMessage] = useState<boolean>(false)
  const auth = useAuth()
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const { skin } = settings
  const [openBlockModal, setOpenBlockModal] = useState(false)
  const searchParams = useSearchParams()

  const namaevent = searchParams.get('event')
  const acc = searchParams.get('account')

  useEffect(() => {
    if (acc != null) {
      setOpenDialogMessage(true)
    }
  }, [acc])

  const { t } = useTranslation()
  const schema = getSchema(t)

  const {
    control,
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
    auth.login({ email, password, namaevent }, () => {
      setError('email', {
        type: 'manual',
        message: `${t('input_label_error_4')}`
      })
    })
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
      <Box
        sx={{
          position: 'fit',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/bglogin.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Box className='content-right' sx={{ display: 'flex', alignItems: 'center' }}>
          <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: '1px solid ${theme.palette.divider}' } : {}}>
            <Box
              sx={
                !hidden
                  ? {
                      boxSizing: 'border-box',
                      maxWidth: '100%',
                      marginLeft: '10%',
                      background: '#FFFFFF',
                      border: '1px solid rgba(76, 78, 100, 0.12)',
                      borderRadius: '20px',
                      px: 7,
                      py: 15,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'background.paper'
                    }
                  : {
                      p: 7,
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'background.paper'
                    }
              }
            >
              <BoxWrapper>
                <Box
                  sx={{
                    mb: 3,
                    maxWidth: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Link href='/'>
                    <Box component='img' src='/images/logosamudera.png' sx={{ width: 125 }}></Box>
                  </Link>
                  <Typography
                    variant='h5'
                    sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: '#262525' }}
                  >
                    {t('login_text_1')}
                  </Typography>
                </Box>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth sx={{ mb: 4, mt: 4 }}>
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
                      <Typography sx={{ color: 'error.main', ml: '4px', fontSize: 12 }}>
                        {errors.email.message}
                      </Typography>
                    )}
                  </FormControl>
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
                  </FormControl>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '2%' }}>
                    <LinkStyled href='/forgot-password'>
                      <span>{t('login_text_4')}</span>
                    </LinkStyled>
                  </Typography>
                  <Box sx={{ marginTop: '5%' }}>
                    <Button
                      disabled={auth.loading}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                      sx={{ mb: 4 }}
                    >
                      {auth.loading ? <CircularProgress color='primary' /> : `${t('button_1')}`}
                    </Button>
                  </Box>
                  <Divider sx={{ textAlign: 'center', fontSize: '16px' }}>{t('login_text_5')}</Divider>
                  <Box sx={{ marginTop: '5%' }}>
                    <Button
                      fullWidth
                      size='large'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      onClick={() => setOpenModalGoogle(true)}
                    >
                      {t('login_text_1_G')} Google <Icon icon={'devicon:google'} style={{ marginLeft: 7 }} />
                    </Button>
                  </Box>
                  <Divider
                    sx={{
                      '& .MuiDivider-wrapper': { px: 4 },
                      mt: theme => `${theme.spacing(5)} !important`,
                      mb: theme => `${theme.spacing(7.5)} !important`
                    }}
                  ></Divider>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ mr: 2, color: '#262525' }}>{t('login_text_2')}</Typography>

                    {namaevent ? (
                      <Typography
                        href={'/register/event/' + namaevent}
                        component={Link}
                        sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}
                      >
                        {t('login_text_3')}
                      </Typography>
                    ) : (
                      <Typography
                        href='/register'
                        component={Link}
                        sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none' }}
                      >
                        {t('login_text_3')}
                      </Typography>
                    )}
                  </Box>
                </form>
              </BoxWrapper>
            </Box>
          </RightWrapper>
        </Box>
      </Box>
      <DialogSuccess
        visible={openBlockModal}
        onCloseClick={() => {
          setOpenBlockModal(!openBlockModal)
        }}
      />
      <DialogGoogleLogin
        visible={openModalGoogle}
        onCloseClick={() => {
          setOpenModalGoogle(!openModalGoogle)
        }}
      />
      <DialogMessage
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
