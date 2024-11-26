import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Fade,
  FadeProps,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'

type Prop = {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const CompleteOnboarding = (props: Prop) => {
  const router = useRouter()
  const { user } = useAuth()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('md'))

  const { openDialog, setOpenDialog } = props
  const [employeeType, setEmployeeType] = useState<string | null>(null)

  const handleCloseDialog = () => {
    const { onboarding, ...rest } = router.query
    router.replace(
      {
        pathname: router.pathname,
        query: rest
      },
      undefined,
      { shallow: true }
    )
    setOpenDialog(false)
    console.log('remove', onboarding)
  }

  useEffect(() => {
    if (user) {
      if (user.team_id === 3) {
        setEmployeeType('employer')
      } else if (user.team_id === 2) {
        if (user.employee_type === 'onship') {
          setEmployeeType('seafarer')
        } else if (user.employee_type === 'offship') {
          setEmployeeType('professional')
        }
      }
    }
  }, [user])

  return (
    <Dialog
      fullWidth
      open={openDialog}
      onClose={() => handleCloseDialog()}
      TransitionComponent={Transition}
      maxWidth='md'
      sx={{ zIndex: 10000000000 }}
    >
      <DialogContent>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('/images/complete-onboard.jpg')",
            backgroundSize: isXs ? 'cover' : '100%',
            backgroundPosition: 'center',
            zIndex: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1
            }
          }}
        />
        <IconButton
          size='small'
          onClick={() => handleCloseDialog()}
          sx={{ position: 'absolute', right: isXs ? '8px' : '32px', top: isXs ? '8px' : '41px', zIndex: 10000000001 }}
        >
          <Icon icon='mdi:close' color='white' fontSize={isXs ? 24 : 32} />
        </IconButton>
        <Grid
          container
          sx={{
            position: 'relative',
            p: isXs ? '12px' : '32px 41px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <Box display='flex' flexDirection='column' gap='24px'>
            <Typography sx={{ color: '#FAFAFA', fontSize: 40, fontWeight: 700 }}>Yay! Anda sudah siap! 🎉</Typography>
            <Box display='flex' flexDirection='column' gap='16px'>
              <Typography sx={{ color: '#FFF', fontSize: 20, fontWeight: 700 }}>
                Selamat bergabung, {user?.name}!
              </Typography>
              {employeeType === 'employer' ? (
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  Proses onboarding Anda telah selesai. Kini saatnya menarik perhatian kandidat!
                  <br />
                  Lengkapi profil perusahaan Anda untuk meningkatkan peluang mendapatkan kandidat yang sesuai dengan
                  kebutuhan perusahaan anda. Berikut adalah hal-hal yang perlu Anda lengkapi:
                </Typography>
              ) : (
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  Proses onboarding Anda telah selesai. Kini saatnya menarik perhatian perusahaan!
                  <br />
                  Lengkapi profil Anda untuk meningkatkan peluang mendapatkan kesempatan kerja yang tepat. Berikut
                  adalah hal-hal yang perlu Anda lengkapi:
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {employeeType === 'employer' ? (
              user?.photo === null && (
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Foto Profil</b>: Bantu kandidat mengenali Anda dengan menambahkan foto.
                </Typography>
              )
            ) : (
              <>
                {user?.photo === null && (
                  <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                    • <b>Foto Profil</b>: Bantu perusahaan mengenali Anda dengan menambahkan foto.
                  </Typography>
                )}
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Pendidikan</b>: Tampilkan latar belakang akademik Anda.
                </Typography>
              </>
            )}
            {employeeType === 'seafarer' && (
              <>
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Pengalaman di Laut</b>: Ceritakan lebih banyak perjalanan karier maritim Anda dan peran yang
                  pernah dijalani.
                </Typography>
                <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                  • <b>Unggah Buku Pelaut</b>: Verifikasi riwayat pengalaman Anda di laut.
                </Typography>
              </>
            )}
            {employeeType === 'professional' && (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Pengalaman Bekerja</b>: Ceritakan lebih banyak perjalanan karier Anda dan peran yang pernah
                dijalani.
              </Typography>
            )}
            {employeeType === 'employer' && !user?.about && (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Tentang Perusahaan</b>: Tampilkan latar belakang dan bisnis perusahaan Anda.
              </Typography>
            )}
            {employeeType === 'employer' ? (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Unggah Lowongan Kerja</b>: Mulai buat lowongan kerja di Profesea!
              </Typography>
            ) : employeeType === 'seafarer' ? (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Unggah Sertifikat</b>: Tunjukkan kualifikasi dan kredensial Anda.
              </Typography>
            ) : (
              <Typography sx={{ color: '#FFF', fontSize: 16, fontWeight: 400 }}>
                • <b>Unggah Sertifikat</b>: Tunjukkan sertifikasi profesional Anda agar tampil lebih dibandingkan
                kandidat lain.
              </Typography>
            )}
          </Box>
          {employeeType === 'employer' ? (
            <Typography sx={{ color: '#FFF', fontSize: 18, fontWeight: 700 }}>
              Semakin lengkap profil perusahaan Anda, semakin besar peluang untuk <b>lebih terlihat oleh kandidat!</b>
            </Typography>
          ) : employeeType === 'seafarer' ? (
            <Typography sx={{ color: '#FFF', fontSize: 18, fontWeight: 700 }}>
              Semakin lengkap profil Anda, semakin besar peluang untuk{' '}
              <b>
                lebih terlihat oleh perusahaan <i>crewing</i>!
              </b>
            </Typography>
          ) : (
            <Typography sx={{ color: '#FFF', fontSize: 18, fontWeight: 700 }}>
              Semakin lengkap profil Anda, semakin besar peluang untuk <b>lebih terlihat oleh perusahaan!</b>
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: isXs ? 'row-reverse' : null,
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleCloseDialog()}>
              <Typography
                sx={{ color: '#FAFAFA', fontSize: 14, fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
              >
                Skip
              </Typography>
            </Box>
            <Button
              component={Link}
              href={employeeType === 'employer' ? '/company' : '/candidate'}
              variant='contained'
              sx={{
                width: 'fit-content',
                boxShadow: 0,
                color: '#FFF',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#BFBFBF' }
              }}
            >
              Complete Profile
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default CompleteOnboarding
