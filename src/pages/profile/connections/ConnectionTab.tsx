import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack
} from '@mui/material'

import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import DialogRemoveConnection from './DialogRemoveConnection'

export default function ConnectionTab(props: any) {
  const [page, setPage] = React.useState(1)
  const [connections, setConnections] = useState([])
  const [totalConnection, setTotalConnection] = useState(0)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [showRemoveConnectionDialog, setShowRemoveConnectionDialog] = useState(false)

  const handleSelectedUser = (selectedUser: IUser) => {
    setSelectedUser(selectedUser)
    setShowRemoveConnectionDialog(!showRemoveConnectionDialog)
  }

  const getConnections = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/connected-profile/', {
      user_id: props.iduser,
      page: page,
      take: 10,
      search: search
    }).then(response => {
      const itemData = response.data.data
      setConnections(itemData)
      setTotalConnection(response.data.total)
    })
  }

  const handleSearch = () => {
    getConnections()
  }

  useEffect(() => {
    getConnections()
  }, [])

  useEffect(() => {
    getConnections()
  }, [page])

  return (
    <>
      <Typography variant='h6'>
        {totalConnection} Connection
        <Button size='small' variant='contained' sx={{ float: 'right', fontSize: 14 }} onClick={() => handleSearch()}>
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
                <Avatar style={{ height: 64, width: 64 }} src={item?.friend?.photo || '/static/images/avatar/1.jpg'} />
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
                      <Link href={'/profile/' + item.friend.id + '/' + item.friend.username}>{item?.friend?.name}</Link>
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
      <DialogRemoveConnection
        selectedItem={selectedUser}
        visible={showRemoveConnectionDialog}
        onCloseClick={() => setShowRemoveConnectionDialog(!showRemoveConnectionDialog)}
        loadConnection={getConnections}
      />
    </>
  )
}
