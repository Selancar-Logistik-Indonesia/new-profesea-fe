import { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { HttpClient } from 'src/services'
import INews from 'src/contract/models/news'
import { Icon } from '@iconify/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import CarouselEvent from './carouselEvent'

const NewsCard = ({ item }: { item: INews }) => {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push('/news/detail/' + item.slug)}
      sx={{
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF'
      }}
    >
      <CardContent sx={{ p: '0 !important', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <CardMedia
          image={item.imgnews ?? null}
          sx={{
            width: '100%',
            height: '250px',
            objectFit: 'contain',
            borderRadius: '8px'
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400, textTransform: 'capitalize' }}>
            {item.category.name}
          </Typography>
          <Typography
            sx={{
              color: '#303030',
              fontSize: 18,
              fontWeight: 700,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {item.title.toLowerCase()}
          </Typography>
          <Typography
            fontWeight={300}
            fontSize={16}
            sx={{
              lineClamp: 3,
              WebkitLineClamp: 3,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              color: '#5E5E5E',
              fontSize: '14px',
              fontWeight: 400
            }}
          >
            {item.snap_content
              ? `${item.snap_content.toString().charAt(0).toUpperCase() + item.snap_content.toString().slice(1)}`
              : ''}
          </Typography>
        </Box>
        <Typography sx={{ color: '#999', fontSize: 14, fontWeight: 400 }}>
          {moment(item.posting_at).format('DD/MM/YYYY HH:MM:SS')}
        </Typography>
      </CardContent>
    </Card>
  )
}

const NewsView = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const [listNews, setNews] = useState<INews[] | null>(null)
  const [onLoading, setOnLoading] = useState(false)

  const fetchNews = async () => {
    try {
      setOnLoading(true)
      const resp = await HttpClient.get(`/news?page=${1}&take=3&type=News`)

      if (resp.status == 200) {
        const data = resp.data.news.data
        setNews(data)
      }
    } catch (error) {
      console.error(error)
    }
    setOnLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <Grid container sx={{ px: { xs: '24px', md: 0 }, display: 'flex', flexDirection: 'row', gap: '24px' }}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Read Our Articles</Typography>
        <Button
          endIcon={<Icon icon='mdi:chevron-right' />}
          sx={{ color: 'black', fontSize: 14, fontWeight: 400, textTransform: 'none' }}
        >
          {t('button_6')}
        </Button>
      </Grid>

      {!onLoading && listNews && isXs ? (
        <CarouselEvent>
          {listNews.map((news, i) => (
            <Grid item key={i} xs={12} md={4}>
              <NewsCard item={news} />
            </Grid>
          ))}
        </CarouselEvent>
      ) : (
        <Grid item container sx={{ display: 'flex', flexWrap: 'nowrap' }} spacing={8}>
          {listNews?.map((news, i) => (
            <Grid item key={i} xs={12} md={4}>
              <NewsCard item={news} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  )
}

export default NewsView
