// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Tabs, Tab, useMediaQuery, Collapse, CardHeader, IconButton, Autocomplete, TextField, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
// import Icon from 'src/@core/components/icon' 
import { useTheme } from '@mui/material/styles'

import { HttpClient } from 'src/services'
import { Icon } from '@iconify/react'
import FindJob from './list'
import AllJobApplied from './applied'
import Degree from 'src/contract/models/degree'
import JobCategory from 'src/contract/models/job_category'
import RoleLevel from 'src/contract/models/role_level'

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
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [collapsed2, setCollapsed2] = useState<boolean>(false)
  const [collapsed3, setCollapsed3] = useState<boolean>(false)
  const [collapsed4, setCollapsed4] = useState<boolean>(false)  
  const [collapsed5, setCollapsed5] = useState<boolean>(false)
  const [collapsed6, setCollapsed6] = useState<boolean>(false)
  // const [collapsed7, setCollapsed7] = useState<boolean>(false)
  const [collapsed8, setCollapsed8] = useState<boolean>(false)
  const [collapsed9, setCollapsed9] = useState<boolean>(false)
  const [JobCategory, getJobCategory] = useState<any[]>([]);
  const [Education, getEducation] = useState<any[]>([]);
  const [RoleLevel, getRoleLevel] = useState<any[]>([]);

  const firstload = async () => {
    const res = await HttpClient.get(`/public/data/role-level?search=&page=1&take=250`);
    if (res.status != 200) {
      throw res.data.message ?? "Something went wrong!";
    }
    getRoleLevel(res.data.roleLevels.data);

    const res2 = await HttpClient.get(`/job-category?search=&page=1&take=250`);
    if (res2.status != 200) {
      throw res2.data.message ?? "Something went wrong!";
    }
    getJobCategory(res2.data.categories.data);

    const res3 = await HttpClient.get(`/public/data/degree`);
    if (res3.status != 200) {
      throw res3.data.message ?? "Something went wrong!";
    }
    getEducation(res3.data.degrees);
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
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={3} md={5} xs={12}>
        <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Recruiter
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
                    disablePortal
                    id="combo-box-level"
                    options={RoleLevel}
                    getOptionLabel={(option: RoleLevel) => option.levelName}
                    renderInput={(params) => <TextField {...params} label="Recruiter" />}
                    onChange={(event: any, newValue: RoleLevel | null) => (newValue?.id) ? '' : ''}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Type of Employment
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse2'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed2(!collapsed2)}
                  >
                    <Icon fontSize={20} icon={!collapsed2 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed2}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id="combo-box-level"
                    options={RoleLevel}
                    getOptionLabel={(option: RoleLevel) => option.levelName}
                    renderInput={(params) => <TextField {...params} label="Type of Employment" />}
                    onChange={(event: any, newValue: RoleLevel | null) => (newValue?.id) ? '' : ''}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Role Level
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse3'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed3(!collapsed3)}
                  >
                    <Icon fontSize={20} icon={!collapsed3 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed3}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id="combo-box-level"
                    options={RoleLevel}
                    getOptionLabel={(option: RoleLevel) => option.levelName}
                    renderInput={(params) => <TextField {...params} label="Role Level" />}
                    onChange={(event: any, newValue: RoleLevel | null) => (newValue?.id) ? '' : ''}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Role Type
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse4'
                    sx={{ color: '#424242' }}
                    onClick={() => setCollapsed4(!collapsed4)}
                  >
                    <Icon fontSize={20} icon={!collapsed4 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed4}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={(params) => <TextField {...params} label="Role Type" />}
                    onChange={(event: any, newValue: JobCategory | null) => (newValue?.id) ? /*setCatId(newValue.id) : setCatId(0)*/ '' : ''}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Job Title
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse5'
                    sx={{ color: '#424242' }}
                    onClick={() => setCollapsed5(!collapsed5)}
                  >
                    <Icon fontSize={20} icon={!collapsed5 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed5}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={(params) => <TextField {...params} label="Job Title" />}
                    onChange={(event: any, newValue: JobCategory | null) => (newValue?.id) ? /*setCatId(newValue.id) : setCatId(0)*/ '' : ''}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
               title={
                <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                  Education
                </Typography>
              }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse6'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed6(!collapsed6)}
                  >
                    <Icon fontSize={20} icon={!collapsed6 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed6}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Education}
                    getOptionLabel={(option: Degree) => option.name}
                    renderInput={(params) => <TextField {...params} label="Education" />}
                    onChange={(event: any, newValue: Degree | null) => (newValue?.id) ? '' : ''}
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          {/* <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Salary Range
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse7'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed7(!collapsed7)}
                  >
                    <Icon fontSize={20} icon={!collapsed7 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed7}>
                <CardContent>
                 
                  <br></br>
                  <Slider
                    getAriaLabel={() => 'Rp'}
                    min={0}
                    step={100000}
                    max={100000000}
                    value={valueSalary}
                    onChange={handleChangeSalary}
                    valueLabelDisplay='on'
                    valueLabelFormat={valuetext}
                    size='small'
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box> */}
          <Box mb={3}>
            <Card>
              <CardHeader
               title={
                <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                  Type of Vessel
                </Typography>
              }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse8'
                    sx={{ color: '#424242' }}
                    onClick={() => setCollapsed8(!collapsed8)}
                  >
                    <Icon fontSize={20} icon={!collapsed8 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed8}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Type of Vessel' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? /*setCatId(newValue.id) : setCatId(0)*/ '' : ''
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
               title={
                <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                  Date on Board
                </Typography>
              }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse9'
                    sx={{ color: '#424242' }}
                    onClick={() => setCollapsed9(!collapsed9)}
                  >
                    <Icon fontSize={20} icon={!collapsed9 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed9}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='combo-box-demo'
                    options={JobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} label='Date on Board' />}
                    onChange={(event: any, newValue: JobCategory | null) =>
                      newValue?.id ? /*setCatId(newValue.id) : setCatId(0)*/ '' : ''
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          {/* <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Location
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse7'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed7(!collapsed7)}
                  >
                    <Icon fontSize={20} icon={!collapsed7 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed7}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='code'
                    options={combocode}
                    getOptionLabel={(option: Countries) => option.nicename}
                    // defaultValue={props.datauser?.country}
                    renderInput={params => <TextField {...params} label='Location' sx={{ mb: 2 }} />}
                    onChange={(event: any, newValue: Countries | null) =>
                      newValue?.id ? searchcity(newValue.id) : searchcity(0)
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box>
          <Box mb={3}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="body2" style={{ fontSize: '14px', color: '#424242' }}>
                    Region of Travel
                  </Typography>
                }
                action={
                  <IconButton
                    size='small'
                    aria-label='collapse8'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => setCollapsed8(!collapsed8)}
                  >
                    <Icon fontSize={20} icon={!collapsed8 ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                  </IconButton>
                }
              />
              <Collapse in={collapsed8}>
                <CardContent>
                  <Autocomplete
                    disablePortal
                    id='code'
                    options={combocode}
                    getOptionLabel={(option: Countries) => option.nicename}
                    // defaultValue={props.datauser?.country}
                    renderInput={params => <TextField {...params} label='Code' sx={{ mb: 2 }} />}
                    onChange={(event: any, newValue: Countries | null) =>
                      newValue?.id ? searchcity(newValue.id) : searchcity(0)
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
                      newValue?.id ? setCombocity(newValue.id) : setCombocity(0)
                    }
                  />
                </CardContent>
              </Collapse>
            </Card>
          </Box> */}
          
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
