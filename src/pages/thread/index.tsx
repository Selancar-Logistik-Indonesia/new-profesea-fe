// ** React Imports
import React , { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';

// ** MUI Components
import Box  from '@mui/material/Box'  
import {   Card, CardContent, Typography } from '@mui/material'

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
import Commented from './Commented';

const Thread = () => { 
   const windowUrl = window.location.search
   const params = new URLSearchParams(windowUrl)
const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
// const [userDetail, setUserDetail] = useState<IUser | null>(null)
const [listComment, setlistComment] = useState<any>([])
const [listThread, setlistThread] = useState<any>([])
const [threadDetail, setthreadDetail] = useState<any>([])
 
const firstload = () => {

  HttpClient.get('/thread/' + params.get('id')).then(response => {
    const detail = response.data.thread  
    setthreadDetail(detail)
  })
  HttpClient.get(`/thread/replies?page=1&take=10&replyable_id=${ params.get('id')}&replyable_type=thread_reply`).then(response => {
    const replies = response.data.replies.data  
    setlistComment(replies)
  })
  HttpClient.get('/thread', { page: 1, take: 15, search: '' })
  .then(response => {
    const code = response.data.threads.data
    setlistThread(code)
  }).catch(() => alert("Something went wrong"));
}
 useEffect(() => { 
   firstload()
 }, []) 
    
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item container spacing={6}>
          <Grid item md={9} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ mb: 7 }}>
                      <Grid item container xs={12} justifyContent={'center'}>
                        <Typography
                          variant='body2'
                          sx={{ mb: 4, color: '#424242', textTransform: 'uppercase', fontWeight: 600 }}
                        >
                          {listThread?.title}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12} justifyContent={'flex'}>
                        <Typography
                          variant='body1'
                          sx={{ mb: 4, color: '#424242', fontWeight: 300 }}
                        >
                          {ReactHtmlParser(`${threadDetail?.content}`)}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12} justifyContent={'flex'}>
                        <CommentForm  user_id={user?.id} thread_id={threadDetail?.id} />
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Commented paramcomment={listComment}></Commented>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Recomended paramcomment={listThread}></Recomended>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
 

Thread.acl = {
  action: 'read',
  subject: 'home'
};
export default Thread
