// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Tabs, Tab, useMediaQuery, Collapse, CardHeader, IconButton, Autocomplete, TextField, Typography } from '@mui/material'
import { Grid } from '@mui/material'
// import Icon from 'src/@core/components/icon' 
import { useTheme } from '@mui/material/styles'

import { HttpClient } from 'src/services'
import { Icon } from '@iconify/react'
import FindJob from './list'
import AllJobApplied from './applied'
import Degree from 'src/contract/models/degree'
import JobCategory from 'src/contract/models/job_category'
import RoleLevel from 'src/contract/models/role_level'
import RoleType from 'src/contract/models/role_type' 
import { DateType } from 'src/contract/models/DatepickerTypes'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

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

const SeafererJob = () => {

  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  // const [collapsed2, setCollapsed2] = useState<boolean>(false) 
  const [JobCategory, getJobCategory] = useState<any[]>([]);
  const [Education, getEducation] = useState<any[]>([]);
  const [RoleLevel, getRoleLevel] = useState<any[]>([]);  
  const [RoleType, getRoleType] = useState<any[]>([]);

  const [JT, setJT] = useState(0);
  const [JC, setJC] = useState(0);
  const [RL, setRL] = useState(0);
  const [ED, setED] = useState(0);
  const [DB, setDB] = useState<DateType>(null);
  // const [VT, setVT] = useState(0);
  
  const [textCompany, SetTextCompany] = useState<any>('') 

  const firstload = () => {
   
    HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
        if (response.status != 200) {
            throw response.data.message ?? "Something went wrong!";
        }
        getRoleLevel(response.data.roleLevels.data);
    })
    HttpClient.get(`/public/data/role-type?search=&page=1&take=250`).then(response => {
        if (response.status != 200) {
            throw response.data.message ?? "Something went wrong!";
        }
        getRoleType(response.data.roleTypes.data);
    })
    HttpClient.get(`/job-category?search=&page=1&take=250`).then(response => {
        if (response.status != 200) {
            throw response.data.message ?? "Something went wrong!";
        }
        getJobCategory(response.data.categories.data);
    })
    HttpClient.get(`/public/data/degree`).then(response => {
        if (response.status != 200) {
            throw response.data.message ?? "Something went wrong!";
        }
        getEducation(response.data.degrees);
    })
  }
  useEffect(() => {
    firstload()
  }, [])

  const [value, setValue] = React.useState(0);
  const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    getColor('#FFFFFF');
  };

  const vFilter = {
    'roletype' : JT,
    'category' : JC,
    'level' : RL,
    'education':ED,
    // 'vessel': VT,
    'date':DB?.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).split('/').reverse().join('-')
  }

  
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={5} xs={12}>
          <Box mb={3}>
            <Card>
              <CardContent>
                <TextField
                  id='fullName'
                  // defaultValue={props.datauser.name}
                  label='Search Recruiter Name'
                  variant='outlined'
                  fullWidth
                  onChange={e => SetTextCompany(e.target.value)}
                />
              </CardContent>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    Basic Search
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed}>
                <CardContent>
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-demo'
                    options={RoleType}
                    getOptionLabel={(option: RoleType) => option.name}
                    renderInput={params => <TextField {...params} label='Job Title' />}
                    onChange={(event: any, newValue: RoleType | null) =>
                      newValue?.id ? setJT(newValue?.id) : setJT(0)
                    }
                  />
                  {/* Category */}
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-level'
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Job Category' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? setJC(newValue?.id) : setJC(0)
                    }
                  />
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-level'
                    options={RoleLevel}
                    getOptionLabel={(option: RoleLevel) => option.levelName}
                    renderInput={params => <TextField {...params} label='Role Level' />}
                    onChange={(event: any, newValue: RoleLevel | null) =>
                      newValue?.id ? setRL(newValue?.id) : setRL(0)
                    }
                  />
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-demo'
                    options={Education}
                    getOptionLabel={(option: Degree) => option.name}
                    renderInput={params => <TextField {...params} label='Education' />}
                    onChange={(event: any, newValue: Degree | null) => (newValue?.id ? setED(newValue?.id) : setED(0))}
                  />
                  <DatePickerWrapper>
                    <DatePicker
                      minDate={new Date()}
                      dateFormat='dd/MM/yyyy'
                      id='basic-input'
                      onChange={(date: Date) => setDB(date)}
                      placeholderText='Click to select a date'
                      customInput={
                        <TextField label='Date On Board' variant='outlined' fullWidth sx={{ marginBottom: 2 }} />
                      }
                    />
                  </DatePickerWrapper>
                </CardContent>
              </Collapse>
            </Card>
          </Box>
        </Grid>
        <Grid
          item
          lg={9}
          md={7}
          xs={12}
          sx={
            !hidden
              ? {
                  direction: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch',
                  alignContent: 'top',
                  marginBottom: '10px'
                }
              : {}
          }
        >
          <Grid item xs={12}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                background: '#FFFFFF',
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '10px'
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
                sx={{ '& button.Mui-selected': { backgroundColor: '#32487A', color: 'white', borderRadius: '4px' } }}
              >
                <Tab label='Find Job' {...a11yProps(0)} />
                <Tab label='Job Applied' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Grid
              container
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                background: color,
                border: '1px solid rgba(76, 78, 100, 0.12)',
                borderRadius: '10px',
                marginTop: '10px',
                direction: 'row',
                justifyContent: 'flex-start',
                alignItems: 'top',
                alignContent: 'top'
              }}
            >
              <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                  <Grid item xs={12}>
                    <Grid item xs={9}></Grid>
                    <Grid md={12} xs={3} item justifyContent={'right'} marginTop={'10px'}></Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={value} index={0}>
                  <FindJob filter={vFilter} search={textCompany} aSearch={[]}></FindJob>
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
