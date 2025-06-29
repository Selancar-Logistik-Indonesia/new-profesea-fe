import React, { ReactNode, useEffect, useState } from 'react'
import { Button, Box, Grid, Card, CardContent, Tab } from '@mui/material'
import { BreadcrumbsNotificationProvider, useBreadcrumbsNotification } from 'src/context/BreadcrumbsNotificationContext'
import UserLayout from 'src/layouts/UserLayout'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import SideAd from 'src/views/banner-ad/sidead'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import style from './../../../styles/css/NotificationPage.module.css'
import AllNotificationTab from './AllNotificationTab'
import UnreadNotificationTab from './UnreadNotificationTab'

import { NotificationsTypeProps } from './NotificationItem'
import { HttpClient } from 'src/services'
import INotification from 'src/contract/models/notification'
import buildNotifies from './buildNotifies'

import DialogMarkConfirmation from './DialogMarkConfirmation'
import BreadcrumbsNotification from './BreadcrumbsNotification'

function Notification() {
  const { dispatch } = useBreadcrumbsNotification()
  const [tab, setTab] = useState('1')
  const [showMarkConfirm, setShowMarkConfirm] = useState(false)
  const [notifies, setNotifies] = useState<NotificationsTypeProps[]>([])
  const [unreadNotifies, setUnreadNotifies] = useState<NotificationsTypeProps[]>([])
  const [onLoading, setOnLoading] = useState<boolean>(false)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  const getNotifications = async () => {
    setOnLoading(true)
    const response = await HttpClient.get('/user/notification', {
      page: 1,
      take: 35
    })
    console.log(response.data)

    if (response.status != 200) {
      alert(response.data?.message ?? 'Unknow error')
      setOnLoading(false)

      return
    }

    const { notifications } = response.data as { notifications: { data: INotification[] } }
    const notifies: NotificationsTypeProps[] = notifications.data.map(buildNotifies)
    setOnLoading(false)
    setNotifies(notifies)
  }

  const getUnreadNotifications = async () => {
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
    const unreadNotifies = notifications.data.map(buildNotifies)
    setOnLoading(false)
    setUnreadNotifies(unreadNotifies)
  }

  useEffect(() => {
    getNotifications()
    getUnreadNotifications()
  }, [])

  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMBS',
      payload: [
        {
          name: 'Homepage',
          path: '/'
        },
        {
          name: 'Notifications',
          path: '/notifications'
        }
      ]
    })
  }, [dispatch])

  return (
    <Box sx={{ px: { xs: '24px', md: '120px' } }}>
      <Grid
        sx={{
          my: '24px',
          mx: '3rem'
        }}
      >
        <BreadcrumbsNotification />
      </Grid>
      <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '2rem' }}>
        <Grid item container lg={9} md={9} xs={12}>
          <Grid item xs={12}>
            <Card
              sx={{
                border: 0,
                boxShadow: 6,
                borderRadius: 12,
                color: 'common.white',
                backgroundColor: '#FFFFFF'
              }}
            >
              <CardContent sx={{ padding: '24px' }}>
                <Box sx={{ mb: 0 }}>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <div style={{ display: 'inline', float: 'left', marginBottom: '24px' }}>
                      <h1 className={style['notification-title']}> Notifications </h1>
                      <h2 className={style['notification-subtitle']}>
                        You have <b className={style['primary-color']}>{unreadNotifies.length} notifications</b> today
                      </h2>
                    </div>

                    <Button variant='contained' className={style['btn-mark']} onClick={() => setShowMarkConfirm(true)}>
                      <DoneAllIcon style={{ width: 16, height: 16, margin: '0 10px 0 0' }} />
                      <span>Mark all as read</span>
                    </Button>
                    <div style={{ clear: 'both' }}></div>
                    <TabContext value={tab}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList variant='fullWidth' className={style['tablist']} onChange={handleChangeTab}>
                          <Tab
                            className={style['tablist-item']}
                            label='All Notification'
                            value='1'
                            sx={{
                              textTransform: 'none',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}
                          />
                          <Tab
                            className={style['tablist-item']}
                            label='Unread'
                            value='2'
                            sx={{
                              textTransform: 'none',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value='1' className={style['tabpanel']}>
                        <AllNotificationTab
                          notifies={notifies}
                          getNotifications={getNotifications}
                          onLoading={onLoading}
                        />
                      </TabPanel>
                      <TabPanel value='2' className={style['tabpanel']}>
                        <UnreadNotificationTab
                          notifies={unreadNotifies}
                          getNotifications={getUnreadNotifications}
                          onLoading={onLoading}
                        />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <SideAd adslocation='notifications-page' />
        </Grid>
      </Grid>
      <DialogMarkConfirmation
        visible={showMarkConfirm}
        onCloseClick={() => setShowMarkConfirm(!showMarkConfirm)}
        loadNotifications={getNotifications}
        loadUnreadNotifications={getUnreadNotifications}
      />
    </Box>
  )
}

Notification.getLayout = (page: ReactNode) => (
  <UserLayout>
    <BreadcrumbsNotificationProvider>{page}</BreadcrumbsNotificationProvider>
  </UserLayout>
)
Notification.acl = {
  action: 'read',
  subject: 'home'
}

export default Notification
