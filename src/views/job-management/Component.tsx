import { Icon } from '@iconify/react'
import { Box, Tooltip, Typography } from '@mui/material'

export const JobDraft = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: '-20px',
        gap: '10px',
        p: '16px',
        backgroundColor: '#F8F8F7',
        borderRadius: '8px'
      }}
    >
      <Icon icon='ph:file-dashed' color='#868686' fontSize={32} />
      <Box flexDirection='column'>
        <Typography sx={{ color: '#404040', fontWeight: 700 }}>
          This job is in draft mode and hasn't been posted yet.
        </Typography>
        <Typography sx={{ color: '#525252' }}>
          To publish this job and make it visible to candidates,{' '}
          <Tooltip
            title='Please ensure all required fields marked with a red (*) are completed before posting job.'
            placement='bottom'
          >
            <span style={{ color: '#32497A', fontWeight: 'bold' }}>complete the required details.</span>
          </Tooltip>
        </Typography>
      </Box>
    </Box>
  )
}

export const HotJobBoost = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        p: '16px',
        border: '1px solid #0B58A6',
        backgroundColor: '#F2F8FE',
        borderRadius: '8px'
      }}
    >
      <Icon icon='ph:lightning' color='#32497A' fontSize={32} />
      <Box flexDirection='column'>
        <Typography sx={{ color: '#303030', fontWeight: 700 }}>Boost Job Visibility</Typography>
        <Typography sx={{ color: '#303030', fontWeight: 400 }}>
          Active and highlight this job post to appear prominently and attract more candidates.
        </Typography>
      </Box>
    </Box>
  )
}

export const DraftToggle = () => {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        backgroundColor: '#F0F0F0',
        p: '2px 16px',
        display: 'flex',
        gap: '4px',
        alignItems: 'center'
      }}
    >
      <Icon icon='ph:file-dashed' fontSize={17} color='#868686' />
      <Typography sx={{ color: '#868686', fontSize: 14, fontWeight: 400 }}>Draft</Typography>
    </Box>
  )
}
