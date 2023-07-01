// ** React Imports
import React, { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Button, Tabs, Tab, useMediaQuery } from '@mui/material'

// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { Grid } from '@mui/material'

import { useForm } from 'react-hook-form'

// import { yupResolver } from '@hookform/resolvers/yup'

import Icon from 'src/@core/components/icon'

// import { HttpClient } from 'src/services'
import CompanyProfile from 'src/layouts/components/CompanyProfile'

import { useTheme } from '@mui/material/styles'
import ManageAccount from 'src/layouts/components/ManageAccount'
import Subscription from 'src/layouts/components/Subscription'
import UserProfileHeader from 'src/layouts/components/UserProfileHeader'

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
  // const theme = useTheme()
  // const { settings } = useSettings()
  // ** Vars
  // const { skin } = settings


  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const {
    // register,  
    // handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  },)

  // const onSubmit = (data: FormData) => {

  //   const { companyName,industryType,country,district,city,postalCode,email,code,website,phone,address,about } = data
  //   const json ={
  //     'companynema': companyName,
  //     "email": industryType,
  //     "username": country,
  //     "password": district,
  //     "password_confirmation": city,
  //     "employee_type": postalCode,
  //     "team_id": email, 
  //     "country_id": code,
  //     "website": website,
  //     "address": address,
  //     "phone": phone,
  //     "about": about,
  //   };
  //   HttpClient.post('https://api.staging.selancar.elogi.id/api/auth/register', json).then(({ data }) => {
  //       console.log("here 1", data);
  //        }, error => { 
  //       console.log("here 1", error);
  //     });
  // }





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

  const [value, setValue] = React.useState(1);
  const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue == 2) {
      getColor('#ffeae9');
    } else {

      getColor('#FFFFFF');
    }
  };
  
return (
    <Box  >
      <Grid container spacing={2}>
        <Grid container xs={12} md={9}
          sx={!hidden ? {
            p: 4,
            direction: "row",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: 'top',
            marginBottom: '10px',
            marginLeft: '50px',


          } : {

          }}
        >
          <Grid xs={12}>
            <Box sx={{
              borderBottom: 1, borderColor: 'divider', boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px'
            }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ "& button.Mui-selected": { backgroundColor: '#32487A', color: 'white', borderRadius: '10px' } }} >
                <Tab label="PROFILE" href='/company/profile' />
                <Tab label="EDIT PROFILE" {...a11yProps(1)} />
                <Tab label="ACCOUNT" {...a11yProps(2)} />
                <Tab label="MANAGE" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <Grid container xs={12} sx={{
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


              <Grid xs={12} >
                <TabPanel value={value} index={1}>
                  <Grid container xs={12}>
                    <Grid container xs={9}>  </Grid>
                    <Grid md={12} xs={3} container justifyContent={'right'} marginTop={'10px'}>
                      <Button size='small' type='button' variant='contained' sx={{ backgroundColor: '#26C6F9' }} startIcon={<Icon icon={'mdi:visibility-outline'} />}>
                        Resume Preview
                      </Button>
                    </Grid>
                  </Grid>
                  <CompanyProfile></CompanyProfile>
                </TabPanel>
                <TabPanel value={value} index={0}>

                  <Grid container xs={12}>
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
                  </Grid>
                  {/* <CompanyProfilePreview></CompanyProfilePreview> */}
                  <UserProfileHeader></UserProfileHeader>
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <ManageAccount></ManageAccount>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Subscription></Subscription>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <Grid xs={2} container display={'flex'} marginTop={'15px'} sx={{
          direction: "row",
          justifyContent: "flex-start",
          alignContent: 'top',
          alignItems: "stretch"
        }}>
          <Grid xs={12}>
            <Grid xs={12} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              marginBottom: '10px',
              marginLeft: '20px',
              height: '197px',
              wrap: 'nowrap'
            }}>

            </Grid>
            <Grid xs={12} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              marginBottom: '10px',
              marginLeft: '20px',
              height: '197px',
              wrap: 'nowrap'
            }}>

            </Grid>
            <Grid xs={12} sx={{
              boxSizing: 'border-box',
              background: '#FFFFFF',
              border: '1px solid rgba(76, 78, 100, 0.12)',
              borderRadius: '20px',
              p: 4,
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'left',
              marginBottom: '10px',
              marginLeft: '20px',
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
