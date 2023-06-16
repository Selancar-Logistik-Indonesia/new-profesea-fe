// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

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
    maxWidth: 500
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 550
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const Register = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings


  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt='register-illustration'
              src={`/images/shipper.png`}
            />
          </RegisterIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-register-mask-${theme.palette.mode}.png`} />
        </Box>
      ) : null}

      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={!hidden ? {
            boxSizing: 'border-box',

            // position: 'absolute',
            // width: '424px', 
            // left: '956px',
            maxWidth: '100%',
            marginTop: '10%',
            marginRight: '10%',
            background: '#FFFFFF',
            border: '1px solid rgba(76, 78, 100, 0.12)',
            borderRadius: '20px',
            p: 7,
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          } : {
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>

            <Box sx={{ mb: 3, maxWidth: '100%', }}>
              <img  alt='logo' src='/images/logosamudera.png' style={{
                maxWidth: '100%',
                height: 'auto',
                padding: 0,
                margin: 0
              }} />

              {/* <TypographyStyled variant='h5' sx={{ textAlign: 'center' }}>SAMUDERA</TypographyStyled> */}
              <Typography variant='h5' sx={{ textAlign: 'center' }}>REGISTER</Typography>
              <Typography variant='body2' sx={{ textAlign: 'center' }}> Adventures start from here, let’s join with our!</Typography>

            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <Link href="/registrasionseafer" passHref legacyBehavior>
                 <Button variant="outlined" fullWidth sx={{ mb: 6, height: '70px', color: 'black' }} startIcon={<Icon icon={'mdi:account-outline'} />} > I AM Seafarer</Button>                    
              </Link>
                <Link href="/registrasioncompany" passHref legacyBehavior>
                  <Button variant="outlined" fullWidth sx={{ mb: 6, height: '70px', color: 'black' }} startIcon={<Icon icon={'mdi:domain'} />} > I AM Company</Button>              
                </Link>
                <Link href="/registrasiontrainer" passHref legacyBehavior>
                  <Button variant="outlined" fullWidth sx={{ mb: 6, height: '70px', color: 'black' }} startIcon={<Icon icon={'mdi:domain'} />} > I AM Trainer</Button>
                </Link>
           
              {/* <Button variant="outlined" fullWidth sx={{ mb: 2 }}  startIcon={<AccessibilityNewOutlinedIcon />} > I AM Seafarer</Button>

              
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}  startIcon={<AccessibilityNewOutlinedIcon />} > I AM Seafarer</Button> */}

              {/* <TextField autoFocus fullWidth sx={{ mb: 4 }} label='Username' placeholder='johndoe' />
              <TextField fullWidth label='Email' sx={{ mb: 4 }} placeholder='user@email.com' />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  id='auth-login-v2-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'mdi:ab-testing' : 'mdi:eye-off-outline'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl> */}
              {/* 
              <FormControlLabel
                control={<Checkbox />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                label={
                  <>
                    <Typography variant='body2' component='span'>
                      I agree to{' '}
                    </Typography>
                    <LinkStyled href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </LinkStyled>
                  </>
                }
              />
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Sign up
              </Button> */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
                <Typography href='/login' component={Link} sx={{ color: 'primary.main', fontWeight: 'bold', }}>
                  Sign in instead
                </Typography>
              </Box>
              {/* <Divider
                sx={{
                  '& .MuiDivider-wrapper': { px: 4 },
                  mt: theme => `${theme.spacing(5)} !important`,
                  mb: theme => `${theme.spacing(7.5)} !important`
                }}
              >
                or
              </Divider>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box> */}
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
