import { Icon } from '@iconify/react'
import { Box, Button, Grid, Hidden, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { toast } from 'react-hot-toast'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-role-selection'
import { AppConfig } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import { getOnboardingLink } from 'src/utils/helpers'

const OptionBox = ({
  icon,
  value,
  description,
  active
}: {
  icon: string
  value: string
  description: string
  active: boolean
}) => {
  return (
    <>
      <Box
        sx={{
          border: active ? '1px solid #0B58A6' : '1px solid #DBDBDB',
          backgroundColor: active ? '#F2F8FE' : null,
          borderRadius: '8px',
          p: '16px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          '&:hover': {
            border: active ? null : '1px solid #252525',
            backgroundColor: active ? null : '#F0F0F0'
          }
        }}
      >
        <Icon icon={icon} color={active ? '#0B58A6' : '#868686'} fontSize={22} />
        <Typography
          sx={{ color: active ? '#0B58A6' : '#666', fontSize: 16, fontWeight: 700, textTransform: 'capitalize' }}
        >
          {value}
        </Typography>
      </Box>
      {active && (
        <Typography sx={{ mt: '8px', color: '#999999', fontSize: 14, fontWeight: 400, fontStyle: 'italic' }}>
          {description}
        </Typography>
      )}
    </>
  )
}

// const Shader = ({ employeeType, value }: { employeeType: string; value: string }) => {
//   return (
//     <Box
//       sx={{
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         top: 0,
//         left: 0,
//         backgroundColor: 'black',
//         opacity: employeeType === value || employeeType === '' ? 0.1 : 0.5,
//         zIndex: 2
//       }}
//     />
//   )
// }

const RoleSelection = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [employeeType, setEmployeeType] = useState('')

  function handleChangeType(value: string) {
    if (value !== employeeType) {
      setEmployeeType(value)
    }
  }

  const save = (data: { team_id: number; employee_type?: string }) => {
    const roleData = { ...data, next_step: 'step-one/1' }
    HttpClient.patch(AppConfig.baseUrl + '/onboarding/role-selection', roleData).then(
      async response => {
        const tempUser = response.data.user
        toast.success('Successfully save role selection!')
        router.push(`/onboarding/${getOnboardingLink(tempUser!)}/${tempUser!.last_step}`)
      },
      error => {
        toast.error('Failed to save role selection: ' + error.response.data.message)
        if (user) {
          if (user.last_step === 'completed') {
            router.push('/home')
          }
          if (user.last_step !== 'completed' && user.last_step !== 'role-selection') {
            router.push(`/onboarding/${getOnboardingLink(user)}/${user.last_step}`)
          }
          if (user.last_step === 'role-selection') {
            router.push(`/${user.last_step}`)
          }
        }
      }
    )
  }

  function onSubmit() {
    if (!employeeType) {
      toast.error("You haven't select any role")

      return
    }

    let data
    if (employeeType === 'pelaut') {
      data = {
        team_id: 2,
        employee_type: 'onship'
      }
    } else if (employeeType === 'profesional') {
      data = {
        team_id: 2,
        employee_type: 'offship'
      }
    } else {
      data = {
        team_id: 3
      }
    }

    save(data)
  }

  return (
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
          <Box component='img' src='/images/logosamudera.png' sx={{ width: '143px', height: 'auto' }} />
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
                    description='Untuk profesional maritim yang bekerja di laut. Temukan lowongan kerja, pelatihan, dan sumber daya karier khusus untuk karir pelaut Anda.'
                  />
                </Box>
                <Box onClick={() => handleChangeType('profesional')} sx={{ cursor: 'pointer' }}>
                  <OptionBox
                    icon='ph:briefcase'
                    value='profesional'
                    active={employeeType === 'profesional'}
                    description='Untuk profesional non-pelaut atau bekerja di industri logistic & maritime. Akses daftar pekerjaan dan peluang yang sesuai dengan keahlian Anda'
                  />
                </Box>
                <Box onClick={() => handleChangeType('perusahaan')} sx={{ cursor: 'pointer' }}>
                  <OptionBox
                    icon='ph:handshake'
                    value='perusahaan'
                    active={employeeType === 'perusahaan'}
                    description='Untuk perusahaan, Iklankan lowongan pekerjaan dan terhubung dengan profesional maritim dan logistik (pelaut & non-pelaut) yang berkualitas untuk memenuhi kebutuhan rekrutmen Anda'
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ pb: '85px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={onSubmit} sx={{ width: '170px', textTransform: 'none' }}>
              Continue
            </Button>
          </Box>
        </Box>
      </Grid>
      <Hidden mdDown>
        <Grid item md={6} direction='column' sx={{ height: '100vh' }}>
          <Box
            sx={{
              // height: employeeType === 'seafarer' ? '50vh' : employeeType === '' ? '33.33vh' : '25vh',
              height: 1 / 3,
              ...landingPageStyle.Seafarer,
              display: 'display',
              alignContent: 'center',
              transition: 'height 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* <Shader employeeType={employeeType} value='seafarer' /> */}
            <Typography
              sx={{
                zIndex: employeeType === 'seafarer' ? 3 : 1,
                position: 'relative',
                color: 'white',
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 700
              }}
            >
              Seafarer
            </Typography>
          </Box>
          <Box
            sx={{
              // height: employeeType === 'professional' ? '50vh' : employeeType === '' ? '33.33vh' : '25vh',
              height: 1 / 3,
              ...landingPageStyle.Professional,
              display: 'display',
              alignContent: 'center',
              transition: 'height 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* <Shader employeeType={employeeType} value='professional' /> */}
            <Typography
              sx={{
                zIndex: employeeType === 'professional' ? 3 : 1,
                position: 'relative',
                color: 'white',
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 700
              }}
            >
              Professional
            </Typography>
          </Box>
          <Box
            sx={{
              // height: employeeType === 'employer' ? '50vh' : employeeType === '' ? '33.33vh' : '25vh',
              height: 1 / 3,
              ...landingPageStyle.Recruiter,
              display: 'display',
              alignContent: 'center',
              transition: 'height 0.3s ease-in-out',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* <Shader employeeType={employeeType} value='employer' /> */}
            <Typography
              sx={{
                zIndex: employeeType === 'employer' ? 3 : 1,
                position: 'relative',
                color: 'white',
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 700
              }}
            >
              Employer
            </Typography>
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  )
}

RoleSelection.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
RoleSelection.acl = {
  action: 'read',
  subject: 'select-type'
}

export default RoleSelection
