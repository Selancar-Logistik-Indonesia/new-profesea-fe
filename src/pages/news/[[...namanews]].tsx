// ** React Imports
import React , { ReactNode, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';

// ** MUI Components
import Box  from '@mui/material/Box'  
import {   Card, CardContent, CardMedia, Typography } from '@mui/material'

// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from '@mui/material'  
 
import Recomended from './Recomended'
// import { Icon } from '@iconify/react'
// import Profile from 'src/layouts/components/Profile'
// import Feed from 'src/layouts/components/Feed'
import { HttpClient } from 'src/services'
import LandingPageLayout from 'src/@core/layouts/LandingPageLayout';
import { NewsProvider } from 'src/context/NewsContext';
import { useNews } from 'src/hooks/useNews';
import { useRouter } from 'next/router';

const Thread = () => {
  return (
    <NewsProvider>
      <ThreadApp />
    </NewsProvider>
  )
}

const ThreadApp = () => { 
  const { fetchComments, fetchNews } = useNews();
  // const searchParams = useSearchParams()
  // const params = searchsearchParams.get('id')
  // const windowUrl = window.location.search
  // const params = new URLSearchParams(windowUrl)
   // const [userDetail, setUserDetail] = useState<IUser | null>(null)
  const [threadDetail, setthreadDetail] = useState<any>([])
  const router = useRouter()
  const { namanews } = router.query as { namanews: string }
  const firstload = async () => {
  //  if (namanews != undefined) {
    
      const response = await HttpClient.get('/news/testingnews')
       const detail = response.data.news

       setthreadDetail(detail[0])      
    //  await HttpClient.get('/news/testingnews').then(response => {
    //    const detail = response.data.news

    //    setthreadDetail(detail[0])
    //  })
  //  }
   

    fetchComments({ take: 5, replyable_id: 1, replyable_type: 'news' })
    fetchNews({ take: 5 })
  
   

}
firstload()
 
 useEffect(() => {
   firstload()
 }, [namanews]) 
    
  return (
    <Box sx={{ mt: 5, ml: 3 }}>
      <title>My Page Title</title>
      <meta name='description' content={`${namanews}`} />
      <meta name='descriptionz' content={`${threadDetail?.title}`} />
      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        fontSize={18}
                        style={{ color: '#000' }}
                        fontWeight='600'
                        sx={{ ml: 2, mb: 2, color: '#424242', textTransform: 'uppercase' }}
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
                        style={{ objectFit: 'contain' }}
                      />
                    </Grid>
                    <Grid item container xs={12} justifyContent={'flex'}>
                      <Typography variant='body1' sx={{ p: 4, color: '#424242', fontWeight: 300 }}>
                        {threadDetail.posting_at}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'flex'}>
                      <Typography variant='body1' sx={{ p: 4 }} fontSize={16} style={{ color: '#000' }}>
                        {ReactHtmlParser(`${threadDetail?.content}`)}
                      </Typography>
                    </Grid>
                    {/* <Grid item container xs={12} justifyContent={'flex'}>
                      <CommentForm  user_id={user?.id} thread_id={threadDetail?.id} />
                    </Grid> */}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item xs={12}>
              <Commented replyable_id={searchParams.get('id')}></Commented>
            </Grid> */}
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

 
