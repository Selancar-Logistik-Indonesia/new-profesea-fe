// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import { Button, Divider, Checkbox, TextField, InputLabel, IconButton, Box, FormControl, OutlinedInput, InputAdornment,tooltipClasses, Typography, Alert, Tooltip, TooltipProps } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import { Autocomplete,  Grid } from '@mui/material'

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
  term: string
  privacy: string
}
const LinkStyled = styled(Link)(() => ({

  textDecoration: 'none',
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
 
  const { tipereg } = props
  const { type } = props
  const { vonchangeEmployee } = props
  const { disabledcombo } = props
  const router = useRouter()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [combocode, getCombocode] = useState<any>([])
  const [idcombocode, setCombocode] = useState<any>({ label: 'Loading...', id: 0 })
  const [idposition, setPosition] = useState<any>(
    type == 'onship' ? { label: 'Pelaut', id: 0 } : type == 'offship' ? { label: 'Non Pelaut', id: 1 } : ''
  )

  const schemaSeafer = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    username: yup.string().required(),
    position: yup.object().nullable().required(),
    phone: yup.string().required()
  })

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
    username: yup.string().required(),
    phone: yup.string().required()
  })

  const [phoneNum, setPhoneNum] = useState('');
  const onChangePhoneNum = (input: string) => {
    setPhoneNum(removeFirstZeroChar(input));
  }
  const handleInputChange = (e: any) => {
    // Mengubah teks menjadi huruf kecil dan menyimpannya dalam state
    // setTeks(e.toLowerCase())
    register('email', e.toLowerCase())
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(tipereg == 'seafer' ? schemaSeafer : schema)
  })

  const save = (json: any) => {
    HttpClient.post(AppConfig.baseUrl + '/auth/register', json).then(({ data }) => {
      console.log("here 1", data);
      toast.success(  ' Successfully submited!');
      router.push('/registersuccess')
    }, error => {
      console.log("here 1", error);
      toast.error('Registrastion Failed ' + error.response.data.message)
    });
  };

  const onSubmit = (data: FormData) => {
    const { password, password2, username, name, email, term, privacy, position } = data
    if (term == '') {
      toast.error(data.name + ' Please checklist term!')

      return
    }

    if (privacy == '') {
      toast.error(data.name + ' Please checklist privacy')

      return
    }

    let ship = ''
    if (idposition.id == 0) {
      ship = 'onship'
    } else {
      ship = 'offship'
    }

    let teamid: number
    if (tipereg == 'seafer') {
      teamid = 2
    } else if (tipereg == 'company') {
      teamid = 3
      ship = ''
    } else {
      teamid = 4
      ship = ''
    }

    const json = {
      name: name,
      email: email,
      username: username,
      password: password,
      password_confirmation: password2,
      employee_type: ship,
      team_id: teamid,
      country_id: idcombocode.id,
      phone: phoneNum
    }

    try {
      save(json)
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  const combobox = () => {
    HttpClient.get(AppConfig.baseUrl + "/public/data/country?search=")
      .then((response) => {
        const code = response.data.countries;
        for (let x = 0; x < code.length; x++) {
          const element = code[x];
          element.label = element.iso + ' (' + element.phonecode + ')'
          if(element.id == 100){
            setCombocode(element)
          }
        }

        getCombocode(code);
      })

  }


  useEffect(() => {
    combobox()
  }, []);

  const position = [
    { label: 'Pelaut', id: 0 },
    { label: 'Non Pelaut', id: 1 },
  ]
  const onChangeEmployee = (newValue: any) => {
    if(newValue){
      setValue("position", newValue)
      setPosition(newValue)
      vonchangeEmployee(newValue.id)
    } else {
      setPosition("")
    }
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
        {tipereg == 'seafer' ? (
          <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
            <Grid item md={12} xs={12}>
              <TextField id='Name' label='Nama Kandidat' variant='outlined' fullWidth sx={{ mb: 2 }} {...register('name')} error={Boolean(errors.name)} />
            </Grid>

            <Grid item md={6} xs={12}>
              <Autocomplete
                disablePortal
                id='position'
                options={!position ? [{ label: 'Loading...', id: 0 }] : position}
                defaultValue={idposition}
                disabled={disabledcombo}
                renderInput={params => <TextField {...params} label='Ship' sx={{ mb: 2 }} error={Boolean(errors.position)}/>}
                {...register('position')}
                onChange={(event: any, newValue: any | null) => onChangeEmployee(newValue)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <Autocomplete
                disablePortal
                id='code'
                options={!combocode ? [{ label: 'Loading...', id: 0 }] : combocode}
                renderInput={params => <TextField {...params} label='Code Phone' sx={{ mb: 2 }} />}
                {...register('code')}
                onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
              /> */}
              <TextField
                id='phone'
                label='No Telp'
                variant='outlined'
                type='number'
                fullWidth
                sx={{ mb: 2 }}
                value={phoneNum}
                {...register("phone")}
                onChange={e => onChangePhoneNum(e.target.value)}
                error={Boolean(errors.phone)}
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
            {/* <Grid item md={4} xs={12}>
              <TextField
                id='Phone'
                label='Phone'
                variant='outlined'
                type='number'
                fullWidth
                sx={{ mb: 2 }}
                value={phoneNum}
                onChange={e => onChangePhoneNum(e.target.value)}
              />
            </Grid> */}
          </Grid>
        ) : (
          <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
            <Grid item md={6} xs={12}>
              <TextField id='Name' label={ (tipereg == 'company') ? 'Nama Perusahaan' : 'Nama Pusat Pelatihan'} variant='outlined' fullWidth sx={{ mb: 2 }} {...register('name')} error={Boolean(errors.name)} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id='phone'
                label='No Telp'
                variant='outlined'
                type='number'
                fullWidth
                sx={{ mb: 2 }}
                value={phoneNum}
                {...register("phone")}
                onChange={e => onChangePhoneNum(e.target.value)}
                error={Boolean(errors.phone)}
                InputProps={{
                  startAdornment: (
                    <Autocomplete
                      style={{ width: '160px' }}
                      disablePortal
                      id='code'
                      options={!combocode ? [{ label: 'Loading...', id: 0 }] : combocode}
                      renderInput={params => <TextField {...params} variant='standard' />}
                      {...register('code')}
                      onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
        )}

        <Divider style={{ width: '100%', marginBottom: '10px' }} />
        <Grid item md={6} xs={12}>
          <TextField
            id='Username'
            label='Username'
            variant='outlined'
            fullWidth
            sx={{ mb: 2 }}
            {...register('username')}
            error={Boolean(errors.username)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id='Email'
            label='Email'
            variant='outlined'
            fullWidth
            // value={teks}
            sx={{ mb: 2 }}
            {...register('email')}
            onChange={e => handleInputChange(e.target.value)}
            error={Boolean(errors.email)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Kata Sandi
            </InputLabel>
            <LightTooltip
              title={
                <Alert severity='info' sx={{ marginTop: 2, marginBottom: 2 }}>
                  <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>Ketentuan Kata Sandi:</Typography>
                  <Box component='ul' sx={{ pl: 4, mb: 0, '& li': { mb: 1, color: 'text.primary' } }}>
                    <li>Minimum 8 karakter</li>
                    <li>Setidaknya satu karakter huruf kecil & satu karakter huruf besar</li>
                  </Box>
                </Alert>
              }
            >
              <OutlinedInput
                sx={{ mb: 1 }}
                label='Password'
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
              {/* {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {(errors as any).password?.message}
              </FormHelperText>
            )} */}
            </LightTooltip>
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Konfirmasi Kata Sandi
            </InputLabel>
            <LightTooltip
              title={
                <Alert severity='info' sx={{ marginTop: 2, marginBottom: 2 }}>
                  <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>Ketentuan Kata Sandi:</Typography>
                  <Box component='ul' sx={{ pl: 4, mb: 0, '& li': { mb: 1, color: 'text.primary' } }}>
                    <li>Minimum 8 karakter</li>
                    <li>Setidaknya satu karakter huruf kecil & satu karakter huruf besar</li>
                  </Box>
                </Alert>
              }
            >
              <OutlinedInput
                sx={{ mb: 1 }}
                label='Konfirmasi Kata Sandi'
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

            {/* {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {(errors as any).password?.message}
              </FormHelperText>
            )} */}
          </FormControl>
        </Grid>
        <Grid item md={12} xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
            <Checkbox id='term' {...register('term')}></Checkbox>
            <LinkStyled href={'/term'} target='_blank'>
              <Typography sx={{ color: 'primary.main', marginTop: '10px' }}>{t('register_text_11')} ,</Typography>
            </LinkStyled>
            <Typography sx={{ marginTop: '10px', color: '#262525' }}>&nbsp; {t('register_text_13')} </Typography>
          </Box>
        </Grid>
        <Grid item md={12} xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
            <Checkbox id='privacy' {...register('privacy')}></Checkbox>

            <LinkStyled href={'/privacy'} target='_blank'>
              <Typography sx={{ color: 'primary.main', marginTop: '10px' }}>{t('register_text_12')} ,</Typography>
            </LinkStyled>
            <Typography sx={{ marginTop: '10px', color: '#262525' }}>&nbsp; {t('register_text_13')} </Typography>
          </Box>
        </Grid>
        <Grid item md={3} xs={12} mt={5}>
          <Link href='/register'>
            <Button
              fullWidth
              size='large'
              type='button'
              variant='outlined'
              sx={{ mb: 7 }}
              startIcon={<Icon icon={'solar:double-alt-arrow-left-bold-duotone'} />}
            >
              BACK
            </Button>
          </Link>
        </Grid>

        <Grid item md={6} xs={0}></Grid>
        <Grid item md={3} xs={12} mt={5}>
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ mb: 7 }}
            endIcon={<Icon icon={'solar:double-alt-arrow-right-bold-duotone'} />}
          >
            REGISTER
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

Registration.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
Registration.guestGuard = true;
export default Registration
