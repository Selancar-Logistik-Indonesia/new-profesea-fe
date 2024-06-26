import React, { useState, useEffect } from 'react'
import {
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Tab,
  Typography,
  useMediaQuery,
  TextField,
  Pagination,
  Stack
} from '@mui/material'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import DialogRemoveConnection from './DialogRemoveConnection'
import ConnectButton from 'src/layouts/components/ConnectButton'
import Link from 'next/link'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { useTheme } from '@mui/material/styles'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'

function ProfileConnection() {
  const [value, setValue] = useState('1')
  const [page, setPage] = React.useState(1)
  const [pageSuggest, setPageSuggest] = React.useState(1)
  const [showRemoveConnectionDialog, setShowRemoveConnectionDialog] = useState(false)
  const [connections, setConnections] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [totalConnection, setTotalConnection] = useState(0)
  const [totalSuggestions, setTotalSuggestions] = useState(0)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<IUser>()

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const iduser: any = user.id

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleSelectedUser = (selectedUser: IUser) => {
    setSelectedUser(selectedUser)
    setShowRemoveConnectionDialog(!showRemoveConnectionDialog)
  }

  const getConnections = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/connected-profile/', {
      user_id: iduser,
      page: page,
      take: 10,
      search: search
    }).then(response => {
      const itemData = response.data.data
      setConnections(itemData)
      setTotalConnection(response.data.total)
    })
  }

  const getUserSuggestions = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/suggested-friend/', {
      // user_id=' + iduser + '&page=1&take=10'
      user_id: iduser,
      page: pageSuggest,
      take: 10
    }).then(response => {
      const itemData = response.data.data
      setSuggestions(itemData)
      setTotalSuggestions(response.data.total)
    })
  }

  const handleSearch = () => {
    getConnections()
  }

  useEffect(() => {
    getConnections()
    getUserSuggestions()
  }, [])

  useEffect(() => {
    getConnections()
    getUserSuggestions()
  }, [page, pageSuggest])

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
                                {totalConnection} Connection
                                <Button
                                  size='small'
                                  variant='contained'
                                  sx={{ float: 'right', fontSize: 14 }}
                                  onClick={() => handleSearch()}
                                >
                                  Search
                                </Button>
                                <TextField
                                  value={search}
                                  onChange={e => setSearch(e.target.value)}
                                  type='text'
                                  name='search'
                                  id='search'
                                  variant='outlined'
                                  size='small'
                                  placeholder='search ...'
                                  sx={{ float: 'right', margin: '0 20px 0 0', fontSize: 14 }}
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
                                          src={item?.friend?.photo || '/static/images/avatar/1.jpg'}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={
                                          <React.Fragment>
                                            <Typography
                                              sx={{ display: 'inline', fontSize: 16, fontWeight: 'bold' }}
                                              component='span'
                                              variant='body2'
                                              color='text.primary'
                                            >
                                              <Link href={'/profile/' + item.friend.id + '/' + item.friend.username}>
                                                {item?.friend?.name}
                                              </Link>
                                            </Typography>
                                          </React.Fragment>
                                        }
                                        secondary={
                                          <React.Fragment>
                                            <Typography
                                              sx={{ display: 'inline', fontSize: 14 }}
                                              component='span'
                                              variant='body2'
                                              color='text.primary'
                                            >
                                              {item?.field_preference?.role_type?.name || 'No ranks'}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                      />
                                      <Box>
                                        <Button variant='contained' size='small' sx={{ marginRight: 2, fontSize: 14 }}>
                                          Message
                                        </Button>
                                        <Button
                                          variant='outlined'
                                          color='error'
                                          sx={{ marginLeft: 2, marginRight: -4, fontSize: 14 }}
                                          size='small'
                                          onClick={() => {
                                            handleSelectedUser(item?.friend)
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </Box>
                                    </ListItem>
                                    <Divider variant='inset' component='hr' />
                                  </Box>
                                ))}
                              </List>
                              <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={0}>
                                <Pagination
                                  count={Math.ceil(totalConnection / 10)}
                                  onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                                    setPage(value)
                                  }}
                                  variant='outlined'
                                  shape='rounded'
                                />
                              </Stack>
                            </TabPanel>
                            <TabPanel value='2'>
                              <Typography variant='h6'>{totalSuggestions} Suggestions</Typography>
                              <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '20px 0 0 0' }}>
                                {suggestions.map((item: any, index) => (
                                  <Box key={index}>
                                    <ListItem alignItems='flex-start'>
                                      <ListItemAvatar>
                                        <Avatar
                                          style={{ height: 64, width: 64 }}
                                          src={item?.photo || '/static/images/avatar/1.jpg'}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={
                                          <Typography
                                            sx={{ display: 'inline', fontSize: 16, fontWeight: 'bold' }}
                                            component='span'
                                            variant='body2'
                                            color='text.primary'
                                          >
                                            <Link href={'/profile/' + item.id + '/' + item.username}>{item?.name}</Link>
                                          </Typography>
                                        }
                                        secondary={
                                          <React.Fragment>
                                            <Typography
                                              sx={{ display: 'inline', fontSize: 14 }}
                                              component='span'
                                              variant='body2'
                                              color='text.primary'
                                            >
                                              {item?.field_preference?.role_type?.name || 'No ranks'}
                                            </Typography>
                                          </React.Fragment>
                                        }
                                      />
                                      <Box>
                                        <ConnectButton user={item} />
                                      </Box>
                                    </ListItem>
                                    <Divider variant='inset' component='hr' />
                                  </Box>
                                ))}
                              </List>
                              <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={0}>
                                <Pagination
                                  count={Math.ceil(totalSuggestions / 10)}
                                  onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                                    setPageSuggest(value)
                                  }}
                                  variant='outlined'
                                  shape='rounded'
                                />
                              </Stack>
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
      <DialogRemoveConnection
        selectedItem={selectedUser}
        visible={showRemoveConnectionDialog}
        onCloseClick={() => setShowRemoveConnectionDialog(!showRemoveConnectionDialog)}
        loadConnection={getConnections}
      />
    </Box>
  )
}

ProfileConnection.acl = {
  action: 'read',
  subject: 'home'
}

export default ProfileConnection
