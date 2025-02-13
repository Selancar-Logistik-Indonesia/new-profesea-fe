import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { CircularProgress, Grid } from '@mui/material'
// import { useTheme } from '@mui/material/styles'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
// import UserProfileHeader from 'src/layouts/components/UserProfileHeader'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import WorkeExperience from '../Workexperience'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSearchParams } from 'next/navigation'
import { getCleanErrorMessage, linkToTitleCase, toLinkCase } from 'src/utils/helpers'
// import EducationalInfo from '../../Educational'
import Ceritificate from '../Certificate'
// import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import AboutMe from 'src/views/profile/aboutMe'
// import ProfileFeedCard from '../../ProfileFeedCard'
// import SeafarerTravelDocumentTable from 'src/layouts/components/SeafarerTravelDocumentTable'
// import SeafarerExperienceTable from 'src/layouts/components/SeafarerExperienceTable'
// import SeafarerCompetencyTable from 'src/layouts/components/SeafarerCompetencyTable'
// import SeafarerProficiencyTable from 'src/layouts/components/SeafarerProficiencyTable'
// import SeafarerRecommendationTable from 'src/layouts/components/SeafarerRecommendationTable'
// import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

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
  // const theme = useTheme()
  const router = useRouter()
  // const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [arrVacany, setArrVacancy] = useState<any>([])
  const [arrVacany2, setArrVacancy2] = useState<any>([])
  const [openCompleteOnboard, setOpenCompleteOnboard] = useState(false)
  // const [itemData, getItemdata] = useState<any[]>([])
  const iduser: any = user.id
  //let { username } = router.query as { username: string }

  const params = useSearchParams()
  let username = linkToTitleCase(params.get('username'))
  const onboarding = params.get('onboarding')

  useEffect(() => {
    if (onboarding == 'completed') {
      setOpenCompleteOnboard(true)
    }
  }, [onboarding])

  const firstload = async () => {
    let url = ''
    let filter = ''
    // let filterdoc = ''
    if (!username) {
      url = '/user/' + toLinkCase(iduser)
      username = user.username
    } else {
      url = '/user/?username=' + username
      filter = '&username=' + username
      // filterdoc = '?username=' + username
    }

    try {
      const response = await HttpClient.get(url)
      if (response.data.user.length == 0) {
        toast.error(`Opps data tidak ditemukan`)

        return
      }

      const user = response.data.user as IUser
      if (user.role === 'Company' || user.role === 'Trainer') {
        router.push(`/company/${user.id}/${toLinkCase(user.username)}`)
      }
      setSelectedUser(user)

      HttpClient.get(AppConfig.baseUrl + '/user/experience?page=1&take=100' + filter).then(response => {
        const itemData = response.data.experiences
        setArrVacancy(itemData)
      })
      HttpClient.get(AppConfig.baseUrl + '/user/education?page=1&take=100' + filter).then(response => {
        const itemData = response.data.educations
        setArrVacancy2(itemData)
      })
      // HttpClient.get(AppConfig.baseUrl + '/user/document' + filterdoc).then(response => {
      //   const itemData = response.data.documents

      //   getItemdata(itemData)
      // })
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    firstload()
  }, [username])

  if (!selectedUser) {
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '10px',
          mb: '20px',
          gap: '32px',
          paddingLeft: { lg: '96px' },
          paddingRight: { lg: '96px' }
        }}
      >
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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

export default ProfileCompany
