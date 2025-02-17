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
import { getCleanErrorMessage, linkToTitleCase } from 'src/utils/helpers'
import ProfileHeader from 'src/views/profile/profileHeader'
import CenterAd from 'src/views/banner-ad/CenterAd'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import AboutMe from 'src/views/profile/aboutMe'
import Analytics from 'src/views/profile/analytics'
import Activity from 'src/views/profile/activity'
import Posting from 'src/views/profile/posting'
import SideAdProfile from 'src/views/banner-ad/sideAdProfile'
import OuterPageLayout from 'src/@core/layouts/outer-components/OuterPageLayout'
import DialogLogin from 'src/@core/components/login-modal'
import { useAuth } from 'src/hooks/useAuth'
import FooterView from 'src/views/landing-page/footerView'
import CompleteOnboarding from 'src/views/onboarding/CompleteOnboarding'
import UsernameChange from 'src/layouts/components/UsernameChange'

const ProfileCompany = () => {
  return (
    <SocialFeedProvider>
      <UserFeedApp />
    </SocialFeedProvider>
  )
}

const UserFeedApp = () => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [openDialog, setOpenDialog] = useState(true)
  const [openCompleteOnboard, setOpenCompleteOnboard] = useState(false)
  const { user: isLoggedin } = useAuth()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const params = useSearchParams()
  const selectedName = linkToTitleCase(params.get('companyname'))
  const status = Boolean(isLoggedin)

  const firstload = async () => {
    setSelectedUser(null)
    let url: any = process.env.NEXT_PUBLIC_BASE_URL
    if ( selectedName) {
      url = `/public/data/user/${selectedName}`
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

  const onboarding = params.get('onboarding')
  useEffect(() => {
    if (onboarding == 'completed') {
      setOpenCompleteOnboard(true)
    }
  }, [onboarding])

  useEffect(() => {
    if (selectedName) {
      firstload()
    }
  }, [selectedName])

  if (!selectedUser){
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ my: 20 }} />
      </Box>
    )
  }
    
  return (
    <>
      <Grid
        container
        spacing={6}
        sx={{ display: 'flex', justifyContent: 'center', mt: status ? '10px' : 0, mb: '20px' }}
      >
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ProfileHeader dataUser={selectedUser} />
          {selectedUser?.id === user?.id && status && <Analytics dataUser={selectedUser} />}
          <AboutMe dataUser={selectedUser} />
          <Posting dataUser={selectedUser} status={status} />
          <Activity dataUser={selectedUser} status={status} />
          <CenterAd adsLocation='company-profile-page' />
        </Grid>
        <Grid item xs={12} md={3}>
          {selectedUser.id === user?.id && (<Box sx={{ mb: '24px'}}>
             <UsernameChange userId={selectedUser?.id} username={selectedUser?.username} />
          </Box>)}
          <FriendSuggestionCard location='profile' dataUser={selectedUser} status={status} />
          <Box sx={{ my: '24px', position: 'sticky', top: '70px' }}>
            <SideAdProfile />
          </Box>
        </Grid>
      </Grid>
      {!status && <FooterView />}
      {!status && openDialog && (
        <DialogLogin
          isBanner={false}
          visible={openDialog}
          variant='training'
          onCloseClick={() => {
            setOpenDialog(!openDialog)
          }}
        />
      )}
      <CompleteOnboarding openDialog={openCompleteOnboard} setOpenDialog={setOpenCompleteOnboard} />
    </>
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
