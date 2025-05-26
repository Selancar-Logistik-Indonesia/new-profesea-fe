import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { CircularProgress, Grid } from '@mui/material'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import WorkeExperience from '../Workexperience'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSearchParams } from 'next/navigation'
import { getCleanErrorMessage, linkToTitleCase, toLinkCase } from 'src/utils/helpers'
import Ceritificate from '../Certificate'
import AboutMe from 'src/views/profile/aboutMe'
import { useRouter } from 'next/router'
import ProfileHeader from 'src/views/profile/profileHeader'
import Analytics from 'src/views/profile/analytics'
import Activity from 'src/views/profile/activity'
import EducationInfo from 'src/views/profile/educationInfo'
import SeafarerTravelDocument from 'src/views/profile/seafarerTravelDocument'
import SeafarerExperience from 'src/views/profile/seafarerExperience'
import CopSection from 'src/views/profile/copSection'
import CocSection from 'src/views/profile/cocSection'
import FriendSuggestionCard from 'src/layouts/components/FriendSuggestionCard'
import UsernameChange from 'src/layouts/components/UsernameChange'
import SideAdProfile from 'src/views/banner-ad/sideAdProfile'
import CompleteOnboarding from 'src/views/onboarding/CompleteOnboarding'

const ProfileCompany = () => {
  return (
    <SocialFeedProvider>
      <UserFeedApp />
    </SocialFeedProvider>
  )
}

const UserFeedApp = () => {
  const params = useSearchParams()
  const router = useRouter()
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const iduser: any = user?.id
  const onboarding = params.get('onboarding')

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [arrVacany, setArrVacancy] = useState<any>([])
  const [arrVacany2, setArrVacancy2] = useState<any>([])
  const [openCompleteOnboard, setOpenCompleteOnboard] = useState(false)

  useEffect(() => {
    if (onboarding == 'completed') {
      setOpenCompleteOnboard(true)
    }
  }, [onboarding])

  const firstload = async (usernameURL: string) => {
    const url = 'public/data/user/?username=' + usernameURL
    const filter = ''

    try {
      const response = await HttpClient.get(url)
      if (response.data.user.length == 0) {
        toast.error(`Opps data tidak ditemukan`)

        return
      }

      const user = response.data.user as IUser

      if (user.role === 'Company' || user.role === 'Trainer') {
        router.push(`/company/${toLinkCase(user.username)}`)
      }
      setSelectedUser(user)

      if (iduser === user?.id) {
        HttpClient.get(AppConfig.baseUrl + '/user/experience?page=1&take=100' + filter).then(response => {
          const itemData = response.data.experiences
          setArrVacancy(itemData)
        })
        HttpClient.get(AppConfig.baseUrl + '/user/education?page=1&take=100' + filter).then(response => {
          const itemData = response.data.educations
          setArrVacancy2(itemData)
        })
      } else {
        HttpClient.get(
          AppConfig.baseUrl +
            `/public/data/user/work-experiences?user_id=${usernameURL ? user.id : iduser}&take=10&page=1` +
            filter
        ).then(response => {
          const itemData = response.data.experiences
          setArrVacancy(itemData)
        })
        HttpClient.get(
          AppConfig.baseUrl +
            `/public/data/user/educations?user_id=${usernameURL ? user.id : iduser}&take=10&page=1` +
            filter
        ).then(response => {
          const itemData = response.data.educations
          setArrVacancy2(itemData)
        })
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        return
      }
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const usernameURL = linkToTitleCase(router.query.username as string) as string

      firstload(usernameURL)
    }
  }, [router.isReady, router.query.username])

  if (!selectedUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ my: 20 }} />
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={6} sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ProfileHeader dataUser={selectedUser as unknown as IUser} />
          {selectedUser.id === user?.id && <Analytics dataUser={selectedUser} />}
          <AboutMe dataUser={selectedUser} />
          <Activity dataUser={selectedUser} status={true} />
          <EducationInfo educations={arrVacany2} />

          {/* Seafarer Travel Documents */}
          {selectedUser?.employee_type == 'onship' && <SeafarerTravelDocument userId={selectedUser?.id} />}

          {/* seafarer experience */}
          {selectedUser?.employee_type == 'onship' && (
            <SeafarerExperience userId={selectedUser?.id} userName={selectedUser?.name} />
          )}

          {/* seafarer cop */}
          {selectedUser?.employee_type == 'onship' && (
            <CopSection userId={selectedUser?.id} userName={selectedUser?.name} />
          )}

          {/* seafarer coc */}
          {selectedUser?.employee_type == 'onship' && (
            <CocSection userId={selectedUser?.id} userName={selectedUser?.name} />
          )}

          {selectedUser?.employee_type == 'offship' && <WorkeExperience vacancy={arrVacany} />}
          {selectedUser?.employee_type == 'offship' && <Ceritificate userId={selectedUser?.id} />}
        </Grid>
        <Grid item xs={12} md={3}>
          {selectedUser.id === user?.id && (
            <Box sx={{ mb: '24px' }}>
              <UsernameChange userId={selectedUser?.id} username={selectedUser?.username} />
            </Box>
          )}
          <FriendSuggestionCard location='profile' dataUser={selectedUser} status={true} />
          <Box sx={{ my: '24px', position: 'sticky', top: '70px' }}>
            <SideAdProfile />
          </Box>
        </Grid>
      </Grid>
      <CompleteOnboarding openDialog={openCompleteOnboard} setOpenDialog={setOpenCompleteOnboard} />
    </>
  )
}

ProfileCompany.acl = {
  action: 'read',
  subject: 'home'
}

ProfileCompany.guestGuard = false
ProfileCompany.authGuard = false

export default ProfileCompany
