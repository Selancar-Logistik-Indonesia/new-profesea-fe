import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import Training from 'src/contract/models/training'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import TrainingContext, { TrainingProvider } from 'src/context/TrainingContext'
import { useTraining } from 'src/hooks/useTraining'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonJoin from './ButtonJoin'

const SeafarerInstantTraining = () => {
  return (
    <TrainingProvider>
      <InstantTrainingApp />
    </TrainingProvider>
  )
}

const renderList = (arr: Training[]) => {
  if (arr && arr.length) {
    return arr.map(item => {
      return (
        <Grid item xs={12} md={4} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <Grid item xs={12}>
              <CardContent>
                <Grid container sx={{ alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                  <Grid item component={Link} href={`/candidate/training/in-house/${item.id}`}>
                    <img
                      alt='logo'
                      src={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                      style={{
                        width: '450px',
                        height: '250px',
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} mb={2}>
                      <Icon icon='solar:tag-horizontal-bold-duotone' color='#32487A' />
                      <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                        {item.category?.category}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container direction='row' justifyContent='space-between' alignItems='center' mt={1} spacing={2}>
                  <Grid item xs={9}>
                    <Button size='small' variant='outlined' color='success'>
                      <Typography sx={{ ontWeight: 'bold', color: 'text.primary' }} fontSize={12}>
                        {`Score - ${item?.score}`}
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    {item?.score && item?.joined_at != null && (
                      <Button
                        size='small'
                        LinkComponent={Link}
                        variant='contained'
                        color='primary'
                        href={`/candidate/training/in-house/${item.id}`}
                      >
                        {item?.score > 0 ? `Re-Try` : 'Try It'}
                      </Button>
                    )}
                    {item?.joined_at === null && <ButtonJoin id={item.id}></ButtonJoin>}
                  </Grid>
                </Grid>
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

const InstantTrainingApp = () => {
  const { fetchTrainings, hasNextPage, totalTraining } = useTraining()

  useEffect(() => {
    fetchTrainings({ take: 9, instant: 1 })
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
            next={() => fetchTrainings({ take: 9, instant: 1 })}
            hasMore={hasNextPage}
            loader={<CircularProgress sx={{ mt: 20 }} />}
          >
            <Grid container spacing={2} mt={1}>
              {renderList(listTrainings)}
            </Grid>
          </InfiniteScroll>
        )
      }}
    </TrainingContext.Consumer>
  )
}

SeafarerInstantTraining.acl = {
  action: 'read',
  subject: 'seafarer-training'
}

export default SeafarerInstantTraining
