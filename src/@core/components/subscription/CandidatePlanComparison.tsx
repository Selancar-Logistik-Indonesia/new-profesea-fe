import { Icon } from '@iconify/react'
import { Box, Grid, Typography, Button, Divider } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'
import ModalUnlockPlusCandidate from './ModalUnlockPlusCandidate'

const features = [
  { label: 'Saved Jobs', basic: true, plus: true },
  { label: 'Recommended Jobs', basic: true, plus: true },
  { label: 'Application History', basic: true, plus: true },
  { label: 'Boosted Profile', basic: false, plus: true },
  { label: 'Direct Message to Companies', basic: false, plus: true },
  { label: 'Upload your resume', basic: false, plus: true }
]

const CandidatePlanComparison = () => {
  const { abilities } = useAuth()
  const currentPlan = abilities?.plan_type ?? 'BSC-ALL'

  return (
    <Grid
      item
      container
      sx={{
        backgroundColor: '#FFF',
        borderRadius: '12px',
        border: '1px solid #F0F0F0',
        p: '24px',
        display: 'flex',
        gap: '24px'
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Compare Our Plans</Typography>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #F0F0F0', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#CBE2F9', textAlign: 'center', p: '8px' }}>
              <Typography sx={{ color: '#404040', fontSize: 14, fontWeight: 700 }}>Basic</Typography>
            </Box>
            <Box sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>Limited Features</Typography>
              <Typography sx={{ color: '#404040', fontSize: 14 }}>No payment. No trial. Just more features.</Typography>
              <Button fullWidth variant='contained' disabled sx={{ textTransform: 'none' }}>
                {currentPlan === 'BSC-ALL' ? 'Current Plan' : 'Basic'}
              </Button>
            </Box>
            {features.map((feature, i) => (
              <FeatureRow key={i} label={feature.label} enabled={feature.basic} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #F0F0F0', overflow: 'hidden' }}>
            <Box
              sx={{ background: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)', textAlign: 'center', p: '8px' }}
            >
              <Typography sx={{ color: '#FFF', fontSize: 14, fontWeight: 700 }}>Plus</Typography>
            </Box>
            <Box sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography sx={{ color: '#404040', fontSize: 24, fontWeight: 700 }}>
                Full Features -{' '}
                <span
                  style={{
                    background: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700
                  }}
                >
                  No Cost
                </span>
              </Typography>
              <Typography sx={{ color: '#404040', fontSize: 14 }}>No payment. No trial. Just more features.</Typography>
              {currentPlan === 'BSC-ALL' ? (
                <ModalUnlockPlusCandidate text='Get Full Features Now' />
              ) : (
                <Button fullWidth variant='contained' sx={{ textTransform: 'none' }} disabled={true}>
                  Current Plan
                </Button>
              )}
            </Box>
            {features.map((feature, i) => (
              <FeatureRow key={i} label={feature.label} enabled={feature.plus} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

const FeatureRow = ({ label, enabled }: { label: string; enabled: boolean }) => (
  <>
    <Divider />
    <Box sx={{ p: '20px', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
      <Typography sx={{ fontSize: 14 }}>{label}</Typography>
      {enabled ? (
        <Icon icon='ph:check-bold' fontSize={18} color='#4CAF50' />
      ) : (
        <Icon icon='ph:x-bold' fontSize={18} color='#FF2222' />
      )}
    </Box>
  </>
)

export default CandidatePlanComparison
