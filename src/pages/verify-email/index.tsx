import { ReactNode, useEffect, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, Grid, Hidden, Link, Typography } from '@mui/material'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

const VerifyEmail = () => {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user?.verified_at !== null) {
      router.replace('/home')
    }
  }, [user])

  const [onLoading, setOnLoading] = useState(false)
  const [canResend, setCanResend] = useState(true)
  const [timer, setTimer] = useState(0)

  const resendVerification = async () => {
    if (!user || !user.email) {
      toast.error('Email not found!')

      return
    }

    setOnLoading(true)
    setCanResend(false)
    setTimer(60)

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(countdown)
          setCanResend(true)
        }

        return prev - 1
      })
    }, 1000)

    try {
      await HttpClient.get(AppConfig.baseUrl + '/user-management/resend-verification', { email: user.email })
      toast.success('Email Verification sent')
    } catch (error) {
      toast.error('Email Verification Failed')
    } finally {
      setOnLoading(false)
    }
  }

  const checkEmailVerification = async () => {
    if (!user || !user.email) {
      toast.error('Email not found!')

      return
    }

    setOnLoading(true)
    try {
      await HttpClient.get(AppConfig.baseUrl + '/user-management/check-email-verified', { email: user.email })
      toast.success('Email verified!')
      router.replace('/home')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred while verifying the email.')
    } finally {
      setOnLoading(false)
    }
  }

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA'
      }}
    >
      <Hidden mdDown>
        <Box component={Link} href='/' sx={{ position: 'absolute', left: '120px', top: '44px' }}>
          <Box component='img' src='/images/logosamudera.png' sx={{ width: '143px', height: 'auto' }} />
        </Box>
      </Hidden>
      <Grid item sx={{ width: '481px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <Box component='img' src='/images/verify-email.png' sx={{ width: '233px', height: 'auto' }} />
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <Box
            sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <Typography sx={{ color: '#404040', fontSize: { xs: 24, md: 32 }, fontWeight: 700 }}>
              Verifikasi email anda
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#525252', fontSize: { xs: 12, md: 14 }, fontWeight: 400 }}>
                Kami telah mengirimkan link verifikasi ke
              </Typography>
              <Typography sx={{ color: '#0B58A6', fontSize: { xs: 14, md: 16 }, fontWeight: 700 }}>
                {user?.email}
              </Typography>
            </Box>
            <Typography
              sx={{
                width: { xs: '320px', md: '481px' },
                color: '#525252',
                fontSize: { xs: 12, md: 14 },
                fontWeight: 400
              }}
            >
              Silakan klik tautan yang kami kirimkan melalui email untuk menyelesaikan proses pendaftaran Anda. Jika
              tidak menemukannya, mohon periksa juga <b>folder Junk / Spam</b> Anda.
            </Typography>
            <Box sx={{ display: 'flex', gap: '2px' }}>
              <Typography sx={{ ml: '2px', color: '#404040', fontSize: 12, fontWeight: 400 }}>
                Tidak dapat email?
              </Typography>
              <Typography
                onClick={() => (!onLoading && canResend ? resendVerification() : null)}
                sx={{
                  ml: '2px',
                  color: canResend ? 'primary.main' : '#525252',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Kirim ulang {!canResend && `(${timer} s)`}
              </Typography>
            </Box>
          </Box>
          <Button
            variant='contained'
            disabled={onLoading}
            sx={{ textTransform: 'none', fontSize: 14 }}
            onClick={() => checkEmailVerification()}
          >
            Continue
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
VerifyEmail.guestGuard = true

export default VerifyEmail
