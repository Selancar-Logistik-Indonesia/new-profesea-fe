import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack
} from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
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
      console.log(itemData)
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
      <Typography variant='subtitle1' sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        Connection Request{' '}
      </Typography>
      <Typography>
        You have{' '}
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#32487A' }}>
          {totalRequests} Connection Requests
        </span>
      </Typography>
      {requests.length > 0 ? (
        <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '24px 0 0 0' }}>
          {requests.map((item: any, index) => (
            <>
              <Box key={index} className={style['list-box']}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      style={{ height: 76, width: 76 }}
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
                          sx={{ fontSize: 14, mb: '6px', fontWeight: '300' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {item?.field_preference?.role_type?.name || 'No ranks'}
                          <CircleIcon sx={{ fontSize: 4, m: '0 5px 2px 5px', color: '#525252' }} />
                          {item?.field_preference?.job_category?.name || ''} <br />
                        </Typography>
                        <Typography
                          sx={{ display: 'block', fontSize: 14, fontWeight: '300', color: '#868686' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          {item?.address ? item?.address?.city?.city_name + ', ' + item?.address?.country?.name : ''}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Box className={style['button-list-connection']}>
                    <Button
                      variant='outlined'
                      size='small'
                      color='secondary'
                      sx={{ marginRight: '16px', fontSize: 14, textTransform: 'none', fontWeight: 300, p: '8px 12px' }}
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
                      sx={{ marginRight: 2, fontSize: 14, textTransform: 'none', fontWeight: 300, p: '8px 12px' }}
                      onClick={() => {
                        setSelectedUser(item?.friend)
                        setShowAcceptConfirm(!showAcceptConfirm)
                      }}
                    >
                      Accept
                    </Button>
                  </Box>
                </ListItem>
                <Divider variant='inset' component='hr' sx={{ ml: '10px' }} />
              </Box>
            </>
          ))}
        </List>
      ) : (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <img src='/images/no-connection-request.png' />
          <p style={{ fontSize: 14, fontWeight: 300, color: '#868686' }}>You have no connection request </p>
        </div>
      )}

      <Grid container sx={{ mt: 10 }}>
        <Grid item>
          <Typography sx={{ fontSize: 14, fontWeight: '300' }}>
            Showing {requests.length} out of {totalRequests}
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Stack direction='row' justifyContent='center' alignItems='center' spacing={0}>
            <Pagination
              color='primary'
              count={Math.ceil(totalRequests / 10)}
              onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                setPageRequest(value)
              }}
              shape='rounded'
            />
          </Stack>
        </Grid>
      </Grid>
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
