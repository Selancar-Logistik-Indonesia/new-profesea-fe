// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import {  Tabs, Tab, useMediaQuery } from '@mui/material' 
import { Grid } from '@mui/material' 
import { useForm } from 'react-hook-form'  
// import Icon from 'src/@core/components/icon' 
import CompanyProfile from 'src/layouts/components/CompanyProfile' 
import { useTheme } from '@mui/material/styles'
import ManageAccount from 'src/layouts/components/ManageAccount'
import Subscription from 'src/layouts/components/Subscription'
// import CompanyProfilePreview from 'src/layouts/components/CompanyProfilePreview'
import {IUser} from 'src/contract/models/user'

import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'

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
const Company = () => { 
   
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  // const [openPreview, setOpenPreview] = useState(false);
  
  // const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser; 
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser; 
   const [selectedItem, setSelectedItem] = useState<IUser|null>(null);
  const { 
  } = useForm<FormData>({
    mode: 'onBlur',
  },) 
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
 
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
            {/* <Typography>{children}</Typography> */}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue == 1) {
      getColor('#ffeae9');
    } else {

      getColor('#FFFFFF');
    }
  };
  // const label = openPreview ? 'Edit Profil' :'Preview Profile'; 
  // function klikbutton() {  
  //   setSelectedItem(user)
  //   setOpenPreview(!openPreview);
  // }
  function firstload(){
    HttpClient.get(AppConfig.baseUrl + "/user/"+user.id)
      .then((response) => {
          const user = response.data.user as IUser; 
          setSelectedItem(user);
      })
  }

  useEffect(() => {
    // setOpenPreview(false)
    firstload()
  }, [])
  
  return (
    <Box  >
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}
          sx={!hidden ? {
            p: 4,
            direction: "row",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: 'top',
            marginBottom: '10px', 


          } : {
          }}
        >
          <Grid xs={12}>
            <Box sx={{
              borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '40px'
            }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ "& button.Mui-selected": { backgroundColor: '#32487A', color: 'white', borderRadius: '4px' } }} >
                {/* <Tab label="PROFILE" href='/company/profile' /> */}
                <Tab label="COMPANY BUILDER" {...a11yProps(0)} />
                <Tab label="ACCOUNT" {...a11yProps(1)} />
                <Tab label="MANAGE" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <Grid container sx={{
              borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
              background: color,
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              marginTop: '10px',
              direction: "row",
              justifyContent: "flex-start",
              alignItems: "top",
              alignContent: 'top',
            }}>
              <Grid item xs={12} >
                <TabPanel value={value} index={0}>
                  <Grid container xs={12}>
                    <Grid container xs={9}>  </Grid>
                    <Grid md={12} xs={3} container justifyContent={'right'} marginTop={'10px'}>
                      {/* <Button size='small' type='button' variant='contained' sx={{ backgroundColor: '#26C6F9' }} startIcon={<Icon icon={'mdi:visibility-outline'} />}
                       onClick={klikbutton}>
                        {label}
                      </Button> */}
                    </Grid>
                  </Grid> 
                  {/* {openPreview && selectedItem!= null && <CompanyProfilePreview  visible={openPreview} datauser={selectedItem}/>} */}
                  { selectedItem!= null &&  <CompanyProfile  visible={true}  datauser={selectedItem} address={selectedItem.address}/>}
                      
                     
               
                   
                </TabPanel>
                <TabPanel value={value} index={0}>

                  {/* <Grid container xs={12}>
                    <Grid container xs={12} md={2}>
                      <Button size='small' type='button' variant='text' startIcon={<Icon icon={'mdi:arrow-left'} />}>
                        Back
                      </Button>  </Grid>

                    <Grid container display={{ xs: "none", lg: "block" }} md={6}>  </Grid>

                    <Grid container md={3} xs={12} marginTop={'10px'} display={{ xs: "2", lg: "flex" }}   >
                      <Grid md={5} xs={2} sx={{ mb: 1 }} >
                        <Button size='small' type='button' variant='contained' sx={{ backgroundColor: '#6D788D' }} startIcon={<Icon icon={'mdi:share-variant'} />}>
                          Share
                        </Button>
                      </Grid>
                      < Grid md={7} xs={6} sx={{ mb: 1 }} >
                        <Button size='small' type='button' variant='contained' sx={{ backgroundColor: '#FF9600' }} startIcon={<Icon icon={'mdi:square-edit-outline'} />}>
                          Edit Profil
                        </Button>
                      </Grid>


                    </Grid>
                  </Grid> */}
                  {/* <CompanyProfilePreview></CompanyProfilePreview> */}
                  {/* <UserProfileHeader></UserProfileHeader> */}
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <ManageAccount></ManageAccount>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Subscription></Subscription>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <Grid xs={2} item display={'flex'} marginTop={'15px'} sx={{
          direction: "row",
          justifyContent: "flex-start",
          alignContent: 'top',
          alignItems: "stretch"
        }}>
          <Grid>
            <Grid item xs={12} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              marginBottom: '10px', 
              height: '197px',
              wrap: 'nowrap'
            }}>

            </Grid>
            <Grid item xs={12} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              marginBottom: '10px', 
              height: '197px',
              wrap: 'nowrap'
            }}>

            </Grid>
            <Grid item xs={12} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              marginBottom: '10px', 
              height: '197px',
              wrap: 'nowrap'
            }}>

            </Grid>
          </Grid>







        </Grid>

      </Grid>




    </Box>



  )
}

// Company.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

// Company.guestGuard = true

Company.acl = {
  action: 'read',
  subject: 'home'
};
export default Company
