import { Icon } from '@iconify/react'
import {
  Alert,
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
import ModalUnlockPlus from 'src/@core/components/subscription/ModalUnlockPlus'
import Job from 'src/contract/models/job'
import JobCategory from 'src/contract/models/job_category'
import VesselType from 'src/contract/models/vessel_type'
import { useAuth } from 'src/hooks/useAuth'
import { HttpClient } from 'src/services'
import DialogCreate from 'src/views/job-management/DialogCreate'
import DialogUpload from 'src/views/job-management/DialogUpload'
import JobCard from 'src/views/job-management/JobCard'
import JobCardSkeleton from 'src/views/job-management/JobCardSkeleton'
import { v4 } from 'uuid'

const pageItems = 6
const tabsOption = [
  { value: 'onship', label: 'Seafarer' },
  { value: 'offship', label: 'Professional' }
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
  const { user } = useAuth()
  const router = useRouter()
  const [refetch, setRefetch] = useState(v4())
  const [onLoading, setOnLoading] = useState<boolean>(false)
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [createJob, setCreateJob] = useState(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [document, setDocument] = useState<any[]>([])

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

  const getJobs = async () => {
    setOnLoading(true)
    try {
      const response = await HttpClient.get('/job', {
        search: search,
        page: page,
        take: pageItems,
        employee_type: activeTab,
        category_id: jobCategoryFilter?.id,
        vesseltype_id: vesselTypeFilter?.id,
        employment_type: employmentTypeFilter,
        sort: sort,
        is_active: checkStatus(statusFilter)
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
    getJobs()
  }, [refetch, activeTab, search, page, jobCategoryFilter, statusFilter, vesselTypeFilter, employmentTypeFilter, sort])

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
          <Alert icon={<Icon icon='ph:lightning' fontSize={32} color="#32497A"/>} sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2, backgroundColor:'#F8F8F7', border:'1px solid #BFBFBF', borderRadius:'8px', mb:8}}>
              <Box sx={{display:'flex', flexDirection:'column', gap:1}}>
                  <Typography sx={{fontSize:14, fontWeight:700, color:'#303030'}}>Boost Job Visibility</Typography>
                  <Typography sx={{fontSize:14, fontWeight:400, color:'#525252'}}>Highlight this job to attract more candidates. You can only boost one job at a time. To highlight this job and attract more candidates, you'll need to deactivate any currently boosted job on job management.</Typography>
              </Box>
          </Alert>
          {/* nge test doang jangan lupa dihapus */}
          <ModalUnlockPlus text='ngetes doang, jan lupa dihapus'/>
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
              disabled={user?.verified_at === null || document.length === 0}
              sx={{ height: '38px', padding: '8px 12px', textTransform: 'none' }}
            >
              Create Job
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {isCrewing && <AnimatedTabs tabs={tabsOption} activeTab={activeTab} setActiveTab={setActiveTab} />}
            <Box sx={{ display: 'flex', gap: '70px' }}>
              <TextField
                sx={{ flexGrow: 1 }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                variant='outlined'
                placeholder='Search'
                size='small'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ marginRight: '8px' }}>
                      <Icon icon='ph:magnifying-glass' fontSize={16} />
                    </InputAdornment>
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
            <Box sx={{ display: 'flex', gap: '70px' }}>
              <Grid container spacing={6}>
                <Grid item xs={4}>
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
                  {activeTab === 'onship' ? (
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
              <Box sx={{ flexShrink: 0, display: 'flex', width: '240px', justifyContent: 'right' }}>
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
                  <JobCard job={job} refetch={() => setRefetch(v4())} />
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
