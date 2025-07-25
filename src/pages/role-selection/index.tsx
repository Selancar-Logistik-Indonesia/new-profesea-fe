import { Icon } from '@iconify/react'
import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-role-selection'
import DialogConfirmation from 'src/views/role-selection/DialogConfirmation'
import OptionBox from 'src/views/role-selection/OptionBox'
import Shader from 'src/views/role-selection/Shader'

const RoleSelection = () => {
  const [employeeType, setEmployeeType] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)

  function handleChangeType(value: string) {
    if (value !== employeeType) {
      setEmployeeType(value)
    }
  }

  return (
    <>
      <Grid container sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: '44px 32px',
            height: '100%',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            justifyContent: 'center',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          <Box sx={{ width: '480px', display: 'flex', flexDirection: 'column' }}>
            <Box component='img' src='/images/logoprofesea.png' sx={{ width: '143px', height: 'auto' }} />
            <Box sx={{ my: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
                  Silakan pilih peran yang paling sesuai.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: '8px' }}>
                  <Box sx={{ flexShrink: 0 }}>
                    <Icon icon='ph:warning' color='red' fontSize={35} />
                  </Box>
                  <Typography>
                    Setiap pilihan peran hanya berlaku untuk satu akun/email dan tidak dapat diganti.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box onClick={() => handleChangeType('pelaut')} sx={{ cursor: 'pointer' }}>
                    <OptionBox
                      icon='ph:anchor'
                      value='pelaut'
                      active={employeeType === 'pelaut'}
                      description='Untuk profesional maritim yang bekerja di laut. Temukan lowongan kerja, pelatihan, dan komunitas yang dirancang khusus untuk mendukung perjalanan karier Anda sebagai pelaut.'
                    />
                  </Box>
                  <Box onClick={() => handleChangeType('profesional')} sx={{ cursor: 'pointer' }}>
                    <OptionBox
                      icon='ph:briefcase'
                      value='profesional'
                      active={employeeType === 'profesional'}
                      description='Untuk profesional non-pelaut atau bekerja di industri maritim dan logistik. Temukan peluang pekerjaan yang sesuai dengan keahlian Anda'
                    />
                  </Box>
                  <Box onClick={() => handleChangeType('hospitality')} sx={{ cursor: 'pointer' }}>
                    <OptionBox
                      icon='hugeicons:waiter'
                      value='Cruise Hospitality'
                      active={employeeType === 'hospitality'}
                      description='Temukan kecocokan Anda dalam perhotelan kapal pesiar—peluang di bidang kebersihan, layanan kuliner, dan pengalaman pelanggan menanti.'
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ pb: '85px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                onClick={() => (employeeType !== '' ? setOpenConfirm(true) : null)}
                sx={{ width: '170px', textTransform: 'none' }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        </Grid>
        <Hidden mdDown>
          <Grid item md={6} direction='column' sx={{ height: '100%' }}>
            <Box
              sx={{
                height: employeeType === 'pelaut' ? '40%' : employeeType === '' ? '33.5%' : '30%',
                ...landingPageStyle.Seafarer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'height 0.3s ease-in-out',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Shader employeeType={employeeType} value='pelaut' />
              <Typography
                sx={{
                  zIndex: employeeType === 'pelaut' ? 3 : 1,
                  position: 'relative',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 40,
                  fontWeight: 700
                }}
              >
                Pelaut
              </Typography>
            </Box>
            <Box
              sx={{
                height: employeeType === 'profesional' ? '40%' : employeeType === '' ? '33.5%' : '30%',
                ...landingPageStyle.Professional,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'height 0.3s ease-in-out',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Shader employeeType={employeeType} value='profesional' />
              <Typography
                sx={{
                  zIndex: employeeType === 'profesional' ? 3 : 1,
                  position: 'relative',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 40,
                  fontWeight: 700
                }}
              >
                Profesional
              </Typography>
            </Box>

            <Box
              sx={{
                height: employeeType === 'hospitality' ? '40%' : employeeType === '' ? '33%' : '30%',
                ...landingPageStyle.Hospitality,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'height 0.3s ease-in-out',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Shader employeeType={employeeType} value='hospitality' />
              <Typography
                sx={{
                  zIndex: employeeType === 'hospitality' ? 3 : 1,
                  position: 'relative',
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 40,
                  fontWeight: 700
                }}
              >
                Cruise Hospitality
              </Typography>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
      <DialogConfirmation
        employeeType={employeeType}
        visible={openConfirm}
        onCloseClick={() => setOpenConfirm(false)}
      />
    </>
  )
}

RoleSelection.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
RoleSelection.acl = {
  action: 'read',
  subject: 'select-type'
}

export default RoleSelection
