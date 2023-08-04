import React, { useEffect } from 'react'
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
    fetchFeeds({ take: 7 });
  }, []);

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
              <Card>
                <CardContent>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:tenancy'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Connected :250
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:gesture-select-rounded'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Visitor :250
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:add-notes-rounded'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Post :250
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:ballot'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Post Job / Applied Job :250
                    </Typography>
                  </Box>
                  <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2.7 }} display={'flex'}>
                    <Icon icon={'material-symbols:assignment-late'} fontSize={24} color={'#32487A'} />
                    <Typography fontSize={12} sx={{ color: '#424242', fontWeight: 400 }}>
                      Total Thread :250
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Feed />
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
