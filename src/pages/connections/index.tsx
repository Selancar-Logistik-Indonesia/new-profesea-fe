import React, { useEffect, useState, ReactNode } from 'react'
import { Box, Grid, Card, CardContent, Tab } from '@mui/material'
import { BreadcrumbsConnectionProvider, useBreadcrumbsConnection } from 'src/context/BreadcrumbsConnectionContext'
import BreadcrumbsConnection from './BreadcrumbsConnection'
import UserLayout from 'src/layouts/UserLayout'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { IUser } from 'src/contract/models/user'

import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'

import ConnectionTab from './ConnectionTab'
import SuggestionTab from './SuggestionTab'
import RequestTab from './RequestTab'
// import CompanyListTab from './CompanyListTab'

import SideAd from 'src/views/banner-ad/sidead'

import style from './../../../styles/css/ConnectionPage.module.css'
import CompanyListTab from './CompanyListTab'

function ProfileConnection() {
  const { dispatch } = useBreadcrumbsConnection()
  const [value, setValue] = useState('1')

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const iduser: any = user.id

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMBS',
      payload: [
        {
          name: 'Homepage',
          path: '/'
        },
        {
          name: 'Connections',
          path: '/connections'
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
        <BreadcrumbsConnection />
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '2rem'
        }}
      >
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
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label='lab API tabs example'>
                          <Tab
                            label='Request'
                            value='1'
                            sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 'bold' }}
                          />
                          <Tab
                            label='Connections'
                            value='2'
                            sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 'bold' }}
                          />
                          <Tab label='Companies for you' value='3' sx={{ display: 'none' }} />
                          <Tab
                            label='Company you follow'
                            value='3'
                            sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 'bold' }}
                          />
                          <Tab
                            label='Suggestions'
                            value='4'
                            sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 'bold' }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value='1' className={style['tabpanel']}>
                        <RequestTab iduser={iduser} />
                      </TabPanel>
                      <TabPanel value='2' className={style['tabpanel']}>
                        <ConnectionTab iduser={iduser} />
                      </TabPanel>
                      <TabPanel value='3' className={style['tabpanel']}>
                        <CompanyListTab iduser={iduser} />
                      </TabPanel>
                      <TabPanel value='4' className={style['tabpanel']}>
                        <SuggestionTab iduser={iduser} />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <SideAd adslocation='connections-page' />
        </Grid>
      </Grid>
    </Box>
  )
}

ProfileConnection.getLayout = (page: ReactNode) => (
  <UserLayout>
    <BreadcrumbsConnectionProvider>{page}</BreadcrumbsConnectionProvider>
  </UserLayout>
)
ProfileConnection.acl = {
  action: 'read',
  subject: 'home'
}

export default ProfileConnection
