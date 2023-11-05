// ** React Imports
import React , { ReactNode, useEffect, useState } from 'react'
// import ReactHtmlParser from 'react-html-parser';

import Box  from '@mui/material/Box'  
import {   Button, Card, CardContent, CardMedia, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Grid } from '@mui/material'  
 
// import Recomended from '../news/Recomended'
// import { HttpClient } from 'src/services'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout';
// import { NewsProvider } from 'src/context/NewsContext';
// import { useNews } from 'src/hooks/useNews';
// import { useRouter } from 'next/router';
// import DetailNews from 'src/views/news/detailnews';
// import secureLocalStorage from 'react-secure-storage';
// import localStorageKeys from 'src/configs/localstorage_keys';
// import INews from 'src/contract/models/news';
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import Link from 'next/link';
  
// const newscache = secureLocalStorage.getItem(localStorageKeys.news) as INews

const Thread = () => {
  return ( 
      <EventApp /> 
  )
}

const EventApp = () => {   
  // const router = useRouter() 
  // const { namaevent } = router.query as { namaevent: string }
   
  const [getPadding, setPadding] = useState(25)
  const theme = useTheme()
  const leutik = useMediaQuery(theme.breakpoints.down('md'))
  
  useEffect(() => {
    if(leutik == false){
      setPadding(25)
    }else{
      
      setPadding(0)
    }
  })

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
                        Kalian capek gagal interview terus?
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        fontSize={24}
                        style={{ color: '#000' }}
                        fontWeight='600'
                        sx={{ ml: 2, mb: 5, color: '#000', textTransform: 'uppercase' }}
                      >
                        November 4 @ 10:00 am - 11:30 am FREE
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'center'}>
                      <CardMedia
                        component='img'
                        alt='Img of Profesea'
                        image={'/images/bannerevent.jpg'}
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
                        Setiap orang akan membentuk penilaiannya terhadap orang lain sejak detik pertama bertemu.
                        Begitupun dengan rekruter. Kesan pertama yang kita berikan akan mempengaruhi penilaian
                        selanjutnya terhadap kesesuaian kita sebagai kandidat pada posisi yang dicari, bahkan sebelum
                        kita menjawab pertanyaan!
                      </Typography>
                      <Typography
                        fontSize={16}
                        fontWeight='400'
                        sx={{ ml: 2, mb: 5, color: '#000' }}
                        variant='body2'
                        style={{ color: '#424242' }}
                      >
                        Bersama Profesea Dialog (Prolog), sesi kali ini akan membahas apa saja yang perlu diperhatikan
                        dalam membangun kesan awal yang baik, sehingga mempermudah proses interview selanjutnya.
                      </Typography>
                    </Grid>
                    <Divider />
                    <Grid item container xs={12} justifyContent={'flex'}>
                      <AddToCalendarButton
                        name='Test-Event'
                        startDate='2023-05-22'
                        options={['Apple', 'Google', 'Yahoo', 'iCal']}
                      ></AddToCalendarButton>
                    </Grid>
                    <Grid item container xs={12} md={12} mt={3} mb={3} justifyContent={'flex'}>
                      <Grid item container xs={12} md={6} justifyContent={'flex'}>
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
                            3 people are attending Kalian capek gagal interview terus?
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} md={6}>
                        <Grid item container xs={12} md={12}>
                          <Grid item container xs={12} md={10}>
                            <Card sx={{ color: 'common.white', backgroundColor: '#FFFFFF' }}>
                              <CardContent>
                                <Grid item container xs={12} md={12}>
                                  <Grid item container xs={12} md={7}>
                                    <Grid item xs={12} md={12}>
                                      <Typography variant='h5' style={{ fontWeight: 'bold' }}>
                                        Online Webinar
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                      <Typography>
                                        Kita kupas tuntas apa saja tips gacor dan yang harus dihindari saat melakukan
                                        interview!
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={12} md={4} mt={5} ml={4}>
                                    <Button
                                      href='/register/event/Kalian capek gagal interview terus?'
                                      // style={{ color: 'white', marginRight: 10 }}
                                      variant='contained'
                                    >
                                      RSV Here
                                    </Button>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Grid>
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
                              November 4
                            </Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Time:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>10:00 am - 11:30 am</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Cost:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>Free</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Website
                            </Typography>
                          </Box>
                          <Box>
                            <Typography>
                              <Link
                                style={{ textDecoration: 'none' }}
                                href={'/event/Kaliancapek gagal interview terus?'}
                              >
                                https://profesea.id/event/Kalian%20capek%20gagal%20interview%20terus/
                              </Link>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                            VENUE
                          </Typography>
                          <Box>
                            <Typography>Online</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box>
                            <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                              ORGANIZER
                            </Typography>
                          </Box>

                          <Box>
                            <Typography>Profesea</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              Phone
                            </Typography>
                          </Box>
                          <Box>
                            <Typography> +6282328822292</Typography>
                          </Box>
                          <Box>
                            <Typography fontSize={18} style={{ fontWeight: '600' }}>
                              {' '}
                              Email
                            </Typography>
                          </Box>
                          <Box>
                            <Typography> hello@profesea.id</Typography>
                          </Box>
                          <Box>
                            <Link style={{ textDecoration: 'none' }} href={'/'}>
                              <Typography> View Organizer Website</Typography>
                            </Link>
                          </Box>
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

 
