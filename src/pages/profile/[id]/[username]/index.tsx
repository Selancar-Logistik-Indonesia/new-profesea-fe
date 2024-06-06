import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import UserProfileHeader from 'src/layouts/components/UserProfileHeader'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import WorkeExperience from '../../Workexperience'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSearchParams } from 'next/navigation'
import { getCleanErrorMessage, linkToTitleCase, toLinkCase } from 'src/utils/helpers'
import EducationalInfo from '../../Educational'
import Ceritificate from '../../Certificate'
import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import AboutMe from '../../AboutMe'
import ProfileFeedCard from '../../ProfileFeedCard'
import SeafarerTravelDocumentTable from 'src/layouts/components/SeafarerTravelDocumentTable'
import SeafarerExperienceTable from 'src/layouts/components/SeafarerExperienceTable'
import SeafarerCompetencyTable from 'src/layouts/components/SeafarerCompetencyTable'
import SeafarerProficiencyTable from 'src/layouts/components/SeafarerProficiencyTable'
import SeafarerRecommendationTable from 'src/layouts/components/SeafarerRecommendationTable'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

import NewsListCard from 'src/layouts/components/NewsListCard'
import TableCard from '../../TableCard'
import { useRouter } from 'next/router'
import SideAd from 'src/views/banner-ad/sidead'
import CenterAd from 'src/views/banner-ad/CenterAd'

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
  const [arrVacany2, setArrVacancy2] = useState<any>([])
  const [itemData, getItemdata] = useState<any[]>([])
  const iduser: any = user.id
  //let { username } = router.query as { username: string }
  const params = useSearchParams()
  let username = linkToTitleCase(params.get('username') ?? undefined)

  const firstload = async () => {
    let url = ''
    let filter = ''
    let filterdoc = ''
    if (!username) {
      url = '/user/' + toLinkCase(iduser)
      username = user.username
    } else {
      url = '/user/?username=' + username
      filter = '&username=' + username
      filterdoc = '?username=' + username
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
      HttpClient.get(AppConfig.baseUrl + '/user/document' + filterdoc).then(response => {
        const itemData = response.data.documents

        getItemdata(itemData)
      })
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    firstload()
  }, [username])

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
          <Grid container spacing={6} sx={{ marginTop: '1px' }}>
            <Grid item lg={3} md={3} xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <NewsListCard />
              <Box sx={{ position: 'sticky', top: '70px' }}>
                <KeenSliderWrapper>
                  <SideAd adslocation='candidate-profile-page' />
                </KeenSliderWrapper>
              </Box>
            </Grid>
            <Grid item container lg={6} md={6} xs={12}>
              <Grid item md={12} xs={12}>
                {selectedUser && <UserProfileHeader datauser={selectedUser} address={selectedUser.address} />}
              </Grid>
              <Grid item md={12} xs={12}>
                <AboutMe dataUser={selectedUser}></AboutMe>
              </Grid>
              <Grid item md={12} xs={12}>
                <ProfileFeedCard selectedUser={selectedUser}></ProfileFeedCard>
              </Grid>
              <Grid item md={12} xs={12}>
                <Box></Box>
              </Grid>
              <EducationalInfo vacancy={arrVacany2} />
              {selectedUser?.employee_type == 'offship' && <WorkeExperience vacancy={arrVacany} />}
              {selectedUser?.employee_type == 'offship' && <Ceritificate vacancy={itemData} />}

              {selectedUser?.employee_type == 'onship' && (
                <Grid item marginTop={'10px'} md={12} xs={12}>
                  <TableCard title='Travel Document'>
                    <SeafarerTravelDocumentTable
                      user_id={selectedUser?.id}
                      selectedUser={selectedUser}
                      isEditable={false}
                      isDataHidden={selectedUser?.id == user?.id || user.team_id == 3 ? false : true}
                      handleModalDelete={undefined}
                      handleModalForm={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              {selectedUser?.employee_type == 'onship' && (
                <Grid item marginTop={'10px'} md={12} xs={12}>
                  <TableCard title='Sea Experience'>
                    <SeafarerExperienceTable
                      isHiddenData={selectedUser?.id == user?.id || user.team_id == 3 ? false : true}
                      user_id={selectedUser?.id}
                      selectedUser={selectedUser}
                      isEditable={false}
                      handleModalDelete={undefined}
                      handleModalForm={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              {selectedUser?.employee_type == 'onship' && (
                <Grid item marginTop={'10px'} md={12} xs={12}>
                  <TableCard title='Certificate of Competency'>
                    <SeafarerCompetencyTable
                      user_id={selectedUser?.id}
                      selectedUser={selectedUser}
                      isHiddenData={selectedUser?.id == user?.id || user.team_id == 3 ? false : true}
                      isEditable={false}
                      handleModalDelete={undefined}
                      handleModalForm={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              {selectedUser?.employee_type == 'onship' && (
                <Grid item marginTop={'10px'} md={12} xs={12}>
                  <TableCard title='Certificate Of Proficiency'>
                    <SeafarerProficiencyTable
                      user_id={selectedUser?.id}
                      selectedUser={selectedUser}
                      isHiddenData={selectedUser?.id == user?.id || user.team_id == 3 ? false : true}
                      isEditable={false}
                      handleModalDelete={undefined}
                      handleModalForm={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              {selectedUser?.employee_type == 'onship' && (
                <Grid item marginTop={'10px'} md={12} xs={12}>
                  <TableCard title='Recommendation'>
                    <SeafarerRecommendationTable
                      user_id={selectedUser?.id}
                      selectedUser={selectedUser}
                      isHiddenData={true}
                      isEditable={false}
                      handleModalDelete={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              <Grid item marginTop={'10px'} md={12} xs={12}>
                <CenterAd adsLocation='candidate-profile-page' />
              </Grid>
            </Grid>
            <Grid item lg={3} md={3} xs={12}>
              <ProfileViewerCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

ProfileCompany.acl = {
  action: 'read',
  subject: 'home'
}

export default ProfileCompany
