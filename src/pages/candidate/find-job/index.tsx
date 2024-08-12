// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import {
  Tabs,
  Tab,
  useMediaQuery,
  Autocomplete,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
  // Tooltip
} from '@mui/material'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HttpClient } from 'src/services'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'
import AllJobApplied from './applied'
import Degree from 'src/contract/models/degree'
import JobCategory from 'src/contract/models/job_category'
import RoleLevel from 'src/contract/models/role_level'
import City from 'src/contract/models/city'
import VesselType from 'src/contract/models/vessel_type'
import JobContext, { JobProvider } from 'src/context/JobContext'
import { useJob } from 'src/hooks/useJob'
import InfiniteScroll from 'react-infinite-scroll-component'
import RecomendedView from 'src/views/find-job/RecomendedView'
import { usePathname, useSearchParams } from 'next/navigation'
import { linkToTitleCase } from 'src/utils/helpers'
import RoleType from 'src/contract/models/role_type'
import { useRouter } from 'next/router'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const SeafarerJob = () => {
  return (
    <JobProvider>
      <SeafarerJobApp />
    </JobProvider>
  )
}

const SeafarerJobApp = () => {
  const { setPage, fetchJobs, totalJob, hasNextPage } = useJob()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const tabs = params.get('tabs')
  const company = linkToTitleCase(params.get('company'))

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const isOnShip = user.employee_type === 'onship'
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const isMd = useMediaQuery(theme.breakpoints.down('lg'))

  const [JobCategory, getJobCategory] = useState<any[]>([])
  const [Education, getEducation] = useState<any[]>([])
  const [RoleLevel, getRoleLevel] = useState<any[]>([])
  const [RoleType, getRoleType] = useState<any[]>([])

  const [employeeType, setEmployeeType] = useState(isOnShip ? 'onship' : 'offship')
  const [searchJob, setSearchJob] = useState<any>()
  const [JC, setJC] = useState<number | undefined>()
  const [RL, setRL] = useState<number | undefined>()
  const [RT, setRT] = useState<number | undefined>()
  const [ED, setED] = useState<number | undefined>()

  const [combocity, getComboCity] = useState<any[]>([])
  const [combovessel, getComboVessel] = useState<any>([])

  const [idcity, setCombocity] = useState<any>()
  const [idvessel, setVesel] = useState<any>()
  const [employmentType, setEmplymentType] = useState<any>()

  const handleEmployeeType = () => {
    if (employeeType === 'onship') {
      setEmployeeType('offship')
    } else setEmployeeType('onship')
    setPage(1)
  }

  const [value, setValue] = useState<string>(tabs || '1')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    router.push(`${pathname}?${createQueryString('tabs', newValue)}`)
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const searchParams = new URLSearchParams(params.toString())
      searchParams.set(name, value)

      return searchParams.toString()
    },
    [params]
  )

  useEffect(() => {
    if (tabs === null) {
      router.push(`${pathname}?${createQueryString('tabs', '1')}`)
    }
  }, [tabs])

  const employmentTypeOptions = [{ name: 'Intern' }, { name: 'Contract' }, { name: 'Full-Time' }]

  const firstload = () => {
    HttpClient.get(`/public/data/role-level?search=&page=1&take=250`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      getRoleLevel(response.data.roleLevels.data)
    })
    HttpClient.get(`/job-category?search=&page=1&take=250&employee_type=${employeeType}`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      getJobCategory(response.data.categories.data)
    })
    if (JC) {
      HttpClient.get(`/public/data/role-type?search=&page=1&take=250&category_id=${JC}`).then(response => {
        if (response.status != 200) {
          throw response.data.message ?? 'Something went wrong!'
        }
        getRoleType(response.data.roleTypes.data)
      })
    }
    HttpClient.get(`/public/data/degree`).then(response => {
      if (response.status != 200) {
        throw response.data.message ?? 'Something went wrong!'
      }
      getEducation(response.data.degrees)
    })
    HttpClient.get('/public/data/vessel-type?page=1&take=250&search').then(response => {
      const code = response.data.vesselTypes.data
      getComboVessel(code)
    })
    HttpClient.get('/public/data/city?search=&country_id=100').then(response => {
      const code = response.data.cities
      getComboCity(code)
    })
  }
  useEffect(() => {
    firstload()
  }, [JC, employeeType])

  const getdatapencarian = () => {
    fetchJobs({
      take: 9,
      search: searchJob,
      category_id: JC,
      edugrade_id: ED,
      rolelevel_id: RL,
      roletype_id: RT,
      vesseltype_id: idvessel,
      country_id: 100,
      city_id: idcity,
      employment_type: employmentType,
      employee_type: employeeType,
      username: company
    })
  }
  useEffect(() => {
    getdatapencarian()
  }, [JC, searchJob, RL, RT, ED, idcity, idvessel, employmentType, employeeType, company])

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        item
        container
        xs={12}
        md={11}
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
            <Tabs value={value} onChange={handleChange} aria-label='customized tabs example'>
              <Tab
                label='Find Job'
                icon={<Icon icon='solar:boombox-bold-duotone' fontSize={18} />}
                {...a11yProps(1)}
                value='1'
              />
              <Tab
                label='Job Applied'
                icon={<Icon icon='solar:widget-add-bold-duotone' fontSize={18} />}
                {...a11yProps(2)}
                value='2'
              />
            </Tabs>
          </Box>
          <Grid
            container
            sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF', background: '#FFFFFF' }}
          >
            <Grid item xs={12}>
              <TabPanel value={parseInt(value, 10)} index={1}>
                <Grid item xs={12} sx={{ padding: 4, border: 0, boxShadow: 0, backgroundColor: '#FFFFFF' }}>
                  <Box
                    sx={
                      !isMd && !hidden
                        ? {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }
                        : isMd && !hidden
                        ? {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            overflowX: 'scroll',
                            '&::-webkit-scrollbar': { display: 'none' }
                          }
                        : {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                          }
                    }
                  >
                    <Grid item container xs={12} md={4} minWidth={'350px'} spacing={2}>
                      <Grid item xs={8} md={7}>
                        <TextField
                          id='searchJob'
                          label='Search Job'
                          variant='outlined'
                          fullWidth
                          onChange={e => {
                            setPage(1)
                            setSearchJob(e.target.value)
                          }}
                        />
                      </Grid>
                      <Grid item xs={4} md={5}>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          id='city'
                          options={combocity}
                          getOptionLabel={(option: City) => option.city_name}
                          renderInput={params => <TextField {...params} label='Location' />}
                          onChange={(event: any, newValue: City | null) => {
                            setPage(1)
                            newValue?.id ? setCombocity(newValue.id) : setCombocity(null)
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} md={5} minWidth={'350px'} spacing={2}>
                      <Grid item xs={employeeType === 'onship' ? 4 : 3}>
                        <Autocomplete
                          fullWidth
                          disablePortal
                          id='combo-box-level'
                          options={JobCategory}
                          getOptionLabel={(option: JobCategory) => option.name}
                          renderInput={params => <TextField {...params} label='Job Category' />}
                          onChange={(event: any, newValue: JobCategory | null) => {
                            setPage(1)
                            newValue?.id ? setJC(newValue?.id) : setJC(undefined)
                          }}
                        />
                      </Grid>
                      {employeeType === 'onship' ? (
                        <>
                          <Grid item xs={4}>
                            <Autocomplete
                              disablePortal
                              id='combo-box-demo'
                              disabled={!JC}
                              options={JC ? RoleType : []}
                              getOptionLabel={(option: RoleType) => option.name}
                              renderInput={params => <TextField {...params} label='Job Rank' />}
                              onChange={(event: any, newValue: RoleType | null) => {
                                setPage(1)
                                newValue?.id ? setRT(newValue.id) : setRT(undefined)
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Autocomplete
                              fullWidth
                              disablePortal
                              id='combo-box-demo'
                              options={combovessel}
                              getOptionLabel={(option: VesselType) => option.name}
                              renderInput={params => <TextField {...params} label='Vessel Type' />}
                              onChange={(event: any, newValue: VesselType | null) => {
                                setPage(1)
                                newValue?.id ? setVesel(newValue?.id) : setVesel(undefined)
                              }}
                            />
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={3}>
                            <Autocomplete
                              fullWidth
                              disablePortal
                              id='combo-box-level'
                              options={RoleLevel}
                              getOptionLabel={(option: RoleLevel) => option.levelName}
                              renderInput={params => <TextField {...params} label='Role Level' />}
                              onChange={(event: any, newValue: RoleLevel | null) => {
                                setPage(1)
                                newValue?.id ? setRL(newValue?.id) : setRL(undefined)
                              }}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Autocomplete
                              fullWidth
                              disablePortal
                              id='combo-box-demo'
                              options={Education}
                              getOptionLabel={(option: Degree) => option.name}
                              renderInput={params => <TextField {...params} label='Education' />}
                              onChange={(event: any, newValue: Degree | null) => {
                                setPage(1)
                                newValue?.id ? setED(newValue?.id) : setED(undefined)
                              }}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Autocomplete
                              fullWidth
                              disablePortal
                              id='combo-box-demo'
                              options={employmentTypeOptions}
                              getOptionLabel={(option: { name: string }) => option.name}
                              renderInput={params => <TextField {...params} label='Employment Type' />}
                              onChange={(event: any, newValue: { name: string } | null) => {
                                setPage(1)
                                newValue?.name ? setEmplymentType(newValue?.name) : setEmplymentType(undefined)
                              }}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: { xs: '100%', md: '250px' } }}>
                      <ToggleButtonGroup
                        fullWidth
                        color='primary'
                        value={employeeType}
                        exclusive
                        onChange={handleEmployeeType}
                        aria-label='Platform'
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <ToggleButton
                          disabled={employeeType === 'onship' || !isOnShip}
                          value='onship'
                          sx={{ py: 3.5, width: '50%', fontSize: 12 }}
                        >
                          Seafarer
                        </ToggleButton>
                        <ToggleButton
                          disabled={employeeType === 'offship'}
                          value='offship'
                          sx={{ py: 3.5, width: '50%', fontSize: 12 }}
                        >
                          Professional
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Box>
                </Grid>
                <Box px={5} pb={5}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
                      <Grid container spacing={4}>
                        <Grid item xs={12}>
                          <Alert severity='info'>
                            <AlertTitle>Find & Apply to Your Dream Job</AlertTitle>
                            Based on <strong>your profile</strong> and <strong>experience</strong>
                          </Alert>
                        </Grid>
                        <Grid item xs={12}>
                          <JobContext.Consumer>
                            {({ listJobs, onLoading }) => {
                              if (onLoading) {
                                return (
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <CircularProgress sx={{ mt: 20 }} />
                                  </Box>
                                )
                              }

                              return (
                                <InfiniteScroll
                                  dataLength={totalJob}
                                  next={() => getdatapencarian()}
                                  hasMore={hasNextPage}
                                  loader={
                                    <Typography mt={5} color={'text.secondary'}>
                                      Loading..
                                    </Typography>
                                  }
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
              <TabPanel value={parseInt(value, 10)} index={2}>
                <AllJobApplied />
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

SeafarerJob.acl = {
  action: 'read',
  subject: 'seafarer-jobs'
}
export default SeafarerJob
