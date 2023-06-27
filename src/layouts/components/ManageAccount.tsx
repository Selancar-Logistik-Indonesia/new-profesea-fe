// ** React Imports
import React,{ ReactNode, useState } from 'react' 
 
// ** MUI Components 
import {Button,  TextField, FormControl,   IconButton,   useMediaQuery, InputLabel, OutlinedInput, InputAdornment, FormHelperText  } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'

import {   useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'
    
import { HttpClient } from 'src/services' 

import Icon from 'src/@core/components/icon'
import {   useTheme } from '@mui/material/styles'
 
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
 
type  FormData = {
  username: string
  password: string  
  password2: string
}  
  
const ManageAccount = () => {  
const schema = yup.object().shape({ 
    password: yup.string().min(5).required()
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
  const onSubmit = (data: FormData) => {
     
    const { username,password,password2 } = data
    const json ={ 
      "address": password,
      "phone": password2,
      "about": username,
    };
    HttpClient.post('https://api.staging.selancar.elogi.id/api/auth/register', json).then(({ data }) => {
        console.log("here 1", data);
         }, error => { 
        console.log("here 1", error);
      });
  } 
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
     <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  > 
     <Grid  container >
      
        <Grid xs={12} md={12} container  sx={!hidden ?{ 
                         p: 4, 
                      display: 'flex',
                      alignItems: 'left',
                      justifyContent: 'left', 
                      marginBottom:'10px',
                      marginLeft:'10px'
          
           }:{ 
          
            }}>
        <Grid item md={12} xs={12} >
          <TextField id="Username" label="Username" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("username")}/>                  
        </Grid>
        <Grid item md={12} xs={12} >
          
             <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              New Password
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
         
        <Grid item md={12} xs={12} >
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              ConfirmPassword
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
            <Button size='small' type='submit' variant='contained'   startIcon={<Icon icon={'mdi:content-save'} />}>
              Save
            </Button> 
         </Grid>
           
         
         <Grid item md={12} xs={12} marginTop={'20px'}>
            <Button size='small' type='button' variant='text' sx={{color:'red'}}   startIcon={<Icon icon={'mdi:delete-alert'} />}>
              DELETE YOUR ACCOUNT?
            </Button> 
         </Grid>
        </Grid> 
         
      </Grid>  
    </form>
  )
}

ManageAccount.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ManageAccount.guestGuard = true

export default ManageAccount
