// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

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
import { Autocomplete, FormHelperText, Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

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
const Registration = (props: any) => {
  const tipereg = props['tipereg'];
  const router = useRouter()
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [combocode, getCombocode] = useState<any>([])
  const [idcombocode, setCombocode] = useState<any>(0)
  const [idposition, setPosition] = useState<any>(0)
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })


  // const {register,handleSubmit,
  //   control,
  //   formState: { errors }} = useForm{
  //   mode: 'onBlur',
  //   resolver: yupResolver(schema)
  // };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
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
    const { password, password2, username, name, phone, email,term,privacy } = data
    if(term==''){
       toast.error(data.name + ' Please checklist term!');

       return;
    }
    if(privacy==''){
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

    let ship =''
    if(idposition.id == 0 ){
      ship='onship'
    }else{
      ship='offship'
    }    const json = {
      'name': name,
      "email": email,
      "username": username,
      "password": password,
      "password_confirmation": password2,
      "employee_type": ship,
      "team_id": teamid,
      "country_id": idcombocode.id,
      "phone": phone
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
          element.label = element.name + '(' + element.phonecode + ')'
        }
        getCombocode(code);
      })
  }
  useEffect(() => {
    combobox()
  }, [])
  const position = [
    { label: 'Onship',  id: 0 },
    { label: 'Offship',  id: 1 },
  ]

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
      <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
        {tipereg == 'seafer' ? (
          <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
            <Grid item md={12} xs={12}>
              <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("name")} />
            </Grid>

            <Grid item md={4} xs={12} >
              {/* <TextField id="Position" label="Position" variant="outlined" fullWidth sx={{ mb: 6 }} /> */}
              <Autocomplete
                disablePortal
                id="position"
                options={!position ? [{ label: "Loading...", id: 0 }] : position}
                renderInput={(params) => <TextField {...params} label="Position" />}
                {...register("position")}
                onChange={(event: any, newValue: any | null) => setPosition(newValue)}
              />
            </Grid>
            <Grid item md={4} xs={12} >
              {/* <TextField id="Code" label="Code" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("code")} /> */}
              <Autocomplete
                disablePortal
                id="code"
                options={!combocode ? [{ label: "Loading...", id: 0 }] : combocode}
                renderInput={(params) => <TextField {...params} label="phonecode" />}
                {...register("code")}
                onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
              />
            </Grid>
            <Grid item md={4} xs={12} >
              <TextField id="Phone" label="Phone" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("phone")} />
            </Grid>
          </Grid>
        ) : <Grid container columnSpacing={'1'} rowSpacing={'0,5'} sx={{ mb: 2 }}>
          <Grid item md={4} xs={12}>
            <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("name")} />
          </Grid>


          <Grid item md={4} xs={12} >
            {/* <TextField id="Code" label="Code" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("code")} /> */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={!combocode ? [{ label: "Loading...", id: 0 }] : combocode}
              renderInput={(params) => <TextField {...params} label="phonecode" />}
              {...register("code")}
              onChange={(event: any, newValue: string | null) => setCombocode(newValue)}
            />
          </Grid>
          <Grid item md={4} xs={12} >
            <TextField id="Phone" label="Phone" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("phone")} />
          </Grid>
        </Grid>}


        <Grid item md={6} xs={12} >
          <TextField id="Username" label="Username" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("username")} />
        </Grid>
        <Grid item md={6} xs={12} >
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Password
            </InputLabel>
            <OutlinedInput
              sx={{ mb: 6 }}
              label='Password'
              id='password1'
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
        </Grid>
        <Grid item md={6} xs={12} >
          <TextField id="Email" label="Email" variant="outlined" fullWidth  {...register("email")} />
        </Grid>
        <Grid item md={6} xs={12} >
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Password
            </InputLabel>
            <OutlinedInput
              sx={{ mb: 6 }}
              label='Password'
              id='password1'
              error={Boolean(errors.password)}
              type={showPassword ? 'text' : 'password'}
              {...register("password2")}
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
        <Grid item md={12} xs={12} >
          <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
            <Checkbox id='term'  {...register("term")}></Checkbox>
            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', marginTop: '10px' }}>
              Term Of Services,
            </Typography>
            <Typography sx={{ marginTop: '10px', color: 'text.secondary' }}> i read and accept</Typography>

          </Box>
        </Grid>
        <Grid item md={12} xs={12} >
          <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
            <Checkbox id='privacy' {...register("privacy")}></Checkbox>
            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', marginTop: '10px' }}>
              Privacy Police,
            </Typography>
            <Typography sx={{ marginTop: '10px', color: 'text.secondary' }}> i read and accept</Typography>

          </Box>
        </Grid>
        <Grid item md={3} xs={12} >
          <Button fullWidth size='large' type='submit' href='/register' variant='contained' sx={{ mb: 7 }} startIcon={<Icon icon={'mdi:arrow-left'} />} >
            PREVIOUS
          </Button>
        </Grid>

        <Grid item md={6} xs={0} ></Grid>
        <Grid item md={3} xs={12} >
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }} endIcon={<Icon icon={'mdi:arrow-right'} />}>
            REGISTER
          </Button>
        </Grid>
      </Grid>


    </form>
  )
}

Registration.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Registration.guestGuard = true

export default Registration
