import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import UserProfileHeader from 'src/layouts/components/UserProfileHeader'
import JobVacancy from './JobVacancy'
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'
import WorkeExperience from './Workexperience'
// import ListFeedView from 'src/views/social-feed/ListFeedView'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import ListTraining from './Training'
import { useRouter } from 'next/router'
import { getCleanErrorMessage } from 'src/utils/helpers'
import EducationalInfo from './Educational'
import Ceritificate from './Certificate'
import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import AboutMe from './AboutMe'
import ProfileFeedCard from './ProfileFeedCard'
import SeafarerTravelDocumentTable from 'src/layouts/components/SeafarerTravelDocumentTable'
import SeafarerExperienceTable from 'src/layouts/components/SeafarerExperienceTable'
import SeafarerCompetencyTable from 'src/layouts/components/SeafarerCompetencyTable'
import SeafarerProficiencyTable from 'src/layouts/components/SeafarerProficiencyTable'
import SeafarerRecommendationTable from 'src/layouts/components/SeafarerRecommendationTable'

import NewsListCard from 'src/layouts/components/NewsListCard'
import TableCard from './TableCard'

const ProfileCompany = () => {
  return (
    <SocialFeedProvider>
      <UserFeedApp />
    </SocialFeedProvider>
  )
}

const UserFeedApp = () => {
  const { fetchFeeds } = useSocialFeed()
  const router = useRouter()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [arrVacany, setArrVacancy] = useState<any>([])
  const [arrVacany2, setArrVacancy2] = useState<any>([])
  const [itemData, getItemdata] = useState<any[]>([])
  const iduser: any = user.id
  let { username } = router.query as { username: string }

  const firstload = async () => {
    let url = ''
    let filter = ''
    let filterdoc = ''
    if (!username) {
      url = '/user/' + iduser
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
      setSelectedUser(user)

      if (user.role == 'Company') {
        HttpClient.get(AppConfig.baseUrl + '/job?search=&page=1&take=250' + filter).then(response => {
          const code = response.data.jobs.data
          setArrVacancy(code)
        })
      } else if (user.role == 'Trainer') {
        HttpClient.get(AppConfig.baseUrl + '/training?search=&page=1&take=250' + filter).then(response => {
          const itemData = response.data.trainings.data
          setArrVacancy(itemData)
        })
      } else {
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
      }
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }

  useEffect(() => {
    firstload()
    fetchFeeds({ take: 7, username: username, mPage: 1 })
  }, [username])

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
          <Grid container spacing={6} sx={{ marginTop: '1px' }}>
            <Grid item lg={2} md={2} xs={12}>
              {selectedUser?.role == 'Company' && <JobVacancy vacancy={arrVacany} />}
              {selectedUser?.role == 'Seafarer' && <Box></Box>}
              {selectedUser?.role == 'Trainer' && <ListTraining vacancy={arrVacany} />}
              <NewsListCard />
            </Grid>
            <Grid item container lg={8} md={8} xs={12}>
              <Grid item md={12} xs={12}>
                {selectedUser && <UserProfileHeader datauser={selectedUser} address={selectedUser.address} />}
              </Grid>
              <Grid item md={12} xs={12}>
                <AboutMe dataUser={selectedUser}></AboutMe>
              </Grid>
              <Grid item md={12} xs={12}>
                <ProfileFeedCard user_id={selectedUser?.id}></ProfileFeedCard>
              </Grid>
              <Grid item md={12} xs={12}>
                {/* <ListFeedView username={username} /> */}
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
                      isDataHidden={true}
                      handleModalDelete={undefined}
                      handleModalForm={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              {selectedUser?.employee_type == 'onship' && (
                <Grid item marginTop={'10px'} md={12} xs={12}>
                  <TableCard title='Experience'>
                    <SeafarerExperienceTable
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
                      isHiddenData={true}
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
                      isHiddenData={true}
                      isEditable={false}
                      handleModalDelete={undefined}
                      handleModalForm={undefined}
                    />
                  </TableCard>
                </Grid>
              )}

              {selectedUser?.team_id == 2 && (
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
            </Grid>
            <Grid item lg={2} md={2} xs={12}>
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
