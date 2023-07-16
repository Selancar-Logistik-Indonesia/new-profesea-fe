// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Typography, useMediaQuery } from '@mui/material'

import { useTheme } from '@mui/material/styles'
// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from '@mui/material'
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
  const [userDetail, setUserDetail] = useState<IUser | null>(null)
  const [listThread, setlistThread] = useState<any>([])

  const firstload = () => {
    HttpClient.get(AppConfig.baseUrl + '/thread?page=1&take=10&search=').then(response => {
      const code = response.data.threads.data

      setlistThread(code)
    })
    HttpClient.get(AppConfig.baseUrl + '/user/' + user.id).then(response => {
      const user = response.data.user as IUser
      setUserDetail(user)
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
          <Grid container spacing={6} >
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
                          Total Conected :250
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <br></br>
              <Feed />
            </Grid>
            <Grid item lg={8} md={7} xs={12}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <ListThread paramcomment={listThread} ></ListThread>
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


Community.acl = {
  action: 'read',
  subject: 'home'
};
export default Community
