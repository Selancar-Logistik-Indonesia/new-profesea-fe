// ** React Imports
import React, { useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import {  Card, CardContent, Typography, Tabs, Tab, useMediaQuery } from '@mui/material'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
// import Icon from 'src/@core/components/icon' 
import { useTheme } from '@mui/material/styles'

import { Icon } from '@iconify/react'
import Profile from 'src/layouts/components/Profile'
import Feed from 'src/layouts/components/Feed'
import { useAuth } from 'src/hooks/useAuth'
import FindJob from './list'
import AllJobApplied from './applied'

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
const SeafererJob = () => {

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  
  const { user } = useAuth();
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
          <Box sx={{ p: 0 }}>
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
    getColor('#FFFFFF');
  };
  
  return (
    <Box  >
      <Grid container spacing={2}>
        <Grid item lg={3} md={5} xs={12}>
            <Profile datauser={user} />
            <Grid container mt={3} mb={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ columnGap: 2, flexWrap: 'wrap', alignItems: 'center' }} display={'flex'}>
                                <Icon icon={'arcticons:connect-you'} fontSize={30} />
                                <Typography variant='body1' sx={{ color: "#424242", fontWeight: 600 }}> Total Conected :250</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Feed />
        </Grid>
        <Grid item lg={9} md={7} xs={12} 
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
                <Tab label="Find Job" {...a11yProps(0)} />
                <Tab label="Job Applied" {...a11yProps(1)} />
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
                  <Grid item xs={12}>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid md={12} xs={3} item justifyContent={'right'} marginTop={'10px'}>
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={0}>
                  <FindJob></FindJob>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AllJobApplied></AllJobApplied>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>




    </Box>



  )
}

// OngoingTraining.getLayout = (page: ReactNode) => <BlankLayoutWithAppBar>{page}</BlankLayoutWithAppBar>

// OngoingTraining.guestGuard = true

SeafererJob.acl = {
  action: 'read',
  subject: 'seaferer-jobs'
};
export default SeafererJob
