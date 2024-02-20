import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Card, CardContent, Grid, useMediaQuery } from '@mui/material'
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
import ListFeedView from 'src/views/social-feed/ListFeedView'
import { SocialFeedProvider } from 'src/context/SocialFeedContext'
import { useSocialFeed } from 'src/hooks/useSocialFeed'
import ListTraining from './Training'
import { useRouter } from 'next/router'
import { getCleanErrorMessage } from 'src/utils/helpers'
import EducationalInfo from './Educational'
import Ceritificate from './Certificate'
import ProfileViewerCard from 'src/layouts/components/ProfileViewerCard'
import SeafarerTravelDocument from '../candidate/SeafarerTravelDocument/SeafarerTravelDocumentTable'
import AboutMe from './AboutMe'
import ProfileFeedCard from './ProfileFeedCard'

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

  const TableWrapper = (props: any) => {
    return (
      <Grid item marginTop={'10px'} md={12} xs={12}>
        <Card>
          <CardContent sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            {props.children}
          </CardContent>
        </Card>
      </Grid>
    )
  }

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
          <Grid container spacing={6} sx={{ marginTop: '1px' }}>
            <Grid item lg={2} md={2} xs={12}>
              {selectedUser?.role == 'Company' && <JobVacancy vacancy={arrVacany} />}
              {selectedUser?.role == 'Seafarer' && <Box></Box>}
              {selectedUser?.role == 'Trainer' && <ListTraining vacancy={arrVacany} />}
            </Grid>
            <Grid item container lg={7} md={7} xs={12}>
              <Grid item md={12} xs={12}>
                {selectedUser && <UserProfileHeader datauser={selectedUser} address={selectedUser.address} />}
              </Grid>
              <Grid item md={12} xs={12}>
                <AboutMe dataUser={selectedUser}></AboutMe>
              </Grid>
              <Grid item md={12} xs={12}>
                <ProfileFeedCard></ProfileFeedCard>
              </Grid>
              <Grid item md={12} xs={12}>
                {/* <ListFeedView username={username} /> */}
                <Box></Box>
              </Grid>
              <EducationalInfo vacancy={arrVacany2} />
              <WorkeExperience vacancy={arrVacany} />
              <Ceritificate vacancy={itemData} />
              <TableWrapper>
                <SeafarerTravelDocument user_id={selectedUser?.id} />
              </TableWrapper>
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
