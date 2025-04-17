import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {
  Autocomplete,
  Box,
  Button,
  CardMedia,
  CircularProgress,
  InputAdornment,
  TextField,
  useMediaQuery
} from '@mui/material'
import { useEffect, useState } from 'react'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar, linkToTitleCase } from 'src/utils/helpers'

import Link from 'next/link'
import TrainingContext, { TrainingProvider } from 'src/context/TrainingContext'
import { useTraining } from 'src/hooks/useTraining'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useTheme } from '@mui/material/styles'
import { HttpClient } from 'src/services'

const SeafarerOngoingTraining = ({ pageView }: { pageView: string }) => {
  return (
    <TrainingProvider>
      <OngoingTrainingApp pageView={pageView} />
    </TrainingProvider>
  )
}

const TruncatedTypography = (props: { children: any; line?: number; textTransform?: boolean; [key: string]: any }) => {
  const { children, line, textTransform, ...rest } = props
  const maxLine = line ? line : 1

  let value = children

  if (textTransform) {
    value = children.toLowerCase()
  }

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
        textTransform: 'capitalize',
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
        <Grid item xs={12} md={4} key={item.id}>
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

const OngoingTrainingApp = ({ pageView }: { pageView: string }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { fetchTrainings, hasNextPage, totalTraining, setPage, page } = useTraining()
  const params = useSearchParams()
  const trainer = linkToTitleCase(params.get('trainer'))
  const [searchJob, setSearchJob] = useState<any>()
  const [filterTrainer, setFilterTrainer] = useState<any>()
  const [filterCategory, setFilterCategory] = useState<any>()
  const [optionsCategory, setOptionsCategory] = useState([])
  const [optionsTrainers, setOptionsTrainers] = useState([])

  const fetchTrainingsWithParams = () => {
    fetchTrainings({
      take: 12,
      instant: 0,
      ongoing: 1,
      username: filterTrainer?.username,
      search: searchJob,
      category_id: filterCategory?.id
    })
  }

  const fetchOptions = async () => {
    HttpClient.get('/training/trainer?page=1&take=999').then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      const { training } = response?.data
      setOptionsTrainers(training?.data)
    })

    HttpClient.get('/training-category?page=1&take=999').then(response => {
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

  useEffect(() => {
    fetchTrainingsWithParams()
  }, [trainer, searchJob, page, filterTrainer, filterCategory])

  return (
    <>
      <Grid container spacing={4} sx={{ px: '16px', paddingTop: '16px' }}>
        <Grid item xs={12} md={7}>
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
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
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
      <TrainingContext.Consumer>
        {({ listTrainings, onLoading }) => {
          if (onLoading) {
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100vh'
                }}
              >
                <CircularProgress />
              </Box>
            )
          }

          return (
            <Box style={{ height: 'fit-content' }}>
              <InfiniteScroll
                style={{ overflow: 'visible' }}
                dataLength={totalTraining}
                next={() => setPage(page + 1)}
                hasMore={hasNextPage}
                loader={
                  <>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: '20px'
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </>
                }
              >
                <Grid container spacing={4} sx={{ padding: '24px' }}>
                  {renderList(pageView, listTrainings)}
                </Grid>
              </InfiniteScroll>
            </Box>
          )
        }}
      </TrainingContext.Consumer>
    </>
  )
}

SeafarerOngoingTraining.acl = {
  action: 'read',
  subject: 'seafarer-training-ongoing'
}

export default SeafarerOngoingTraining
