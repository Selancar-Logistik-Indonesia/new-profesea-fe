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
   debugger;
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
        <Grid
          container
          xs={12}
          md={10}
          sx={
            !hidden
              ? {
                  alignItems: 'stretch'
                }
              : {}
          }
        >
          <Grid item container spacing={6}>
            <Grid item lg={4} md={5} xs={12}>
              <Profile datauser={userDetail} />
              <br></br>
              <Grid container>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                        <Icon icon={'arcticons:connect-you'} fontSize={30} />{' '}
                        <Typography variant='body1' sx={{ color: '#424242', fontWeight: 600 }}>
                          {' '}
                          total connected :250
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <br></br>
              <Feed  ></Feed>
            </Grid>
            <Grid item lg={8} md={7} xs={12}>
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
          </Grid>
        </Grid>
        <Grid
          xs={2}
          container
          display={'flex'}
          sx={{ direction: 'row', justifyContent: 'flex-start', alignContent: 'top', alignItems: 'stretch' }}
        >
          <Grid xs={12}>
            <Grid
              xs={12}
              sx={{
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '20px',
                p: 4,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'left',
                marginBottom: '10px',
                marginLeft: '20px',
                height: '197px',
                wrap: 'nowrap'
              }}
            ></Grid>
            <Grid
              xs={12}
              sx={{
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '20px',
                p: 4,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'left',
                marginBottom: '10px',
                marginLeft: '20px',
                height: '197px',
                wrap: 'nowrap'
              }}
            ></Grid>
            <Grid
              xs={12}
              sx={{
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '20px',
                p: 4,
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'left',
                marginBottom: '10px',
                marginLeft: '20px',
                height: '197px',
                wrap: 'nowrap'
              }}
            ></Grid>
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
