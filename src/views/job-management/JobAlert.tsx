import { Icon } from '@iconify/react'
import { Alert, Box, Typography } from '@mui/material'
import ModalUnlockPlus from 'src/@core/components/subscription/ModalUnlockPlus'

const JobAlert = ({ jobsCount, isSubs, boostCount }: { jobsCount: number; isSubs: boolean; boostCount: number }) => {
  //kalo misal user belom nge post jobs sama seklai
  if (jobsCount === 0) {
    return (
      <Alert
        icon={<Icon icon='ph:note-pencil' fontSize={32} color='#32497A' />}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          backgroundColor: isSubs ? '#F8F8F7' : '#F2F8FE',
          border: isSubs ? '1px solid #999999' : '1px solid #32497A',
          borderRadius: '8px',
          mb: 8
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: isSubs ? '#303030' : '#32497A' }}>
              Ready to Post Your First Job?
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: isSubs ? '#868686' : '#303030' }}>
              {isSubs ? (
                'You haven’t posted any jobs yet. You can post unlimited job posting find the perfect candidates. Let’s get started!'
              ) : (
                <>
                  You haven’t posted any jobs yet. You can post up to{' '}
                  <span style={{ color: '#32497A', fontWeight: 700 }}>3 active jobs</span> to find the perfect
                  candidates. Let’s get started!
                </>
              )}
            </Typography>
          </Box>
          {!isSubs && <ModalUnlockPlus text={'Unlock to Post Unlimited Job'} />}
        </Box>
      </Alert>
    )
  }

  //user udah nge post jobs tapi belom subscribve
  if (jobsCount > 0 && !isSubs) {
    return (
      <Alert
        icon={<Icon icon='ph:note-pencil' fontSize={32} color='#32497A' />}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          backgroundColor: jobsCount === 3 ? '#FCE9C8' : '#F8F8F7',
          border: jobsCount === 3 ? '1px solid #FDC26E' : '1px solid #BFBFBF',
          borderRadius: '8px',
          mb: 8
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: jobsCount === 3 ? '#303030' : '#32497A' }}>{jobsCount}/3 Jobs Posted</Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030' }}>
              {jobsCount === 3 ? (
                'You’ve used all your active job post slots. Need to post more? Upgrade your plan to keep attracting top candidates.'
              ) : (
                <>
                  You’ve posted your first job! You can post {3 - jobsCount} more active jobs to increase your chances
                  of finding the right talent.
                </>
              )}
            </Typography>
          </Box>
          <ModalUnlockPlus text={'Unlock to Post Unlimited Job'} />
        </Box>
      </Alert>
    )
  }

  //user udah subscribe dan udah ngeboost 1 job
  if (boostCount > 0 && isSubs) {
    return (
      <Alert
        icon={<Icon icon='ph:lightning' fontSize={32} color='#32497A' />}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          backgroundColor: '#F8F8F7',
          border: '1px solid #BFBFBF',
          borderRadius: '8px',
          mb: 8
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#303030' }}>Boost Job Visibility</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#525252' }}>
            Highlight this job to attract more candidates. You can only boost one job at a time. To highlight this job
            and attract more candidates, you'll need to deactivate any currently boosted job on job management.
          </Typography>
        </Box>
      </Alert>
    )
  }

  //user udah subscribe dan belom nge boost jobs
  return (
    <Alert
      icon={<Icon icon='ph:note-pencil' fontSize={32} color='#32497A' />}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#F2F8FE',
        border: '1px solid #32497A',
        borderRadius: '8px',
        mb: 8
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#32497A' }}>Post Without Limits!</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#303030' }}>
          Your Premium plan gives you unlimited job postings. Keep attracting the best candidates with ease!
        </Typography>
      </Box>
    </Alert>
  )
}

export default JobAlert
