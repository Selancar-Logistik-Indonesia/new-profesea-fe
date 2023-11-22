import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import Head from "next/head"
import Recomended from "src/pages/news/Recomended"
import ReactHtmlParser from 'react-html-parser'
 
 
interface Props {
  threadDetail: any
}
 const DetailNews = (props: Props) => {
  const { threadDetail } = props

  return (
    <>
      <Head>
        <meta name='description' content={`${threadDetail.title}`} />
        <meta charSet='utf-8' />
        <title>My Title</title>
        <link rel='canonical' href='http://mysite.com/example' />
      </Head>

      <Box sx={{ mt: 5, ml: 3 }}>
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
    </>
  )
}

export default DetailNews
