import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CardActions, CardMedia, Skeleton, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar } from 'src/utils/helpers'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import InfiniteScroll from 'react-infinite-scroll-component'

import { IUser } from 'src/contract/models/user'
import { useTheme } from '@mui/material/styles'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useRouter } from 'next/router'
import ContactDialog from 'src/views/training/ContactDialog'
import NoTrainingsFound from 'src/views/training/NoTrainingFound'

interface OngoingTrainingProps {
  searchTraining?: any
  trainingCenter?: any
  category?: any
  acl?: any
}

interface SeafarerOngoingTrainingType extends React.FC<OngoingTrainingProps> {
  acl?: {
    action: string
    subject: string
  }
}

const SeafarerOngoingTraining: SeafarerOngoingTrainingType = ({ category, searchTraining, trainingCenter }) => {
  const { user } = useAuth()

  return (
    <OngoingTrainingScreen
      user={user}
      category={category}
      searchTraining={searchTraining}
      trainingCenter={trainingCenter}
    />
  )
}

const SkeletonCard = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      {/* Skeleton untuk gambar */}
      <Skeleton variant='rectangular' width='100%' height={140} />

      <CardContent>
        {/* Skeleton untuk title */}
        <Skeleton variant='text' width='80%' height={24} />
        {/* Skeleton untuk sub-title */}
        <Skeleton variant='text' width='60%' height={20} sx={{ mt: 1 }} />

        {/* Skeleton untuk user/trainer */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Skeleton variant='circular' width={32} height={32} />
          <Skeleton variant='text' width='40%' height={20} sx={{ ml: 2 }} />
        </Box>

        {/* Skeleton untuk price */}
        <Skeleton variant='text' width='50%' height={24} sx={{ mt: 2 }} />
      </CardContent>

      {/* Skeleton untuk tombol */}
      <CardActions>
        <Skeleton variant='rectangular' width='100%' height={36} sx={{ borderRadius: 1 }} />
      </CardActions>
    </Card>
  )
}

const TruncatedTypography = (props: { children: any; line?: number; [key: string]: any }) => {
  const { children, line, ...rest } = props
  const maxLine = line ? line : 1

  return (
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxHeight: `calc(${maxLine} * 1.2em)`,
        minHeight: '1.2em',
        lineHeight: '1.2em',
        fontWeight: 'bold',
        fontSize: '16px',
        ...rest
      }}
    >
      {children}
    </Typography>
  )
}

const renderList = (
  arr: Training[] | null,
  user: IUser | null,
  isMobile: boolean,
  isXl: boolean,
  openDialog: () => void
) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      const trainerNameUrl = item.trainer.name.toLowerCase().split(' ').join('-')
      const trainingTitleUrl = item.title ? item.title?.toLowerCase().split(' ').join('-') : ''
      const link = user
        ? `/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`
        : `/trainings/detail/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`

      if (index === 8) {
        return (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                position: 'relative',
                padding: '24px !important',
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                alignItems: 'center',
                borderRadius: '18px',
                border: '1px solid #F0F0F0',
                background: 'linear-gradient(284deg, #0049C6 -12.57%, rgba(255, 255, 255, 0.50) 126.88%)',
                boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.08)',
                gap: '64px'
              }}
            >
              <Box sx={{ flex: 1, paddingTop: isMobile ? '160px' : '' }}>
                <Typography sx={{ fontSize: isMobile ? '18px' : '24px', fontWeight: 700, color: '#404040' }}>
                  Connect with Maritime Professionals Worldwide
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <Typography sx={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 400, color: '#5E5E5E' }}>
                    Join our platform to grow your presence in the maritime industry. Promote your training programs and
                    engage with a wider network of professionals.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#404040' }}>
                      45+ <span style={{ fontSize: '16px', fontWeight: 400 }}>Courses</span>
                    </Typography>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#404040' }}>
                      112+ <span style={{ fontSize: '16px', fontWeight: 400 }}>Participants</span>
                    </Typography>
                  </Box>
                  <Button
                    onClick={openDialog}
                    fullWidth
                    sx={{ borderRadius: '9px', background: '#FFF', color: '#32497A', textTransform: 'capitalize' }}
                  >
                    Join Us
                  </Button>
                </Box>
              </Box>
              <Box sx={{ flex: 1, width: '100%' }}></Box>
              <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                <Box
                  component='img'
                  src={isMobile ? '/images/asset-join-us-mobile.png' : '/images/asset-join-us.png'}
                  alt='Dekorasi Mobile Yellow'
                  sx={{
                    // width: '100%',
                    width: isMobile ? '100%' : isXl ? '465px' : '575px',
                    height: 'auto',
                    transform: 'rotate(0.138deg)'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        )
      }

      return (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <Card>
            <CardContent sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CardMedia
                component='div'
                image={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                sx={{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '100%',
                  aspectRatio: '3/2',
                  mb: 3
                }}
              />
              {/* <Link href={`/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`}></Link> */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <TruncatedTypography fontSize={16} color={'#1F1F1F'} textTransform>
                    {item.title}
                  </TruncatedTypography>
                  <Box sx={{ padding: '8px', borderRadius: '8px', border: '1px solid #868686', textAlign: 'center' }}>
                    <TruncatedTypography fontSize={12} color={'#868686'} fontWeight={400}>
                      {item.category?.category}
                    </TruncatedTypography>
                  </Box>
                  <Box
                    height={35}
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mr={3}>
                      <Avatar src={getUserAvatar(item.trainer)} alt='profile-picture' sx={{ width: 25, height: 25 }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography sx={{ fontWeight: '400', color: '#303030' }} fontSize={12}>
                        {item?.trainer?.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <TruncatedTypography fontSize={16} fontWeight={700} color={'#1F1F1F)'}>
                    {item.discounted_price ? formatIDR(item.discounted_price, true) : formatIDR(item.price, true)}
                  </TruncatedTypography>
                </Box>
              </Box>
              <Grid container>
                <Button
                  fullWidth
                  size='small'
                  LinkComponent={Link}
                  variant='contained'
                  color='primary'
                  href={link}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Learn More
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const OngoingTrainingScreen = ({
  user,
  category,
  searchTraining,
  trainingCenter
}: {
  user: IUser | null
  searchTraining?: any
  trainingCenter?: any
  category?: any
}) => {
  const router = useRouter()
  const trainername = router.query.trainername

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))
  const [trainings, setTrainings] = useState<Training[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoaded, setInitialLoaded] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOnCloseDialog = () => {
    setOpenDialog(!openDialog)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const fetchTraining = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    const usernameQuery =
      trainername == 'all'
        ? undefined
        : !trainingCenter && trainername
        ? trainername
        : trainingCenter?.username || undefined

    try {
      const query = {
        take: 8,
        page,
        search: searchTraining || undefined,
        category_id: category?.id || undefined,
        username: trainingCenter ? trainingCenter?.username : usernameQuery,
        instant: 0,
        ongoing: 1
      }

      const response = await HttpClient.get(AppConfig.baseUrl + '/public/data/training', query)

      if (response.status === 200) {
        const { trainings: data } = response.data as {
          trainings: { data: Training[]; next_page_url?: string }
        }

        setHasMore(!!data.next_page_url)
        setTrainings(prev => (page === 1 ? data.data : [...prev, ...data.data]))
        setPage(prev => prev + 1)
      }
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, searchTraining, category?.id, trainingCenter?.username])

  // Reset page dan data saat filter/search berubah
  useEffect(() => {
    setTrainings([])
    setPage(1)
    setHasMore(true)
    setInitialLoaded(false)
  }, [searchTraining, category?.id, trainingCenter?.username])

  // Hanya fetch otomatis sekali saat page === 1 dan initial belum dilakukan
  useEffect(() => {
    if (page === 1 && !initialLoaded) {
      fetchTraining().then(() => setInitialLoaded(true))
    }
  }, [page, initialLoaded, fetchTraining])

  return (
    <>
      <ContactDialog open={openDialog} onClose={handleOnCloseDialog} />
      <Box style={{ height: 'fit-content' }}>
        {trainings.length === 0 && loading ? (
          // Show loading skeleton when initial loading
          <Grid container spacing={3} mt={2}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        ) : trainings.length === 0 && !loading ? (
          <NoTrainingsFound />
        ) : (
          // Show infinite scroll with results
          <InfiniteScroll
            style={{ overflow: 'visible' }}
            dataLength={trainings.length}
            next={fetchTraining}
            hasMore={hasMore}
            loader={
              <Grid container spacing={3} mt={2}>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <SkeletonCard />
                  </Grid>
                ))}
              </Grid>
            }
          >
            <Grid container spacing={4}>
              {renderList(trainings, user, isMobile, isXl, handleOpenDialog)}
            </Grid>
          </InfiniteScroll>
        )}
      </Box>
    </>
  )
}

SeafarerOngoingTraining.acl = {
  action: 'read',
  subject: 'seafarer-training-ongoing'
}

export default SeafarerOngoingTraining
