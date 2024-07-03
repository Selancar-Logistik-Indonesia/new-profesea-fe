// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

import Box from '@mui/material/Box'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Grid } from '@mui/material'

import Recomended from '../Recomended'
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

const newscache = secureLocalStorage.getItem(localStorageKeys.news) as INews

const Thread = () => {
  return (
    <NewsProvider>
      <ThreadApp />
    </NewsProvider>
  )
}

const ThreadApp = () => {
  const { fetchComments, fetchNews } = useNews()
  const [threadDetail, setthreadDetail] = useState<any>([])
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
  }, [namanews])

  return (
    <Box sx={{ mt: 5, ml: 3 }}>
      {/* <title>My Page Title</title>  */}
      <Head>
        {/* <title>{`${themeConfig.templateName}`}</title> */}
        <meta name='description' content={`${newscache?.id}`} />
        <meta name='keywords' content='profesea' />
        {/* <meta name='viewport' content='initial-scale=0.8, width=device-width' /> */}
      </Head>
      {/* <meta name='description' content={`${newscache.id}`} /> */}
      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} pr={3}>
              <Card sx={{ color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        fontSize={18}
                        style={{ color: '#000' }}
                        fontWeight='600'
                        sx={{ ml: 2, mb: 5, color: '#000', textTransform: 'uppercase' }}
                      >
                        {threadDetail?.title}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'center'}>
                      <CardMedia
                        component='img'
                        alt='Img of Profesea'
                        image={threadDetail?.imgnews != null ? threadDetail.imgnews : null}
                        sx={{ ml: 2 }}
                        style={{
                          maxWidth: '100%',
                          height: '250',
                          alignItems: 'center',
                          justifyContent: 'center',
                          objectFit: 'contain'
                        }}
                      />
                    </Grid>
                    <Grid item container xs={12} justifyContent={'flex'}>
                      <Typography variant='body1' sx={{ p: 4, color: '#424242', fontWeight: 300 }}>
                        {threadDetail.posting_at}
                      </Typography>
                    </Grid>
                    <Box sx={{ mb: 1 }}>
                      <Grid item container xs={12} justifyContent={'flex'}>
                        <Typography variant='body2' sx={{ p: 4 }} fontSize={14} style={{ color: '#424242' }}>
                          {ReactHtmlParser(`${threadDetail?.content}`)}
                        </Typography>
                      </Grid>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12} paddingRight={3}>
          <Recomended></Recomended>
        </Grid>
      </Grid>
    </Box>
  )
}

Thread.guestGuard = false
Thread.authGuard = false
Thread.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Thread
