import { useEffect, useState } from 'react' 
import { Box,  Button,  Card,    Grid,   useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services' 
import { IUser } from 'src/contract/models/user'
import { toast } from 'react-hot-toast'   
 import { useRouter } from 'next/router'
import { getCleanErrorMessage } from 'src/utils/helpers' 
import UserAlumniHeader from 'src/layouts/components/UserGroupAlumniHeader'
 import Alumni from 'src/contract/models/alumni' 
import { SocialAlumniProvider } from 'src/context/SocialAlumniContext'
import { useAlumniFeed } from 'src/hooks/useAlumniFeed'
 import PostfeedAlumni from 'src/views/social-feed/PostfeedAlumni'
import ListFeedViewAlumni from 'src/views/social-feed/ListFeedViewAlumni'
import ShareArea from 'src/layouts/components/ShareArea'
import ButtonJoinAlumni from 'src/layouts/components/ButtonJoinAlumni' 
// import LIstAlumniLeft from 'src/views/alumni/ListAlumniLeft'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import SideAdAlumni from 'src/views/banner-ad/sideadAlumni'
// import CardAlumni from 'src/views/alumni/CardAlumni'
// import CardAlumniLogi from 'src/views/alumni/CardAlumniLogo'
// import CardAlumniLogo from 'src/views/alumni/CardAlumniLogo'
import ListAlumniLeft from 'src/views/alumni/ListAlumniLeft'
import ListAlumniLeftContributor from 'src/views/alumni/ListAlumniContributor'
import ListMemberView from 'src/views/alumni/ListMember'
import ListAlumniTop from 'src/views/alumni/ListAlumniTop'
import ListAlumniLatter from 'src/views/alumni/ListAlumniLatter'
   
const ProfileCompany = () => {
  return (
    <SocialAlumniProvider>
      <UserFeedApp />
    </SocialAlumniProvider>
  )
}

const UserFeedApp = () => {
  const { fetchFeeds } = useAlumniFeed() 

  const router = useRouter();
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser 
  const iduser: any = user.id 
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni>() 
  const [status, setStatus] = useState<boolean>(false)
  const [showFeed, setShowFeed] = useState<boolean>(false)
  const [showAllMember, setShowMember] = useState<boolean>(false)
  const [url2, setUrl2] = useState<string>('')
  const { id } = router.query as { id: any }; 
  const [listContributor, setListContributor] = useState<any>(null)
  const [listTop, setListTop] = useState<any>(null)

  const firstload = async () => {
    let url = '';
    url = '/alumni/navigasi/?id=' + id
 
    try {
      // const listalumni = await HttpClient.get(url)
      const listalumnikintil = await HttpClient.get('/alumni/top-contributor', {
        alumni_id: id,
        page: 1,
        take: 5
      })
     debugger;
      setListContributor(listalumnikintil)
      const response = await HttpClient.get(url)
      if (response.data.alumni.length == 0) {
        toast.error(`Opps data tidak ditemukan`)

        return
      }
      const grup = response.data.alumni as Alumni
      setListTop(grup.membelimitr)
      setSelectedAlumni(grup)
      if (grup.statusmember == 'Leave') {
        setShowFeed(true)
        setUrl2('/alumni/leave')
      } else if (grup.statusmember == 'Waiting') {
          setShowFeed(false)
          setUrl2('/')
      } else {
        setShowFeed(false)
        setUrl2('/alumni/join')
      }

       
 
    } catch (error) {
      toast.error(`Opps ${getCleanErrorMessage(error)}`)
    }
  }
  
  // const buildConnectText = () => { 
  //   return 'Join'
  // }
   const seeAllMember = () => {
    // if (showFeed==true){
      setShowFeed(!showFeed)
    // } 
     setShowMember(!showAllMember)
   }
 const handleMassage = () => {
 
     setStatus(!status)
 }
  useEffect(() => {
    firstload()
    fetchFeeds({ take: 7, alumni_id: id, mPage: 1 })
  }, [id, status])

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
          <Grid container>{selectedAlumni && <UserAlumniHeader dataalumni={selectedAlumni} />}</Grid>

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
                    {selectedAlumni && (
                      <ButtonJoinAlumni
                        onMessage={handleMassage}
                        selectedAlumni={selectedAlumni}
                        iduser={iduser}
                        url={url2}
                      ></ButtonJoinAlumni>
                    )}
                  </Box>
                </Grid>
                <Grid xs={2} md={0.8}>
                  <ShareArea
                    subject={`Alumni Shared ${selectedAlumni?.title}.`}
                    url={`/alumni/?id=${selectedAlumni?.id}`}
                  ></ShareArea>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid container spacing={6} sx={{ marginTop: '1px' }}>
            <Grid item lg={2.5} md={2.5} xs={12}>
              <Grid item xs={12}>
                {/* logo */}
                {/* <CardAlumniLogo
                  onMessage={handleMassage}
                  selectedAlumni={selectedAlumni}
                  iduser={iduser}
                  label={buildConnectText()}
                  statusbutton={status}
                /> */}
              </Grid>

              {/* <Grid item xs={12}>
                <CardAlumni
                  onMessage={handleMassage}
                  selectedAlumni={selectedAlumni}
                  iduser={iduser}
                  label={'tes'}
                  statusbutton={status}
                />
              </Grid> */}
              {selectedAlumni?.user_id == iduser && (
                <>
                  <Grid item xs={12}>
                    <ListAlumniLatter alumni={selectedAlumni} />
                  </Grid>
                  <Grid item xs={12}>
                    <ListAlumniLeft idalumni={id} reload={firstload} />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <ListAlumniTop listAlumni={listTop} />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Button variant='contained' color='primary' type='button' fullWidth onClick={() => seeAllMember()}>
                  See All Member
                </Button>
              </Grid>
              <Grid item xs={12}>
                <ListAlumniLeftContributor listAlumni={listContributor?.data?.alumnis} />
              </Grid>

              <Grid item xs={12}>
                <KeenSliderWrapper>
                  <SideAdAlumni />
                </KeenSliderWrapper>
              </Grid>
            </Grid>

            <Grid item lg={9.5} md={9.5} xs={12}>
              {showFeed == true && <PostfeedAlumni id={id} />}
              {showFeed == true && <ListFeedViewAlumni username={id} />}
              {showAllMember && (
                <>
                  <ListMemberView listMember={selectedAlumni?.member}></ListMemberView>
                </>
              )}
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