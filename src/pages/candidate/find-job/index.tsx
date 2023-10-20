// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Tabs, Tab, useMediaQuery, Collapse, CardHeader, IconButton, Autocomplete, TextField, Typography, Alert, AlertTitle, CircularProgress } from '@mui/material'
import { Grid } from '@mui/material'
// import Icon from 'src/@core/components/icon' 
import { useTheme } from '@mui/material/styles'

import { HttpClient } from 'src/services'
import { Icon } from '@iconify/react'
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
import JobContext, { JobProvider } from 'src/context/JobContext'
import { useJob } from 'src/hooks/useJob'
// import RecomendedViewSubscribe from 'src/views/find-job/RecomendedViewSubscribe'
import InfiniteScroll from 'react-infinite-scroll-component'
import RecomendedView from 'src/views/find-job/RecomendedView'
// import Job from 'src/contract/models/job'

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
      {value == index && (
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

  return (
      <JobProvider>
          <SeafererJobApp />
      </JobProvider>
  )
}

const SeafererJobApp = () => {  
  const { setPage , fetchJobs, totalJob, hasNextPage} = useJob();

  // const [listJobSubscribe, setListJobSubscribe] = useState<Job[]>([])
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
  const [value, setValue] = React.useState(0)
  const [color, getColor] = useState<any>('#FFFFFF')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    getColor('#FFFFFF')
  }
  const firstload = () => {

    HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? "Something went wrong!";
      }
      getRoleLevel(response.data.roleLevels.data);
    })

    if (JC != 0) {
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

    HttpClient.get('/public/data/vessel-type?page=1&take=250&search').then(response => {
      const code = response.data.vesselTypes.data
      getComboVessel(code)
    })
    HttpClient.get('public/data/industry?').then(response => {
      const code = response.data.industries
      getComboIndustry(code)
    })


  }
  useEffect(() => {
    if(hidden ==true){
      setCollapsed(false)
    }else{
      setCollapsed(true)
    }
      firstload()
  }, [JC])
  
//   const getListJobsSubscribe = async () => {
//     const response = await HttpClient.get(
//         `/job?search=${textCompany}&roletype_id=${JT}&category_id=${JC}&rolelevel_id=${RL}&edugrade_id=${ED}&page=1&take=6`
//     )
//     const jobs = response.data.jobs.data

//     setListJobSubscribe(jobs)
// }

  const getdatapencarian = () => {
    fetchJobs( { take:9, search:textCompany, category_id:JC, edugrade_id: ED, rolelevel_id: RL, roletype_id: JT, vesseltype_id : idvessel, country_id: idcountry, city_id: idcity })

    // DB?.toLocaleDateString("en-GB", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit"
    // }).split('/').reverse().join('-')
  }
  useEffect(() => {
    getdatapencarian();
  }, [JC, textCompany, JT, RL, ED, idcountry, idcity, idvessel, idindustry, DB])

  const searchcity = async (q: any) => {
    setCountry(q)
    if(q){
      const resp = await HttpClient.get('/public/data/city?search=&country_id=' + q)
      if (resp.status != 200) {
        throw resp.data.message ?? 'Something went wrong!'
      }
      const code = resp.data.cities
      getComboCity(code)
    }
    
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={5} xs={12}>
          {/* <Box mb={3}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardContent></CardContent>
            </Card>
          </Box> */}
          <Box mb={3}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <CardHeader
                title={
                  <Typography variant='body2' style={{ fontSize: '14px', color: '#424242' }}>
                    Basic Filter
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
                  <Alert severity='info' sx={{ marginBottom: 2 }}>
                    Filter Job here
                  </Alert>
                  <TextField
                    id='fullName'
                    // defaultValue={props.datauser.name}
                    label='Search Job'
                    variant='outlined'
                    fullWidth
                    sx={{mb:2}}
                    onChange={(e) => {
                      setPage(1)
                      SetTextCompany(e.target.value)
                    }}
                  />
                  {/* Category */}
                  <Autocomplete
                    sx={{ marginBottom: 2 }}
                    disablePortal
                    id='combo-box-level'
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Job Category' />}
                    onChange={(event: any, newValue: JobCategory | null) =>{
                      setPage(1)
                      newValue?.id ? setJC(newValue?.id) : setJC(0)
                    }}
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
                        onChange={(event: any, newValue: RoleType | null) =>{
                          setPage(1)
                          newValue?.id ? setJT(newValue?.id) : setJT(0)
                        }}
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-level'
                        options={RoleLevel}
                        getOptionLabel={(option: RoleLevel) => option.levelName}
                        renderInput={params => <TextField {...params} label='Role Level' />}
                        onChange={(event: any, newValue: RoleLevel | null) =>{
                          setPage(1)
                          newValue?.id ? setRL(newValue?.id) : setRL(0)
                        }}
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        options={Education}
                        getOptionLabel={(option: Degree) => option.name}
                        renderInput={params => <TextField {...params} label='Education' />}
                        onChange={(event: any, newValue: Degree | null) =>{
                          setPage(1)
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }}
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        options={combovessel}
                        getOptionLabel={(option: VesselType) => option.name}
                        renderInput={params => <TextField {...params} label='Type Of Vessel' />}
                        onChange={(event: any, newValue: VesselType | null) =>{
                          setPage(1)
                          newValue?.id ? setVesel(newValue?.id) : setVesel('')
                        }}
                      />
                      <DatePickerWrapper>
                        <DatePicker
                          minDate={new Date()}
                          dateFormat='dd/MM/yyyy'
                          id='basic-input'
                          onChange={(date: Date) => {
                            setPage(1)
                            setDB(date)
                          }}
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
                        onChange={(event: any, newValue: Company | null) =>{
                          setPage(1)
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }}
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
                        onChange={(event: any, newValue: RoleLevel | null) =>{
                          setPage(1)
                          newValue?.id ? setRL(newValue?.id) : setRL(0)
                        }}
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        options={Education}
                        getOptionLabel={(option: Degree) => option.name}
                        renderInput={params => <TextField {...params} label='Education' />}
                        onChange={(event: any, newValue: Degree | null) =>{
                          setPage(1)
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }}
                      />
                      <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={combocountry}
                        getOptionLabel={(option: any) => option.nicename}
                        renderInput={params => <TextField {...params} label='Country' />}
                        onChange={(event: any, newValue: Countries | null) =>{
                          setPage(1)
                          newValue?.id ? searchcity(newValue.id) : searchcity('')
                        }}
                      />
                      <Autocomplete
                        disablePortal
                        id='city'
                        // value={props.datauser.address?.city}
                        options={combocity}
                        getOptionLabel={(option: City) => option.city_name}
                        renderInput={params => <TextField {...params} label='City' sx={{ mb: 2 }} />}
                        onChange={(event: any, newValue: City | null) =>{
                          setPage(1)
                          newValue?.id ? setCombocity(newValue.id) : setCombocity('')
                        }}
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        disabled
                        options={Education}
                        getOptionLabel={(option: Company) => option.name}
                        renderInput={params => <TextField {...params} label='Company' />}
                        onChange={(event: any, newValue: Company | null) =>{
                          setPage(1)
                          newValue?.id ? setED(newValue?.id) : setED(0)
                        }}
                      />
                      <Autocomplete
                        sx={{ marginBottom: 2 }}
                        disablePortal
                        id='combo-box-demo'
                        options={comboindustri}
                        getOptionLabel={(option: Industry) => option.name}
                        renderInput={params => <TextField {...params} label='Employment Type' />}
                        onChange={(event: any, newValue: Industry | null) =>{
                          setPage(1)
                          newValue?.id ? setIndustry(newValue?.id) : setIndustry('')
                        }}
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
                border: 0,
                boxShadow: 0,
                borderBottom: 1,
                borderColor: 'divider',
                boxSizing: 'border-box',
                color: 'common.white',
                backgroundColor: '#FFFFFF',
                borderRadius: '3px'
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='customized tabs example'
                //sx={{ '& button.Mui-selected': { backgroundColor: '#32487A', color: 'white', borderRadius: '4px' } }}
              >
                <Tab
                  label='Find Job'
                  icon={<Icon icon='solar:boombox-bold-duotone' fontSize={18} />}
                  {...a11yProps(0)}
                />
                <Tab
                  label='Job Applied'
                  icon={<Icon icon='solar:widget-add-bold-duotone' fontSize={18} />}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <Grid
              container
              sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF', background: color }}
            >
              <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                <Box padding={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={!hidden ? { alignItems: "stretch" } : {}}>
                            <Grid container spacing={6} >
                                <Grid item xs={12}>
                                    <Alert severity='info'>
                                        <AlertTitle>Find & Apply Job</AlertTitle>
                                        Based on <strong>your profile</strong> and <strong> your experience</strong>
                                    </Alert>
                                    {/* <RecomendedViewSubscribe listJob={listJobSubscribe} /> */}
                                    <JobContext.Consumer>
                                          {({ listJobs, onLoading }) => {
                                              if (onLoading) {
                                              
                                                  return (
                                                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                          <CircularProgress sx={{ mt: 20 }} />
                                                      </Box>
                                                  );
                                              }

                                              return (
                                                <InfiniteScroll
                                                  dataLength={totalJob}
                                                  next={() => getdatapencarian()}
                                                  hasMore={hasNextPage}
                                                  loader={(<Typography mt={5} color={'text.secondary'}>Loading..</Typography>)}
                                                >
                                                <RecomendedView listJob={listJobs} />
                                                </InfiniteScroll>
                                              )                       
                                          }}
                                        </JobContext.Consumer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
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
