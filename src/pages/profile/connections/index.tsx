import React, { useState } from 'react'
import { Box, Grid, Card, CardContent, Tab, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { useTheme } from '@mui/material/styles'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { useSearchParams } from 'next/navigation'
import { linkToTitleCase, toLinkCase } from 'src/utils/helpers'

function ProfileConnection() {
  const [value, setValue] = useState('1')

  const theme = useTheme()
  const router = useRouter()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const iduser: any = user.id
  //let { username } = router.query as { username: string }
  const params = useSearchParams()
  let username = linkToTitleCase(params.get('username') ?? undefined)

  let url = ''
  let filter = ''
  let filterdoc = ''
  if (!username) {
    url = '/user/' + toLinkCase(iduser)
    username = user.username
  } else {
    url = '/user/?username=' + username
    filter = '&username=' + username
    filterdoc = '?username=' + username
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
          <Grid container spacing={6} sx={{ marginTop: '1px' }}>
            <Grid item lg={3} md={3} xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}></Grid>
            <Grid item container lg={6} md={6} xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                    <CardContent>
                      <Box sx={{ mb: 7 }}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                          <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                                <Tab label='Connections' value='1' />
                                <Tab label='Suggestions' value='2' />
                              </TabList>
                            </Box>
                            <TabPanel value='1'>
                              <Typography variant='h6'> 15 Connection </Typography>
                            </TabPanel>
                            <TabPanel value='2'>
                              <Typography variant='h6'>15 Suggestions</Typography>
                            </TabPanel>
                          </TabContext>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={3} md={3} xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

ProfileConnection.acl = {
  action: 'read',
  subject: 'home'
}

export default ProfileConnection
