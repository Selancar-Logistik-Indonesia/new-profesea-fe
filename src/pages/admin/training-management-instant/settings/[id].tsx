// ** React Imports
import React, { useState , useEffect} from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Tabs, Tab, useMediaQuery } from '@mui/material'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
// import Icon from 'src/@core/components/icon' 
import { useTheme } from '@mui/material/styles'

import { useRouter } from 'next/router'
import QuestionForm from './QuestionForm'
import QuestionPreview from './QuestionPreview'

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
const InstantDetail = () => {
  const theme = useTheme()
  const router = useRouter();
  const trainingId = router.query.id;
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const firstload = async () => {
    
  }
   useEffect(() => { 
     firstload()
   }, []) 

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
        <Grid item xs={12} 
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
                <Tab label="Settings" {...a11yProps(0)} />
                <Tab label="Preview" {...a11yProps(1)} />
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
                  <QuestionForm training_id={trainingId}></QuestionForm>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <QuestionPreview training_id={trainingId}></QuestionPreview>
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

InstantDetail.acl = {
  action: 'read',
  subject: 'admin-training-management'
};
export default InstantDetail
