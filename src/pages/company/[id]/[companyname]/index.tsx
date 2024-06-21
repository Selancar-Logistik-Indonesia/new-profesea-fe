import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import UserProfileHeader from 'src/layouts/components/UserProfileHeader'
import JobVacancy from 'src/pages/profile/JobVacancy'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import ListTraining from 'src/pages/profile/Training'
import { useSearchParams } from 'next/navigation'
import { getCleanErrorMessage, linkToTitleCase, toLinkCase } from 'src/utils/helpers'
import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import ProfileFeedCard from 'src/pages/profile/ProfileFeedCard'
import NewsListCard from 'src/layouts/components/NewsListCard'
import { useRouter } from 'next/router'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ProfileHeader from 'src/views/profile/profileHeader'
import SideAd from 'src/views/banner-ad/sidead'
import CenterAd from 'src/views/banner-ad/CenterAd'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import AboutMe from 'src/views/profile/aboutMe'
import Analytics from 'src/views/profile/analytics'
import Activity from 'src/views/profile/activity'

const ProfileCompany = () => {
  return (
    <SocialFeedProvider>
      <UserFeedApp />
    </SocialFeedProvider>
  )
}

const UserFeedApp = () => {
  const theme = useTheme()
  const router = useRouter()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [arrVacany, setArrVacancy] = useState<any>([])
  const iduser: any = user.id
  //let { username } = router.query as { username: string }
  const params = useSearchParams()
  let companyName = linkToTitleCase(params.get('companyname') ?? undefined)

  const firstload = async () => {
    let url = ''
    let filter = ''
    if (!companyName) {
      url = '/user/' + toLinkCase(iduser)
      companyName = user.username
    } else {
      url = '/user/?username=' + companyName
      filter = '&username=' + companyName
    }

    try {
      const response = await HttpClient.get(url)
      if (response.data.user.length == 0) {
        toast.error(`Opps data tidak ditemukan`)

        return
      }

      const user = response.data.user as IUser
      if (user.role === 'Seafarer') {
        router.push(`/profile/${user.id}/${toLinkCase(user.username)}`)
      }
      setSelectedUser(user)
      console.log(user)

      if (user.role == 'Company') {
        HttpClient.get(AppConfig.baseUrl + '/job?search=&page=1&take=3' + filter).then(response => {
          const code = response.data.jobs.data
          setArrVacancy(code)
        })
      } else if (user.role == 'Trainer') {
        HttpClient.get(AppConfig.baseUrl + '/training?search=&page=1&take=3' + filter).then(response => {
          const itemData = response.data.trainings.data
          setArrVacancy(itemData)
        })
      }
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    firstload()
  }, [companyName])

  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
            <Grid container spacing={6}>
              <Grid item md={3} xs={12}>
                <Box>
                  {selectedUser?.role == 'Company' && <JobVacancy vacancy={arrVacany} userId={selectedUser.id} />}
                  {selectedUser?.role == 'Trainer' && <ListTraining vacancy={arrVacany} />}
                </Box>
                <Box my={3}>
                  <NewsListCard />
                </Box>
                <Box sx={{ position: 'sticky', top: '70px' }}>
                  <SideAd />
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box>
                  {selectedUser && <UserProfileHeader datauser={selectedUser} address={selectedUser.address} />}
                </Box>
                <Box>{/* <AboutMe dataUser={selectedUser} /> */}</Box>
                <Box>
                  <ProfileFeedCard selectedUser={selectedUser} />
                </Box>
                <Box sx={{ marginTop: '10px' }}>
                  <CenterAd adsLocation='company-profile-page' />
                </Box>
              </Grid>
              <Grid item md={3} xs={12}>
                <ProfileViewerCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedUser && <ProfileHeader datauser={selectedUser} address={selectedUser.address} />}
          {selectedUser && <Analytics dataUser={selectedUser} />}
          {selectedUser && <AboutMe dataUser={selectedUser} />}
          {selectedUser && <Activity dataUser={selectedUser} />}
        </Grid>
        <Grid item xs={12} md={3}>
          <FriendSuggestionCard />
          <Box sx={{ my: '24px', position: 'sticky', top: '70px' }}>
            <SideAd />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

ProfileCompany.acl = {
  action: 'read',
  subject: 'home'
}

export default ProfileCompany
