import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import Profile from 'src/layouts/components/Profile'
import ListFeedView from 'src/views/social-feed/ListFeedView'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import SideAd from 'src/views/banner-ad/sidead'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

import { HttpClient } from 'src/services'
import { toast } from 'react-hot-toast'
import { IUser } from 'src/contract/models/user'
import { getCleanErrorMessage, linkToTitleCase } from 'src/utils/helpers'

const SocialFeed = () => {
  return (
    <SocialFeedProvider>
      <SocialFeedApp />
    </SocialFeedProvider>
  )
}

const SocialFeedApp = () => {
  const params = useSearchParams()
  const usernameParam = linkToTitleCase(params.get('username'))

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  const firstload = async () => {
    try {
      const response = await HttpClient.get('/user/?username=' + usernameParam)

      if (response.data.user.length == 0) {
        toast.error(`Opps data tidak ditemukan`)

        return
      }

      const user = response.data.user as IUser
      setSelectedUser(user)
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    firstload()
  }, [usernameParam])

  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item lg={3} md={5} xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Profile datauser={selectedUser} />
          <Box sx={{ position: 'sticky', top: '70px' }}>
            <KeenSliderWrapper>
              <SideAd adslocation='candidate-profile-page' />
            </KeenSliderWrapper>
          </Box>
        </Grid>
        <Grid item lg={6} md={7} xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ListFeedView username={usernameParam} />
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
