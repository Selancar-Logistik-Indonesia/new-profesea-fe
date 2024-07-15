import React, { ReactNode, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { CircularProgress, Grid } from '@mui/material'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSearchParams } from 'next/navigation'
import { getCleanErrorMessage, linkToTitleCase, toLinkCase } from 'src/utils/helpers'
import ProfileHeader from 'src/views/profile/profileHeader'
import CenterAd from 'src/views/banner-ad/CenterAd'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import AboutMe from 'src/views/profile/aboutMe'
import Analytics from 'src/views/profile/analytics'
import Activity from 'src/views/profile/activity'
import Posting from 'src/views/profile/posting'
import SideAdProfile from 'src/views/banner-ad/sideAdProfile'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'

const ProfileCompany = () => {
  return (
    <SocialFeedProvider>
      <UserFeedApp />
    </SocialFeedProvider>
  )
}

const UserFeedApp = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const params = useSearchParams()
  const selectedName = linkToTitleCase(params.get('companyname'))
  const selectedId = params.get('id')

  const firstload = async () => {
    setSelectedUser(null)

    let url = '/public/data/user/0/?username=john'
    if (params.get('companyname') && params.get('id')) {
      url = `/public/data/user/${selectedId}/?username=${selectedName}`
    } else if (user) {
      url = `/public/data/user/${user?.id}/?username=${toLinkCase(user?.username)}`
    }

    try {
      const response = await HttpClient.get(url)
      if (response.data.user.length === 0) {
        toast.error(`Oops, data tidak ditemukan`)

        return
      }
      const user = response.data.user as IUser
      setSelectedUser(user)
    } catch (error) {
      toast.error(`Oops, ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    firstload()
  }, [selectedName, selectedId])

  if (!selectedUser)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ my: 20 }} />
      </Box>
    )

  return (
    <Grid container spacing={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <ProfileHeader dataUser={selectedUser} />
        {selectedUser.id === user?.id && <Analytics dataUser={selectedUser} />}
        <AboutMe dataUser={selectedUser} />
        <Posting dataUser={selectedUser} />
        <Activity dataUser={selectedUser} />
        <CenterAd adsLocation='company-profile-page' />
      </Grid>
      <Grid item xs={12} md={3}>
        <FriendSuggestionCard location='profile' dataUser={selectedUser} />
        <Box sx={{ my: '24px', position: 'sticky', top: '70px' }}>
          <SideAdProfile />
        </Box>
      </Grid>
    </Grid>
  )
}

ProfileCompany.acl = {
  action: 'read',
  subject: 'profile-company'
}

ProfileCompany.guestGuard = false
ProfileCompany.authGuard = false
ProfileCompany.getLayout = (page: ReactNode) => <OuterPageLayout>{page}</OuterPageLayout>

export default ProfileCompany
