import { Icon } from '@iconify/react'
import { Box, Divider, Typography } from '@mui/material'
import Training from 'src/contract/models/training'
import { calculateDaysDifference, dateProgress, getDateMonth } from 'src/utils/helpers'
import StatusCard from './StatusCard'

const schemeStyles = {
  instant_access: {
    label: 'Instant Access',
    icon: 'material-symbols:rocket',
    fontColor: '#4CAF50'
  },
  quota_based: {
    label: 'Quota Based',
    icon: 'ph:calendar-dots',
    fontColor: '#FF9800'
  },
  fixed_date: {
    label: 'Fixed Date',
    icon: 'mdi:users',
    fontColor: '#2662EC'
  }
}

const TrainingCard = ({ pageView = 'trainer', training }: { pageView?: string; training: Training }) => {
  const posted_at = new Date(training.start_date ?? '')
  const expired_at = new Date(training.end_date ?? '')
  const progress = calculateDaysDifference(Date.now(), expired_at)

  const { label, icon, fontColor } = schemeStyles[training.booking_scheme]

  return (
    <Box
      sx={{
        p: '16px',
        boxShadow: 3,
        borderRadius: '6px',
        backgroundColor: '#FFF'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box component='img' src={training.thumbnail} sx={{ borderRadius: '8px', width: '125px', height: '125px' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              flexShrink: 1,
              minWidth: 0
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'capitalize',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.3,
                maxHeight: '2.6em',
                wordBreak: 'break-word'
              }}
            >
              {training.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon icon='ph:anchor' fontSize={16} />
              <Typography sx={{ fontSize: 14 }}>{training.category.category}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon icon={icon} fontSize={16} color={fontColor} />
                <Typography sx={{ fontSize: 14, color: fontColor }}>{label}</Typography>
                {training.booking_scheme === 'fixed_date' && (
                  <Typography sx={{ fontSize: 14, color: '#525252' }}>
                    Start at {getDateMonth(posted_at, true, true)} - Close at {getDateMonth(expired_at, true, true)}
                  </Typography>
                )}
              </Box>
              {training.booking_scheme === 'quota_based' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Box sx={{ flexGrow: 1, backgroundColor: '#DBDBDB', borderRadius: '100px', overflow: 'hidden' }}>
                    <Box
                      sx={{
                        borderRadius: '8px',
                        width: `${(training.count_participant / training.participants) * 100}%`,
                        height: '6px',
                        backgroundColor: progress === 'Expired' || training.is_active === false ? '#868686' : '#0B58A6'
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, fontColor: '#404040' }}>
                    {training.count_participant}/{training.participants} Quota Filled
                  </Typography>
                </Box>
              ) : training.booking_scheme === 'fixed_date' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Box sx={{ flexGrow: 1, backgroundColor: '#DBDBDB', borderRadius: '100px', overflow: 'hidden' }}>
                    <Box
                      sx={{
                        borderRadius: '8px',
                        width: `${dateProgress(posted_at, expired_at)}%`,
                        height: '6px',
                        backgroundColor: progress === 'Expired' || training.is_active === false ? '#868686' : '#0B58A6'
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, fontColor: '#404040' }}>
                    {progress === 'Expired' ? progress : `${progress} to go`}
                  </Typography>
                </Box>
              ) : (
                <Typography sx={{ fontSize: 12 }}>
                  Participant can start anytime without waiting for a schedule or quota
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexShrink: 0,
            flexWrap: 'nowrap',
            borderRadius: '6px',
            backgroundColor: '#F8F8F7'
          }}
        >
          {pageView === 'admin' && (
            <>
              <StatusCard
                label='Unregistered'
                total={training.count_participant_status.unregistered}
                backgroundColor='#FFEBCF'
                icon='ph:hourglass-high'
                iconColor='#FE9602'
              />
              <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
            </>
          )}
          <StatusCard
            label='Registered'
            total={training.count_participant_status.registered}
            backgroundColor='#CBE2F9'
            icon='ph:user-check'
            iconColor='#32497A'
          />
          <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
          {pageView === 'trainer' && (
            <>
              <StatusCard
                label='Onhold'
                total={training.count_participant_status.on_hold}
                backgroundColor='#FCE9C8'
                icon='material-symbols:pause-outline-rounded'
                iconColor='#FE9602'
              />
              <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
              <StatusCard
                label='Ongoing'
                total={training.count_participant_status.on_going}
                backgroundColor='#D7CBF9'
                icon='material-symbols:start'
                iconColor='#7B61FF'
              />
              <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
            </>
          )}
          <StatusCard
            label='Completed'
            total={training.count_participant_status.completed}
            backgroundColor='#F4FEF2'
            icon='mingcute:check-fill'
            iconColor='#4CAF50'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default TrainingCard
