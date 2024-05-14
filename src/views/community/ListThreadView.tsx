import ReactHtmlParser from 'react-html-parser'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, CircularProgress, Link, Paper } from '@mui/material'
import Moment from 'moment'
import IThread from 'src/contract/models/thread'
import { useThread } from 'src/hooks/useThread'
import { useEffect } from 'react'
import ThreadContext from 'src/context/ThreadContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import ShareArea from 'src/pages/thread/ShareArea'
import ActionArea from './ActionArea'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { IUser } from 'src/contract/models/user'
import { toLinkCase } from 'src/utils/helpers'

const renderList = (arr: IThread[], user?: number) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Grid item xs={12} md={4} key={index}>
          <Paper sx={{ marginTop: '10px', border: '1px solid #eee' }} elevation={0}>
            <Link
              style={{ textDecoration: 'none' }}
              href={`/${item.user?.role === 'Seafarer' ? 'profile' : 'company'}/${item.user?.id}/${toLinkCase(
                item.user?.username
              )}`}
            >
              <Box
                height={65}
                sx={{
                  display: 'flex',
                  alignContent: 'left'
                }}
                mt={-5}
              >
                <Box sx={{ display: 'flex', justifyContent: 'left' }} mt={7} ml={2} mr={3}>
                  <Avatar src={item.user?.photo} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}
                  marginTop={2}
                >
                  <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1, mt: 5 }} fontSize={14}>
                    {item.user?.name}
                  </Typography>
                  <Grid container direction='row' alignItems='left' spacing={4}>
                    <Grid item>
                      <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                        {item.forum
                          ? `${
                              item.forum.name.toString().charAt(0).toUpperCase() + item.forum.name.toString().slice(1)
                            }`
                          : ''}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 10 }}>
                        {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Link>
            {user == item?.user_id && (
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-end'], marginTop: '-7%' }}>
                <Grid container direction='row' justifyContent='flex-end' spacing={6}>
                  <Grid item xs={6}>
                    <ActionArea url={`/thread/edit/?id=${item.id}`} item={item}></ActionArea>
                  </Grid>
                </Grid>
              </Box>
            )}
            <Link style={{ textDecoration: 'none' }} href={'/thread/?id=' + item.id}>
              <Box
                height={120}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}
                mt={5}
                ml={5}
                mr={5}
              >
                <Typography
                  fontWeight={600}
                  fontSize={16}
                  sx={{
                    color: '#0a66c2',
                    textTransform: 'uppercase',
                    lineClamp: 2, // Set the maximum number of lines you want to display
                    WebkitLineClamp: 2, // For Webkit-based browsers like Safari
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 1
                  }}
                >
                  {item.title
                    ? `${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`
                    : ''}
                </Typography>
                <Typography
                  fontWeight={400}
                  fontSize={12}
                  sx={{
                    lineClamp: 3, // Set the maximum number of lines you want to display
                    WebkitLineClamp: 3, // For Webkit-based browsers like Safari
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    color: 'text.primary',
                    mb: 1
                  }}
                >
                  {ReactHtmlParser(`${item?.snap_content}`)}
                </Typography>
              </Box>
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-end'] }}>
              <Grid container direction='row' justifyContent='flex-end' spacing={6}>
                <Grid item xs={6}>
                  <ShareArea
                    subject={`${item.title.toString().charAt(0).toUpperCase() + item.title.toString().slice(1)}`}
                    url={`/thread/?id=${item.id}`}
                    total={
                      item.replies_count
                        ? `${
                            item.replies_count.toString().charAt(0).toUpperCase() +
                            item.replies_count.toString().slice(1)
                          }`
                        : ''
                    }
                  ></ShareArea>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      )
    })
  } else {
    return null
  }
}

const ListThreadView = () => {
  const { fetchThreads, hasNextPage, totalThread } = useThread()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  useEffect(() => {}, [hasNextPage])
  const getdatapencarian = () => {
    fetchThreads({ take: 9 })
  }

  return (
    <ThreadContext.Consumer>
      {({ threads, onLoading }) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <InfiniteScroll
            dataLength={totalThread}
            next={() => getdatapencarian()}
            hasMore={hasNextPage}
            loader={
              <Typography mt={5} color={'text.secondary'}>
                Loading..
              </Typography>
            }
          >
            <Grid container spacing={2} mt={3}>
              {renderList(threads, user?.id)}
            </Grid>
          </InfiniteScroll>
          // <InfiniteScroll
          //     dataLength={totalThread}
          //     next={() => fetchThreads({ take: 9 })}
          //     hasMore={hasNextPage}
          //     loader={(<CircularProgress sx={{ mt: 20 }} />)}>
          //     <Grid container spacing={2} mt={3}>
          //       {renderList(threads, user?.id)}
          //     </Grid>
          // </InfiniteScroll>
        )
      }}
    </ThreadContext.Consumer>
  )
}

export default ListThreadView
