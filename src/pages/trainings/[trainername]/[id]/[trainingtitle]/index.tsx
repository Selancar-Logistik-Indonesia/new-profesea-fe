import { Icon } from '@iconify/react'
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import Training from 'src/contract/models/training'
import { formatIDR } from 'src/utils/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import OtherTraining from './OtherTraining'
import { useAuth } from 'src/hooks/useAuth'
import DialogLogin from 'src/@core/components/login-modal'
import { useTranslation } from 'react-i18next'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'
import { usePathname } from 'next/navigation'

const TrainingDetailPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const { t } = useTranslation()
  const trainingId = router.query.id
  const [training, setTraining] = useState<Training | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const handleClickBuy = async () => {
    setOpenDialog(!openDialog)
  }

  const getDetailTraining = async () => {
    const resp = await HttpClient.get(`/public/data/training/${trainingId}`)
    if (resp.status != 200) {
      alert(resp.data?.message ?? '')

      return
    }
    setTraining(resp.data.training)
  }

  if (user) {
    router.replace(`/candidate/${pathname}`)
  }

  useEffect(() => {
    if (trainingId) {
      getDetailTraining()
    }
  }, [trainingId])

  return !training ? (
    <CircularProgress />
  ) : (
    <Box p={4}>
      <Grid container sx={{ position: 'fixed' }}>
        <IconButton onClick={() => router.push('/trainings')}>
          <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
        </IconButton>
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3
        }}
      >
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 10, backgroundColor: '#FFFFFF' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column-reverse', md: 'row' },
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Typography
                    variant='body2'
                    color='#32487A'
                    fontWeight='600'
                    sx={{ fontSize: { xs: '28px', md: '48px' } }}
                  >
                    {training.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row', mb: 2 }}>
                    <Typography fontSize='16px'>Created by</Typography>
                    <Typography color={'#32487A'} fontWeight='600' fontSize='16px'>
                      {training.trainer.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1, gap: 2 }}>
                    <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' fontSize={24} />
                    <Box sx={{ width: 120 }}>
                      <Typography>Category:</Typography>
                    </Box>
                    <Box>
                      <Typography>{training?.category?.category}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    <Icon icon='solar:calendar-bold-duotone' color='#32487A' fontSize={24} />
                    <Box sx={{ width: 120 }}>
                      <Typography>Training Start:</Typography>
                    </Box>
                    <Box>
                      <Typography>{moment(training.schedule).format('dddd, DD MMM YYYY h:mm')}</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <img
                    alt='logo'
                    src={training?.thumbnail ? training?.thumbnail : '/images/icon-trainer.png'}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </Box>
              </Grid>
            </Box>

            <Divider sx={{ my: 6, borderBottomWidth: 2 }} />
            <Box sx={{ mb: 4 }}>
              <Typography color={'#32487A'} fontWeight='600' fontSize='18px' mb={2}>
                Description
              </Typography>
              <Box
                sx={{ w: '100%', whiteSpace: 'pre-line' }}
                component='div'
                dangerouslySetInnerHTML={{ __html: training.short_description }}
              />
            </Box>
            <Box>
              <Typography color={'#32487A'} fontWeight='600' fontSize='18px' mb={2}>
                Requirement
              </Typography>
              <Box
                sx={{ w: '100%', whiteSpace: 'pre-line' }}
                component='div'
                dangerouslySetInnerHTML={{
                  __html: training.requirements ? training.requirements : 'No requirement'
                }}
              />
            </Box>
            <Divider sx={{ my: 6, borderBottomWidth: 2 }} />
            <Box
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              {training.discounted_price ? (
                <Box>
                  <Typography fontSize={14} mt={1} sx={{ textDecoration: 'line-through', color: 'gray' }}>
                    {formatIDR(training.price, true)}
                  </Typography>
                  <Typography fontSize={20} sx={{ color: 'primary.main' }}>
                    {formatIDR(training.discounted_price, true)}
                  </Typography>
                  <Typography fontSize={8} sx={{ color: 'gray' }}>
                    {t('tax_not_included')}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography fontSize={20} sx={{ color: 'primary.main' }}>
                    {formatIDR(training.price, true)}
                  </Typography>
                  <Typography fontSize={10} sx={{ color: 'gray' }}>
                    {t('tax_not_included')}
                  </Typography>
                </Box>
              )}

              {training.joined_at ? (
                <Button disabled={true} variant='contained' size='small'>
                  {t('login_modal_button_1')}
                </Button>
              ) : (
                <Button variant='contained' size='small' onClick={handleClickBuy} disabled={!training?.cta}>
                  {t('login_modal_button_2')}
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              width: '100%',
              bgcolor: '#d5e7f7'
            }}
          >
            <Typography sx={{ fontWeight: '600', color: '#5ea1e2' }} fontSize={18}>
              Training post by the Trainer
            </Typography>
          </Box>
          <Box
            sx={{
              p: 4,
              borderColor: 'divider',
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <OtherTraining user_id={training.user_id} id={training.id} />
          </Box>
        </Grid>
      </Grid>
      {openDialog && (
        <DialogLogin
          visible={openDialog}
          variant='training'
          onCloseClick={() => {
            setOpenDialog(!openDialog)
          }}
        />
      )}
    </Box>
  )
}

TrainingDetailPage.guestGuard = false
TrainingDetailPage.authGuard = false
TrainingDetailPage.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default TrainingDetailPage
