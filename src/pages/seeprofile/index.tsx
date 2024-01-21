import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Avatar, AvatarGroup, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import { useAuth } from 'src/hooks/useAuth'
 import { SocialFeedProvider } from 'src/context/SocialFeedContext'
 import SideAd from 'src/views/banner-ad/sidead'
import { HttpClient } from 'src/services'
import Link from 'next/link'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ListSeeProfile from 'src/views/seeprofile/ListSeeProfile'
import { IUser } from 'src/contract/models/user'
 
const SocialFeed = () => {
  return (
    <SocialFeedProvider>
      <SocialFeedApp />
    </SocialFeedProvider>
  )
}

type activities = {
  total_connected: string
  total_visitor: string
  total_post_feed: string
  total_post_job: string
  total_applied_job: string
  total_post_thread: string
}

const SocialFeedApp = () => {
  const { user } = useAuth()
  const [listCandidate, setListCandidate] = useState<IUser[]>([]) 
   const [activities, getActivities] = useState<activities>()
 
   const loadActivitis = async () => {
     const resp = await HttpClient.get('/user/statistics?user_id=' + user?.id)
     if (resp.status != 200) {
       throw resp.data.message ?? 'Something went wrong!'
     }
     const code = resp.data
     getActivities(code)
   }


  useEffect(() => 
  {
    getdatapencarian();
     loadActivitis();
  }, [])

  const getdatapencarian = async () => {
 
    const response = await HttpClient.get(
      '/user/profile-viewer?search=&page=1&take=25'      
    )

    const candidates = response.data.viewers
     
    setListCandidate(candidates)
  }

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item lg={9} md={7} xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ListSeeProfile listCandidate={listCandidate} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={5} xs={12}>
          <Profile datauser={user} />
          <Grid container>
            <Grid item my={4} xs={12}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardContent>
                  <Typography color={'#262525'} fontWeight='600' fontSize={'14px'} sx={{ mb: 4 }}>
                    Who See Your Profile
                  </Typography>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    {/* 0\;uy \a p,\]'[p/* <Link href='/account'> */}
                    <Link href='/seeprofile'>
                      <AvatarGroup className='pull-up' max={4}>
                        <Avatar src='/images/avatars/avatar-3.png' alt='1' />
                        <Avatar src='/images/avatars/avatar-4.png' alt='2' />
                        <Avatar src='/images/avatars/avatar-5.png' alt='3' />
                        <Avatar src='/images/avatars/avatar-6.png' alt='4' />
                        <Avatar src='/images/avatars/avatar-7.png' alt='5' />
                        <Avatar src='/images/avatars/avatar-8.png' alt='6' />
                      </AvatarGroup>
                    </Link>
                  </Box>
                </CardContent>
                <CardContent>
                  <Typography color={'#262525'} fontWeight='600' fontSize={'14px'} sx={{ mb: 4 }}>
                    Your Activities
                  </Typography>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'solar:user-speak-rounded-bold-duotone'} fontSize={20} color={'#262525'} />
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                      Total Connected : {activities?.total_connected}
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'solar:to-pip-bold-duotone'} fontSize={20} color={'#262525'} />
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                      Total Visitor :{activities?.total_visitor}
                    </Typography>
                  </Box>
                  {user?.role == 'Company' ? (
                    <>
                      <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                        <Icon icon={'solar:case-minimalistic-bold-duotone'} fontSize={20} color={'#262525'} />
                        <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                          Total Post Job :{activities?.total_post_feed}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                      <Icon icon={'solar:case-minimalistic-bold-duotone'} fontSize={20} color={'#262525'} />
                      <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                        Applied Job : {activities?.total_applied_job}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'solar:clapperboard-text-bold-duotone'} fontSize={20} color={'#262525'} />
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                      Total Post :{activities?.total_visitor}
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'solar:plate-bold-duotone'} fontSize={20} color={'#262525'} />
                    <Typography fontSize={12} sx={{ color: '#262525', fontWeight: 400 }}>
                      Total Thread : {activities?.total_post_thread}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <FriendSuggestionCard />
          <Divider sx={{ my: '0 !important' }} />
          <KeenSliderWrapper>
            <SideAd />
          </KeenSliderWrapper>
        </Grid>
      </Grid>
    </Box>
  )
}

SocialFeed.acl = {
  action: 'read',
  subject: 'home'
}

export default SocialFeed
