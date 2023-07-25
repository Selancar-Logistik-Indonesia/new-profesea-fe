// ** React Imports
import React , { useEffect, useState } from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {   Card, CardContent, Typography, useMediaQuery   } from '@mui/material'

import {  useTheme } from '@mui/material/styles'
// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'  
 
import Recomended from './Recomended'
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'  
import CommentForm from './CommentForm'

const Thread = () => { 
   const windowUrl = window.location.search
   const params = new URLSearchParams(windowUrl)
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md')) 
const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
const [userDetail, setUserDetail] = useState<IUser | null>(null)
const [listThread, setlistThread] = useState<any>([])
 
const firstload = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/' + user.id).then(response => {
      const user = response.data.user  
      setUserDetail(user)
    })
  HttpClient.get(AppConfig.baseUrl + '/thread/' + params.get('id')).then(response => {
    const user = response.data.thread  
    setlistThread(user)
  })
}
 useEffect(() => { 
   firstload()
 }, []) 
    
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item container spacing={6}>
          <Grid item md={9} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Card>
                  <CardContent
                    sx={{
                      background: 'rgba(253, 181, 40, 0.05)',
                      border: '1px solid',
                      borderColor: 'rgba(253, 181, 40, 0.50)'
                    }}
                  >
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
                          sx={{ mb: 4, color: '#424242', textTransform: 'uppercase', fontWeight: 300 }}
                        >
                          {listThread?.content}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12} justifyContent={'flex'}>
                        <CommentForm  />
                          
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Recomended paramcomment={listThread}></Recomended>
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
