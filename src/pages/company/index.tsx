// ** React Imports
import React, { ReactNode } from 'react'

// ** MUI Components
import Box  from '@mui/material/Box' 
import Typography from '@mui/material/Typography'
import {Button, Tabs, Tab, TextField, FormControl  } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'

import {   useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'
   
import Icon from 'src/@core/components/icon'  
import { HttpClient } from 'src/services'
 
 
type  FormData = {
  companyName: string
  industryType: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string 
  code: string
  website: string
  phone: string
  address: string
  about: string
} 
const Company = () => {
  // const theme = useTheme()
  // const { settings } = useSettings()
// ** Vars
  // const { skin } = settings
  
   
  const { 
    register,  
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur', 
  })  
  const onSubmit = (data: FormData) => {
     
    const { companyName,industryType,country,district,city,postalCode,email,code,website,phone,address,about } = data
    const json ={
      'companynema': companyName,
      "email": industryType,
      "username": country,
      "password": district,
      "password_confirmation": city,
      "employee_type": postalCode,
      "team_id": email, 
      "country_id": code,
      "website": website,
      "address": address,
      "phone": phone,
      "about": about,
    };
    HttpClient.post('https://api.staging.selancar.elogi.id/api/auth/register', json).then(({ data }) => {
        console.log("here 1", data);
         }, error => { 
        console.log("here 1", error);
      });
  }

 

 

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
            {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
 
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }; 

  return (           
      <Box  >
       <Grid container spacing={2}>
          <Grid container xs={9}  sx={ {
                      boxSizing: 'border-box',  
                      background: '#FFFFFF', 
                      border: '1px solid rgba(76, 78, 100, 0.12)',
                      borderRadius: '20px',
                      p: 4, 
                      display: 'flex',
                      alignItems: 'left',
                      justifyContent: 'left', 
                      marginBottom:'10px'
                    } }>  
            <Grid xs={12}> 
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                  </Tabs>
                </Box> 
            </Grid> 
            <Grid xs={9}>  </Grid>
            <Grid xs={3} container justifyContent={'right'} marginTop={'10px'}>  
                  <Button size='small' type='button' variant='contained'   startIcon={<Icon icon={'mdi:visibility-outline'} />}>
                      Resume Preview
                  </Button> 
            </Grid>
             <Grid xs={12}> 
                <TabPanel value={value} index={0}>
                   <Grid  container >
                    <Grid xs={6} container >
                      <Grid xs={4} container  justifyContent={'center'}>
                          <img alt='logo' src='/images/avatar.png'style={{ maxWidth: '100%',
                            height: '120px',
                            padding: 0,
                            margin: 0 }} />
                      </Grid>
                      <Grid  xs={8} direction={'row'}  justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
                        <input
                          accept="image/*" 
                          style={{ display:'none' }}
                          id="raised-button-file"
                          multiple
                          type="file"
                        >
                          
                        </input>
                        <label htmlFor="raised-button-file">
                          <Button size='small' variant="contained" component="span" >
                            Upload New Image
                          </Button>
                        </label> 
                        <label htmlFor="raised-button-file">
                          <Button size='small' variant="contained" component="span" color='error' >
                            Reset
                          </Button>
                        </label>  
                        <Typography variant="body2" >Allowed JPG, GIF or PNG. </Typography>
                        <Typography variant="body2" >Max size of 800K. Aspect Ratio 1:1 </Typography>
                      </Grid> 
                    </Grid> 
                    <Grid xs={6} container >
                      <Grid xs={4} container  justifyContent={'center'}>
                          <img alt='logo' src='/images/avatar.png'style={{ maxWidth: '100%',
                            height: '120px',
                            padding: 0,
                            margin: 0 }} />
                      </Grid>
                      <Grid  xs={8} direction={'row'}  justifyContent={'center'} alignContent={'center'} marginTop={'20px'}>
                        <input
                          accept="image/*" 
                          style={{ display:'none' }}
                          id="raised-button-file"
                          multiple
                          type="file"
                        >
                          
                        </input>
                        <label htmlFor="raised-button-file">
                          <Button size='small' variant="contained" component="span" >
                            Upload New Logo
                          </Button>
                        </label> 
                        <label htmlFor="raised-button-file">
                          <Button size='small' variant="contained" component="span" color='error' >
                            Reset
                          </Button>
                        </label>  
                        <Typography variant="body2" >Allowed JPG, GIF or PNG. </Typography>
                        <Typography variant="body2" >Max size of 800K. Aspect Ratio 1:1 </Typography>
                      </Grid> 
                    </Grid> 
                     <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                     <FormControl> 
                    <Grid xs={12} container margin={'25px'}>
                        <Grid container spacing={2} sx={{ mb:2 }}>
                            <Grid item md={12} xs={12}>
                            <TextField id="companyName" label="companyName"   variant="outlined"  fullWidth sx={{ mb: 6 }}   
                            {...register("companyName")}/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                            <TextField id="industryType" label="industryType"    variant="outlined" fullWidth sx={{ mb: 6 }} 
                             {...register("industryType")}/>
                            </Grid>
                            <Grid item md={2} xs={12} >
                            <TextField id="country" label="country" variant="outlined" fullWidth sx={{ mb: 6 }}    {...register("country")}/>
                            </Grid>
                            <Grid item md={4} xs={12} >
                            <TextField id="district" label="Phone" variant="outlined" fullWidth sx={{ mb: 6 }}   {...register("district")}/>
                            </Grid>
                            <Grid item md={6} xs={12} >
                            <TextField id="city" label="city" variant="outlined" fullWidth sx={{ mb: 6 }}     {...register("city")}/>
                            </Grid> 
                            
                            <Grid item md={6} xs={12} >
                            <TextField id="postalcode" label="postalcode" variant="outlined" fullWidth sx={{ mb: 6 }}     {...register("postalCode")}/>
                            </Grid> 
                            <Grid item md={6} xs={12} >
                            <TextField id="Email" label="Email" variant="outlined" fullWidth  {...register("email")}/>
                            </Grid> 
                            <Grid item md={6} xs={12} >
                            <TextField id="website" label="website" variant="outlined" fullWidth     {...register("website")}/>
                            </Grid> 
                            
                            <Grid item md={6} xs={12} >
                            <TextField id="code" label="code" variant="outlined" fullWidth     {...register("code")}/>
                            </Grid> 
                            
                            <Grid item md={6} xs={12} >
                            <TextField id="phone" label="phone" variant="outlined" fullWidth     {...register("phone")}/>
                            </Grid> 
                            
                            <Grid item md={6} xs={12} >
                            <TextField id="address" label="address" variant="outlined" fullWidth     {...register("address")}/>
                            </Grid> 
                            <Grid item md={6} xs={12} >
                            <TextField id="about" label="about" variant="outlined" fullWidth     {...register("about")}/>
                            </Grid> 
                            
                        </Grid>
                    </Grid>
                   </FormControl>
                   
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 } }>
                                Save
                            </Button>
                     </form>
                     <form onSubmit={handleSubmit(onSubmit)}>
              
                 <TextField id="about" label="about" variant="outlined" fullWidth  {...register("about")}  />
                
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 } }>
                Login
              </Button>
              
                 
            </form>
                   </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
            </Grid> 
          
          </Grid>

          {/* <Grid xs={3}> 
          <Item>2</Item>
          </Grid> */}
            
        </Grid>
          
       


      </Box>
      
        
  )
}

Company.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Company.guestGuard = true

export default Company
