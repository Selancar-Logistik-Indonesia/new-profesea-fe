import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  InputAdornment,
  Link,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import Job from 'src/contract/models/job'
import JobCategory from 'src/contract/models/job_category'
import VesselType from 'src/contract/models/vessel_type'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import DialogCreate from 'src/views/job-management/DialogCreate'
import DialogUpload from 'src/views/job-management/DialogUpload'
import JobAlert from 'src/views/job-management/JobAlert'
import JobCard from 'src/views/job-management/JobCard'
import JobCardSkeleton from 'src/views/job-management/JobCardSkeleton'
import { v4 } from 'uuid'

const pageItems = 6
const tabsOption = [
  { value: 'onship', label: 'Seafarer' },
  { value: 'offship', label: 'Professional' },
  { value: 'hospitality', label: 'Cruise Hospitality' }
]
const employmentType = [
  { value: 'Intern', label: 'Intern' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Full-Time', label: 'Full-Time' }
]

const checkStatus = (status: string) => {
  if (status === 'active') return true
  else if (status === 'inactive') return false
  else return null
}

const JobManagement = () => {
  const { user, abilities } = useAuth()
  const router = useRouter()
  const [refetch, setRefetch] = useState(v4())
  const [onLoading, setOnLoading] = useState<boolean>(false)
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [createJob, setCreateJob] = useState(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [document, setDocument] = useState<any[]>([])
  const [isSubs, setIsSubs] = useState<boolean>(false)
  const [totalJobPosted, setTotalJobPosted] = useState(0)

  const [boostCount, setBoostCount] = useState<number>(0)
  const [totalJobs, setTotalJobs] = useState(0)
  const [isCrewing, setIsCrewing] = useState(false)
  const [activeTab, setActiveTab] = useState('onship')
  const [page, setPage] = useState(1)

  const [jobCategory, getJobCategory] = useState<JobCategory[] | null>(null)
  const [vesselType, getVesselType] = useState<VesselType[] | null>(null)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('post')
  const [jobCategoryFilter, setJobCategoryFilter] = useState<JobCategory | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [vesselTypeFilter, setVesselTypeFilter] = useState<VesselType | null>(null)
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState<string>('')

  const getTotalJobPosted = async () => {
    setOnLoading(true)

    try {
      const response = await HttpClient.get('/job', {
        page: page,
        take: 1000,
        is_active: true
      })

      const ujp = abilities?.items.find(f => f.code === 'UJP')
      const usedCounter = response.data.jobs.total > (ujp?.used ?? 0) ? response.data.jobs.total : ujp?.used
      setTotalJobPosted(usedCounter)
    } catch (error) {
      console.error('Error fetching  jobs:', error)
    } finally {
      setOnLoading(false)
    }
  }

  const getJobs = async () => {
    setOnLoading(true)
    try {
      const response = await HttpClient.get('/job', {
        search: search,
        page: page,
        take: pageItems,
        employee_type: activeTab === 'hospitality' ? 'onship' : activeTab,
        category_id: jobCategoryFilter?.id,
        vesseltype_id: vesselTypeFilter?.id,
        employment_type: employmentTypeFilter,
        sort: sort,
        is_active: checkStatus(statusFilter),
        is_hospitality: activeTab === 'hospitality'
      })
      const data = response.data.jobs.data
      setJobs(data)

      setTotalJobs(response.data.jobs.total)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setOnLoading(false)
    }
  }

  useEffect(() => {
    if (user && user.is_crewing === 0) {
      setIsCrewing(false)
      setActiveTab('offship')
    } else {
      setIsCrewing(true)
      setActiveTab('onship')
    }
  }, [])

  const firstLoad = () => {
    //job category, status, vessel type (seafarer), employement type (professional)
    HttpClient.get('/job-category?page=1&take=1000').then(async response => {
      const data: JobCategory[] = await response.data.categories.data
      getJobCategory(data.filter(d => d.employee_type == activeTab))
    })
    HttpClient.get('/public/data/vessel-type?page=1&take=1000').then(async response => {
      const data: VesselType[] = await response.data.vesselTypes.data
      getVesselType(data)
    })
    HttpClient.get('/job', {
      page: 1,
      take: 50,
      is_boosted: 1
    }).then(res => {
      const data = res.data.jobs.data

      if (data.length > 0) {
        setBoostCount(1)
      }
    })

    if (user?.is_crewing === 1) {
      HttpClient.get(`/user/document?siup=1`).then(async response => {
        const data = await response.data.documents
        setDocument(data)
      })
    } else {
      HttpClient.get(`/user/document`).then(async response => {
        const data = await response.data.documents
        setDocument(data)
      })
    }
  }

  const clearFilters = () => {
    setSearch('')
    setSort('post')
    setJobCategoryFilter(null)
    setStatusFilter('')
    setVesselTypeFilter(null)
    setEmploymentTypeFilter('')
    setPage(1)
  }

  useEffect(() => {
    firstLoad()
  }, [activeTab])

  useEffect(() => {
    setIsSubs(abilities?.plan_type !== 'BSC-ALL')
    getTotalJobPosted()
  }, [user, abilities, jobs])

  useEffect(() => {
    getJobs()
  }, [
    refetch,
    activeTab,
    page,
    jobCategoryFilter,
    statusFilter,
    vesselTypeFilter,
    employmentTypeFilter,
    sort,
    abilities
  ])

  return (
    <>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '24px', pb: '48px' }}>
        <Grid item xs={12}>
          <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
            <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: '#32497A',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                Home
              </Typography>
            </Link>
            <Typography
              key='2'
              sx={{
                color: '#949EA2',
                fontSize: '14px',
                fontWeight: 400,
                cursor: 'pointer'
              }}
            >
              Job Management
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} flexDirection='column' sx={{ borderRadius: '8px', p: '26px', backgroundColor: '#FFF' }}>
          <JobAlert boostCount={boostCount} jobsCount={totalJobPosted} isSubs={isSubs} />
          <Box sx={{ pb: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#32497A', lineHeight: '38px', fontSize: '32px', fontWeight: 700 }}>
              Job Management
            </Typography>
            <Button
              onClick={() =>
                isCrewing
                  ? setCreateJob(!createJob)
                  : router.push('/company/job-management/create-job?type=professional')
              }
              size='small'
              variant='contained'
              endIcon={<Icon icon='ph:plus' />}
              disabled={user?.verified_at === null || document.length === 0 || (!isSubs && totalJobPosted >= 5)}
              sx={{ height: '38px', padding: '8px 12px', textTransform: 'none' }}
            >
              Create Job
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {isCrewing && <AnimatedTabs tabs={tabsOption} activeTab={activeTab} setActiveTab={setActiveTab} />}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                gap: { xs: '24px', md: '70px' }
              }}
            >
              <TextField
                sx={{ flexGrow: 1 }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                title="Search - please click SEARCH button or press 'Enter' to search"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    getJobs()
                  }
                }}
                variant='outlined'
                placeholder='Search'
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ marginRight: '8px' }}>
                      <Icon icon='ph:magnifying-glass' fontSize={16} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Button
                      variant='contained'
                      size='small'
                      sx={{ margin: '5px', marginRight: '-10px', padding: '5px 25px' }}
                      onClick={() => {
                        getJobs()
                      }}
                      startIcon={<Icon icon={'iconamoon:search-thin'} fontSize={16} style={{ color: 'white' }} />}
                    >
                      Search
                    </Button>
                  )
                }}
              />
              <Box sx={{ width: '240px', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'right' }}>
                <Icon icon='ph:funnel' fontSize={16} fontWeight={700} />
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>Sort by :</Typography>
                <Select
                  size='small'
                  defaultValue='post'
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  sx={{
                    border: 'none',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                >
                  <MenuItem value='modified'>Date Modified</MenuItem>
                  <MenuItem value='post'>Date Posted</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '24px', md: '70px' } }}>
              <Grid container spacing={6}>
                <Grid item xs={4} sx={{ display: activeTab === 'hospitality' ? 'none' : '' }}>
                  <Autocomplete
                    autoHighlight
                    options={jobCategory || []}
                    getOptionLabel={option => option.name || ''}
                    value={jobCategory?.find(category => category.id === jobCategoryFilter?.id) || null}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, newValue) => {
                      setJobCategoryFilter(newValue ? newValue : null)
                    }}
                    renderInput={field => <TextField {...field} placeholder='Job Category' size='small' />}
                    renderOption={(props, option) => (
                      <MenuItem {...props} key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    )}
                    noOptionsText='Job Category not found'
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    fullWidth
                    size='small'
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value=''>
                      <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Status</Typography>
                    </MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  {activeTab === 'onship' || activeTab === 'hospitality' ? (
                    <Autocomplete
                      autoHighlight
                      options={vesselType || []}
                      getOptionLabel={option => option.name || ''}
                      value={vesselType?.find(vessel => vessel.id === vesselTypeFilter?.id) || null}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(_, newValue) => {
                        setVesselTypeFilter(newValue ? newValue : null)
                      }}
                      renderInput={field => <TextField {...field} placeholder='Vessel Type' size='small' />}
                      renderOption={(props, option) => (
                        <MenuItem {...props} key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      )}
                      noOptionsText='Vessel Type not found'
                    />
                  ) : (
                    <Select
                      fullWidth
                      size='small'
                      value={employmentTypeFilter}
                      onChange={e => setEmploymentTypeFilter(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value=''>
                        <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Employment Type</Typography>
                      </MenuItem>
                      {employmentType.map((type, i) => (
                        <MenuItem key={i} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Grid>
              </Grid>
              <Box sx={{ flexShrink: 0, display: 'flex', width: { xs: '100%', md: '240px' }, justifyContent: 'right' }}>
                <Button
                  onClick={() => clearFilters()}
                  variant='outlined'
                  size='small'
                  sx={{
                    padding: '6px 12px',
                    fontSize: 14,
                    fontWeight: 400,
                    textTransform: 'none'
                  }}
                >
                  Clear Filter
                </Button>
              </Box>
            </Box>
          </Box>
          <Grid container sx={{ mt: 0, mb: '8px' }} spacing={6}>
            {onLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <Grid item key={i} xs={6}>
                    <JobCardSkeleton />
                  </Grid>
                ))
            ) : user?.verified_at === null || document.length === 0 ? (
              <>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box component='img' src='/images/no-image.jpg' sx={{ width: '320px' }} />
                  <Typography sx={{ color: '#949EA2', fontSize: 14, fontWeight: 400, textAlign: 'center' }}>
                    You are currently not eligible to create a job.
                    <br /> Please{' '}
                    <Link
                      onClick={() => {
                        setOpenModal(!openModal)
                        console.log('open')
                      }}
                      sx={{ cursor: 'pointer' }}
                    >
                      upload the required document
                    </Link>{' '}
                    for verification or wait for our approval.
                  </Typography>
                </Grid>
              </>
            ) : jobs && jobs.length > 0 ? (
              jobs.map((job, i) => (
                <Grid item key={i} xs={6}>
                  <JobCard job={job} refetch={() => setRefetch(v4())} isSubs={isSubs} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <Box component='img' src='/images/no-connection-request.png' sx={{ height: '160px', width: '160px' }} />
                <Typography sx={{ color: '#949EA2', fontSize: 12, fontWeight: 400 }}>
                  You have no job available right now
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#949EA2', fontSize: 12, fontWeight: 400 }}>{`Showing ${
            page * pageItems < totalJobs ? page * pageItems : totalJobs
          } out of ${totalJobs} results`}</Typography>
          <Pagination
            size='small'
            count={Math.ceil(totalJobs / pageItems)}
            page={page}
            onChange={(_, newValue) => setPage(newValue)}
            variant='outlined'
            shape='rounded'
            renderItem={item => <CustomPaginationItem {...item} />}
          />
        </Grid>
      </Grid>
      <DialogCreate visible={createJob} onCloseClick={() => setCreateJob(false)} />
      <DialogUpload visible={openModal} onCloseClick={() => setOpenModal(false)} />
    </>
  )
}

JobManagement.acl = {
  action: 'read',
  subject: 'user-job-management'
}

export default JobManagement
