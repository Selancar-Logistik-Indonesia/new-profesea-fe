import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import { useAuth } from 'src/hooks/useAuth'
import Postfeed from 'src/views/social-feed/Postfeed'
import NestedComment from 'src/views/social-feed/NestedComment'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSocialFeed } from 'src/hooks/useSocialFeed'

const SocialFeed = () => {
  return (
    <SocialFeedProvider>
      <SocialFeedApp />
    </SocialFeedProvider>
  )
}

const SocialFeedApp = () => {
  const { user } = useAuth();
  const { fetchFeeds } = useSocialFeed();

  useEffect(() => {
    fetchFeeds({
      page: 1,
      take: 25,
    });
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid container spacing={6}>
          <Grid item lg={4} md={5} xs={12}>
            <Profile datauser={user} />
            <Grid container>
              <Grid item my={4} xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                      <Icon icon={'arcticons:connect-you'} fontSize={30} />
                      <Typography variant='body1' sx={{ color: '#424242', fontWeight: 600 }}>
                        total connected :250
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Feed />
          </Grid>
          <Grid item lg={8} md={7} xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Postfeed />
                <NestedComment />
              </Grid>
            </Grid>
          </Grid>
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
