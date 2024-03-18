import { Ref, forwardRef, ReactElement, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { useAuth } from 'src/hooks/useAuth'
import { useSearchParams } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import DialogSuccess from 'src/pages/loginevent/DialogSuccess'
import DialogGoogleLogin from './DialogGoogleLogin'
import DialogMessage from './DialogMessage'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

type BlockDialog = {
  visible: boolean
  onCloseClick: VoidFunction
}

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

const DialogLogin = (props: BlockDialog) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false)
  const [openDialogMessage, setOpenDialogMessage] = useState<boolean>(false)
  const [openBlockModal, setOpenBlockModal] = useState(false)
  const auth = useAuth()
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
    <Dialog
      fullWidth
      open={props.visible}
      maxWidth='sm'
      onClose={props.onCloseClick}
      TransitionComponent={Transition}
      sx={{ opacity: openModalGoogle ? '0%' : '100%' }}
    >
      <DialogContent
        sx={{
          position: 'relative',
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <IconButton size='small' onClick={props.onCloseClick} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>
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
                  placeholder='Email'
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
          <Box sx={{ marginTop: '5%' }}>
            <Button disabled={auth.loading} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }}>
              {auth.loading ? <CircularProgress color='primary' /> : `${t('button_1')}`}
            </Button>
          </Box>
          <Divider sx={{ textAlign: 'center', fontSize: '16px' }}>{t('login_text_5')}</Divider>
          <Box sx={{ marginTop: '5%' }}>
            <Button fullWidth size='large' variant='outlined' sx={{ mb: 3 }} onClick={() => setOpenModalGoogle(true)}>
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
      </DialogContent>
      <DialogSuccess
        visible={openBlockModal}
        onCloseClick={() => {
          setOpenBlockModal(!openBlockModal)
          // window.location.replace('/home')
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
    </Dialog>
  )
}

export default DialogLogin
