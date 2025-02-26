// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
// ** MUI Components
import Box from '@mui/material/Box'
import {
  Tabs,
  Tab,
  useMediaQuery,
  Autocomplete,
  // TextField,
  Typography,
  Alert,
  AlertTitle,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Button,
  Pagination
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HttpClient } from 'src/services'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'
import AllJobApplied from './applied'
// import Degree from 'src/contract/models/degree'
import JobCategory from 'src/contract/models/job_category'
import RoleLevel from 'src/contract/models/role_level'
import City from 'src/contract/models/city'
import VesselType from 'src/contract/models/vessel_type'
import JobContext, { JobProvider } from 'src/context/JobContext'
import { useJob } from 'src/hooks/useJob'
// import InfiniteScroll from 'react-infinite-scroll-component'
import RecomendedView from 'src/views/find-job/RecomendedView'
import { usePathname, useSearchParams } from 'next/navigation'
import { linkToTitleCase } from 'src/utils/helpers'
import RoleType from 'src/contract/models/role_type'
import { useRouter } from 'next/router'
import themeConfig from 'src/configs/themeConfig'
import { useTranslation } from 'react-i18next'
import JobSaved from './saved'
import JobArchived from './archived'
import Image from 'next/image'
import CustomPaginationItem from 'src/@core/components/pagination/item'

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
  const { setPage, fetchJobs, totalJob, page } = useJob()
  const pageItems = 9
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const tabs = params.get('tabs')
  const company = linkToTitleCase(params.get('company'))

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const isOnShip = user.employee_type === 'onship'
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [JobCategory, getJobCategory] = useState<any[]>([])
  const [RoleLevel, getRoleLevel] = useState<any[]>([])
  const [RoleType, getRoleType] = useState<any[]>([])

  const [employeeType, setEmployeeType] = useState(isOnShip ? 'onship' : 'offship')
  const [searchJob, setSearchJob] = useState<any>()
  const [JC, setJC] = useState<number | undefined>()
  const [RL, setRL] = useState<number | undefined>()
  const [RT, setRT] = useState<number | undefined>()

  const [combocity, getComboCity] = useState<any[]>([])
  const [combovessel, getComboVessel] = useState<any>([])

  const [idcity, setCombocity] = useState<any>()
  const [idvessel, setVesel] = useState<any>()
  const [employmentType, setEmplymentType] = useState<any>()
  const [workArrangement, setWorkArrangement] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('dsc')

  const handleEmployeeType = () => {
    if (employeeType === 'onship') {
      setEmployeeType('offship')
    } else setEmployeeType('onship')
    setPage(1)
  }

  const [value, setValue] = useState<string>(tabs || '1')

  useEffect(() => {
    if (tabs) {
      setValue(tabs)
    }
  }, [tabs])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    router.push(`${pathname}?${createQueryString('tabs', newValue)}`)
  }

  const handleChangeSelect = (event: any) => {
    setSortBy(event?.target?.value)
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const searchParams = new URLSearchParams(params.toString())
      searchParams.set(name, value)

      return searchParams.toString()
    },
    [params]
  )

  const handleClearFilter = () => {
    setSearchJob('')
    setCombocity(null)
    setJC(undefined)
    setRT(undefined)
    setVesel(undefined)
    setWorkArrangement(null)
    setRL(undefined)
    setEmplymentType(undefined)
    setSortBy('dsc')
  }

  useEffect(() => {
    if (tabs === null) {
      router.push(`${pathname}?${createQueryString('tabs', '1')}`)
    }
  }, [tabs])

  const employmentTypeOptions = [{ name: 'Intern' }, { name: 'Contract' }, { name: 'Full-Time' }]
  const workArrangementOptions = [
    {
      name: 'Onsite',
      key: 'On-Site'
    },
    {
      name: 'Hybrid',
      key: 'Remote'
    },
    {
      name: 'Remote',
      key: 'Hybrid'
    }
  ]

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
      take: pageItems,
      search: searchJob,
      category_id: JC,
      rolelevel_id: RL,
      roletype_id: RT,
      vesseltype_id: idvessel,
      country_id: 100,
      city_id: idcity,
      employment_type: employmentType,
      employee_type: employeeType,
      username: company,
      work_arrangement: workArrangement,
      sortBy: sortBy
    })
  }
  useEffect(() => {
    getdatapencarian()
  }, [
    JC,
    searchJob,
    RL,
    RT,
    idcity,
    idvessel,
    employmentType,
    employeeType,
    company,
    workArrangement,
    page,
    sortBy,
    tabs
  ])

  return (
    <>
      <Head>
        <title>{`${themeConfig.templateName} - ${t('landing_findjob_title')}`}</title>
        <meta name='description' content={`${themeConfig.templateName} - ${t('landing_findjob_description')}`} />
        <meta property='og:title' content={`${t('landing_findjob_title')}`} />
        <meta property='og:description' content={`${t('landing_findjob_description')}`} />
        <meta property='og:image' content='images/logoprofesea.png' />
        <meta name='keywords' content={`${t('app_keyword')}`} />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
      </Head>
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
                borderRadius: '8px 8px 0px 0px'
              }}
            >
              <Tabs
                variant={hidden ? 'scrollable' : 'fullWidth'}
                value={value}
                onChange={handleChange}
                aria-label='customized tabs example'
                scrollButtons='auto'
              >
                <Tab
                  label='Find Job'
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: +value === 1 ? '#404040' : '#BFBFBF',
                    textTransform: 'capitalize',
                    minHeight: '60px !important'
                  }}
                  {...a11yProps(1)}
                  value='1'
                  icon={
                    hidden ? (
                      <></>
                    ) : (
                      <Box
                        sx={{
                          fontWeight: 700,
                          fontSize: '10px',
                          color: '#FFF',
                          textAlign: 'center',
                          padding: '2px 4px',
                          background: '#F22',
                          borderRadius: '100px',
                          marginLeft: '10px !important',
                          marginBottom: '10px !important'
                        }}
                      >
                        New
                      </Box>
                    )
                  }
                  iconPosition='end'
                />
                <Tab
                  label='Job Applied'
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: +value === 2 ? '#404040' : '#BFBFBF',
                    textTransform: 'capitalize',
                    minHeight: '60px !important'
                  }}
                  {...a11yProps(2)}
                  value='2'
                />
                <Tab
                  label='Job Saved'
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: +value === 3 ? '#404040' : '#BFBFBF',
                    textTransform: 'capitalize',
                    minHeight: '60px !important'
                  }}
                  {...a11yProps(3)}
                  value='3'
                />
                <Tab
                  label='Job Archived'
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: +value === 4 ? '#404040' : '#BFBFBF',
                    textTransform: 'capitalize',
                    minHeight: '60px !important'
                  }}
                  {...a11yProps(4)}
                  value='4'
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
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                      }}
                    >
                      <Alert severity='info' color='warning'>
                        <AlertTitle>Find & Apply to Your Dream Job</AlertTitle>
                        Based on <strong>your profile</strong> and <strong>experience</strong>
                      </Alert>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                            sx={{
                              width: '50%',
                              fontSize: 16,
                              fontWeight: 700,
                              textTransform: 'capitalize',
                              padding: '4px !important'
                            }}
                          >
                            Seafarer
                          </ToggleButton>
                          <ToggleButton
                            disabled={employeeType === 'offship'}
                            value='offship'
                            sx={{
                              width: '50%',
                              fontSize: 16,
                              fontWeight: 700,
                              textTransform: 'capitalize',
                              padding: '4px !important'
                            }}
                          >
                            Professional
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: hidden ? 'flex-start' : 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          flexDirection: hidden ? 'column' : 'row'
                        }}
                      >
                        <Box
                          sx={{ width: hidden ? '100%' : '70%', display: 'flex', flexDirection: 'column', gap: '24px' }}
                        >
                          <Box sx={{ width: '100%' }}>
                            <TextField
                              id='searchJob'
                              variant='outlined'
                              placeholder='Search Job'
                              fullWidth
                              size='small'
                              value={searchJob}
                              onChange={e => {
                                setPage(1)
                                setSearchJob(e.target.value)
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Icon
                                      icon={'iconamoon:search-thin'}
                                      fontSize={16}
                                      style={{ marginRight: '10px' }}
                                    />
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Box>
                          <Box>
                            <Grid container spacing={4}>
                              <Grid item xs={12} md={3}>
                                <Autocomplete
                                  fullWidth
                                  disablePortal
                                  id='city'
                                  options={combocity}
                                  getOptionLabel={(option: City) => option.city_name}
                                  renderInput={params => <TextField {...params} size='small' label='Location' />}
                                  value={idcity ? combocity.find(item => item.id === idcity) || null : null}
                                  onChange={(event: any, newValue: City | null) => {
                                    setPage(1)
                                    newValue?.id ? setCombocity(newValue.id) : setCombocity(null)
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Autocomplete
                                  fullWidth
                                  disablePortal
                                  id='combo-box-level'
                                  options={JobCategory}
                                  getOptionLabel={(option: JobCategory) => option.name}
                                  renderInput={params => <TextField {...params} size='small' label='Job Category' />}
                                  value={JC ? JobCategory.find(item => item?.id === JC) || null : null}
                                  onChange={(event: any, newValue: JobCategory | null) => {
                                    setPage(1)
                                    newValue?.id ? setJC(newValue?.id) : setJC(undefined)
                                  }}
                                />
                              </Grid>
                              {employeeType === 'onship' ? (
                                <>
                                  <Grid item xs={12} md={3}>
                                    <Autocomplete
                                      disablePortal
                                      id='combo-box-demo'
                                      disabled={!JC}
                                      options={JC ? RoleType : []}
                                      getOptionLabel={(option: RoleType) => option.name}
                                      renderInput={params => <TextField {...params} size='small' label='Job Rank' />}
                                      value={RT ? RoleType.find(item => item?.id === RT) || null : null}
                                      onChange={(event: any, newValue: RoleType | null) => {
                                        setPage(1)
                                        newValue?.id ? setRT(newValue.id) : setRT(undefined)
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Autocomplete
                                      fullWidth
                                      disablePortal
                                      id='combo-box-demo'
                                      options={combovessel}
                                      getOptionLabel={(option: VesselType) => option.name}
                                      renderInput={params => <TextField {...params} size='small' label='Vessel Type' />}
                                      value={
                                        idvessel ? combovessel.find((item: any) => item?.id === idvessel) || null : null
                                      }
                                      onChange={(event: any, newValue: VesselType | null) => {
                                        setPage(1)
                                        newValue?.id ? setVesel(newValue?.id) : setVesel(undefined)
                                      }}
                                    />
                                  </Grid>
                                </>
                              ) : (
                                <>
                                  <Grid item xs={12} md={3}>
                                    <Autocomplete
                                      fullWidth
                                      disablePortal
                                      id='combo-box-level'
                                      options={RoleLevel}
                                      getOptionLabel={(option: RoleLevel) => option.levelName}
                                      renderInput={params => <TextField {...params} size='small' label='Role Level' />}
                                      value={RL ? RoleLevel.find(item => item.id === RL) || null : null}
                                      onChange={(event: any, newValue: RoleLevel | null) => {
                                        setPage(1)
                                        newValue?.id ? setRL(newValue?.id) : setRL(undefined)
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Autocomplete
                                      id='combo-box-work-arrangement'
                                      fullWidth
                                      disablePortal
                                      options={workArrangementOptions}
                                      getOptionLabel={(option: { name: string; key: string }) => option.name}
                                      renderInput={params => (
                                        <TextField {...params} size='small' label='Work Arrangement' />
                                      )}
                                      value={
                                        workArrangement
                                          ? workArrangementOptions.find(item => item.key === workArrangement) || null
                                          : null
                                      }
                                      onChange={(event: any, newValue: { name: string; key: string } | null) => {
                                        setPage(1)
                                        newValue ? setWorkArrangement(newValue?.key) : setWorkArrangement(null)
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Autocomplete
                                      fullWidth
                                      disablePortal
                                      id='combo-box-demo'
                                      options={employmentTypeOptions}
                                      getOptionLabel={(option: { name: string }) => option.name}
                                      renderInput={params => (
                                        <TextField {...params} size='small' label='Employment Type' />
                                      )}
                                      value={
                                        employeeType
                                          ? employmentTypeOptions.find(item => item.name === employeeType) || null
                                          : null
                                      }
                                      onChange={(event: any, newValue: { name: string } | null) => {
                                        setPage(1)
                                        newValue?.name ? setEmplymentType(newValue?.name) : setEmplymentType(undefined)
                                      }}
                                    />
                                  </Grid>
                                </>
                              )}
                            </Grid>
                          </Box>
                        </Box>
                        <Box sx={{ width: hidden ? '100%' : '30%' }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-end' }}>
                            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                              <Typography width={'80px'}>Sort By :</Typography>
                              <FormControl fullWidth>
                                <Select
                                  labelId='demo-simple-select-label'
                                  id='demo-simple-select'
                                  value={sortBy}
                                  onChange={handleChangeSelect}
                                  size='small'
                                >
                                  <MenuItem value={'dsc'}>Newest to Oldest </MenuItem>
                                  <MenuItem value={'asc'}>Oldest to Newest</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                            <Button
                              variant='outlined'
                              size='small'
                              sx={{ textTransform: 'capitalize' }}
                              onClick={handleClearFilter}
                            >
                              Clear Filter
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Box px={5} pb={5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={!hidden ? { alignItems: 'stretch' } : {}}>
                        <Grid container spacing={4}>
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
                                if (listJobs.length == 0) {
                                  return (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh'
                                      }}
                                    >
                                      <Box sx={{ textAlign: 'center' }}>
                                        <Image
                                          src={'/images/rafiki.png'}
                                          alt='assets-applied'
                                          width={hidden ? 300 : 350}
                                          height={hidden ? 200 : 260}
                                          style={{
                                            margin: '0 auto'
                                          }}
                                        />
                                        <Typography
                                          sx={{
                                            fontSize: '18px',
                                            fontWeight: 700,
                                            color: '#32497A',
                                            marginTop: '40px',
                                            marginBottom: '24px'
                                          }}
                                        >
                                          Oops! Looks like there are no jobs matching your search. Try exploring other
                                          options!
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )
                                }

                                return (
                                  <>
                                    <RecomendedView listJob={listJobs} />
                                    <Box
                                      sx={{
                                        width: 'full',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '50px',
                                        marginBottom: '40px'
                                      }}
                                    >
                                      <Pagination
                                        page={page}
                                        count={Math.ceil(totalJob / pageItems)}
                                        onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                                          setPage(value)
                                        }}
                                        variant='outlined'
                                        shape='rounded'
                                        renderItem={item => <CustomPaginationItem {...item} />}
                                      />
                                    </Box>
                                  </>
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
                <TabPanel value={parseInt(value, 10)} index={3}>
                  <JobSaved />
                </TabPanel>
                <TabPanel value={parseInt(value, 10)} index={4}>
                  <JobArchived />
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

SeafarerJob.acl = {
  action: 'read',
  subject: 'seafarer-jobs'
}
export default SeafarerJob
