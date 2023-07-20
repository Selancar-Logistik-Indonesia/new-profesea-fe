// ** React Imports
import React , { useEffect, useState } from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {  Card, CardContent, Typography, useMediaQuery   } from '@mui/material'

import {  useTheme } from '@mui/material/styles'
// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'   
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user' 
import ListThread from './ListThread'
  
const Community = () => { 
  
const theme = useTheme() 
const hidden = useMediaQuery(theme.breakpoints.down('md')) 
const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
// const [userDetail, setUserDetail] = useState<IUser | null>(null)
const [listThread, setlistThread] = useState<any>([])
 
const firstload = () => {
  HttpClient.get(AppConfig.baseUrl + '/thread?page=1&take=10&search=').then(response => {
    const code = response.data.threads.data 
    
    setlistThread(code)
  })
  // HttpClient.get(AppConfig.baseUrl + '/user/' + user.id).then(response => {
  //   const user = response.data.user as IUser
  //   setUserDetail(user)
  // })
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
          md={12}
          sx={
            !hidden
              ? {
                  alignItems: 'stretch'
                }
              : {}
          }
        >
          <Grid container spacing={6}>
            <Grid item lg={3} md={3} xs={12}>
              <Profile datauser={user} />
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
              <Feed></Feed>
            </Grid>
            <Grid item lg={9} md={9} xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <ListThread paramcomment={listThread}></ListThread>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <SideAd/>  */}
      </Grid>
    </Box>
  )
}
 

Community.acl = {
  action: 'read',
  subject: 'home'
};
export default Community
