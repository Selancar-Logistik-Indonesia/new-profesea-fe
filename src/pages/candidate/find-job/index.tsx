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
import { IUser } from 'src/contract/models/user'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import Countries from 'src/contract/models/country'
import City from 'src/contract/models/city'
import Company from 'src/contract/models/company'
import VesselType from 'src/contract/models/vessel_type'
import Industry from 'src/contract/models/industry'

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

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  // const [collapsed2, setCollapsed2] = useState<boolean>(false) 
  const [JobCategory, getJobCategory] = useState<any[]>([]);
  const [Education, getEducation] = useState<any[]>([]);
  const [RoleLevel, getRoleLevel] = useState<any[]>([]);
  const [RoleType, getRoleType] = useState<any[]>([]) 

  const [JT, setJT] = useState(0);
  const [JC, setJC] = useState(0);
  const [RL, setRL] = useState(0);
  const [ED, setED] = useState(0);
  const [DB, setDB] = useState<DateType>(null);

   
  
  const [combocountry, getComboCountry] = useState<any>([])
  const [combocity, getComboCity] = useState<any[]>([])
  // const [combocompany, getComboCompany] = useState<any>([])
  const [combovessel, getComboVessel] = useState<any>([])
  const [comboindustri, getComboIndustry] = useState<any[]>([])
  
  const [idcity, setCombocity] = useState<any>()
  
  const [idcountry, setCountry] = useState<any>() 
  // const [idcompany, setCompany] = useState<any>() 
  const [idvessel, setVesel] = useState<any>() 
  const [idindustry, setIndustry] = useState<any>() 
  // const [VT, setVT] = useState(0);

  const [textCompany, SetTextCompany] = useState<any>('')

  const firstload = () => {
 
    HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? "Something went wrong!";
      }
      getRoleLevel(response.data.roleLevels.data);
    })

    if(JC != 0){
      HttpClient.get(`/public/data/role-type?search=&page=1&take=250&category_id=${JC}`).then(response => {
        if (response.status != 200) {
          throw response.data.message ?? "Something went wrong!";
        }
        getRoleType(response.data.roleTypes.data);
      })
    } 
    HttpClient.get(`/job-category?search=&page=1&take=250&employee_type=${user?.employee_type}`).then(response => {
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
    HttpClient.get('/public/data/country?search=').then(response => {
      const code = response.data.countries
      getComboCountry(code)
    })
    
    HttpClient.get('/public/data/vessel-type?page=1&take=25&search').then(response => {
      const code = response.data.vesselTypes.data
      getComboVessel(code)
    })
    HttpClient.get('public/data/industry?').then(response => {
      const code = response.data.industries
      getComboIndustry(code)
    })

    
  }
  useEffect(() => {
    firstload()
  }, [JC])

  const [value, setValue] = React.useState(0);
  const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    getColor('#FFFFFF');
  };

  const vFilter = {
    'roletype': JT,
    'category': JC,
    'level': RL,
    'education': ED,
    'city': idcity,
    'country': idcountry,
    'vessel': idvessel,
    'industry': idindustry,
    // 'vessel': VT,
    'date': DB?.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).split('/').reverse().join('-')
  }
  const searchcity = async (q: any) => {
    setCountry(q)
    const resp = await HttpClient.get('/public/data/city?search=&country_id=' + q)
    if (resp.status != 200) {
      throw resp.data.message ?? 'Something went wrong!'
    }
    const code = resp.data.cities
    getComboCity(code)
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={5} xs={12}>
          <Box mb={3}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
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
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
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
                  {user.employee_type === 'onship' ? (
                    <>
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
                        onChange={(event: any, newValue: Degree | null) =>
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        options={combovessel}
                        getOptionLabel={(option: VesselType) => option.name}
                        renderInput={params => <TextField {...params} label='Type Of Vessel' />}
                        onChange={(event: any, newValue: VesselType | null) =>
                          newValue?.id ? setVesel(newValue?.id) : setVesel('')
                        }
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
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        disabled
                        options={Education}
                        getOptionLabel={(option: Company) => option.name}
                        renderInput={params => <TextField {...params} label='Company' />}
                        onChange={(event: any, newValue: Company | null) =>
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }
                      />
                      
                    </>
                  ) : (
                    <>
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
                        onChange={(event: any, newValue: Degree | null) =>
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }
                      />
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={combocountry}
                        getOptionLabel={(option: any) => option.nicename}
                        renderInput={params => <TextField {...params} label='Country' />}
                        onChange={(event: any, newValue: Countries | null) =>
                          newValue?.id ? searchcity(newValue.id) : searchcity('')
                        }
                      />
                      <Autocomplete
                        disablePortal
                        id='city'
                        // value={props.datauser.address?.city}
                        options={combocity}
                        getOptionLabel={(option: City) => option.city_name}
                        renderInput={params => <TextField {...params} label='City' sx={{ mb: 2 }} />}
                        onChange={(event: any, newValue: City | null) =>
                          newValue?.id ? setCombocity(newValue.id) : setCombocity('')
                        }
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        disabled
                        options={Education}
                        getOptionLabel={(option: Company) => option.name}
                        renderInput={params => <TextField {...params} label='Company' />}
                        onChange={(event: any, newValue: Company | null) =>
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        options={comboindustri}
                        getOptionLabel={(option: Industry) => option.name}
                        renderInput={params => <TextField {...params} label='Employment Type' />}
                        onChange={(event: any, newValue: Industry | null) =>
                          newValue?.id ? setIndustry(newValue?.id) : setIndustry('')
                        }
                      />
                    </>
                  )}
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
