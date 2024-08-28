import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Moment from 'moment'
import { useRouter } from 'next/router'

const CarouselNewsView = () => {
  // const [forumCode, setForumCode] = useState('')
  const router = useRouter()
  const [dataSheet, setDataSheet] = useState<[]>([])
  const { t } = useTranslation()
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }
  const getListNews = async () => {
    try {
      const resp = await HttpClient.get(`/news?page=${1}&take=25&type=News`)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }

      const rows = resp.data.news.data
      const items = rows
      setDataSheet(items)
    } catch (error) {
      let errorMessage = 'Something went wrong!'

      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage
      }

      if (typeof error == 'string') {
        errorMessage = error
      }

      toast.error(`Opps ${errorMessage}`)
    }
  }

  const handleOpenNews = () => {
    router.push('/news')
  }

  useEffect(() => {
    getListNews().then(() => {})
  }, [])

  function Item(props: any) {
    return (
      <Card
        sx={{
          color: 'common.white',
          backgroundColor: '#FFFFFF',
          marginRight: 3,
          height: '90%',
          marginBottom: 5,
          marginTop: 5
        }}
      >
        <CardContent>
          <Link style={{ textDecoration: 'none' }} href={'/news/detail/' + props.item.slug}>
            <CardMedia
              sx={{ height: 201 }}
              image={props.item?.imgnews != null ? props.item.imgnews : null}
              style={{
                maxWidth: '100%',
                height: '250px',
                alignItems: 'center',
                justifyContent: 'center',
                objectFit: 'contain'
              }}
            />
            <Grid container direction='row' alignItems='center' spacing={4}>
              <Grid item>
                <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 9 }}>
                  {Moment(props.item.posting_at).format('DD/MM/YYYY HH:MM:SS')}
                </Typography>
              </Grid>
            </Grid>
            <Typography
              variant='h6'
              sx={{ color: '#0a66c2', textTransform: 'uppercase' }}
              mb={5}
              fontWeight={600}
              fontSize={18}
            >
              {props.item.title}
            </Typography>
            <Typography
              fontWeight={300}
              fontSize={16}
              sx={{
                lineClamp: 3, // Set the maximum number of lines you want to display
                WebkitLineClamp: 3, // For Webkit-based browsers like Safari
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {props.item.snap_content
                ? `${
                    props.item.snap_content.toString().charAt(0).toUpperCase() +
                    props.item.snap_content.toString().slice(1)
                  }`
                : ''}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Grid
      container
      justifyContent='left'
      sx={{
        maxWidth: { xs: '100%' },
        px: { xs: 5, md: 5 },
        background: '#FFFFFF'
      }}
      pb={2}
    >
      <Grid container justifyContent='center'></Grid>
      <Grid item xs={12}>
        <Grid item xs={12} sm={12} mb={2}>
          <Typography fontSize={34} style={{ color: '#000' }} fontWeight='800' mt={6} mb={2} textAlign='center'>
            {t('landing_news_title')}
          </Typography>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Carousel
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            renderDotsOutside={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition='all .5'
            transitionDuration={500}
            containerClass='carousel-container'
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
            rewindWithAnimation={true}
          >
            {dataSheet.map((item, i) => (
              <Item key={i} item={item}></Item>
            ))}
          </Carousel>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              mb: 4
            }}
          >
            <Typography
              variant='h6'
              color={'primary'}
              sx={{
                cursor: 'pointer'
              }}
              onClick={handleOpenNews}
            >
              Lihat berita lainnya
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CarouselNewsView
