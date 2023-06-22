// ** React Imports
import { ReactNode } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports 
import { Container, Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import Registration from 'src/layouts/components/registrastion'
  

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

const RegisterTrainer = () => {
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
  })

  const {
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

      
  return (
 <Box className='content-right'>

      {!hidden ? (

        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <Container fixed>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            marginTop='70px'
          >  
            <Grid   >
              <Grid item md={12} xs={12} >
                <img alt="logo" src='/images/logosamudera.png' style={{
                  maxWidth: '100%',
                  height: '100%',   
                  alignItems:'center',
                  justifyContent:'center'
                }} />
              </Grid>
              
               <Grid item md={12} xs={12} >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh" 
                  > 
                    <img alt="sailor" src='/images/company.png' style={{
                      maxWidth: '100%',
                      height: '650px',  
                      alignItems:'center',
                      justifyContent:'center',
                      marginBottom:'30%'
                    }} />
                  </Box> 
               </Grid>
            </Grid>
            </Box> 
          </Container> 
        </Box>
      ) : null};

      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={!hidden ? {
            p: 7,
            height: '100%',
            weight: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            backgroundColor: 'background.paper'
          } : {
            p: 7,
            height: '100%',
            weight: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            backgroundColor: 'background.paper'
          }}
        >
          <Container sx={{
            marginTop: '50px', mr: 6,ml: 6,
          }}>
            <BoxWrapper>

              <Box sx={!hidden ?{ mb: 6, marginLeft:'5%',   width: '70%', alignItems:'center',justifyContent:'center' }:
                  { mb: 6,     alignItems:'center',justifyContent:'center' }}>
                <Typography variant='h3' sx={{ mb: 6, textAlign: 'left',fontWeight: 'bold' }}>Create an Account Seafarer</Typography>
                <Typography variant='body2' sx={{ mb: 6, textAlign: 'left' }}> Enter Your Account As Seafarer In Here!</Typography>
                <Registration></Registration>
              </Box>
             
            </BoxWrapper>
          </Container>
        </Box>
      </RightWrapper>

    </Box>
  )
}

RegisterTrainer.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

RegisterTrainer.guestGuard = true

export default RegisterTrainer
