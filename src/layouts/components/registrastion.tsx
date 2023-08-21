// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import { Button, Divider, Checkbox, TextField, InputLabel, IconButton, Box, FormControl, OutlinedInput, InputAdornment, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import { Autocomplete, FormHelperText, Grid } from '@mui/material'

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
const Registration = (props: any) => {
    const { tipereg } = props;
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [combocode, getCombocode] = useState<any>([])
    const [idcombocode, setCombocode] = useState<any>(0)
    const [idposition, setPosition] = useState<any>(0)
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(5).required()
    })

    const [phoneNum, setPhoneNum] = useState('');

    const onChangePhoneNum = (input: string) => {
        setPhoneNum(removeFirstZeroChar(input));
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormData>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const save = (json: any) => {
        HttpClient.post(AppConfig.baseUrl + '/auth/register', json).then(({ data }) => {
            console.log("here 1", data);
            toast.success(data.name + ' Successfully submited!');
            router.push('/registersuccess')
        }, error => {
            console.log("here 1", error);
            toast.error('Registrastion Failed ' + error.response.data.message)
        });
    };

    const onSubmit = (data: FormData) => {
        const { password, password2, username, name, email, term, privacy } = data
        if (term == '') {
            toast.error(data.name + ' Please checklist term!');

            return;
        }

        if (privacy == '') {
            toast.error(data.name + ' Please checklist privacy');

            return;
        }

        let teamid: number;
        if (tipereg == 'seafer') {
            teamid = 2
        } else if (tipereg == 'company') {
            teamid = 3
        } else {
            teamid = 4
        }

        let ship = ''
        if (idposition.id == 0) {
            ship = 'onship'
        } else {
            ship = 'offship'
        } const json = {
            'name': name,
            "email": email,
            "username": username,
            "password": password,
            "password_confirmation": password2,
            "employee_type": ship,
            "team_id": teamid,
            "country_id": idcombocode.id,
            "phone": phoneNum
        };

        try {
            save(json);
        } catch (e) {
            alert(e)
            console.log(e);
        }
    };

    const combobox = () => {
        HttpClient.get(AppConfig.baseUrl + "/public/data/country?search=")
            .then((response) => {
                const code = response.data.countries;
                for (let x = 0; x < code.length; x++) {
                    const element = code[x];
                    element.label = element.iso + ' (' + element.phonecode + ')'
                }

                getCombocode(code);
            })
    }

    useEffect(() => {
        combobox()
    }, []);

    const position = [
        { label: 'Onship', id: 0 },
        { label: 'Offship', id: 1 },
    ]

    return (
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
          {tipereg == 'seafer' ? (
            <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
              <Grid item md={12} xs={12}>
                <TextField id='Name' label='Name' variant='outlined' fullWidth sx={{ mb: 2 }} {...register('name')} />
              </Grid>

              <Grid item md={5} xs={12}>
                <Autocomplete
                  disablePortal
                  id='position'
                  options={!position ? [{ label: 'Loading...', id: 0 }] : position}
                  renderInput={params => <TextField {...params} label='Position' sx={{ mb: 2 }} />}
                  {...register('position')}
                  onChange={(event: any, newValue: any | null) => setPosition(newValue)}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id='code'
                  options={!combocode ? [{ label: 'Loading...', id: 0 }] : combocode}
                  renderInput={params => <TextField {...params} label='Code Phone' sx={{ mb: 2 }} />}
                  {...register('code')}
                  onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id='Phone'
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 2 }}
                  value={phoneNum}
                  onChange={e => onChangePhoneNum(e.target.value)}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
              <Grid item md={6} xs={12}>
                <TextField id='Name' label='Name' variant='outlined' fullWidth sx={{ mb: 2 }} {...register('name')} />
              </Grid>
              <Grid item md={3} xs={12}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={!combocode ? [{ label: 'Loading...', id: 0 }] : combocode}
                  renderInput={params => <TextField {...params} label='Phone Code' sx={{ mb: 2 }} />}
                  {...register('code')}
                  onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <TextField
                  id='Phone'
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  sx={{ mb: 2 }}
                  value={phoneNum}
                  onChange={e => onChangePhoneNum(e.target.value)}
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
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField id='Email' label='Email' variant='outlined' fullWidth sx={{ mb: 2 }} {...register('email')} />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
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
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {(errors as any).password?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                sx={{ mb: 1 }}
                label='Confirm Password'
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
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  {(errors as any).password?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
              <Checkbox id='term' {...register('term')}></Checkbox>
              <Typography sx={{ color: 'primary.main', marginTop: '10px' }}>Terms Of Services,</Typography>
              <Typography sx={{ marginTop: '10px', color: '#424242' }}>&nbsp; I read and accept</Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
              <Checkbox id='privacy' {...register('privacy')}></Checkbox>

              <LinkStyled href={'/privacy'}>
                <Typography sx={{ color: 'primary.main', marginTop: '10px' }}>Privacy Police,</Typography>
              </LinkStyled>
              <Typography sx={{ marginTop: '10px', color: '#424242' }}>&nbsp; I read and accept</Typography>
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
