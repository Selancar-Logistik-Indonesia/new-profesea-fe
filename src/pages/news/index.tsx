import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material'
import Head from 'next/head'
import React, { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import themeConfig from 'src/configs/themeConfig'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page-news'
import BreadcrumbsNews from './BreadcrumbsNews'
import { BreadcrumbsNewsProvider, useBreadcrumbsNews } from 'src/context/BreadcrumbsNewsContext'
import HighlightedCardNews from './HighlightedCardNews'
import YoutubeEmbed from './YoutubeEmbed'
import styles from '../../../styles/scss/CardNews.module.scss'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import FooterView from 'src/views/landing-page/footerView'
import { HttpClient } from 'src/services'
import INews from 'src/contract/models/news'
import moment from 'moment'

interface INewsCategory {
  id: number
  name: string
}

const NewsPage = () => {
  const { dispatch } = useBreadcrumbsNews()
  const { t } = useTranslation()
  const [tabValue, setTabValue] = useState<any>(null)
  const [newsCategories, setNewsCategories] = useState<INewsCategory[]>([])
  const [news, setNews] = useState<INews[]>([])
  const [featuredNews, setFeaturedNews] = useState<INews[]>([])

  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMBS',
      payload: [
        {
          name: 'Home Page',
          path: '/'
        },
        {
          name: 'News',
          path: '/news'
        }
      ]
    })
  }, [dispatch])

  useEffect(() => {
    handleFetchNewsCategory()
    handleFetchFeaturedNews()
  }, [])

  useEffect(() => {
    handleFecthNewsWithCategoryId()
  }, [tabValue])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // adjust this value as needed
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleFecthNewsWithCategoryId = async () => {
    const categoryId = tabValue ? tabValue : ''

    try {
      const response = await HttpClient.get(`/news/?page=1&take=1000&type=News&category_id=${categoryId}`)
      const news = response?.data?.news?.data
      setNews(news)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFetchFeaturedNews = async () => {
    try {
      const response = await HttpClient.get(`/news/?page=1&take=1000&type=News&featured_news=1`)
      setFeaturedNews(response?.data?.news?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFetchNewsCategory = async () => {
    try {
      const response = await HttpClient.get(`public/data/news-category/?page=1&take=1000`)
      const newsCategories = response?.data?.data?.data
      setNewsCategories(newsCategories)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text
    }
    return text.substring(0, maxLength) + '...'
  }

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_hero_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_about_subtitle')}`} />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>
      <Box
        sx={{
          px: { xs: 4, md: '8rem' }
        }}
      >
        <Box
          sx={{
            my: 2,
            mt: 2
          }}
        >
          <BreadcrumbsNews />
        </Box>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Grid
            item
            xs={12}
            sx={{
              ...landingPageStyle.bannerHero,
              my: 2,
              display: 'flex',
              gap: 2,
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          ></Grid>
          <Grid item xs={12} sx={{ my: 4 }}>
            <Typography sx={{ fontWeight: 'bold' }} color={'primary'} fontSize={24}>
              Highlighted News
            </Typography>
            <Box
              pt={2}
              sx={{
                ...landingPageStyle.highlightedCardNewsWrapper
              }}
            >
              {featuredNews.map(d => (
                <HighlightedCardNews
                  category={d?.category?.name}
                  title={d?.title}
                  description={d?.snap_content}
                  image={d?.imgnews[0]}
                  postDate={d?.posting_at}
                  slug={d?.slug}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ my: 4 }}>
            <Typography sx={{ fontWeight: 'bold' }} color={'primary'} fontSize={24}>
              Videos
            </Typography>
            <Grid container spacing={2} sx={{ width: '100%' }} mx={0} my={4}>
              <Grid item xs={12} lg={6} height={402}>
                <YoutubeEmbed embedId='6D5C4KcfOO4' />
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 4,
                    padding: '20px'
                  }}
                >
                  <Typography sx={{ fontWeight: 400 }} color={'gray'} fontSize={18}>
                    Video
                  </Typography>
                  <Typography variant='h4' sx={{ fontWeight: 700 }} color={'black'} fontSize={32}>
                    Rekrutmen 101: Tips & Trik Lolos Wawancara Kerja bersama Kak Dinar The HR
                  </Typography>
                  <Typography>
                    Tonton episode perdana MariTalks kita yang membahas mulai dari berbagai aspek #interview kerja
                    sampai mitos atau faktanya.
                  </Typography>
                  <Box display={'flex'} gap={4}>
                    <Button
                      size='small'
                      variant='contained'
                      onClick={() => window.open('https://youtu.be/6D5C4KcfOO4?si=L8acXduMUmJ2oKWl', '_blank')}
                      startIcon={<Icon icon={'ph:play-fill'} />}
                    >
                      Watch Video
                    </Button>
                    <Button
                      size='small'
                      variant='outlined'
                      onClick={() => window.open('https://www.youtube.com/@Profesea_id', '_blank')}
                    >
                      View All Video
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ my: 4 }}>
            <Typography sx={{ fontWeight: 'bold' }} color={'primary'} fontSize={24}>
              News
            </Typography>
            {/* Category Tab News */}
            <Box>
              <Tabs
                sx={{
                  ...landingPageStyle.stickyTabs
                }}
                value={tabValue}
                onChange={handleChange}
                variant='scrollable'
                scrollButtons='auto'
              >
                <Tab value={null} label='All News' />
                {newsCategories.map(n => (
                  <Tab value={n.id} label={n.name} />
                ))}
              </Tabs>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                my: 4
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }} color={'primary'} fontSize={24}>
                {newsCategories.find(n => n.id === tabValue)?.name ?? 'All'} News
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  width: '100%',
                  height: '700px',
                  overflowY: 'scroll'
                }}
              >
                {news.map(n => (
                  <Box
                    sx={{
                      ...landingPageStyle.cardNewsWrapper
                    }}
                  >
                    <div className={styles['card-news-thumb']}>
                      <a href='#'>
                        <img src={n?.imgnews[0]} alt={'test'} />
                      </a>
                    </div>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 4,
                        padding: '20px'
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 400 }} color={'gray'} fontSize={14}>
                          {n?.category?.name}
                        </Typography>
                        <Typography
                          variant='h4'
                          sx={{ fontWeight: 700, cursor: 'pointer' }}
                          color={'black'}
                          fontSize={18}
                        >
                          {n?.title}
                        </Typography>
                        <Typography>{truncateText(n?.snap_content, 400)}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 400 }} color={'gray'} fontSize={14}>
                          {moment(n.posting_at).format('LL')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <FooterView />
    </>
  )
}

NewsPage.guestGuard = false
NewsPage.authGuard = false
NewsPage.getLayout = (page: ReactNode) => (
  <LandingPageLayout>
    <BreadcrumbsNewsProvider>{page}</BreadcrumbsNewsProvider>
  </LandingPageLayout>
)

export default NewsPage
