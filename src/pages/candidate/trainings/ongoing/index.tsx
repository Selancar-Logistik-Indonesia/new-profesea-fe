import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CircularProgress, Divider, Tooltip } from '@mui/material'
import { useEffect } from 'react'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar } from 'src/utils/helpers'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import TrainingContext, { TrainingProvider } from 'src/context/TrainingContext'
import { useTraining } from 'src/hooks/useTraining'
import InfiniteScroll from 'react-infinite-scroll-component'

const SeafarerOngoingTraining = () => {
  return (
    <TrainingProvider>
      <OngoingTrainingApp />
    </TrainingProvider>
  )
}

const renderList = (arr: Training[]) => {
  if (arr && arr.length) {
    return arr.map(item => {
      const trainerNameUrl = item.trainer.name.toLowerCase().split(' ').join('-')
      const trainingTitleUrl = item.title ? item.title?.toLowerCase().split(' ').join('-') : ''

      return (
        <Grid item xs={12} md={4} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Grid item xs={12}>
              <CardContent>
                <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                  <Grid
                    item
                    component={Link}
                    href={`/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`}
                  >
                    <img
                      alt='logo'
                      src={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                      style={{
                        width: '100%',
                        aspectRatio: '3/2',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Link}
                  href={`/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`}
                >
                  <Grid
                    item
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '85px' }}
                  >
                    <Tooltip title={item.title} enterDelay={500} leaveDelay={200}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'center'] }} mb={1}>
                        <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' />
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            color: '#0a66c2',
                            width: '260px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          ml='0.5rem'
                          mt='0.2rem'
                          fontSize={18}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Tooltip>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={1}>
                      <Icon icon='solar:tag-horizontal-bold-duotone' color='#32487A' />
                      <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={14} fontWeight={700}>
                        {item.category?.category}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
                      <Icon icon='solar:tag-price-bold-duotone' color='#32487A' />
                      <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={14} fontWeight={700}>
                        {formatIDR(item.price)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'left', justifyContent: 'left' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} my={3}>
                    <Button
                      size='small'
                      LinkComponent={Link}
                      variant='contained'
                      color='primary'
                      href={`/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`}
                    >
                      See Details
                    </Button>
                  </Box>
                </Grid>
                <Divider sx={{ my: '0 !important' }} />
                <Box
                  height={35}
                  sx={{
                    display: 'flex',
                    alignContent: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                    <Avatar src={getUserAvatar(item.trainer)} alt='profile-picture' sx={{ width: 25, height: 25 }} />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                    marginTop={3}
                  >
                    <Typography sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={14}>
                      {item?.trainer?.name}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const OngoingTrainingApp = () => {
  const { fetchTrainings, hasNextPage, totalTraining } = useTraining()

  useEffect(() => {
    fetchTrainings({ take: 12, instant: 0, ongoing: 1 })
  }, [hasNextPage])

  return (
    <TrainingContext.Consumer>
      {({ listTrainings, onLoading }) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <InfiniteScroll
            dataLength={totalTraining}
            next={() => fetchTrainings({ take: 12, instant: 0, ongoing: 1 })}
            hasMore={hasNextPage}
            loader={<CircularProgress sx={{ mt: 20 }} />}
          >
            <Grid container spacing={3} mt={1}>
              {renderList(listTrainings)}
            </Grid>
          </InfiniteScroll>
        )
      }}
    </TrainingContext.Consumer>
  )
}

SeafarerOngoingTraining.acl = {
  action: 'read',
  subject: 'seafarer-training-ongoing'
}

export default SeafarerOngoingTraining
