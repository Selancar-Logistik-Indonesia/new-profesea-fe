// ** React Imports
import React, { ReactNode, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

import Box from '@mui/material/Box'
import { Button, Card, CardContent, CardMedia, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Grid } from '@mui/material'

// import Recomended from '../news/Recomended'
// import { HttpClient } from 'src/services'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout'
// import { NewsProvider } from 'src/context/NewsContext';
// import { useNews } from 'src/hooks/useNews';
// import { useRouter } from 'next/router';
// import DetailNews from 'src/views/news/detailnews';
// import secureLocalStorage from 'react-secure-storage';
// import localStorageKeys from 'src/configs/localstorage_keys';
// import INews from 'src/contract/models/news';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HttpClient } from 'src/services'
import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'
import INews from 'src/contract/models/news'
import { linkToTitleCase } from 'src/utils/helpers'
// const newscache = secureLocalStorage.getItem(localStorageKeys.news) as INews

const Thread = () => {
  return <EventApp />
}

const EventApp = () => {
  const router = useRouter()
  const { namaevent } = router.query as { namaevent: string }

  const [dataSheet, setDataSheet] = useState<INews | null>(null)
  const [getPadding, setPadding] = useState(25)
  const theme = useTheme()
  const leutik = useMediaQuery(theme.breakpoints.down('md'))
  const getListNews = async () => {
    try {
      // const resp = await HttpClient.get(`/news?page=${1}&take=25&type=${forumCode}`)
      if (namaevent) {
        const resp = await HttpClient.get(`/news/title/` + namaevent)

        if (resp.status != 200) {
          throw resp.data.message ?? 'Something went wrong!'
        }

        const items = resp.data.news[0] as INews

        setDataSheet(items)
      }
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
  useEffect(() => {
    if (leutik == false) {
      setPadding(25)
    } else {
      setPadding(0)
    }
    getListNews()
  }, [namaevent])

  return (
    <Box sx={{ mt: 5, ml: 3, mr: 3 }}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ color: 'common.white', backgroundColor: '#FFFFFF', padding: getPadding }}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        fontSize={28}
                        style={{ color: '#000' }}
                        fontWeight='600'
                        sx={{ ml: 2, mb: 5, color: '#000', textTransform: 'uppercase' }}
                      >
                        {linkToTitleCase(dataSheet?.title ?? null)}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        fontSize={24}
                        style={{ color: '#000' }}
                        fontWeight='600'
                        sx={{ ml: 2, mb: 5, color: '#000', textTransform: 'uppercase' }}
                      >
                        {`${dataSheet?.date} | ${dataSheet?.time} | ${dataSheet?.cost}`}
                        {/* November 4 @ 10:00 am - 11:30 am FREE */}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'center'}>
                      <CardMedia
                        component='img'
                        alt='Img of Profesea'
                        image={dataSheet?.imgnews}
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
                      `
                      <Typography
                        fontSize={16}
                        fontWeight='400'
                        sx={{ ml: 2, mb: 5, color: '#000' }}
                        variant='body2'
                        style={{ color: '#424242' }}
                      >
                        {ReactHtmlParser(`${dataSheet?.content}`)}
                      </Typography>
                    </Grid>
                    <Divider />
                    <Grid item container xs={12} justifyContent={'flex'}>
                      <Grid item xs={12} md={4} mt={5} ml={4}>
                        <Button
                          href={'https://forms.gle/dndAEuZq9MhE4jjn6'}
                          // style={{ color: 'white', marginRight: 10 }}
                          variant='contained'
                        >
                          Pendaftaran disini
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} md={12} mt={3} mb={3} justifyContent={'flex'}>
                      {/* <Grid item container xs={12} md={6} justifyContent={'flex'}>
                        <Grid item container xs={12} justifyContent={'flex'}>
                          <Typography
                            fontSize={28}
                            fontWeight='600'
                            sx={{ ml: 2, mb: 5, color: '#000' }}
                            variant='body2'
                            style={{ color: '#424242' }}
                          >
                            Who's Attending?
                          </Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent={'flex'}>
                          <Typography
                            fontSize={18}
                            fontWeight='300'
                            sx={{ ml: 2, mb: 5, color: '#000' }}
                            variant='body2'
                            style={{ color: '#424242' }}
                          >
                            {namaevent}
                          </Typography>
                        </Grid>
                      </Grid> */}
                    </Grid>

                    <Divider />
                    <Grid item container xs={12} mt={3} justifyContent={'flex'}>
                      <Grid item container xs={12} md={6} justifyContent={'flex'}>
                        <Grid item xs={4}>
                          <Box>
                            <Typography
                              fontSize={18}
                              fontWeight='100'
                              sx={{ color: '#000' }}
                              variant='body2'
                              style={{ fontWeight: 'bold' }}
                            >
                              DETAILS
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Date:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={16} style={{ fontWeight: '400' }}>
                              {dataSheet?.date}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Time:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>{dataSheet?.time}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Cost:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>{dataSheet?.cost}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Website
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>
                              <Link style={{ textDecoration: 'none' }} href={'' + dataSheet?.website}>
                                {dataSheet?.website}
                              </Link>
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={4}>
                          <Box>
                            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                              ORGANIZER
                            </Typography>
                          </Box>

                          <Box>
                            <Typography>{dataSheet?.organizer}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Phone
                            </Typography>
                          </Box>
                          <Box>
                            <Typography> {dataSheet?.phone}</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Email
                            </Typography>
                          </Box>
                          <Box>
                            <Typography> {dataSheet?.email}</Typography>
                          </Box>
                          <Box>
                            <Link style={{ textDecoration: 'none' }} href={'/'}>
                              <Typography> View Organizer Website</Typography>
                            </Link>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box>
                            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                              VENUE
                            </Typography>
                          </Box>
                          <Box>
                            <Typography> {dataSheet?.venue}</Typography>
                          </Box>
                          {/* <Box>
                            <Typography>
                              <Link legacyBehavior href={'' + dataSheet?.meet}>
                                <a target='_blank' rel='noopener noreferrer'>
                                  {dataSheet?.meet}
                                </a>
                              </Link>
                            </Typography>
                          </Box> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

Thread.guestGuard = false
Thread.authGuard = false
Thread.getLayout = (page: ReactNode) => <LandingPageLayout>{page}</LandingPageLayout>

export default Thread
