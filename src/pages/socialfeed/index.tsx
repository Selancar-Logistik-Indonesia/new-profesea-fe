import React from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import NestedComment from './NestedComment'
import Postfeed from './Postfeed'
import { useAuth } from 'src/hooks/useAuth'

const SocialFeed = () => {
  const { user } = useAuth();

  const paramcomment = [
    {
      logo: '/images/avatars/1.png',
      name: 'PT Samudera  ',
      waktu: '1 minute ago',
      postcomment: 'Halo semuanya! Saya ingin berbagi kabar gembira bahwa saya, Lerian Febriana, baru saja bergabung dengan Profesea.id! Saya sangat antusias karena sekarang menjadi bagian dari tim sebagai Electrical Cadet.',
    },
    {
      logo: '/images/avatars/1.png',
      name: 'PT Samudera  ',
      waktu: '5 minute ago',
      postcomment: 'ini Testing Comment 2',
    },
    {
      logo: '/images/avatars/1.png',
      name: 'PT Samudera  ',
      waktu: '1 minute ago',
      postcomment: 'Halo semuanya! Saya ingin berbagi kabar gembira bahwa saya, Lerian Febriana, baru saja bergabung dengan Profesea.id! Saya sangat antusias karena sekarang menjadi bagian dari tim sebagai Electrical Cadet.',
    },
    {
      logo: '/images/avatars/1.png',
      name: 'PT Samudera  ',
      waktu: '5 minute ago',
      postcomment: 'ini Testing Comment 2',
    },
  ]

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
                <NestedComment paramcomment={paramcomment} />
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
