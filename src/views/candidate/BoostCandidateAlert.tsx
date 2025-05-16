import { Icon } from '@iconify/react'
import { Alert, Box, Switch, Typography, useMediaQuery, useTheme } from '@mui/material'
import ModalUnlockPlusCandidate from 'src/@core/components/subscription/ModalUnlockPlusCandidate'
import { IUser } from 'src/contract/models/user'

type alertProps = {
  isSubs: boolean
  user: IUser
}

const BoostCandidateAlert = ({ isSubs }: alertProps) => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('sm'))

  const actionSwitch = () => {
    if (isMobile) {
      return ''
    }
    if (!isSubs) {
      return <ModalUnlockPlusCandidate text={'Try Boosting Profile for Free'} />
    }

    return (
      <Switch
        checked={false}
        inputProps={{ 'aria-label': 'controlled' }}
        onChange={() => {
          console.log('change')
        }}
      />
    )
  }

  if (isMobile) {
    return (
      <Box
        sx={{ backgroundColor: true ? '#F2F8FE' : '#F8F8F7', border: true ? '1px solid #0B58A6' : '1px solid #BFBFBF' , borderRadius:'8px', mb:2}}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, padding:'16px' }}>
          <Icon icon='ph:lightning' fontSize={32} color='#32497A' style={{flexShrink: 0}}/>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#303030' }}>Boost Profile Visibility</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030', mb: 2 }}>
              Boost your profile to appear at the top of search results and get discovered by the right companies.
            </Typography>
          </Box>
        </Box>

        {isSubs ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius:'8px',
              borderBottomRightRadius:'8px',
              padding:'12px 16px'
            }}
          >
            <Typography sx={{fontSize:16, fontWeight:600, color:'#303030'}}>Boost Profile</Typography>
            <Switch />
          </Box>
        ) : (
          <Box sx={{ padding: '0px 16px 12px 16px', display: 'flex', justifyContent: 'center', width:'100%' }}>
            <ModalUnlockPlusCandidate text={'Try Boosting Profile for Free'} sx={{ width: '100%' }} />
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Alert
      action={actionSwitch()}
      icon={<Icon icon='ph:lightning' fontSize={32} color='#32497A' />}
      sx={{
        mb: { xs: 2, md: 0 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'center',
        gap: 2,
        backgroundColor: true ? '#F2F8FE' : '#F8F8F7',
        border: true ? '1px solid #0B58A6' : '1px solid #BFBFBF',
        borderRadius: '8px'
        // '.MuiAlert-root': {
        //   padding: '0px !important',
        //   margin: '0px !important'
        // },
        // '.MuiAlert-message': {
        //   width: '100%'
        // }
        // '& .MuiAlert-action': {
        //   margin: isMobile ? '0px' : '',
        //   padding: isMobile ? '0px' : ''
        // },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#303030' }}>Boost Profile Visibility</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030', mb: 2 }}>
          Boost your profile to appear at the top of search results and get discovered by the right companies.
        </Typography>
      </Box>
    </Alert>
  )
}

export default BoostCandidateAlert
