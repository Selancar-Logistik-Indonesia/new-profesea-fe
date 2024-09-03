// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Avatar, Card, CardContent, CircularProgress } from '@mui/material'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import Moment from 'moment'
import { useEffect } from 'react'
import ThreadContext from 'src/context/ThreadContext'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useThread } from 'src/hooks/useThread'
import Link from 'next/link'
import { toLinkCase } from 'src/utils/helpers'

export type ParamMain = {
  name: string
  title: any
  user: any
  content: any
  date: string
  replies: string
  replies_count: string
  created_at: string
}

const renderList = (arr: ParamMain[]) => {
  if (arr && arr.length) {
    const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

    return arr.map((item, index) => {
      return (
        <Grid item xs={12} key={index}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardContent>
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
                    alignContent: 'center'
                  }}
                  mt={-5}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                    <Avatar
                      src={item.user?.photo ? item.user?.photo : user?.photo}
                      alt='profile-picture'
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                    marginTop={3}
                  >
                    <Typography sx={{ fontWeight: '600', color: 'text.primary', mb: 1 }} fontSize={14}>
                      {item.user?.name ? item.user?.name : user?.name}
                    </Typography>
                    <Grid container direction='row' alignItems='center' spacing={4}>
                      <Grid item>
                        <Typography sx={{ color: 'text.secondary', mb: 1, fontSize: 9 }}>
                          {Moment(item.created_at).format('DD/MM/YYYY HH:MM:SS')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Link>
              <Box height={45} sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                <Typography sx={{ fontWeight: '400', color: 'text.primary', mb: 1 }} fontSize={14}>
                  {item?.content}
                </Typography>
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

const Commented = (props: any) => {
  const { fetchComments, hasNextPage, totalComments } = useThread()

  useEffect(() => {}, [hasNextPage])

  return (
    <ThreadContext.Consumer>
      {({ comments, onLoading }) => {
        if (onLoading) {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress sx={{ mt: 20 }} />
            </Box>
          )
        }

        return (
          <Box style={{ height: 'fit-content' }}>
            <InfiniteScroll
              style={{ overflow: 'visible' }}
              dataLength={totalComments}
              next={() => fetchComments({ take: 5, replyable_id: props.replyable_id, replyable_type: 'thread' })}
              hasMore={hasNextPage}
              loader={<CircularProgress sx={{ mt: 20, alignItems: 'center', justifyContent: 'center' }} />}
            >
              <Grid container spacing={2}>
                {renderList(comments)}
              </Grid>
            </InfiniteScroll>
          </Box>
        )
      }}
    </ThreadContext.Consumer>
  )
}

export default Commented
