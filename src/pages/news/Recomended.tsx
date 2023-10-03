// ** MUI Components
// import ReactHtmlParser from 'react-html-parser'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid' 
import Typography from '@mui/material/Typography' 
import {   Card, CardContent, Link } from '@mui/material'
import Moment from 'moment'
 import ShareArea from './ShareArea'
import { useNews } from 'src/hooks/useNews'
import INews from 'src/contract/models/news'
 
const renderList = (arr: INews[]) => {
  if (arr && arr.length) {

    return arr.map((item, index) => {
 
      return (
        <Grid item xs={12} key={index}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Link style={{ textDecoration: 'none' }} href={'/profile/?username=' }>
                <Box
                  height={65}
                  sx={{
                      display: 'flex',
                      alignContent: 'center',
                  }}
                  mt={-5}
                  >
                  {/* <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                      <Avatar src={item.user?.photo} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                  </Box> */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
                      <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1 }} fontSize={14}>
                          {/* {item.user?.name} */}
                      </Typography>
                      <Grid container direction="row" alignItems="center" spacing={4}>
                        {/* <Grid item>                              
                          <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={10}>
                          {item.forum
                        ? `${item.forum.name.toString().charAt(0).toUpperCase() + item.forum.name.toString().slice(1)}`
                        : ''}
                          </Typography>
                        </Grid> */}
                        <Grid item> 
                          <Typography sx={{ color: 'text.secondary', mb: 1, fontSize:9 }}>
                            {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                          </Typography>
                        </Grid>
                      </Grid>
                  </Box>
                </Box>
              </Link>
              <Link style={{ textDecoration: 'none' }} href={'/thread/?id=' + item.id}>
                <Box   height={120} sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} >
                    <Typography sx={{ color: '#0a66c2', textTransform: 'uppercase' }} fontWeight={600} fontSize={14}>
                      {item.title
                        ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                        : ''}
                    </Typography>
                    <Typography sx={{ fontWeight: '400', color: 'text.primary', mb: 1 }} fontSize={12}>
                      {/* {ReactHtmlParser(`${item?.snap_content}`)} */}
                    </Typography>
                </Box>
              </Link>               
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-end'] }} marginTop={3} >
                <Grid container direction="row" justifyContent="flex-end" spacing={6} >
                  <Grid item xs={8}> 
                        <ShareArea subject={`${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`} url={`/thread/?id=${item.id}`} total={item.replies_count
                              ? `${item.replies_count.toString().charAt(0).toUpperCase() + item.replies_count.toString().slice(1)
                              }`
                              : ''} ></ShareArea>
                      </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  } else {
    return null
  }
}
 

const Recomended = () => { 
  const { newss } = useNews();

  return (
    <Grid container spacing={2}>
      {renderList(newss)}
    </Grid>
  )
}

export default Recomended
