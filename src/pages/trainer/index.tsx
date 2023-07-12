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
import AdsList from 'src/layouts/components/Ads'

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
            direction: "row",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: 'top',
            marginBottom: '10px', 


          } : {
          }}
        >
          <Grid item xs={12}>
            <Box sx={{
              borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '10px'
            }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ "& button.Mui-selected": { backgroundColor: '#32487A', color: 'white', borderRadius: '4px' } }} >
                <Tab label="Edit Profile" {...a11yProps(0)} />
                <Tab label="Subcription" {...a11yProps(1)} />
                <Tab label="Change Password" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <Grid container sx={{
              borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
              background: color,
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '10px',
              marginTop: '10px',
              direction: "row",
              justifyContent: "flex-start",
              alignItems: "top",
              alignContent: 'top',
            }}>
              <Grid item xs={12} >
                <TabPanel value={value} index={0}>
                  <Grid container xs={12}>
                    <Grid container xs={9}>  
                    </Grid>
                    <Grid md={12} xs={3} container justifyContent={'right'} marginTop={'10px'}>
                    </Grid>
                  </Grid>                    
                </TabPanel>
                <TabPanel value={value} index={0}>
                { selectedItem!= null &&  <CompanyProfile  visible={true}  datauser={selectedItem} address={selectedItem.address}/>}
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
        <Grid item xs={2} display={'flex'} sx={{direction:"row",
              justifyContent:"flex-start",
              alignContent:'top',
              alignItems:"stretch"}}>
                <AdsList /> 
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
