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
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { HttpClient } from 'src/services'
import { useCandidate } from 'src/hooks/useCandidate'
import JobCategory from 'src/contract/models/job_category'
import RoleType from 'src/contract/models/role_type'
import VesselType from 'src/contract/models/vessel_type'
import Countries from 'src/contract/models/country'
import { useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import { MdNavigateNext } from 'react-icons/md'
import RecomendedView from 'src/views/find-candidate/RecomendedView'

const FindCandidate = () => {
  return (
    <CandidateProvider>
      <FindCandidateApp />
    </CandidateProvider>
  )
}

const pageItem = 15

const FindCandidateApp = () => {
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState<boolean>(true)

  const { fetchCandidates, hasNextPage, totalCandidate, page, setPage } = useCandidate()
  const router = useRouter()
  const params = useSearchParams()

  const search = params.get('search')
  const country = params.get('country')
  const jobCategory = params.get('job_category')
  const roleType = params.get('role_type')
  const typeOfVessel = params.get('tov')

  const tabs = params.get('tabs')
  const [tabValue, setTabValue] = useState<string>(tabs || 'onship')
  const [JobCategory, getJobCategory] = useState<JobCategory[]>([])
  const [combocountry, getComboCountry] = useState<Countries[]>([])
  const [RoleType, getRoleType] = useState<RoleType[]>([])
  const [VesselType, getVesselType] = useState<VesselType[]>([])

  const [searchCandidate, SetSearchCandidate] = useState<any>(search || '')
  const [sCountry, setCountry] = useState<any>(null)
  const [sJobCategory, setJobCategory] = useState<any>(null)
  const [sRoleType, setRoleType] = useState<any>(null)
  const [sVesselType, setVesselType] = useState<any>(null)

  useEffect(() => {
    if (country) {
      setCountry(combocountry.filter(filter => filter.id == Number(country)))
    }
    if (jobCategory) {
      setJobCategory(JobCategory.filter(filter => filter.id == Number(jobCategory)))
    }
    if (RoleType) {
      setRoleType(RoleType.filter(filter => filter.id == Number(roleType)))
    }
    if (typeOfVessel) {
      setVesselType(VesselType.filter(filter => filter.id == Number(typeOfVessel)))
    }
  }, [])

  const clearFilter = () => {
    setPage(1)

    SetSearchCandidate('')
    setJobCategory(null)
    setRoleType(null)
    setVesselType(null)
    setCountry(null)
  }

  const updateParamsFilter = useCallback(() => {
    const searchParams = new URLSearchParams(params.toString())
    searchParams.set('tabs', tabValue)

    if (searchCandidate) searchParams.set('search', searchCandidate)
    else searchParams.delete('search')

    if (sCountry) searchParams.set('country', sCountry.id)
    else searchParams.delete('country')

    if (sJobCategory) searchParams.set('job_category', sJobCategory.id)
    else searchParams.delete('job_category')

    if (sRoleType) searchParams.set('role_type', sRoleType.id)
    else searchParams.delete('role_type')

    if (sVesselType) searchParams.set('tov', sVesselType.id)
    else searchParams.delete('tov')

    router.replace(
      {
        pathname: router.pathname,
        query: searchParams.toString()
      },
      undefined,
      { shallow: true }
    )
  }, [searchCandidate, sCountry, sJobCategory, sRoleType, sVesselType, tabValue, params])

  const handleChangeTabValue = (e: any, value: any) => {
    setPage(1)
    setTabValue(value)
  }

  const getListCandidates = async () => {
    try {
      await HttpClient.get('/public/data/country').then(response => {
        const data = response.data.countries
        getComboCountry(data)
      })
      await HttpClient.get('/job-category?page=1&take=1000').then(response => {
        const data: JobCategory[] = response.data.categories.data
        getJobCategory(data.filter(d => d.employee_type == tabValue))
      })
      await HttpClient.get('/public/data/vessel-type?page=1&take=1000').then(response => {
        const data = response.data.vesselTypes.data
        getVesselType(data)
      })
    } catch (error) {
      throw 'Error fetching filter data'
    }
  }

  const getRoleTypes = async () => {
    try {
      await HttpClient.get('/public/data/role-type', {
        page: 1,
        take: 250,
        category_id: sJobCategory?.id
      }).then(response => {
        const data = response.data.roleTypes.data
        getRoleType(data)
      })
    } catch (error) {
      throw 'Error fetching filter data'
    }
  }

  useEffect(() => {
    clearFilter()
    getListCandidates()
  }, [tabValue])

  useEffect(() => {
    getRoleTypes()
  }, [sJobCategory])

  useEffect(() => {
    fetchCandidates({
      take: pageItem,
      employee_type: tabValue,
      search: searchCandidate,
      vesseltype_id: sVesselType?.id,
      roletype_id: sRoleType?.id,
      category_id: sJobCategory?.id,
      country: sCountry?.id
    })
    updateParamsFilter()
  }, [searchCandidate, sVesselType, sRoleType, sJobCategory, tabValue, sCountry])

  const handleSearch = (value: string) => {
    setPage(1)
    SetSearchCandidate(value)
  }

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
                    defaultValue={searchCandidate}
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
                    value={sCountry}
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
                <Grid container gap='24px'>
                  <Grid container sx={{ display: 'flex', justifyContent: 'flex-end', mt: '12px', mb: '-36px' }}>
                    <Pagination
                      count={Math.ceil(totalCandidate / pageItem)}
                      onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                        setPage(value)
                      }}
                      variant='outlined'
                      shape='rounded'
                    />
                  </Grid>
                  <RecomendedView listCandidate={listCandidates} />
                  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ color: '#949EA2', fontSize: 14 }}>{`Showing ${
                      page * pageItem < totalCandidate ? page * pageItem : totalCandidate
                    } out of ${totalCandidate} results`}</Typography>
                    <Pagination
                      sx={{ margin: '0 auto' }}
                      count={Math.ceil(totalCandidate / pageItem)}
                      onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                        setPage(value)
                      }}
                      variant='outlined'
                      shape='rounded'
                    />
                  </Grid>
                </Grid>
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
