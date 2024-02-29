import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import Profile from 'src/layouts/components/Profile'
import { useAuth } from 'src/hooks/useAuth'
import Postfeed from 'src/views/social-feed/Postfeed'
import ListFeedView from 'src/views/social-feed/ListFeedView'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import SideAd from 'src/views/banner-ad/sidead'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

const SocialFeed = () => {
  return (
    <SocialFeedProvider>
      <SocialFeedApp />
    </SocialFeedProvider>
  )
}

const SocialFeedApp = () => {
  const { user } = useAuth()

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item lg={3} md={5} xs={12}>
          <Profile datauser={user} />

          <KeenSliderWrapper>
            <SideAd />
          </KeenSliderWrapper>
        </Grid>
        <Grid item lg={6} md={7} xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Postfeed />
              <ListFeedView />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} xs={12}>
          <Box>
            <ProfileViewerCard />
          </Box>
          <Box my={4}>
            <FriendSuggestionCard />
          </Box>
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
