import { Icon } from '@iconify/react'
import { Alert, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import ModalUnlockPlusCandidate from 'src/@core/components/subscription/ModalUnlockPlusCandidate'
import { IUser } from 'src/contract/models/user'

type alertProps = {
  isSubs: boolean
  user: IUser
}

const BoostCandidateAlert = ({ isSubs, user }: alertProps) => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('sm'))

  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    if(user.employee_type === 'onship') {
      setEligible(user.completion_percentage >= 55 && user.photo !== '')
    } else if(user.employee_type === 'offship') {
      setEligible(user.completion_percentage >= 45 && user.photo !== '')
    }
  },[user, isSubs])

  const actionSwitch = () => {
    if (!isSubs && !isMobile) {
      return <ModalUnlockPlusCandidate condition={!eligible} text={'Try Boosting Profile for Free'} />
    }

    return ''
  }


  if (isMobile) {
    return (
      <Box
        sx={{
          backgroundColor: (isSubs && eligible) ? '#FCE9C880' :(!isSubs && eligible) ? '#F8F8F7' : '#F8F8F7',
          border: (isSubs && eligible) ? '1px solid #F9D976' : (!isSubs && eligible) ?  '1px solid #0B58A6' : '1px solid #BFBFBF',
          borderRadius: '8px',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, padding: '16px' }}>
          {eligible ? <Icon icon='ph:lightning' fontSize={32} color={(isSubs && user.completion_percentage > 45) ? '#F9D976' : '#32497A'} style={{ flexShrink: 0 }} /> : <Icon icon='ph:warning-circle' fontSize={32} color='#666666' style={{ flexShrink: 0 }}/>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#303030' }}>
              {(isSubs && eligible) ? 'Boost Profile Active' : 'Boost Profile Visibility'}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030', mb: 2 }}>
            {(isSubs && eligible) 
            ? 'Your profile is now highlighted and ranks higher in recruiter searches. Get ready to be noticed by the right employers.'
            : (!isSubs && eligible) ?  'Boost your profile to appear at the top of search results and get discovered by the right companies.' : (
              <>
                To access this feature, please complete at least <b>{user.employee_type === 'onship' ? '55%' : '45%'}</b> of your profile and <b>upload a profile photo</b>
              </>
            )} 
            </Typography>
          </Box>
        </Box>

        {!isSubs && (
          <Box sx={{ padding: '0px 16px 12px 16px', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ModalUnlockPlusCandidate condition={!eligible} text={'Try Boosting Profile for Free'} sx={{ width: '100%' }} />
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Alert
      action={actionSwitch()}
      icon={eligible ? <Icon icon='ph:lightning' fontSize={32} color={(isSubs && user.completion_percentage > 45) ? '#F9D976' : '#32497A'} /> : <Icon icon='ph:warning-circle' fontSize={32} color='#666666' />}
      sx={{
        mb: { xs: 2, md: 0 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: (isSubs && eligible) ? '#FCE9C880' :(!isSubs && eligible) ? '#F8F8F7' : '#F8F8F7',
        border: (isSubs && eligible) ? '1px solid #F9D976' : (!isSubs && eligible) ?  '1px solid #0B58A6' : '1px solid #BFBFBF',
        borderRadius: '8px'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#303030' }}>
          {(isSubs && eligible) ? 'Boost Profile Active' : 'Boost Profile Visibility'}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030', mb: 2 }}>
          {(isSubs && eligible) 
            ? 'Your profile is now highlighted and ranks higher in recruiter searches. Get ready to be noticed by the right employers.'
            : (!isSubs && eligible) ?  'Boost your profile to appear at the top of search results and get discovered by the right companies.' : (
              <>
                To access this feature, please complete at least <b>{user.employee_type === 'onship' ? '55%' : '45%'}</b> of your profile and <b>upload a profile photo</b>
              </>
            )} 
        </Typography>
      </Box>
    </Alert>
  )
}

export default BoostCandidateAlert
