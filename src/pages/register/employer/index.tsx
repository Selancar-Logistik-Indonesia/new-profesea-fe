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
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Container } from '@mui/material'

import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import Registration from 'src/layouts/components/Registration'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'

// ** Styled Components
// const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   padding: theme.spacing(20),
//   paddingRight: '0 !important',
//   [theme.breakpoints.down('lg')]: {
//     padding: theme.spacing(10)
//   }
// }))

// const RegisterIllustration = styled('img')(({ theme }) => ({
//   maxWidth: '100%',
//   [theme.breakpoints.down('xl')]: {
//     maxWidth: '10%'
//   },
//   [theme.breakpoints.down('lg')]: {
//     maxWidth: '10%'
//   }
// }))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 950
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 950
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

  const {} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - Recruiter Registration`}</title>
      </Head>
      <Box className='content-right'>
        {!hidden ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'url(/images/recruiter-00.jpeg)',
              backgroundSize: 'cover'
            }}
          >
            <Container fixed>
              <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh' />
            </Container>
          </Box>
        ) : null}

        <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
          <Box
            sx={
              !hidden
                ? {
                    p: 7,
                    height: '100%',
                    weight: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    backgroundColor: 'background.paper'
                  }
                : {
                    p: 7,
                    height: '100%',
                    weight: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    backgroundColor: 'background.paper'
                  }
            }
          >
            <Container
              sx={{
                marginTop: '40px',
                mr: 6,
                ml: 6
              }}
            >
              <BoxWrapper>
                <Box
                  sx={
                    !hidden
                      ? { mb: 6, marginLeft: '5%', width: '80%', alignItems: 'center', justifyContent: 'center' }
                      : { mb: 6, alignItems: 'center', justifyContent: 'center' }
                  }
                >
                  <Typography variant='h4' sx={{ mb: 1, textAlign: 'left', fontWeight: 'bold', color: '#262525' }}>
                    {t('register_text_8')}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 6, textAlign: 'left', color: '#262525' }}>
                    {' '}
                    {t('register_text_10')}
                  </Typography>
                  <Registration tipereg='company' />
                </Box>
              </BoxWrapper>
            </Container>
          </Box>
        </RightWrapper>
      </Box>
    </>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
