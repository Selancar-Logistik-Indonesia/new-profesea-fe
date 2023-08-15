import ReactHtmlParser from 'react-html-parser'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Card, CardContent, CircularProgress, Link } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Moment from 'moment'
import IThread from 'src/contract/models/thread'
import { useThread } from 'src/hooks/useThread'
import { useEffect } from 'react'
import ThreadContext from 'src/context/ThreadContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import ShareArea from 'src/pages/thread/ShareArea'

const renderList = (arr: IThread[]) => {
  if (arr && arr.length) {
    
    return arr.map((item, index) => {

      return (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Link style={{ textDecoration: 'none' }} href={'/thread?id=' + item.id}>
                  <Box
                    height={65}
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                    }}
                    mt={-5}
                    >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                        <Avatar src={item.user?.photo} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
                        <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1 }} fontSize={14}>
                            {item.user?.name}
                        </Typography>
                        <Grid container direction="row" alignItems="center" spacing={4}>
                          <Grid item>                              
                            <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                            {item.forum
                          ? `${item.forum.name.toString().charAt(0).toUpperCase() + item.forum.name.toString().slice(1)}`
                          : ''}
                            </Typography>
                          </Grid>
                          <Grid item> 
                            <Typography sx={{ color: 'text.secondary', mb: 1, fontSize:10 }}>
                              {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                            </Typography>
                          </Grid>
                        </Grid>
                    </Box>
                  </Box>
                  <Box   height={120} sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} >
                      <Typography sx={{ color: '#0a66c2', textTransform: 'uppercase' }} fontWeight={600} fontSize={16}>
                        {item.title
                          ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                          : ''}
                      </Typography>
                      <Typography sx={{ fontWeight: '450', color: 'text.primary', mb: 1 }} fontSize={12}>
                        {ReactHtmlParser(`${item?.snap_content}`)}
                      </Typography>
                  </Box>
                </Link>               
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-end'] }} >
                  <Grid container direction="row" justifyContent="flex-end" spacing={6} >
                      <Grid item xs={6}> 
                        <ShareArea subject={`${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`} url={window.location.host + `/thread?id=${item.id}`} total={item.replies_count
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

const ListThreadView = () => {
  const { fetchThreads, hasNextPage, totalThread } = useThread();

  useEffect(() => {
    
  }, [hasNextPage]);

  return (

    <ThreadContext.Consumer>
      {({ threads, onLoading }) => {
        if (onLoading) {
        
          return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress sx={{ mt: 20 }} />
                </Box>
            );
        }
        
        return(
          <InfiniteScroll
              dataLength={totalThread}
              next={() => fetchThreads({ take: 9 })}
              hasMore={hasNextPage}
              loader={(<CircularProgress sx={{ mt: 20 }} />)}>
              <Grid container spacing={2} mt={3}>
                {renderList(threads)}
              </Grid>
          </InfiniteScroll>
        )
      }}
    </ThreadContext.Consumer>
  )
}

export default ListThreadView
