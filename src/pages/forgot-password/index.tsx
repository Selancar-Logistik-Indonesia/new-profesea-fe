// ** React Imports
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import toast from 'react-hot-toast'
import { getCleanErrorMessage } from 'src/utils/helpers'
import { HttpClient } from 'src/services'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import Head from 'next/head'



const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

type FormData = {
  email: string
}

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const [message, setMessage]  = useState("")
  const schema = yup.object().shape({
    email: yup.string().email().required()
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
      mode: 'onBlur',
      resolver: yupResolver(schema)
  })

  const onSubmit = async (data : FormData) => {
    const { email } = data;

      const json = {
          "email": email
      };

      try {
          const response = await HttpClient.post('/auth/forgot-password', json);
          // if (response.status != 200) {
              setMessage(response.data?.message)
          // }

      } catch (error) {
          toast.error(`Opps ${getCleanErrorMessage(error)}`);
      }
  }

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
    <Head>
      <title>{`${themeConfig.templateName} - Forgot Password Page`}</title>
    </Head>
    <Box sx={{
      position: 'fit',
      width: '100%',
      height: '100%',
      backgroundImage: "url(/images/bglogin.jpg)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <Box className='content-right'>
        <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
          <Box
            sx={{
              p: 7,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper'
            }}
          >
            <BoxWrapper>
              <Box sx={{ mb: 10, maxWidth: '100%', justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
                <Link href='/'>
                  <Box
                    component="img"
                    src='/images/logosamudera.png'
                    sx={{ width: 225, mt: 5 }}
                  >
                  </Box>
                </Link>
              </Box>
              {(message == "") ? (
                <>
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
                  <Typography variant='body2'>
                    Enter your email and we&prime;ll send you instructions to reset your password
                  </Typography>
                </Box>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <TextField autoFocus type='email' label='Email' sx={{ display: 'flex', mb: 4 }} error={Boolean(errors.email)} {...register("email")} />
                  <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
                    Send reset link
                  </Button>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LinkStyled href='/login'>
                      <Icon icon='mdi:chevron-left' fontSize='2rem' />
                      <span>Back to login</span>
                    </LinkStyled>
                  </Typography>
                </form>
                </>
              ) : (
                <>
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant='h5'> We have e-mailed your password reset link!</TypographyStyled>
                </Box>
                </>
              )}
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    </Box>
    </>
  )
}

ForgotPassword.guestGuard = true
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
