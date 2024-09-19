// ** React Imports
import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Typography } from '@mui/material'

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
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import CommentForm from './CommentForm'
import Commented from './Commented'
import { ThreadProvider } from 'src/context/ThreadContext'
import { useThread } from 'src/hooks/useThread'
import moment from 'moment'

const Thread = () => {
  return (
    <ThreadProvider>
      <ThreadApp />
    </ThreadProvider>
  )
}

const ThreadApp = () => {
  const { fetchComments, fetchThreads } = useThread()
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  // const [userDetail, setUserDetail] = useState<IUser | null>(null)
  const [threadDetail, setthreadDetail] = useState<any>([])

  const firstload = () => {
    HttpClient.get('/thread/' + params.get('id')).then(response => {
      const detail = response.data.thread
      setthreadDetail(detail)
    })

    fetchComments({ take: 5, replyable_id: params.get('id'), replyable_type: 'thread' })
    fetchThreads({ take: 5 })
  }
  useEffect(() => {
    firstload()
  }, [params.get('id')])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        variant='body2'
                        sx={{
                          ml: 4,
                          mb: 1,
                          color: '#000000',
                          textTransform: 'uppercase',
                          fontSize: '12px',
                          fontWeight: '400'
                        }}
                      >
                        {threadDetail?.user?.name}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        variant='body2'
                        sx={{
                          ml: 4,
                          mb: 1,
                          color: '#000000',
                          textTransform: 'uppercase',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {threadDetail?.forum?.name} {'-'}{' '}
                        {moment(threadDetail?.forum?.updated_at).format('DD/MM/YYYY HH:MM:SS')}
                      </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent={'left'}>
                      <Typography
                        variant='body2'
                        sx={{
                          ml: 4,
                          mb: 1,
                          color: '#000000',
                          textTransform: 'uppercase',
                          fontSize: '18px',
                          fontWeight: '600'
                        }}
                      >
                        {threadDetail?.title}
                      </Typography>
                    </Grid>

                    <Grid item container xs={12} justifyContent={'flex'}>
                      <Typography
                        variant='body2'
                        sx={{
                          p: 4,
                          color: '#000000',
                          fontWeight: 300,
                          fontSize: 14,
                          fontFamily: 'Outfit',
                          alignContent: 'justify'
                        }}
                      >
                        <div style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: '300', color: '#0000000' }}>
                          {ReactHtmlParser(`${threadDetail?.content}`)}
                        </div>
                      </Typography>
                    </Grid>

                    <Grid item container xs={12} justifyContent={'flex'}>
                      <CommentForm user_id={user?.id} thread_id={threadDetail?.id} />
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Commented replyable_id={params.get('id')}></Commented>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          <Recomended />
        </Grid>
      </Grid>
    </Box>
  )
}

Thread.acl = {
  action: 'read',
  subject: 'home'
}
export default Thread
