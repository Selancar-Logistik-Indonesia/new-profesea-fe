import { ReactNode } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useSettings } from 'src/@core/hooks/useSettings'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'
// import DialogGoogleLogin from './DialogGoogleLogin'

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
  width: '70%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 500
  }
}))

const onHiddenBox = {
  p: 7,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'background.paper'
}

const regularBox = {
  boxSizing: 'border-box',
  maxWidth: '100%',
  marginTop: '10%',
  margin: '10%',
  background: '#FFFFFF',
  border: '1px solid rgba(76, 78, 100, 0.12)',
  borderRadius: '20px',
  p: 7,
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const Register = () => {
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  // const [openModalGoogle, setOpenModalGoogle] = useState<boolean>(false);
  const { skin } = settings

  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - Choose who you are`}</title>
      </Head>
      <Box
        sx={{
          position: 'fit',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/register-00.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Box className='content-right'>
          {!hidden ? (
            <Box
              sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            ></Box>
          ) : null}

          <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
            <Box sx={!hidden ? regularBox : onHiddenBox}>
              <BoxWrapper>
                <Box
                  sx={{
                    mb: 3,
                    maxWidth: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Link href='/'>
                    <Box component='img' src='/images/logosamudera.png' sx={{ width: 125, mt: 5, mb: 5 }}></Box>
                  </Link>
                  {/* <Typography variant='h5' sx={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold', color: "#262525" }}>Register</Typography> */}
                  <Typography variant='body2' sx={{ textAlign: 'center', color: '#262525', mb: 8 }}>
                    {' '}
                    {t('register_text_1')}{' '}
                  </Typography>
                </Box>

                <Link href='/register/seafarer' passHref legacyBehavior>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{ mb: 6, height: '70px', color: 'white' }}
                    style={{ textTransform: 'none' }}
                    startIcon={<Icon icon={'solar:user-hands-bold-duotone'} />}
                  >
                    {t('register_text_4')}
                  </Button>
                </Link>
                <Link href='/register/recruiter' passHref legacyBehavior>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{ mb: 6, height: '70px', color: 'white' }}
                    style={{ textTransform: 'none' }}
                    startIcon={<Icon icon={'solar:buildings-3-bold-duotone'} />}
                  >
                    {t('register_text_5')}
                  </Button>
                </Link>
                <Link href='/register/trainer' passHref legacyBehavior>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{ mb: 6, height: '70px', color: 'white' }}
                    style={{ textTransform: 'none' }}
                    startIcon={<Icon icon={'solar:user-hand-up-bold-duotone'} />}
                  >
                    {t('register_text_6')}
                  </Button>
                </Link>

                {/* <Box sx={{ marginTop: '2.5%' }}>
                    <Button
                      fullWidth
                      size='medium'
                      variant='outlined'
                      sx={{ mb: 3 }}
                      onClick={() => setOpenModalGoogle(true)}
                    >
                      {t('register_text_2A')} Google <Icon icon={'devicon:google'} style={{ marginLeft: 5 }} />
                    </Button>
                  </Box> */}

                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography sx={{ mr: 2, color: '#262525' }}>{t('register_text_2')} </Typography>
                  <Typography href='/login' component={Link} sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    {t('register_text_3')}
                  </Typography>
                </Box>
              </BoxWrapper>
            </Box>
          </RightWrapper>
        </Box>
      </Box>
      {/* <DialogGoogleLogin
        visible={openModalGoogle}
        onCloseClick={() => {
          setOpenModalGoogle(!openModalGoogle)
        }}
      /> */}
    </>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true
export default Register
