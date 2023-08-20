import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import { useAuth } from 'src/hooks/useAuth'
import Postfeed from 'src/views/social-feed/Postfeed'
import ListFeedView from 'src/views/social-feed/ListFeedView'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import SideAd from 'src/views/banner-ad/sidead'
import { HttpClient } from 'src/services'

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
  const { user } = useAuth();
  const { fetchFeeds } = useSocialFeed();
  const [activities, getActivities] = useState<activities>()
  useEffect(() => {
    fetchFeeds({ take: 7 });
    loadActivitis();
  }, []);
  
 const loadActivitis = async () => {
  debugger;
   const resp = await HttpClient.get('/user/statistics?user_id=' + user?.id)
   if (resp.status != 200) {
     throw resp.data.message ?? 'Something went wrong!'
   }
   const code = resp.data
  getActivities(code) 
 }

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item lg={9} md={7} xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Postfeed />
              <ListFeedView />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={5} xs={12}>
          <Profile datauser={user} />
          <Grid container>
            <Grid item my={4} xs={12}>
              <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
                <CardContent>
                  <Typography color={'#424242'} fontWeight='600' fontSize={'14px'} sx={{ mb: 4 }}>
                    Your Activities
                  </Typography>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:tenancy'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Connected : {activities?.total_connected}
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:gesture-select-rounded'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Visitor :{activities?.total_visitor}
                    </Typography>
                  </Box>
                  {user?.role == 'Company' ? (
                    <>
                      <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                        <Icon icon={'material-symbols:ballot'} fontSize={24} color={'#32487A'} />
                        <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                          Total Post Job :{activities?.total_post_feed}  
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                      <Icon icon={'material-symbols:ballot'} fontSize={24} color={'#32487A'} />
                      <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                         Applied Job : {activities?.total_applied_job}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:add-notes-rounded'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Post :{activities?.total_visitor}
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:assignment-late'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Thread : {activities?.total_post_thread}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Feed />
          <SideAd sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </Box>
  )
}

SocialFeed.acl = {
  action: 'read',
  subject: 'home'
};

export default SocialFeed
