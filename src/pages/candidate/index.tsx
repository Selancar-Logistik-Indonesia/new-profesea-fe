// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { useMediaQuery, Typography, Avatar, IconButton, Tabs, Tab } from '@mui/material'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { IUser } from 'src/contract/models/user'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import CandidateProfile from 'src/layouts/components/CandidateProfile'
import { Icon } from '@iconify/react'
import DialogProfilePicture from './DialogProfilePicture'
import AccordionTabGeneral from './accordion-tab-general/AccordionTabGeneral'
import EducationTab from './education-tab/EducationTab'
import TravelDocumentTab from './travel-document-tab/TravelDocumentTab'
import SeaExperienceTab from './sea-experience-tab/SeaExperienceTab'
import CertificateTab from './certificate-tab/CertificateTab'

type FormData = {
  companyName: string
  industryType: string
  country: string
  district: string
  city: string
  postalCode: string
  email: string
  code: string
  website: string
  phone: string
  address: string
  about: string
}

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: '24px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const Candidate = () => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const {} = useForm<FormData>({
    mode: 'onBlur'
  })
  const [profilePic, setProfilePic] = useState<any>(null)
  const [openUpateProfilePic, setOpenUpdateProfilePic] = useState(false)
  const [tabsValue, setTabsValue] = useState(0)

  function Firstload() {
    HttpClient.get(AppConfig.baseUrl + '/user/' + user.id).then(response => {
      const resUser = response.data.user as IUser
      setSelectedUser(resUser)
      setProfilePic(resUser?.photo ? resUser?.photo : null)
    })
  }

  const handleDefaultBanner = (): string => {
    if (AppConfig.appEnv === 'DEV') {
      return selectedUser?.team_id == 3
        ? '/images/banner/employer-banner.png'
        : selectedUser?.employee_type == 'onship'
        ? '/images/banner/seafarer-banner.png'
        : '/images/banner/professional-banner.png'
    }

    return selectedUser?.banner
      ? selectedUser?.banner
      : selectedUser?.team_id == 3
      ? '/images/banner/employer-banner.png'
      : selectedUser?.employee_type == 'onship'
      ? '/images/banner/seafarer-banner.png'
      : '/images/banner/professional-banner.png'
  }

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setTabsValue(newValue)
  }

  useEffect(() => {
    // setOpenPreview(false)
    Firstload()
  }, [])

  if (selectedUser?.employee_type == 'offship') {
    return (
      <>
        <Grid item xs={12}>
          <Grid
            container
            item
            xs={12}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              boxSizing: 'border-box',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '5px',
              backgroundColor: '#FFFFFF',
              marginTop: '10px',
              direction: 'row',
              justifyContent: 'flex-start',
              alignItems: 'top',
              alignContent: 'top',
              padding: '20px'
            }}
          >
            <Grid item xs={12}>
              <Grid container item xs={12} marginBottom={'10px'}>
                <Grid container item xs={12} justifyContent={'left'}>
                  <Typography variant='h3' color={'#32487A'} fontWeight='800' fontSize={18}>
                    {' '}
                    Resume Builder
                  </Typography>
                </Grid>
              </Grid>
              {selectedUser != null && (
                <CandidateProfile visible={true} datauser={selectedUser} address={selectedUser.address} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <>
      <DialogProfilePicture
        isOpen={openUpateProfilePic}
        onClose={() => setOpenUpdateProfilePic(!openUpateProfilePic)}
      />
      <Grid
        container
        sx={
          isMobile
            ? {
                width: '100%',
                display: 'flex',
                alignItems: 'center'
              }
            : {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '96px',
                paddingRight: '96px'
              }
        }
      >
        <Box sx={{ width: '100%', borderRadius: '12px', boxShadow: 3, backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
          <Box
            component='img'
            alt='profile-header'
            src={handleDefaultBanner()}
            sx={{
              width: '100%',
              objectFit: 'cover',
              height: isMobile ? '81px' : '',
              borderRadius: '0 !important'
            }}
          />
          <Grid container sx={{ p: isMobile ? '16px' : '32px', display: 'flex', gap: '12px' }}>
            <Grid
              item
              xs={12}
              md={true}
              sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: isMobile ? '90px' : undefined,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'absolute',
                  padding: '4px',
                  bottom: isMobile ? '50px' : '70px'
                }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={profilePic ? profilePic : '/images/default-user-new.png'}
                    sx={{ width: isMobile ? 64 : 160, height: isMobile ? 64 : 160 }}
                  />
                  <IconButton
                    aria-label='upload picture'
                    component='label'
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white'
                    }}
                    onClick={() => setOpenUpdateProfilePic(true)}
                  >
                    <Icon icon='iconoir:camera' fontSize={isMobile ? '8px' : '22px'} />
                  </IconButton>
                </Box>

                {/* todo next sprint */}
                {/* <Button
                  aria-label='download'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    padding: isMobile ? '4px !important' : '8px 12px !important',
                    alignItems: 'center',
                    fontFamily: 'Figtree',
                    fontSize: isMobile ? '10px' : '16px',
                    fontWeight: 400,
                    color: '#404040',
                    textTransform: 'capitalize',
                    alignSelf: 'flex-end',
                    border: isMobile ? '0.387px solid #F0F0F0' : '1px solid #F0F0F0'
                  }}
                >
                  <Icon icon='material-symbols-light:download-sharp' fontSize={isMobile ? '20px' : '24px'} />
                  Download Resume
                </Button> */}
              </Box>
              <Box sx={{ marginTop: '40px' }}>
                <Typography
                  sx={{
                    fontSize: isMobile ? '14px' : '24px',
                    fontWeight: 700,
                    fontFamily: 'Figtree',
                    color: '#404040',
                    textTransform: 'capitalize'
                  }}
                >
                  {selectedUser?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: isMobile ? '14px' : '18px',
                    fontWeight: 400,
                    fontFamily: 'Figtree',
                    color: '#404040'
                  }}
                >
                  {selectedUser?.role == 'Seafarer' ? selectedUser?.field_preference?.job_category?.name : '-'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={tabsValue}
                onChange={handleChangeTabs}
                indicatorColor='primary'
                textColor='inherit'
                variant={isMobile ? 'scrollable' : 'fullWidth'}
                scrollButtons={isMobile ? true : false}
                allowScrollButtonsMobile={isMobile ? true : false}
                aria-label='full width tabs example'
              >
                <Tab sx={{ textTransform: 'capitalize' }} label='General' {...a11yProps(0)} />
                <Tab sx={{ textTransform: 'capitalize' }} label='Education' {...a11yProps(1)} />
                <Tab sx={{ textTransform: 'capitalize' }} label='Travel Document' {...a11yProps(2)} />
                <Tab sx={{ textTransform: 'capitalize' }} label='Sea Experience' {...a11yProps(3)} />
                <Tab sx={{ textTransform: 'capitalize' }} label='Certificate' {...a11yProps(4)} />
              </Tabs>
              <TabPanel value={tabsValue} index={0}>
                <AccordionTabGeneral />
              </TabPanel>
              <TabPanel value={tabsValue} index={1}>
                <EducationTab />
              </TabPanel>
              <TabPanel value={tabsValue} index={2}>
                <TravelDocumentTab />
              </TabPanel>
              <TabPanel value={tabsValue} index={3}>
                <SeaExperienceTab />
              </TabPanel>
              <TabPanel value={tabsValue} index={4}>
                <CertificateTab />
              </TabPanel>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

// Company.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

// Company.guestGuard = true

Candidate.acl = {
  action: 'read',
  subject: 'home'
}
export default Candidate
