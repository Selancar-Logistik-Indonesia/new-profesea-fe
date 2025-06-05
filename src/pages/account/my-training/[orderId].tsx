import AccountLayout from 'src/@core/layouts/AccountLayout'
import { Avatar, Box, Chip, Divider, Grid, Link, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { formatIDR, formatUSD, getDateMonth } from 'src/utils/helpers'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'next/navigation'

const TrainingCard = ({ participant }: { participant: ITrainingParticipant }) => {
  const training = participant.training

  if (!training) return null

  let startDate
  if (training.booking_scheme === 'instant_access') {
    startDate = participant.schedule ? new Date(participant.schedule) : null
  } else {
    startDate = new Date(training.schedule)
  }

  return (
    <Box sx={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #F0F0F0', p: '24px' }}>
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
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

const TrainingDetail = () => {
  const params = useSearchParams()
  const orderId = params.get('orderId')
  const [participant, getParticipant] = useState<ITrainingParticipant>()

  const getDetailTraining = async () => {
    await HttpClient.get(AppConfig.baseUrl + `/training/participant/${orderId}`).then(response => {
      const data = response.data.participant
      getParticipant(data)
    })
  }

  useEffect(() => {
    getDetailTraining()
  }, [])

  return (
    <AccountLayout page='Order Training' subPage='Detail Training'>
      <Stack gap={8}>
        <Box sx={{ display: 'flex' }}>
          <Link href='/account/my-training' sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon='mdi:chevron-left' fontSize={24} color='#2654A2' />
            <Typography sx={{ color: '#2654A2', fontSize: 16, fontWeight: 700 }}>Back</Typography>
          </Link>
        </Box>
        {participant && <TrainingCard participant={participant} />}
        <Box
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '12px',
            border: '1px solid #F0F0F0',
            p: '24px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '24px' }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>Detail Order</Typography>
            <Typography sx={{ fontSize: 12, color: '#999' }}>Order ID: #{orderId}</Typography>
          </Box>
          <Box
            sx={{
              border: '1px solid #E6E6E6',
              borderRadius: '12px',
              p: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{participant?.training?.title}</Typography>
            <Divider sx={{ borderColor: '#DDDDDD' }} />
            <Box>
              <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Status</Typography>
              <Typography sx={{ fontSize: 16, textTransform: 'capitalize' }}>Payment {participant?.status}</Typography>
            </Box>
            <Divider sx={{ borderColor: '#DDDDDD' }} />
            <Box>
              <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Starting on</Typography>
              <Typography sx={{ fontSize: 16 }}>{participant?.schedule ?? 'Not Scheduled'}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '12px',
            border: '1px solid #F0F0F0',
            p: '24px'
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 700, mb: '24px' }}>Price</Typography>
          <Box
            sx={{
              border: '1px solid #E6E6E6',
              borderRadius: '12px',
              p: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{participant?.training?.title}</Typography>
            <Divider sx={{ borderColor: '#DDDDDD' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Price</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 16 }}>1 pax</Typography>
                <Typography sx={{ fontSize: 16 }}>
                  {participant?.training?.currency === 'IDR'
                    ? formatIDR(
                        participant?.training?.discounted_price ?? (participant?.training?.price as number),
                        true
                      )
                    : formatUSD(
                        participant?.training?.discounted_price ?? (participant?.training?.price as number),
                        true
                      )}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: '#DDDDDD' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: '#1F1F1F', fontSize: 16, fontWeight: 700 }}>Additional Fees</Typography>
              <Typography sx={{ color: '#29BA38', fontSize: 16 }}>Inclusive</Typography>
            </Box>
            <Divider sx={{ borderColor: '#DDDDDD' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Total</Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                {participant?.training?.currency === 'IDR'
                  ? formatIDR(participant?.training?.discounted_price ?? (participant?.training?.price as number), true)
                  : formatUSD(
                      participant?.training?.discounted_price ?? (participant?.training?.price as number),
                      true
                    )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </AccountLayout>
  )
}

TrainingDetail.acl = {
  action: 'read',
  subject: 'home'
}

export default TrainingDetail
