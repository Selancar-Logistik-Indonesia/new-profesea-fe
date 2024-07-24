// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import {
  Button,
  Divider,
  Checkbox,
  TextField,
  InputLabel,
  IconButton,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  tooltipClasses,
  Typography,
  Alert,
  Tooltip,
  TooltipProps
} from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { Autocomplete, Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { removeFirstZeroChar } from 'src/utils/helpers'

import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

interface FormData {
  password2: string
  password: string
  name: string
  position: string
  code: string
  phone: string
  username: string
  email: string
  tos: string
}
const LinkStyled = styled(Link)(() => ({
  textDecoration: 'none'
}))

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

const Registration = (props: any) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { tipereg } = props
  const { type } = props
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [combocode, getCombocode] = useState<any>([])
  const [idcombocode, setCombocode] = useState<any>({ label: 'Loading...', id: 0 })
  const [error, setError] = useState<any>(null)

  const schemaSeafarer = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    username: yup.string().required(),
    phone: yup.string().required()
  })

  const [phoneNum, setPhoneNum] = useState('')
  const onChangePhoneNum = (input: string) => {
    setPhoneNum(removeFirstZeroChar(input))
  }
  const handleInputChange = (e: any) => {
    register('email', e.toLowerCase())
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schemaSeafarer)
  })

  const save = (json: any) => {
    HttpClient.post(AppConfig.baseUrl + '/auth/register', json).then(
      () => {
        toast.success('Successfully submited!')
        router.push('/registersuccess')
      },
      error => {
        setError(error.response.data.errors)
        toast.error('Registrastion Failed ' + error.response.data.message)
      }
    )
  }

  const onSubmit = (data: FormData) => {
    const { password, password2, username, name, email, tos } = data
    if (tos == '') {
      toast.error(`${t('input_label_error_5')}`)

      return
    }

    if (password !== password2) {
      toast.error(`${t('input_label_error_6')}`)

      return
    }

    let teamid: number
    if (tipereg == 'seafarer') {
      teamid = 2
    } else if (tipereg == 'company') {
      teamid = 3
    } else {
      teamid = 4
    }

    const json = {
      name: name,
      email: email,
      username: username,
      password: password,
      password_confirmation: password2,
      employee_type: type,
      team_id: teamid,
      country_id: idcombocode.id,
      phone: phoneNum
    }

    try {
      setError(null)
      save(json)
    } catch (e) {
      alert(e)
    }
  }

  const combobox = () => {
    HttpClient.get(AppConfig.baseUrl + '/public/data/country?search=').then(response => {
      const code = response.data.countries
      for (let x = 0; x < code.length; x++) {
        const element = code[x]
        element.label = element.iso + ' (' + element.phonecode + ')'
        if (element.id == 100) {
          setCombocode(element)
        }
      }
      getCombocode(code)
    })
  }

  useEffect(() => {
    combobox()
  }, [])

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={2} rowSpacing={4} mt={1}>
        <Grid item md={6} xs={12}>
          <TextField
            id='Name'
            label={
              tipereg == 'seafarer'
                ? `${t('input_label_3_1')}`
                : 'company'
                ? `${t('input_label_3_2')}`
                : `${t('input_label_3_3')}`
            }
            variant='outlined'
            fullWidth
            {...register('name')}
            error={Boolean(errors.name)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id='phone'
            label={t('input_label_4')}
            variant='outlined'
            type='number'
            fullWidth
            value={phoneNum}
            {...register('phone')}
            onChange={e => onChangePhoneNum(e.target.value)}
            error={Boolean(errors.phone)}
            placeholder={'85234567'}
            InputProps={{
              startAdornment: (
                <Autocomplete
                  style={{ width: '160px' }}
                  disablePortal
                  id='code'
                  options={!combocode ? [{ label: 'Loading...', id: 0 }] : combocode}
                  renderInput={params => <TextField {...params} variant='standard' />}
                  value={idcombocode}
                  {...register('code')}
                  onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
                />
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Divider sx={{ width: '100%' }} />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id='Username'
            label={t('input_label_5')}
            variant='outlined'
            fullWidth
            {...register('username')}
            onChange={() => setError({ ...error, username: null })}
            error={Boolean(errors.username || (error && error.username))}
          />
          {error && error.username && (
            <Typography sx={{ color: 'red', fontSize: 10, m: 1, pl: 1 }}>{error.username}</Typography>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id='Email'
            label={t('input_label_1')}
            variant='outlined'
            fullWidth
            {...register('email')}
            onChange={e => {
              handleInputChange(e.target.value)
              setError({ ...error, email: null })
            }}
            error={Boolean(errors.email || (error && error.email))}
          />
          {error && error.email && (
            <Typography sx={{ color: 'red', fontSize: 10, m: 1, pl: 1 }}>{error.email}</Typography>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              {t('input_label_2')}
            </InputLabel>
            <LightTooltip
              title={
                <Alert severity='info' sx={{ marginTop: 2, marginBottom: 2 }}>
                  <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>{t('register_rule_1')}</Typography>
                  <Box component='ul' sx={{ pl: 4, mb: 0, '&li': { mb: 1, color: 'text.primary' } }}>
                    <li>{t('register_rule_2')}</li>
                    <li>{t('register_rule_3')}</li>
                  </Box>
                </Alert>
              }
            >
              <OutlinedInput
                sx={{ mb: 1 }}
                label={t('input_label_2')}
                id='password1'
                error={Boolean(errors.password)}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
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
            </LightTooltip>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              {t('input_label_6')}
            </InputLabel>
            <LightTooltip
              title={
                <Alert severity='info' sx={{ marginTop: 2, marginBottom: 2 }}>
                  <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>{t('register_rule_1')}</Typography>
                  <Box component='ul' sx={{ pl: 4, mb: 0, '&li': { mb: 1, color: 'text.primary' } }}>
                    <li>{t('register_rule_2')}</li>
                    <li>{t('register_rule_3')}</li>
                  </Box>
                </Alert>
              }
            >
              <OutlinedInput
                sx={{ mb: 1 }}
                label={t('input_label_6')}
                id='password2'
                error={Boolean(errors.password)}
                type={showPassword ? 'text' : 'password'}
                {...register('password2')}
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
            </LightTooltip>
          </FormControl>
        </Grid>
        <Grid container>
          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', flexWrap: 'wrap' }}>
            <Checkbox id='tos' {...register('tos')}></Checkbox>
            <Typography sx={{ color: '#262525' }}>{t('register_text_13')}&nbsp; </Typography>
            <LinkStyled href={'/term'} target='_blank'>
              <Typography sx={{ color: 'primary.main' }}>{t('register_text_11')}</Typography>
            </LinkStyled>
            <Typography sx={{ color: '#262525' }}>&nbsp;{t('register_text_16')}&nbsp; </Typography>
            <LinkStyled href={'/privacy'} target='_blank'>
              <Typography sx={{ color: 'primary.main' }}>{t('register_text_12')}</Typography>
            </LinkStyled>
            <Typography sx={{ color: '#262525' }}>&nbsp;{t('register_text_17')} </Typography>
          </Box>
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            href={'/register'}
            size='large'
            type='button'
            variant='outlined'
            sx={{ mt: 5 }}
            startIcon={<Icon icon={'solar:double-alt-arrow-left-bold-duotone'} />}
          >
            {t('button_5')}
          </Button>
          <Button
            size='large'
            type='submit'
            variant='contained'
            sx={{ mt: 5 }}
            endIcon={<Icon icon={'solar:double-alt-arrow-right-bold-duotone'} />}
          >
            {t('button_4')}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

Registration.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Registration.guestGuard = true
export default Registration
