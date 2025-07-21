import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useMediaQuery
} from '@mui/material'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useSearchParams } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@mui/material'

type LoginCardProps = {
  isBanner?: boolean
  variant?: 'candidate' | 'training'
  defaultShowInputs?: boolean
  customHeader?: ReactNode
}

interface FormData {
  email: string
  password: string
}

const defaultValues = {
  password: '',
  email: ''
}

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

const LoginCard = (props: LoginCardProps) => {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  const customHeader = props?.customHeader
  const isBanner = props?.isBanner ?? true
  const variant = props?.variant ?? 'training'
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showInputs, setShowInputs] = useState<boolean>(props.defaultShowInputs ?? true)
  const auth = useAuth()
  const searchParams = useSearchParams()
  const namaevent = searchParams.get('event')

  const { t } = useTranslation()
  const schema = getSchema(t)

  const {
    control,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    const isReturn = true
    auth.login(
      { email, password, namaevent },
      () => {
        setError('email', {
          type: 'manual',
          message: `${t('input_label_error_4')}`
        })
      },
      isReturn
    )
  }

  const handleShowInputs = () => {
    setShowInputs(!showInputs)
    clearErrors()
  }

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
      {!isXs && isBanner && (
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: 'url(/images/bg-login-dialog.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {variant == 'training' ? (
            <>
              <Typography
                style={{ color: '#FFFFFF' }}
                fontWeight='800'
                fontSize={28}
                sx={{ maxWidth: '75%', textAlign: 'center' }}
              >
                {t('login_modal_title_1')}
              </Typography>
              <Divider sx={{ my: 4, bgcolor: 'white', width: '60%' }} />
              <Typography
                style={{ color: '#FFFFFF' }}
                fontWeight='500'
                fontSize={16}
                sx={{ maxWidth: '80%', textAlign: 'center' }}
              >
                {t('login_modal_subtitle_1')}
              </Typography>
            </>
          ) : (
            <>
              <Typography
                style={{ color: '#FFFFFF' }}
                fontWeight='800'
                fontSize={24}
                sx={{ maxWidth: '85%', textAlign: 'left' }}
              >
                {t('login_modal_title_2')}
              </Typography>
              <Box
                fontWeight={500}
                fontSize={15}
                style={{ color: '#FFFFFF' }}
                sx={{ mt: 4, maxWidth: '90%', textAlign: 'left' }}
              >
                <li>{t('login_modal_subtitle_2_1')}</li>
                <li>{t('login_modal_subtitle_2_2')}</li>
                <li>{t('login_modal_subtitle_2_3')}</li>
              </Box>
            </>
          )}
        </Grid>
      )}
      <Grid item xs={12} md={isBanner ? 6 : 12}>
        <Box sx={isBanner && !isXs ? { py: 4, pl: 6, pr: 4 } : { p: 4 }}>
          {customHeader ? (
            customHeader
          ) : (
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
                <Box component='img' src='/images/logoprofesea.png' sx={{ width: 125 }}></Box>
              </Link>
              {(!isBanner || isXs) && (
                <Typography variant='body2' sx={{ textAlign: 'center', color: '#262525', marginTop: '10px' }}>
                  {t('login_modal_subtitle_1')}
                </Typography>
              )}
            </Box>
          )}
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            {showInputs && (
              <>
                <FormControl fullWidth sx={{ mb: 4, mt: 4 }}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        size='medium'
                        autoFocus
                        label={t('input_label_1')}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.email)}
                      />
                    )}
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
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
                        size='medium'
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
                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '2%' }}>
                  <LinkStyled href='/forgot-password'>
                    <span>{t('login_text_4')}</span>
                  </LinkStyled>
                </Typography>
              </>
            )}
            <Box sx={{ marginTop: '5%' }}>
              {showInputs ? (
                <Button
                  disabled={auth.loading}
                  fullWidth
                  size='medium'
                  type='submit'
                  variant='contained'
                  sx={{ mb: '15px', textTransform: 'none' }}
                >
                  {auth.loading ? <CircularProgress color='primary' /> : `${t('button_1')}`}
                </Button>
              ) : (
                <Button
                  fullWidth
                  size='medium'
                  type='button'
                  variant='contained'
                  sx={{ mb: '15px', textTransform: 'none' }}
                  onClick={handleShowInputs}
                >
                  {t('button_1')}
                </Button>
              )}
            </Box>
            <Divider sx={{ textAlign: 'center', fontSize: '14px' }}>{t('login_text_5')}</Divider>
            <Box flexDirection='column' sx={{ marginTop: '15px' }}>
              <Button
                fullWidth
                size='medium'
                variant='outlined'
                component={Link}
                href='https://apifix.profesea.id/auth/google'
                startIcon={<Icon icon='devicon:google' fontSize={20} />}
                sx={{ textTransform: 'none' }}
              >
                {t('input.g_login')}
              </Button>
              <Button
                fullWidth
                size='medium'
                variant='outlined'
                component={Link}
                href='https://apifix.profesea.id/auth/facebook'
                startIcon={<Icon icon='devicon:facebook' fontSize={20} />}
                sx={{ mt: '20px', textTransform: 'none' }}
              >
                {t('input.f_login')}
              </Button>
            </Box>
            <Box sx={{ my: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Typography sx={{ color: '#404040', fontSize: 12, fontWeight: 400 }}>
                {t('tos.tos_start')}
                <Box
                  component={Link}
                  href='/term'
                  target='_blank'
                  sx={{ mx: '3px', color: '#0B58A6', fontWeight: 400 }}
                >
                  {t('tos.tos_terms')}
                </Box>
                {t('tos.tos_and')}
                <Box
                  component={Link}
                  href='/privacy'
                  target='_blank'
                  sx={{ mx: '3px', color: '#0B58A6', fontWeight: 400 }}
                >
                  {t('tos.tos_privacy')}
                </Box>
                {t('tos.tos_end')}
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginCard
