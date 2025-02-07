import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CardMedia, CircularProgress, Divider, Tooltip } from '@mui/material'
import { useEffect } from 'react'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar } from 'src/utils/helpers'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTraining } from 'src/hooks/useTraining'
import TrainingContext, { TrainingProvider } from 'src/context/TrainingContext'
import { IUser } from 'src/contract/models/user'

const SeafarerOngoingTraining = () => {
  const { user } = useAuth()
  return (
    <TrainingProvider>
      <OngoingTrainingScreen user={user} />
    </TrainingProvider>
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

const renderList = (arr: Training[] | null, user: IUser | null) => {
  if (arr && arr.length) {
    return arr.map(item => {
      const trainerNameUrl = item.trainer.name.toLowerCase().split(' ').join('-')
      const trainingTitleUrl = item.title ? item.title?.toLowerCase().split(' ').join('-') : ''
      const link = user
        ? `/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`
        : `/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`

      return (
        <Grid item xs={12} md={4} key={item.id}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Link href={link}>
                <CardMedia
                  component='div'
                  image={item?.thumbnail ? item?.thumbnail : '/images/icon-trainer.png'}
                  sx={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    aspectRatio: '3/2',
                    mb: 3
                  }}
                />
              </Link>
              <Link href={link}>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '7.4em'
                  }}
                >
                  <Tooltip title={item.title} enterDelay={500} leaveDelay={200}>
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1.5,
                        mb: 1
                      }}
                    >
                      <Box sx={{ flexShrink: 0 }}>
                        <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' />
                      </Box>
                      <TruncatedTypography fontSize={20} color={'#0a66c2'} textTransform>
                        {item.title}
                      </TruncatedTypography>
                    </Grid>
                  </Tooltip>
                  <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Icon icon='solar:tag-horizontal-bold-duotone' color='#32487A' />
                    <Grid item xs={true} sx={{ flexGrow: 1 }}>
                      <TruncatedTypography fontSize={14} fontWeight={600} line={2}>
                        {item.category?.category}
                      </TruncatedTypography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
                    <Icon icon='solar:tag-price-bold-duotone' color='#32487A' />
                    <Grid item xs={true} sx={{ flexGrow: 1 }}>
                      <TruncatedTypography fontSize={14} fontWeight={600}>
                        {item.discounted_price ? formatIDR(item.discounted_price, true) : formatIDR(item.price, true)}
                      </TruncatedTypography>
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
              <Grid container sx={{ justifyContent: 'left', my: 2 }}>
                <Button size='small' LinkComponent={Link} variant='contained' color='primary' href={link}>
                  See Details
                </Button>
              </Grid>
              <Divider sx={{ my: '0 !important' }} />
              <Box
                height={35}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
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
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const OngoingTrainingScreen = ({ user }: { user: IUser | null }) => {
  const { fetchTrainings, hasNextPage, totalTraining } = useTraining()

  useEffect(() => {
    fetchTrainings({ take: 12, instant: 0, ongoing: 1 }, true)
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
          <Box style={{ height: 'fit-content' }}>
            <InfiniteScroll
              style={{ overflow: 'visible' }}
              dataLength={totalTraining}
              next={() => fetchTrainings({ take: 12, instant: 0, ongoing: 1 })}
              hasMore={hasNextPage}
              loader={<CircularProgress sx={{ mt: 20 }} />}
            >
              <Grid container spacing={3}>
                {renderList(listTrainings, user)}
              </Grid>
            </InfiniteScroll>
          </Box>
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
