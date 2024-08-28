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
import Link from 'next/link'

import Spinner from 'src/@core/components/spinner'

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
  width: {
    xs: '100%',
    lg: '379px'
  },
  display: 'flex',
  gap: '24px',
  flexDirection: {
    xs: 'column'
  }
}

// const TruncatedTypography = (props: { children: any; line?: number; [key: string]: any }) => {
//   const { children, line, ...rest } = props
//   const maxLine = line ? line : 1

//   return (
//     <Typography
//       sx={{
//         display: '-webkit-box',
//         WebkitBoxOrient: 'vertical',
//         WebkitLineClamp: maxLine,
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'normal',
//         maxHeight: `calc(${maxLine} * 1.2em)`,
//         minHeight: '1.2em',
//         lineHeight: '1.2em',
//         fontSize: '16px',
//         ...rest
//       }}
//     >
//       {children}
//     </Typography>
//   )
// }

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
  const [loading, setLoading] = useState(false)
  // const x = newsca
  const { namanews } = router.query as { namanews: string }
  const firstload = async () => {
    setLoading(true)
    if (namanews != undefined) {
      await HttpClient.get('/news/' + namanews).then(response => {
        const detail = response.data.news
        setthreadDetail(detail[0])
        handleFetchOtherNews(detail[0]?.id)
        if (newscache == undefined) {
          secureLocalStorage.setItem(localStorageKeys.news, response.data.news[0])
          // window.location.reload()
        } else {
          if (newscache.id != detail[0].id) {
            secureLocalStorage.setItem(localStorageKeys.news, response.data.news[0])
            // window.location.reload()
          }
        }
        setLoading(false)
      })
    }
    fetchComments({ take: 5, replyable_id: 1, replyable_type: 'news' })
    fetchNews({ take: 5 })
  }

  useEffect(() => {
    firstload()
  }, [namanews])

  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMBS',
      payload: [
        {
          name: 'Homepage',
          path: '/'
        },
        {
          name: 'News',
          path: '/news'
        },
        {
          name: threadDetail?.title,
          path: '#'
        }
      ]
    })
  }, [dispatch, threadDetail])

  const handleFetchOtherNews = async (filterId: any) => {
    try {
      const response = await HttpClient.get(`/news/?page=1&take=1000&type=News`)
      const otherNews: any[] = response?.data?.news?.data.filter((o: any) => o.id !== filterId)
      setOtherNews(otherNews.slice(0, 3))
    } catch (error) {
      console.error(error)
    }
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
          fontSize: '16px',
          ...rest
        }}
      >
        {children}
      </Typography>
    )
  }

  const bannerHeroDetail: SxProps<Theme> = {
    backgroundSize: 'cover',
    backgroundPosition: {
      xs: '50% center',
      md: '85% center',
      lg: '85% center'
    },
    minHeight: '380px'
  }

  const imgUrl = threadDetail?.imgnews && threadDetail?.imgnews.length != 0 ? threadDetail?.imgnews[0] : ''

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <meta name='description' content={`${newscache?.id}`} />
        <meta name='keywords' content='profesea' />
      </Head>
      <Box
        sx={{
          px: { xs: '24px', md: '120px' }
        }}
      >
        <Box
          sx={{
            my: '24px'
          }}
        >
          <BreadcrumbsNews />
        </Box>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Banner */}
          <Grid
            item
            xs={12}
            sx={{
              ...bannerHeroDetail,
              // my: 2,
              display: 'flex',
              gap: 2,
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              px: 2,
              pb: 4,
              backgroundImage: `url(${imgUrl})`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8))',
                borderRadius: '10px',
                zIndex: 1
              }}
            ></div>
            <Typography
              variant='h2'
              style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '400' }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 }, zIndex: 2 }}
              textTransform={'capitalize'}
            >
              {threadDetail?.category?.name}
            </Typography>
            <Typography
              variant='h1'
              style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '700' }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4, whiteSpace: 'null' }, zIndex: 2 }}
            >
              {threadDetail?.title}
            </Typography>
            <Typography
              variant='h2'
              style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '400' }}
              sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, md: 4 }, zIndex: 2 }}
            >
              {moment(threadDetail?.posting_at).format('LL')}
            </Typography>
          </Grid>
          {/* Content */}
          <Grid item xs={12} sx={{ my: 4, ...detailContentWrapper, gap: 8 }}>
            <Box sx={{ ...detailContentLeft, background: '#FFF', padding: '24px', borderRadius: '16px' }}>
              <Typography variant='body2' fontSize={14} style={{ color: '#424242', fontFamily: 'Outfit' }}>
                {ReactHtmlParser(`${threadDetail?.content}`)}
              </Typography>
            </Box>
            <Box sx={{ ...detailContentRight, position: 'relative' }}>
              <Box sx={{ borderRadius: '16px' }}>
                <SideAd adslocation='home-page' />
              </Box>
            </Box>
          </Grid>

          {/* You Mau Also Like */}
          <Box
            sx={{
              width: '100%',
              mb: 4
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: '24px' }} color={'primary'} fontSize={18}>
              You May Also Like
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 8
              }}
            >
              {otherNews.map((o, index: number) => (
                <Box
                  key={index}
                  sx={{
                    ...cardNewsWrapper
                  }}
                >
                  <div className={styles['card-news-thumb']}>
                    <a href={`/news/detail/${o?.slug}`}>
                      <img src={o?.imgnews[0]} alt={'test'} />
                    </a>
                  </div>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '24px'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        mb: '24px'
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 400, mb: '8px', textTransform: 'capitalize' }}
                        color={'gray'}
                        fontSize={14}
                      >
                        {o?.category?.name ? o?.category?.name : '-'}
                      </Typography>
                      <Link
                        href={`/news/detail/${o?.slug}`}
                        style={{
                          color: 'black',
                          marginBottom: '8px'
                        }}
                      >
                        <TruncatedTypography line={2} fontSize={18} fontWeight={700} color='black' minHeight={'50px'}>
                          {o?.title}
                        </TruncatedTypography>
                      </Link>
                      <TruncatedTypography line={3} fontWeight={400} fontSize={14}>
                        {o?.snap_content}
                      </TruncatedTypography>
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
