import { Icon } from '@iconify/react'
import { Alert, AlertTitle, Box, Button, CircularProgress, Divider, Grid, IconButton, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import Training from 'src/contract/models/training'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { formatIDR } from 'src/utils/helpers'
// import PaymentDialog from 'src/views/payment/PaymentDialog'
import OtherTraining from './OtherTraining'
import Head from 'next/head'
import themeConfig from 'src/configs/themeConfig'

const TrainingDetailPage = () => {
  const router = useRouter()
  const trainingId = router.query.id
  const [training, setTraining] = useState<Training | null>(null)
  //   const [openDialog, setOpenDialog] = useState(false)
  //   const handleClickBuy = async () => {
  //     setOpenDialog(!openDialog)
  //   }

  const getDetailTraining = async () => {
    try {
      const resp = await HttpClient.get(`/public/data/training/${trainingId}`)

      if (resp.status !== 200) {
        alert(resp.data?.message ?? '')

        return
      }
      setTraining(resp.data.training)
    } catch (error) {
      console.error('Error fetching training details:', error)
    }
  }

  useEffect(() => {
    if (trainingId) {
      getDetailTraining()
    }
  }, [trainingId])

  const handleEnrollClick = () => {
    if (training?.cta) {
      window.open(training.cta, '_blank', 'noopener,noreferrer')
    } else {
      alert('No link available for enrollment')
    }
  }

  return !training ? (
    <CircularProgress />
  ) : (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${training.title}`}</title>
        {new Date() > new Date(training?.schedule) && <meta name='robots' content='noindex,nofollow,noarchive' />}
      </Head>
      <Box>
        <Grid container sx={{ position: 'fixed' }}>
          <IconButton onClick={() => router.push(`/candidate/trainings`)}>
            <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
          </IconButton>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center'
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
                    {new Date() > new Date(training?.schedule) && (
                      <Box sx={{ mb: 2 }}>
                        <Alert severity='warning' sx={{ border: '3px solid orange' }}>
                          <AlertTitle sx={{ fontSize: 20, color: 'black !important', fontWeight: 'bold' }}>
                            Enrollment closed for this training
                          </AlertTitle>
                          Don't worry, this course will be available in the next session! Stay tuned for updates and be
                          the first to secure your spot.
                        </Alert>
                      </Box>
                    )}
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
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}
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
                      *harga belum termasuk PPN
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography fontSize={20} sx={{ color: 'primary.main' }}>
                      {formatIDR(training.price, true)}
                    </Typography>
                    <Typography fontSize={10} sx={{ color: 'gray' }}>
                      *harga belum termasuk PPN
                    </Typography>
                  </Box>
                )}

                {training.joined_at ? (
                  <Button disabled={true} variant='contained' size='small'>
                    Joined
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    size='small'
                    onClick={handleEnrollClick}
                    disabled={!training?.cta || new Date() > new Date(training?.schedule)}
                  >
                    Enroll Now
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
        {/* {openDialog && (
        <PaymentDialog onClose={() => setOpenDialog(!openDialog)} training={training} openDialog={openDialog} />
      )} */}
      </Box>
    </>
  )
}

TrainingDetailPage.acl = {
  action: 'read',
  subject: 'home'
}

export default TrainingDetailPage
