import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Feed from 'src/layouts/components/Feed'
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import Profile from 'src/layouts/components/Profile'
import { useAuth } from 'src/hooks/useAuth'
import SideAd from 'src/views/banner-ad/sidead'

const FindCandidate = () => {
  const [listCandidate, setListCandidate] = useState<IUser[]>([])
  const { user } = useAuth()

  const getListCandidates = async () => {
    const response = await HttpClient.get('/candidate?page=1&take=25&search', {
      page: 1,
      take: 25,
      search: ''
    })

    const { candidates } = response.data as { candidates: IUser[] }
    setListCandidate(candidates)
  }

  useEffect(() => {
    getListCandidates()
  }, [])

  return (
    <Grid container sx={{ marginTop: '1px' }}>
      <Grid item lg={3} md={5} xs={12}>
        <Profile datauser={user} />
        <Grid container mt={3} mb={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                  <Icon icon={'arcticons:connect-you'} fontSize={30} />{' '}
                  <Typography variant='body1' sx={{ color: '#424242', fontWeight: 600 }}>
                    {' '}
                    Total Conected :250
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Feed />
      </Grid>
      <Grid item lg={7} md={7} xs={12}>
        <Grid sx={{ ml: { md: 12 }, mt: { xs: 12 } }} container>
          <Grid item xs={11}>
            <Typography variant='h5'> Recommend for you</Typography>
            <Typography variant='body2' marginTop={2} marginBottom={5}>
              {' '}
              Based on your profile and search history
            </Typography>
            <RecomendedView listCandidate={listCandidate} />
          </Grid>
        </Grid>
      </Grid>
      <Grid lg={2} xs={12} sx={{ mt: { xs: 5 } }} item>
        <SideAd />
      </Grid>
    </Grid>
  )
}

FindCandidate.acl = {
  action: 'read',
  subject: 'home'
}
export default FindCandidate
