import { ReactNode, useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useSearchParams } from 'next/navigation'
import DialogSuccess from '../loginevent/DialogSuccess'

const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
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

const LoginPage = () => {
    const theme = useTheme()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))
    const { skin } = settings
    const [openBlockModal, setOpenBlockModal] = useState(true)
    const searchParams = useSearchParams()
    const event = searchParams.get('event')
	if (event != null) {
       return (
         <DialogSuccess
           visible={openBlockModal}
           onCloseClick={() => {
             setOpenBlockModal(!openBlockModal)
             window.location.replace('/registersuccess')
           }}
         />
       )
     }

    return (
        <Box className='content-right'>
            <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
                <Box
                    sx={!hidden ? {
                        boxSizing: 'border-box',
                        maxWidth: '100%',
                        marginTop: '10%',
                        marginLeft: '10%',
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
                        <Box sx={{ mb: 3, maxWidth: '100%', textAlign: 'center' }}>
                            <Link href={"/"}>
                                <img alt='logo' src='/images/logosamudera.png' style={{
                                    width: 125,
                                    padding: 0,
                                    marginBottom: 10,
                                }} />
                            </Link>

                            <Typography variant='h6' color={'#32487A'} fontWeight='600' mb={5} sx={{ textAlign: 'center' }}>
                                Verify your email
                            </Typography>
                            <Typography mb={5} variant='body1' sx={{ textAlign: 'center' }}> Account activation link sent to your email address. Please follow the link inside to continue.</Typography>
                        </Box>

                        <Link href={"/login"}>
                            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                Login
                            </Button>
                        </Link>

                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Typography sx={{ mr: 2, color: 'text.secondary' }}>Didn't get the mail?  </Typography>
                            <Typography href='/register' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                                Resend
                            </Typography>
                        </Box>
                        <Divider
                            sx={{
                                '& .MuiDivider-wrapper': { px: 4 },
                                mt: theme => `${theme.spacing(5)} !important`,
                                mb: theme => `${theme.spacing(7.5)} !important`
                            }}
                        />
                    </BoxWrapper>
                </Box>
            </RightWrapper>
            {!hidden ? (
                <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <LoginIllustrationWrapper>
                        <LoginIllustration alt='login-illustration' src={`/images/img-verifyemail.png`} style={{
                            maxWidth: '100%',
                            height: '320px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10%'
                        }} />


                    </LoginIllustrationWrapper>
                </Box>
            ) : null}
        </Box>
    )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
