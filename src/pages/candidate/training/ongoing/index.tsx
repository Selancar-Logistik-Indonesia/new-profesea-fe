import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CircularProgress, Divider } from '@mui/material'
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
      return (
        <Grid item xs={12} md={3} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Grid item xs={12}>
              <CardContent>
                <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                  <Grid item component={Link} href={`/candidate/training/detail/${item.id}`}>
                    <img
                      alt='logo'
                      src={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                      style={{
                        width: '265px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                  <Grid item component={Link} href={`/candidate/training/detail/${item.id}`}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={1}>
                      <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' />
                      <Typography sx={{ fontWeight: 'bold', color: '#0a66c2' }} ml='0.5rem' mt='0.2rem' fontSize={14}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={1}>
                      <Icon icon='solar:tag-horizontal-bold-duotone' color='#32487A' />
                      <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                        {item.category?.category}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
                      <Icon icon='solar:tag-price-bold-duotone' color='#32487A' />
                      <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                        {formatIDR(item.price)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container sx={{ alignItems: 'right', justifyContent: 'right' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
                    <Button
                      size='small'
                      LinkComponent={Link}
                      variant='contained'
                      color='primary'
                      href={`/candidate/training/detail/${item.id}`}
                    >
                      Buy
                    </Button>
                  </Box>
                </Grid>
                <Divider sx={{ my: '0 !important' }} />
                <Box
                  height={65}
                  sx={{
                    display: 'flex',
                    alignContent: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                    <Avatar src={getUserAvatar(item.trainer)} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                    marginTop={3}
                  >
                    <Typography sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={14}>
                      {item?.trainer?.name}
                    </Typography>
                    <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                      {item?.trainer?.username ?? '-'}
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
    fetchTrainings({ take: 9, instant: 0, ongoing: 1 })
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
            next={() => fetchTrainings({ take: 9, instant: 0, ongoing: 1 })}
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
