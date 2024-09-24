import React, { useState, useEffect } from 'react'
import { Box, List, CircularProgress } from '@mui/material'
import { HttpClient } from 'src/services'

import NotificationItem from './NotificationItem'
import INotification from 'src/contract/models/notification'
// import NotificationType from 'src/contract/types/notification_type'
import NotificationsType from './NotificationsType'
import buildNotifies from './buildNotifies'

export default function UnreadNotificationTab() {
  const [notifies, setNotifies] = useState<NotificationsType[]>([])
  const [onLoading, setOnLoading] = useState<boolean>(false)

  const getNotifications = async () => {
    setOnLoading(true)
    const response = await HttpClient.get('/user/notification/unread/', {
      page: 1,
      take: 35
    })

    if (response.status != 200) {
      alert(response.data?.message ?? 'Unknow error')
      setOnLoading(false)

      return
    }

    const { notifications } = response.data as { notifications: { data: INotification[] } }
    const notifies = notifications.data.map(buildNotifies)
    setOnLoading(false)
    setNotifies(notifies)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', margin: '0 0 0 0' }}>
        <>
          {onLoading && (
            <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </>
        <>{!onLoading && notifies.map((item, index: number) => <NotificationItem item={item} key={index} />)}</>
      </List>
    </>
  )
}
