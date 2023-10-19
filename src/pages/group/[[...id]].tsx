import { useEffect, useState } from 'react' 
import { Box,  Grid, useMediaQuery } from '@mui/material'
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
  const { id } = router.query as { id: any };
  // const [isLoading, setIsLoading] = useState(true)

  const firstload = async () => {
    let url = '';
    url = '/group/detail/?id=' + id
 
    try {
      const response = await HttpClient.get(url);
      if (response.data.group.length == 0) {
        toast.error(`Opps data tidak ditemukan`);

        return;
      }
      const grup = response.data.group as Group
      setSelectedGroup(grup) 
 
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
              <PostfeedGroup id={id} />
              <ListFeedViewGroup username={id} />
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
