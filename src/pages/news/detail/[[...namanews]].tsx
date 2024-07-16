// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'

// import Recomended from '../Recomended'
import { HttpClient } from 'src/services'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
import { NewsProvider } from 'src/context/NewsContext'
import { useNews } from 'src/hooks/useNews'
import { useRouter } from 'next/router'
// import DetailNews from 'src/views/news/detailnews';
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import INews from 'src/contract/models/news'
import Head from 'next/head'
import BreadcrumbsNews from '../BreadcrumbsNews'
import { BreadcrumbsNewsProvider, useBreadcrumbsNews } from 'src/context/BreadcrumbsNewsContext'

import { Theme } from '@mui/material'
import { SxProps } from '@mui/system'
import FooterView from 'src/views/landing-page/footerView'
import moment from 'moment'
import styles from '../../../../styles/scss/CardNews.module.scss'
import SideAd from 'src/views/banner-ad/sidead'

const detailContentWrapper: SxProps<Theme> = {
  display: 'flex',
  gap: {
    xs: 4,
    lg: 0
  },
  flexDirection: {
    xs: 'column',
    lg: 'row'
  }
}

const detailContentRight: SxProps<Theme> = {
  width: {
    xs: '100%',
    lg: '30%'
  }
}

const detailContentLeft: SxProps<Theme> = {
  width: {
    xs: '100%',
    lg: '70%'
  }
}

const cardNewsWrapper: SxProps<Theme> = {
  display: 'flex',
  gap: 4,
  flexDirection: {
    xs: 'column'
  }
}

const newscache = secureLocalStorage.getItem(localStorageKeys.news) as INews

const Thread = () => {
  return (
    <NewsProvider>
      <ThreadApp />
    </NewsProvider>
  )
}

const ThreadApp = () => {
  const { dispatch } = useBreadcrumbsNews()
  const { fetchComments, fetchNews } = useNews()
  const [threadDetail, setthreadDetail] = useState<any>([])
  const [otherNews, setOtherNews] = useState<INews[]>([])
  const router = useRouter()
  // const x = newsca
  const { namanews } = router.query as { namanews: string }
  const firstload = async () => {
    if (namanews != undefined) {
      await HttpClient.get('/news/' + namanews).then(response => {
        const detail = response.data.news
        setthreadDetail(detail[0])
        if (newscache == undefined) {
          secureLocalStorage.setItem(localStorageKeys.news, response.data.news[0])
          window.location.reload()
        } else {
          if (newscache.id != detail[0].id) {
            secureLocalStorage.setItem(localStorageKeys.news, response.data.news[0])
            window.location.reload()
          }
        }
      })
    }
    fetchComments({ take: 5, replyable_id: 1, replyable_type: 'news' })
    fetchNews({ take: 5 })
  }

  useEffect(() => {
    firstload()
    handleFetchOtherNews()
  }, [namanews])

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
        },
        {
          name: threadDetail?.category?.name,
          path: '#'
        },
        {
          name: threadDetail?.title,
          path: '#'
        }
      ]
    })
  }, [dispatch, threadDetail])

  const handleFetchOtherNews = async () => {
    try {
      const response = await HttpClient.get(`/news/?page=1&take=1000&type=News`)
      setOtherNews(response?.data?.news?.data)
    } catch (error) {
      console.error(error)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text
    }

    return text.substring(0, maxLength) + '...'
  }

  const bannerHeroDetail: SxProps<Theme> = {
    backgroundSize: 'cover',
    backgroundPosition: {
      xs: '50% center',
      md: '85% center',
      lg: '85% center'
    },
    minHeight: '350px'
  }

  const imgUrl = threadDetail?.imgnews && threadDetail?.imgnews.length != 0 ? threadDetail?.imgnews[0] : ''

  return (
    <>
      <Head>
        <meta name='description' content={`${newscache?.id}`} />
        <meta name='keywords' content='profesea' />
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
          {/* Bannder */}
          <Grid
            item
            xs={12}
            sx={{
              ...bannerHeroDetail,
              my: 2,
              display: 'flex',
              gap: 2,
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              px: 2,
              pb: 4,
              backgroundImage: `url(${imgUrl})`
            }}
          >
            <Typography
              variant='h2'
              style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '400' }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 } }}
            >
              {threadDetail?.category?.name}
            </Typography>
            <Typography
              variant='h1'
              style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '700' }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4, whiteSpace: 'null' } }}
            >
              {threadDetail?.title}
            </Typography>
            <Typography
              variant='h2'
              style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '400' }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 } }}
            >
              {moment(threadDetail?.posting_at).format('LL')}
            </Typography>
          </Grid>
          {/* Content */}
          <Grid item xs={12} sx={{ my: 4, ...detailContentWrapper }}>
            <Box sx={{ ...detailContentLeft }}>
              <Typography variant='body2' fontSize={14} style={{ color: '#424242' }}>
                {ReactHtmlParser(`${threadDetail?.content}`)}
              </Typography>
            </Box>
            <Box sx={{ ...detailContentRight }}>
              <Box my={4} sx={{ position: 'sticky', top: '70px' }}>
                <SideAd adslocation='home-page' />
              </Box>
            </Box>
          </Grid>

          {/* You Mau Also Like */}
          <Box
            sx={{
              my: 4
            }}
          >
            <Typography sx={{ fontWeight: 700 }} color={'primary'} fontSize={18} my={4}>
              You May Also Like
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 4,
                width: '90%',
                overflowX: {
                  lg: 'auto'
                },
                overflowY: {
                  xs: 'scroll',
                  lg: 'unset'
                },
                height: {
                  xs: '700px',
                  lg: '400px'
                }
              }}
            >
              {otherNews.map((o, index) => (
                <Box
                  key={index}
                  sx={{
                    ...cardNewsWrapper
                  }}
                >
                  <div className={styles['card-news-thumb']}>
                    <a href='#'>
                      <img src={o?.imgnews[0]} alt={'test'} />
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
                        {o?.category?.name}
                      </Typography>
                      <Typography
                        variant='h4'
                        sx={{ fontWeight: 700, cursor: 'pointer' }}
                        color={'black'}
                        fontSize={18}
                      >
                        {o?.title}
                      </Typography>
                      <Typography>{truncateText(o?.snap_content, 400)}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 400 }} color={'gray'} fontSize={14}>
                        {moment(o?.posting_at).format('LL')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>
      <FooterView />
    </>
  )
}

Thread.guestGuard = false
Thread.authGuard = false
Thread.getLayout = (page: ReactNode) => (
  <LandingPageLayout>
    <BreadcrumbsNewsProvider>{page}</BreadcrumbsNewsProvider>
  </LandingPageLayout>
)

export default Thread
