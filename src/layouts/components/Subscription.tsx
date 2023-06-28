// ** React Imports
import React,{ ReactNode  } from 'react' 
 
// ** MUI Components 
import Typography from '@mui/material/Typography'
import {Button,     useMediaQuery   } from '@mui/material'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'

import {   useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'
     

import Icon from 'src/@core/components/icon'
import {   useTheme } from '@mui/material/styles'
  
 
type  FormData = {
  username: string
  password: string  
  password2: string
}  
  
const Subscription = () => { 
   
 
   
  const {  
       
  } = useForm<FormData>({
    mode: 'onBlur',  
 const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (  
    <Grid  container >
       <Grid xs={12} md={12} container  sx={!hidden ?{ 
                         p: 4, 
                      display: 'flex',
                      alignItems: 'left',
                      justifyContent: 'left', 
                      marginBottom:'10px',
                      marginLeft:'50px'
          
           }:{ 
          
            }}>
      <Grid xs={6} md={9}   >
        <Grid container item md={9} xs={12} marginTop={'50px'} >
            <Grid item md={12} xs={12}  > 
              <Typography variant="h5">SUBSCRIPTION</Typography>
            </Grid>
            <Grid item md={12} xs={12}    > 
                <Typography variant="h6">Freemium</Typography> 
            </Grid>
            <Grid item md={12} xs={12}  >
              <Button size='small' type='button' variant='contained' >
                Upgrade Plan Now
              </Button> 
            </Grid> 
        </Grid>  
      </Grid>  
      <Grid item md={3}  xs={6}   justifyContent={'center'}  >
                <Icon icon={'mdi:lock'} height={'200'} color='#ff9b99'/>   
        </Grid>
        </Grid>
    </Grid>   
  )
}

Subscription.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Subscription.guestGuard = true

export default Subscription
