import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {
  Autocomplete,
  Box,
  Button,
  CardActions,
  CardMedia,
  InputAdornment,
  Skeleton,
  TextField,
  useMediaQuery
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, formatUSD, getUserAvatar } from 'src/utils/helpers'

import Link from 'next/link'

import { Icon } from '@iconify/react'
import { useTheme } from '@mui/material/styles'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import Image from 'next/image'

const SeafarerOngoingTraining = ({ pageView }: { pageView: string }) => {
  return (
    <>
      <OngoingTrainingApp pageView={pageView} />
    </>
  )
}

const TruncatedTypography = (props: { children: any; line?: number; [key: string]: any }) => {
  const { children, line, ...rest } = props
  const maxLine = line ? line : 1

  const value = children

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
      {value}
    </Typography>
  )
}

const renderList = (pageView: string, arr: Training[]) => {
  if (arr && arr.length) {
    return arr.map(item => {
      const trainerNameUrl = item.trainer.name.toLowerCase().split(' ').join('-')
      const trainingTitleUrl = item.title ? item.title?.toLowerCase().split(' ').join('-') : ''
      const renderLink = `/${pageView === 'company' ? 'company' : 'candidate'}/trainings/${trainerNameUrl}/${
        item.id
      }/${trainingTitleUrl}`

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
                  <TruncatedTypography fontSize={16} color={'#1F1F1F'}>
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
                    {item?.currency === 'IDR'
                      ? formatIDR(item?.discounted_price ?? (item?.price as number), true)
                      : formatUSD(item?.discounted_price ?? (item?.price as number), true)}
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
                  href={renderLink}
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

const OngoingTrainingApp = ({ pageView }: { pageView: string }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [trainings, setTrainings] = useState<Training[]>([])
  const [searchJob, setSearchJob] = useState<any>()
  const [filterTrainer, setFilterTrainer] = useState<any>()
  const [filterCategory, setFilterCategory] = useState<any>()
  const [optionsCategory, setOptionsCategory] = useState([])
  const [optionsTrainers, setOptionsTrainers] = useState([])
  const [page, setPage] = useState(1)

  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoaded, setInitialLoaded] = useState(false)

  const fetchTraining = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    const query = {
      take: 12,
      instant: 0,
      ongoing: 1,
      page: page,
      username: filterTrainer?.username,
      search: searchJob,
      category_id: filterCategory?.id
    }

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/training', query)
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
  }, [loading, hasMore, page, searchJob, filterTrainer, filterCategory])

  useEffect(() => {
    setTrainings([])
    setPage(1)
    setHasMore(true)
    setInitialLoaded(false)
  }, [searchJob, filterTrainer, filterCategory])

  useEffect(() => {
    if (page === 1 && !initialLoaded) {
      fetchTraining().then(() => setInitialLoaded(true))
    }
  }, [page, initialLoaded, fetchTraining])

  const fetchOptions = async () => {
    HttpClient.get('/training/trainer?page=1&take=999').then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      const { training } = response?.data
      setOptionsTrainers(training?.data)
    })

    HttpClient.get('/training-category?page=1&take=100').then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }

      const { trainingCategories } = response?.data
      setOptionsCategory(trainingCategories?.data)
    })
  }

  useEffect(() => {
    fetchOptions()
  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderTop: '1px solid #E7E7E7',
          borderBottom: '1px solid #E7E7E7'
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TextField
              name='searchJob'
              autoComplete='off'
              autoCorrect='off'
              id='searchJob'
              variant='outlined'
              placeholder='Search Job'
              fullWidth
              size='small'
              value={searchJob}
              onChange={e => {
                setPage(1)
                setSearchJob(e.target.value)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon={'iconamoon:search-thin'} fontSize={16} style={{ marginRight: '10px' }} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 4
            }}
          >
            <Autocomplete
              fullWidth
              disablePortal
              id='training-center'
              options={optionsTrainers}
              getOptionLabel={(option: any) => option.name}
              renderInput={params => <TextField {...params} size='small' label='Training Center' />}
              onChange={(_, newValue) => {
                setPage(1)
                setFilterTrainer(newValue)
              }}
            />
            <Autocomplete
              fullWidth
              disablePortal
              id='category'
              options={optionsCategory}
              getOptionLabel={(option: any) => option.category}
              renderInput={params => <TextField {...params} size='small' label='Category' />}
              onChange={(_, newValue) => {
                setPage(1)
                setFilterCategory(newValue)
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ px: '24px' }}>
        {trainings.length === 0 && loading ? (
          // Show loading skeleton when initial loading
          <Grid container spacing={3} mt={2}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        ) : trainings.length === 0 && !loading ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Image
                src='/images/no-trainings.png' // 👈 make sure to save the illustration at this path
                alt='No Trainings'
                width={isMobile ? 300 : 400}
                height={isMobile ? 300 : 400}
              />
            </Box>
            <Typography variant='h6' fontWeight={600} gutterBottom>
              No Trainings Found
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
              We couldn't find any training that matches your search.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={4} sx={{ mt: '0px' }}>
              {renderList(pageView, trainings)}
            </Grid>

            {loading && (
              <Grid container spacing={3} mt={2}>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <SkeletonCard />
                  </Grid>
                ))}
              </Grid>
            )}

            {hasMore && !loading && (
              <Box display='flex' justifyContent='center' py={4}>
                <Button
                  onClick={fetchTraining}
                  variant='text'
                  color='primary'
                  endIcon={<Icon icon={'proicons:chevron-down'} />}
                >
                  See Other Training
                </Button>
              </Box>
            )}
          </>
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
