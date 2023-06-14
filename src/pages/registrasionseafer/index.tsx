// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography, { TypographyProps } from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel' 
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import UserIcon from 'src/layouts/components/UserIcon'
import { Container, FormHelperText, Grid, Paper } from '@mui/material' 

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import Registration from 'src/layouts/components/registrastion'
// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 1200
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 1200
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 900
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
})); 

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ 
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  return (
    <Box className='content-right'>  
     
      {!hidden ? ( 
         
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
             <Container fixed>
                  <Grid container spacing={2}>
                    <Grid item   md={12} xs={12}> 
                      <img src='/images/logosamudera.png'style={{ maxWidth: '100%',
                        height: '100px',  
                        marginTop:'10px',
                        padding: 0,
                        margin: 0 }} />
                    </Grid>
                  </Grid>
              <RegisterIllustrationWrapper>
             
              <RegisterIllustration
                alt='register-illustration'
                src={`/images/sailor.png`}
                height={'800px'}
              />
            </RegisterIllustrationWrapper>

             </Container>
           
            <FooterIllustrationsV2   image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`}/>
          </Box> 
        ) : null};  
         
          <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}> 
        <Box
          sx={!hidden?{
           p: 7,
            height: '100%',
              weight: '100%',
            display: 'flex', 
            justifyContent: 'flex-start',
            backgroundColor: 'background.paper'
          }:{
            p: 7,
            height: '100%',
            weight: '100%',
            display: 'flex', 
            justifyContent: 'flex-start',
            backgroundColor: 'background.paper'
          }}
        > 
          <Container sx={{
            marginTop:'100px'
          } }>
            <BoxWrapper>
            
              <Box sx={{ mb: 6,  maxWidth: '100%', }}> 
                <Typography variant='h5' sx={{  mb: 6,textAlign: 'left' }}>CREATE AN ACCOUNT SEAFER</Typography>
                <Typography variant='body2' sx={{  mb: 6,textAlign: 'left' }}> Enter Your Account As Seafarer In Here!</Typography>
              
              </Box>
               <Registration></Registration>
            </BoxWrapper>
            </Container>
          </Box>
        </RightWrapper> 
      
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
