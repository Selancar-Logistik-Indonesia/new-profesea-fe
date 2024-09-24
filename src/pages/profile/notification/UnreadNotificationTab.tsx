import React from 'react'
import { Box, List, CircularProgress } from '@mui/material'

import NotificationItem from './NotificationItem'

export default function UnreadNotificationTab(props: any) {
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '0 0 0 0' }}>
        <>
          {props.onLoading && (
            <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </>
        <>
          {!props.onLoading && props.notifies.length == 0 && (
            <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src='/images/no-notification.png' />
              <div style={{ margin: '20px 0 0 0' }}>You have no notification.</div>
            </Box>
          )}
        </>
        <>
          {!props.onLoading &&
            props.notifies?.map((item: any, index: number) => (
              <NotificationItem item={item} key={index} getNotifications={props.getNotifications} />
            ))}
        </>
      </List>
    </>
  )
}
