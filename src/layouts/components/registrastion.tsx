// ** React Imports
import { ReactNode,  useState } from 'react' 

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
import { Alert,  FormHelperText, Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api' 

  interface FormData {
    password2: string
    password: string
    name: string
    position: string
    code: string
    phone: string
    username: string
    email: string
  } 
const Registration = (props:any) => {
  const tipereg = props['tipereg'];

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false) 

  // const [combocode, getCombocode] = useState<any>([])
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
  const save = (json:any) => {
    HttpClient.post(AppConfig.baseUrl+ '/auth/register', json).then(({ data }) => {
        console.log("here 1", data);
        <Alert severity="success" color="info">
            Registrastion Success
        </Alert>
         }, error => { 
        console.log("here 1", error);
         <Alert severity="error" color="info">
            Registrastion Failed
        </Alert>
      });
  };
  const onSubmit = (data: FormData) => {
    const {  password,password2,username,name,phone,email } = data
 
  let teamid:number;
  if (tipereg  == 'seafer') {
    teamid = 1
  }else{
    teamid = 2
  } 
  
  const json ={
    'name': name,
    "email": email,
    "username": username,
    "password": password,
    "password_confirmation": password2,
    "employee_type": "onship",
    "team_id": 1, 
    "country_id": teamid,
    "phone": phone
  };
  try{  
       save(json); 
    } catch (e) {
      alert(e)
       console.log(e); 
    }   
  }; 
 
  // const combobox = () =>{
  //     HttpClient.get(AppConfig.baseUrl+"/public/data/country?search=")
  //     .then((response) =>{
  //       const code   = response.data.countries;
  //       for (let x = 0; x < code.length; x++) {
  //         const element = code[x];
  //         element.label = element.name
          
  //       }

  //           //  const code   = response.data.countries;
  //           //  getCombocode(code);
  //            debugger;

  //     })  
  // }
  // useEffect(() => {  
  //   combobox()
  // },[]) 

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}  >
      <Grid container columnSpacing={'1'} rowSpacing={'0,5'}   sx={{ mb:2 }}>
         {tipereg == 'seafer' ? ( 
           <Grid container columnSpacing={'1'} rowSpacing={'0,5'}   sx={{ mb:2 }}>
              <Grid item md={12} xs={12}>
                <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("name")}/>
              </Grid>
              
                <Grid item md={6} xs={12} >
                  <TextField id="Position" label="Position"  variant="outlined" fullWidth sx={{ mb: 6 }} {...register("position")} />
                </Grid>
                  <Grid item md={2} xs={12} >
                <TextField id="Code" label="Code" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("code")} />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={combocode}  
                  renderInput={(params) => <TextField {...params} label="phonecode" />}
                  onChange={(event: any, newValue: string |null)=> setCombocode(newValue)}
                /> */}
              </Grid>
              <Grid item md={4} xs={12} >
                <TextField id="Phone" label="Phone" variant="outlined" fullWidth sx={{ mb: 6  }} {...register("phone")}/>
              </Grid>
          </Grid>
          ) :   <Grid container columnSpacing={'1'} rowSpacing={'0,5'}   sx={{ mb:2 }}>
              <Grid item md={6} xs={12}>
                <TextField id="Name" label="Name" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("name")}/>
              </Grid>
              
               
                  <Grid item md={2} xs={12} >
                <TextField id="Code" label="Code" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("code")} />
                {/* <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={combocode}  
                  renderInput={(params) => <TextField {...params} label="phonecode" />}
                  onChange={(event: any, newValue: string |null)=> setCombocode(newValue)}
                /> */}
              </Grid>
              <Grid item md={4} xs={12} >
                <TextField id="Phone" label="Phone" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("phone")}/>
              </Grid>
          </Grid>}
        
         
        <Grid item md={6} xs={12} >
          <TextField id="Username" label="Username" variant="outlined" fullWidth sx={{ mb: 6 }} {...register("username")}/>                  
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
          <TextField id="Email" label="Email" variant="outlined" fullWidth  {...register("email")}/>
        </Grid>
        <Grid item md={6} xs={12} >
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              Confirm Password
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
            <Checkbox></Checkbox>
            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', marginTop: '10px', fontSize: "12px" }}>
              Terms Of Service,
            </Typography>
            <Typography sx={{ marginTop: '10px', color: "#424242", fontSize: "12px"}}> &nbsp; I read and accept</Typography>

          </Box>
        </Grid>
        <Grid item md={12} xs={12} > 
          <Box sx={{ display: 'flex', alignItems: 'left', flexWrap: 'wrap', justifyContent: 'left' }}>
            <Checkbox></Checkbox>
            <Typography sx={{ color: 'primary.main', fontWeight: 'bold', marginTop: '10px', fontSize: "12px" }}>
              Privacy Police,
            </Typography>
            <Typography sx={{ marginTop: '10px', color: "#424242", fontSize: "12px" }}> &nbsp; I read and accept</Typography>

          </Box>
        </Grid>
        <Grid item md={3} xs={12} >
          <Button fullWidth size='small' type='submit' href='/register' variant='contained' sx={{ mb: 7 }} startIcon={<Icon icon={'mdi:arrow-left'} />} >
             PREVIOUS 
          </Button>
        </Grid>

        <Grid item md={6} xs={0} ></Grid>
        <Grid item md={3} xs={12} >
          <Button fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }} endIcon={<Icon icon={'mdi:arrow-right'} />}>
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
