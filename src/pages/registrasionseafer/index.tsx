// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Container, Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

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
  maxWidth: '100%',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '10%'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '10%'
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

const Register = () => {
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
            marginTop='50px'
          > 
          
            <Grid   >
              <Grid item md={12} xs={12} >
                <img src='/images/logosamudera.png' style={{
                  maxWidth: '100%',
                  height: '100%',
                  marginBottom: '50px',
                  padding: 0,
                  margin: 0,
                  alignItems:'center'
                }} />
              </Grid>
               <Grid item md={12} xs={12} >
                 <img src='/images/sailor.png' style={{
                  maxWidth: '100%',
                  height: '700px',
                  marginTop: '10px',
                  marginLeft: '70px',
                  padding: 0,
                  margin: 0,
                  alignItems:'center'
                }} />
               </Grid>
            </Grid>
            </Box>
            {/* <RegisterIllustrationWrapper>

              <RegisterIllustration
                alt='register-illustration'
                src={`/images/sailor.png`}
                height={'800px'}
              />
            </RegisterIllustrationWrapper> */}

          </Container>

          {/* <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} /> */}
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
            marginTop: '100px'
          }}>
            <BoxWrapper>

              <Box sx={{ mb: 6, maxWidth: '100%', }}>
                <Typography variant='h5' sx={{ mb: 6, textAlign: 'left' }}>CREATE AN ACCOUNT SEAFER</Typography>
                <Typography variant='body2' sx={{ mb: 6, textAlign: 'left' }}> Enter Your Account As Seafarer In Here!</Typography>

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
