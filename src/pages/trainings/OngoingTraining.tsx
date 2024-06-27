import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Box, Button, CardMedia, CircularProgress, Divider, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import Training from 'src/contract/models/training'
import Avatar from 'src/@core/components/mui/avatar'
import { formatIDR, getUserAvatar } from 'src/utils/helpers'
import Icon from 'src/@core/components/icon'
import { HttpClient } from 'src/services'
import Link from 'next/link'
import { useAuth } from 'src/hooks/useAuth'

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

const renderList = (arr: Training[] | null) => {
  if (arr && arr.length) {
    return arr.map(item => {
      const { user } = useAuth()

      const trainerNameUrl = item.trainer.name.toLowerCase().split(' ').join('-')
      const trainingTitleUrl = item.title ? item.title?.toLowerCase().split(' ').join('-') : ''
      const link = user
        ? `/candidate/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`
        : `/trainings/${trainerNameUrl}/${item.id}/${trainingTitleUrl}`

      return (
        <Grid item xs={12} md={4} sx={{ marginTop: '-10px', marginBottom: '10px' }} key={item.id}>
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
                      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5, mb: 1 }}
                    >
                      <Icon icon='solar:bookmark-circle-bold-duotone' color='#32487A' />
                      <Grid item xs={true} sx={{ flexGrow: 1 }}>
                        <TruncatedTypography fontSize={20} color={'#0a66c2'}>
                          {item.title}
                        </TruncatedTypography>
                      </Grid>
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

const OngoingTrainingScreen = () => {
  const [listTrainings, setTraining] = useState<Training[] | null>(null)
  const [onLoading, setOnLoading] = useState(false)
  const payload = { take: 12, page: 1, ongoing: 1 }

  const fetchTrainings = async () => {
    try {
      setOnLoading(true)
      const resp = await HttpClient.get(`/public/data/training`, { ...payload })

      if (resp.status == 200) {
        const data = resp.data.trainings.data
        setTraining(data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  useEffect(() => {
    fetchTrainings()
  }, [])

  if (onLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ my: 20 }} />
      </Box>
    )
  }

  return (
    <Grid container spacing={3} mt={1}>
      {renderList(listTrainings)}
    </Grid>
  )
}

OngoingTrainingScreen.acl = {
  action: 'read',
  subject: 'seafarer-training-ongoing'
}

export default OngoingTrainingScreen
