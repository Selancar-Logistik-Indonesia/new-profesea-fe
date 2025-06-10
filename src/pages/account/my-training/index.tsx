import AccountLayout from 'src/@core/layouts/AccountLayout'
import { Avatar, Box, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import CustomTabs from 'src/@core/components/custom-tabs'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { getDateMonth } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'

const tabItems = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Completed Training', value: 'completed' }
]

const TrainingCard = ({ tabs, participant }: { tabs: string; participant: ITrainingParticipant }) => {
  const router = useRouter()
  const training = participant.training

  if (!training) return null

  let startDate
  if (training.booking_scheme === 'instant_access') {
    startDate = participant.schedule ? new Date(participant.schedule) : null
  } else {
    startDate = new Date(training.schedule)
  }

  return (
    <Box
      onClick={() => router.push(`my-training/${participant.id}`)}
      sx={{ p: '24px', borderRadius: '8px', border: '1px solid #DDD' }}
    >
      <Grid container spacing={8} alignItems='center'>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#DDD', height: '171px', borderRadius: '6px', alignContent: 'center' }}>
            <Box
              component='img'
              src={training.thumbnail}
              alt='Training Picture'
              sx={{
                height: '100%',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack gap='12px'>
            <Box sx={{ display: 'flex', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                sx={{
                  color: '#32497A',
                  fontSize: 16,
                  fontWeight: 700,
                  flex: 1,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word'
                }}
              >
                {training.title}
              </Typography>
              <Icon icon='mdi:chevron-right' fontSize={18} />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Chip
                label={training.category.category}
                variant='outlined'
                sx={{ borderRadius: '8px', border: '1px solid #525252', color: '#525252', p: '4px 2px' }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar src={training.trainer.photo ?? '/hugos-avatar.jpg'} sx={{ width: 36, height: 36 }} />
              <Typography sx={{ color: '#2D3436', fontSize: 14 }}>{training.trainer.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon='ph:clock' fontSize={16} />
              <Typography sx={{ fontSize: 14 }}>
                Starting on{' '}
                <b style={{ color: '#1E266D' }}>{startDate ? getDateMonth(startDate, false, true) : 'Unscheduled'}</b>
              </Typography>
            </Box>
            {tabs === 'completed' && (
              <Box
                sx={{
                  borderRadius: '4px',
                  p: '6px',
                  backgroundColor: participant.status === 'complete' ? '#D9F2DA' : '#FFD9D9',
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ color: participant.status === 'complete' ? '#4CAF50' : '##FF2222' }}>
                  {participant.status === 'complete' ? 'Completed' : 'Canceled'}
                </Typography>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

const TrainingOrder = () => {
  const [onLoading, setOnLoading] = useState(false)
  const [trainings, getTrainings] = useState<ITrainingParticipant[]>()
  const [tabs, setTabs] = useState('ongoing')

  const getListTraining = async () => {
    await HttpClient.get(AppConfig.baseUrl + '/training/user-joined-training', {
      page: 1,
      take: 100,
      tabs: tabs
    }).then(response => {
      const data = response.data.participated.data
      getTrainings(data)
    })
    setOnLoading(false)
  }

  useEffect(() => {
    setOnLoading(true)
    getListTraining()
  }, [tabs])

  return (
    <AccountLayout page='Order History'>
      <Grid
        item
        container
        sx={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          border: '1px solid #F0F0F0',
          p: '24px',
          display: 'flex',
          gap: '12px'
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>My Training</Typography>
        <CustomTabs tabItems={tabItems} tabs={tabs} setTabs={setTabs} />
        <Stack spacing={4} sx={{ width: '100%' }}>
          {onLoading ? (
            <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : trainings ? (
            trainings.map((participant, i) => <TrainingCard key={i} tabs={tabs} participant={participant} />)
          ) : (
            <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <Box component='img' src='/images/no-connection-request.png' sx={{ height: '160px', width: '160px' }} />
            </Box>
          )}
        </Stack>
      </Grid>
    </AccountLayout>
  )
}

TrainingOrder.acl = {
  action: 'read',
  subject: 'home'
}

export default TrainingOrder
