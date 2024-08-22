import React, { useCallback, useEffect, useState } from 'react'
import {
  Autocomplete,
  Button,
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
  Link,
  Pagination
} from '@mui/material'
import CandidateContext, { CandidateProvider } from 'src/context/CandidateContext'
import { useCandidate } from 'src/hooks/useCandidate'
import { HttpClient } from 'src/services'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import { MdNavigateNext } from 'react-icons/md'
import JobCategory from 'src/contract/models/job_category'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import Countries from 'src/contract/models/country'
import InfiniteScroll from 'react-infinite-scroll-component'
import RecomendedView from 'src/views/find-candidate/RecomendedView'
import debounce from 'src/utils/debounce'

const FindCandidate = () => {
  return (
    <CandidateProvider>
      <FindCandidateApp />
    </CandidateProvider>
  )
}

const FindCandidateApp = () => {
  const { fetchCandidates, hasNextPage, totalCandidate, page, setPage } = useCandidate()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [tabValue, setTabValue] = useState<string>('onship')

  const [searchCandidate, SetSearchCandidate] = useState<any>('')
  const [JobCategory, getJobCategory] = useState<any[]>([])
  const [combocountry, getComboCountry] = useState<any>([])
  const [RoleType, getRoleType] = useState<any[]>([])
  const [VesselType, getVesselType] = useState<any[]>([])

  const [sJobCategory, setJobCategory] = useState<any>(null)
  const [sRoleType, setRoleType] = useState<any>(null)
  const [sVesselType, setVesselType] = useState<any>(null)
  const [country, setCountry] = useState<any>(null)

  const clearFilter = () => {
    setPage(1)

    SetSearchCandidate('')
    setJobCategory(null)
    setRoleType(null)
    setVesselType(null)
    setCountry(null)
  }

  const getListCandidates = async () => {
    const res2 = await HttpClient.get(`/job-category?search=&page=1&take=250`)
    if (res2.status != 200) {
      throw res2.data.message ?? 'Something went wrong!'
    }
    const rawData: JobCategory[] = res2?.data?.categories?.data
    const filterOnshipCategories = rawData.filter(d => d.employee_type == tabValue)
    getJobCategory(filterOnshipCategories)

    const res3 = await HttpClient.get(`/public/data/vessel-type?search=&page=1&take=250`)
    if (res3.status != 200) {
      throw res3.data.message ?? 'Something went wrong!'
    }
    getVesselType(res3.data.vesselTypes.data)

    HttpClient.get('/public/data/country?search=').then(response => {
      const code = response.data.countries
      getComboCountry(code)
    })
  }

  const getRoleTypes = async () => {
    const res4 = await HttpClient.get(`/public/data/role-type`, {
      page: 1,
      take: 250,
      category_id: sJobCategory?.id
    })
    if (res4.status != 200) {
      throw res4.data.message ?? 'Something went wrong!'
    }
    getRoleType(res4.data.roleTypes.data)
  }

  useEffect(() => {
    clearFilter()
    getListCandidates()
  }, [tabValue])

  useEffect(() => {
    getRoleTypes()
  }, [sJobCategory])

  const getdatapencarian = async () => {
    const objFilter: any = {
      take: 15,
      employee_type: tabValue,
      search: searchCandidate,
      vesseltype_id: sVesselType?.id,
      roletype_id: sRoleType?.id,
      category_id: sJobCategory?.id,
      country: country?.id
    }
    fetchCandidates(objFilter)
  }

  useEffect(() => {
    getdatapencarian()
  }, [searchCandidate, sVesselType, sRoleType, sJobCategory, tabValue, country])

  const handleChangeTabValue = (e: any, value: any) => {
    setPage(1)
    setTabValue(value)
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      setPage(1)
      SetSearchCandidate(value)
    }, 500),
    []
  )

  return (
    <Grid container spacing={6} justifyContent={'center'}>
      <Grid item md={11} xs={12}>
        <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-lable='breadcrumb'>
          <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Homepage
            </Typography>
          </Link>
          <Link key='2' href='/company/find-candidate' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Find Candidate
            </Typography>
          </Link>
          <Typography
            key='3'
            sx={{
              color: '#949EA2',
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
          >
            Seafarer
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item md={11} xs={12} sx={{ display: 'flex', flexDirection: hidden ? 'column' : 'row', gap: '24px' }}>
        <Card
          sx={{
            borderRadius: 12,
            boxShadow: 3,
            width: hidden ? '100%' : '276px',
            height: 'fit-content',
            backgroundColor: '#FFFFFF'
          }}
        >
          <CardHeader
            title={
              <Typography variant='body2' style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
                Filter
              </Typography>
            }
            action={
              hidden && (
                <IconButton
                  size='small'
                  aria-label='collapse'
                  sx={{ color: '#262525' }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <Icon fontSize={20} icon={!collapsed ? 'mdi:chevron-down' : 'mdi:chevron-up'} />
                </IconButton>
              )
            }
          />
          <Collapse in={collapsed}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Grid container gap='12px'>
                  <Typography sx={{ color: '#636E72', fontSize: 16, fontWeight: 'bold' }}>Keyword</Typography>
                  <TextField
                    fullWidth
                    id='fullName'
                    placeholder='Search Candidate Name'
                    variant='outlined'
                    onChange={e => handleSearch(e.target.value)}
                  />
                </Grid>
                <Grid container gap='12px'>
                  <Typography sx={{ color: '#636E72', fontSize: 16, fontWeight: 'bold' }}>Country</Typography>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    id='combo-box-demo'
                    options={combocountry}
                    value={country}
                    getOptionLabel={(option: any) => option.nicename}
                    renderInput={params => <TextField {...params} placeholder='Choose Country' />}
                    onChange={(event: any, newValue: Countries | null) => {
                      setPage(1)
                      setCountry(newValue)
                    }}
                  />
                </Grid>
                <Grid container gap='12px'>
                  <Typography sx={{ color: '#636E72', fontSize: 16, fontWeight: 'bold' }}>Job Category</Typography>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    id='job-category-autocomplete'
                    options={JobCategory}
                    value={sJobCategory}
                    getOptionLabel={(option: JobCategory) => option.name}
                    renderInput={params => <TextField {...params} placeholder='Choose Job Category' />}
                    onChange={(event: any, newValue: JobCategory | null) => {
                      setPage(1)
                      setJobCategory(newValue)
                    }}
                  />
                </Grid>
                {tabValue == 'onship' && (
                  <>
                    <Grid container gap='12px'>
                      <Typography sx={{ color: '#636E72', fontSize: 16, fontWeight: 'bold' }}>Job Rank</Typography>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id='role-type-autocomplete'
                        options={RoleType}
                        value={sRoleType}
                        getOptionLabel={(option: RoleType) => option.name}
                        renderInput={params => <TextField {...params} placeholder='Choose Job Rank' />}
                        onChange={(event: any, newValue: RoleType | null) => {
                          setPage(1)
                          setRoleType(newValue)
                        }}
                      />
                    </Grid>
                    <Grid container gap='12px'>
                      <Typography sx={{ color: '#636E72', fontSize: 16, fontWeight: 'bold' }}>
                        Type of Vessel
                      </Typography>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id='vessel-type-autocomplete'
                        options={VesselType}
                        value={sVesselType}
                        getOptionLabel={(option: VesselType) => option.name}
                        renderInput={params => <TextField {...params} placeholder='Choose Vessel' />}
                        onChange={(event: any, newValue: VesselType | null) => {
                          setPage(1)
                          setVesselType(newValue)
                        }}
                      />
                    </Grid>
                  </>
                )}
                {tabValue == 'offship' && (
                  <Grid container gap='12px'>
                    <Typography sx={{ color: '#636E72', fontSize: 16, fontWeight: 'bold' }}>Job Title</Typography>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      id='role-type-autocomplete'
                      options={RoleType}
                      value={sRoleType}
                      getOptionLabel={(option: RoleType) => option.name}
                      renderInput={params => <TextField {...params} placeholder='Choose Job Title' />}
                      onChange={(event: any, newValue: RoleType | null) => {
                        setPage(1)
                        setRoleType(newValue)
                      }}
                    />
                  </Grid>
                )}
                <Button
                  variant='contained'
                  onClick={() => {
                    clearFilter()
                  }}
                  sx={{ width: '100%', textTransform: 'none', fontSize: 14 }}
                >
                  Reset Filters
                </Button>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
        <Grid
          item
          xs={true}
          sx={{
            flexGrow: 1,
            height: 'fit-content',
            p: '24px',
            background: '#FFFFFF',
            boxShadow: 3,
            borderRadius: '12px'
          }}
        >
          <Box sx={{ borderBottom: 4, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTabValue}
              aria-label='basic tabs example'
              sx={{ mb: '-3.5px' }}
            >
              <Tab label='Seafarer' id='tab-1' value={'onship'} />
              <Tab label='Professional' id='tab-2' value={'offship'} />
            </Tabs>
          </Box>
          <CandidateContext.Consumer>
            {({ listCandidates, onLoading }) => {
              if (onLoading) {
                return (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress sx={{ mt: 20 }} />
                  </Box>
                )
              }

              return (
                <InfiniteScroll
                  dataLength={totalCandidate}
                  next={() => getdatapencarian()}
                  hasMore={hasNextPage}
                  loader={
                    <Typography mt={5} color={'text.secondary'}>
                      Loading..
                    </Typography>
                  }
                >
                  <RecomendedView listCandidate={listCandidates} />
                  <Grid container>
                    <Typography>{`showing ${
                      page * 15 < totalCandidate ? page * 15 : totalCandidate
                    } out of ${totalCandidate} results`}</Typography>
                  </Grid>
                  <Pagination
                    count={Math.ceil(totalCandidate / 15)}
                    onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                      setPage(value)
                    }}
                    variant='outlined'
                    shape='rounded'
                  />
                </InfiniteScroll>
              )
            }}
          </CandidateContext.Consumer>
        </Grid>
      </Grid>
    </Grid>
  )
}

FindCandidate.acl = {
  action: 'read',
  subject: 'find-candidate'
}
export default FindCandidate
