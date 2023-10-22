import { useEffect, useState } from 'react' 
import { Box,  Card,  Grid, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services' 
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'   
 import { useRouter } from 'next/router'
import { getCleanErrorMessage } from 'src/utils/helpers' 
import UserGroupHeader from 'src/layouts/components/UserGroupHeader'
 import Group from 'src/contract/models/group' 
import { SocialGroupProvider } from 'src/context/SocialGroupContext'
import { useGroupFeed } from 'src/hooks/useGroupFeed'
import CardGroup from 'src/views/group/CardGroup'
import PostfeedGroup from 'src/views/social-feed/PostfeedGroup'
import ListFeedViewGroup from 'src/views/social-feed/ListFeedViewGroup'
import ShareArea from 'src/layouts/components/ShareArea'
import ButtonJoinGroup from 'src/layouts/components/ButtonJoin'
 
const ProfileCompany = () => {
  return (
    <SocialGroupProvider>
      <UserFeedApp />
    </SocialGroupProvider>
  )
}

const UserFeedApp = () => {
  const { fetchFeeds } = useGroupFeed()
  const router = useRouter();
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser 
  const iduser: any = user.id 
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [status, setStatus] = useState<boolean>(false)
  const [showFeed, setShowFeed] = useState<boolean>(false)
  const [url2, setUrl2] = useState<string>('')
  const { id } = router.query as { id: any };
  // const [isLoading, setIsLoading] = useState(true)

  const firstload = async () => {
    let url = '';
    url = '/group/navigasi/?id=' + id
 
    try {
      const response = await HttpClient.get(url);
      if (response.data.group.length == 0) {
        toast.error(`Opps data tidak ditemukan`);

        return;
      }
      const grup = response.data.group as Group
      setSelectedGroup(grup) 
      if (grup.statusmember == 'Leave') {
        setShowFeed(true)
        setUrl2('/group/leave')
      }else{
        setShowFeed(false)         
        setUrl2('/group/join')
      }
 
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }
  
  const buildConnectText = () => { 
    return 'Join'
  }
 const handleMassage = () => {
     setStatus(!status)
 }
  useEffect(() => {
    firstload(); 
    fetchFeeds({ take: 7, group_id: id, mPage: 1 });
    
  }, [id,status])

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
          <Grid container>{selectedGroup && <UserGroupHeader datagroup={selectedGroup} />}</Grid>

          <Grid container>
            <Card
              sx={{
                width: '100%',
                border: 0,
                boxShadow: 0,
                color: 'common.white',
                backgroundColor: '#FFFFFF',
                pb: 2,
                mt: -1
              }}
            >
              <Grid item container xs={12} mt={2}>
                <Grid xs={10} md={11.2}>
                  <Box display='flex' justifyContent='flex-end'>
                    {selectedGroup &&                     
                    <ButtonJoinGroup
                      onMessage={handleMassage}
                      selectedGroup={selectedGroup}
                      iduser={iduser}
                      url={url2}
                    ></ButtonJoinGroup>}

                  </Box>
                </Grid>
                <Grid xs={2} md={0.8}>
                  <ShareArea
                    subject={`Group Shared ${selectedGroup?.title}.`}
                    url={`/group/?id=${selectedGroup?.id}`}
                  ></ShareArea>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container spacing={6} sx={{ marginTop: '1px' }}>
            <Grid item lg={2} md={2} xs={12}>
              <CardGroup
                onMessage={handleMassage}
                selectedGroup={selectedGroup}
                iduser={iduser}
                label={buildConnectText()}
                statusbutton={status}
              />
            </Grid>
            <Grid item lg={10} md={10} xs={12}>
              {showFeed == true && <PostfeedGroup id={id} />}
              {showFeed == true && <ListFeedViewGroup username={id} />}
              {showFeed == false && <Typography>Please Join Group</Typography>}
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
};

export default ProfileCompany
