import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack
} from '@mui/material'
import DialogAcceptConfirmation from './DialogAcceptConfirmation'
import DialogDeclineConfirmation from './DialogDeclineConfirmation'

import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

import style from '../../../../styles/css/ConnectionList.module.css'

export default function Request(props: any) {
  const [pageRequest, setPageRequest] = React.useState(1)
  const [requests, setRequests] = useState([])
  const [totalRequests, setTotalRequests] = useState(0)

  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false)
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false)
  const [selectedUser, setSelectedUser] = useState()

  const getUserRequest = () => {
    HttpClient.get(AppConfig.baseUrl + '/user/friend-request/', {
      // user_id=' + iduser + '&page=1&take=10'
      user_id: props.iduser,
      page: pageRequest,
      take: 10
    }).then(response => {
      const itemData = response.data.data
      setRequests(itemData)
      setTotalRequests(response.data.total)
    })
  }

  useEffect(() => {
    getUserRequest()
  }, [])

  useEffect(() => {
    getUserRequest()
  }, [pageRequest])

  return (
    <>
      <Typography variant='h6'>{totalRequests} Request</Typography>
      {requests.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '20px 0 0 0' }}>
          {requests.map((item: any, index) => (
            <Box key={index} className={style['list-box']}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    style={{ height: 64, width: 64 }}
                    src={item?.friend?.photo || '/static/images/avatar/1.jpg'}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={style['list-item-text']}
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
                <Box className={style['button-list-connection']}>
                  <Button
                    variant='outlined'
                    size='small'
                    color='secondary'
                    sx={{ marginRight: 2, fontSize: 14 }}
                    onClick={() => {
                      setSelectedUser(item?.friend)
                      setShowDeclineConfirm(!showDeclineConfirm)
                    }}
                  >
                    Decline
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    sx={{ marginRight: 2, fontSize: 14 }}
                    onClick={() => {
                      setSelectedUser(item?.friend)
                      setShowAcceptConfirm(!showAcceptConfirm)
                    }}
                  >
                    Accept
                  </Button>
                </Box>
              </ListItem>
              <Divider variant='inset' component='hr' />
            </Box>
          ))}
        </List>
      ) : (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <img src='/images/no-connection-request.png' />
          <p>You have no connection request </p>
        </div>
      )}

      <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={0}>
        <Pagination
          count={Math.ceil(totalRequests / 10)}
          onChange={(e: React.ChangeEvent<unknown>, value: number) => {
            setPageRequest(value)
          }}
          variant='outlined'
          shape='rounded'
        />
      </Stack>
      <DialogAcceptConfirmation
        visible={showAcceptConfirm}
        user_id={props.iduser}
        selectedItem={selectedUser}
        loadRequest={getUserRequest}
        onCloseClick={() => setShowAcceptConfirm(!showAcceptConfirm)}
      />
      <DialogDeclineConfirmation
        visible={showDeclineConfirm}
        user_id={props.iduser}
        selectedItem={selectedUser}
        loadRequest={getUserRequest}
        onCloseClick={() => setShowDeclineConfirm(!showDeclineConfirm)}
      />
    </>
  )
}
