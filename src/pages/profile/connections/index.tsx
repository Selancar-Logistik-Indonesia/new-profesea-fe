import React, { useState, useEffect } from 'react'
import { Button, Box, Grid, Card, CardContent, Tab, Typography, useMediaQuery, Input, TextField } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useTheme } from '@mui/material/styles'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'

function ProfileConnection() {
  const [value, setValue] = useState('1')
  const [connections, setConnections] = useState([])

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const iduser: any = user.id

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const getConnections = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/connected-profile/?user_id=' + iduser).then(response => {
      const itemData = response.data
      setConnections(itemData)
    })
  }

  useEffect(() => {
    getConnections()
  }, [])

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
                              <Typography variant='h6'>
                                15 Connection
                                <TextField
                                  type='text'
                                  name='search'
                                  id='search'
                                  variant='outlined'
                                  size='small'
                                  placeholder='search ...'
                                  sx={{ float: 'right' }}
                                />
                                <div style={{ clear: 'both' }}></div>
                              </Typography>
                              <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '20px 0 0 0' }}>
                                {connections.map((item: any, index) => (
                                  <Box key={index}>
                                    <ListItem alignItems='flex-start'>
                                      <ListItemAvatar>
                                        <Avatar
                                          style={{ height: 64, width: 64 }}
                                          src={item?.friend_detail?.photo || '/static/images/avatar/1.jpg'}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={item?.friend_detail?.name}
                                        secondary={
                                          <React.Fragment>
                                            <Typography
                                              sx={{ display: 'inline' }}
                                              component='span'
                                              variant='body2'
                                              color='text.primary'
                                            >
                                              {item?.friend_detail?.field_preference?.role_type?.name || 'No ranks'}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                      />
                                      <Box>
                                        <Button variant='contained' sx={{ marginRight: 2 }}>
                                          Message
                                        </Button>
                                        <Button
                                          variant='outlined'
                                          color='error'
                                          sx={{ marginLeft: 2, marginRight: -4 }}
                                        >
                                          Remove
                                        </Button>
                                      </Box>
                                    </ListItem>
                                    <Divider variant='inset' component='hr' />
                                  </Box>
                                ))}
                              </List>
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
