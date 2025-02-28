import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import CustomTabs from 'src/@core/components/custom-tabs'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import { AppConfig } from 'src/configs/api'
import Applicant from 'src/contract/models/applicant'
import City from 'src/contract/models/city'
import VesselType from 'src/contract/models/vessel_type'
import { HttpClient } from 'src/services'
import { v4 } from 'uuid'
import Candidate from './Candidate'

const tabItems = [
  { label: 'Candidate List', value: 'all' },
  { label: 'Waiting to Review', value: 'WR' },
  { label: 'CV Reviewed', value: 'VD' },
  { label: 'Proceed', value: 'PR' },
  { label: 'Completed', value: 'completed' }
]

const completedTabs = [
  { label: 'Hired', value: 'AP' },
  { label: 'Not Suitable', value: 'RJ' }
]

const CandidateListTabs = ({ count }: { count: VoidFunction }) => {
  const params = useSearchParams()
  const tabStatus = params.get('tabs')
  const jobId = params.get('id')
  const router = useRouter()

  const [refetch, setRefetch] = useState(v4())
  const [isLoading, setIsLoading] = useState(false)
  const [candidateList, setCandidateList] = useState<Applicant[]>([])
  const [totalCandidates, setTotalCandidates] = useState<number>(0)
  const [vesselType, getVesselType] = useState<VesselType[] | null>(null)
  const [city, getCity] = useState<City[] | null>(null)

  const [tabs, setTabs] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<number>(10)
  const [sort, setSort] = useState('asc')

  const [statusFilter, setStatusFilter] = useState<string>('')
  const [cityFilter, setCityFilter] = useState<City | null>(null)
  const [vesselTypeFilter, setVesselTypeFilter] = useState<VesselType | null>(null)

  const firstLoad = async () => {
    const statusParam = tabs === 'all' ? statusFilter : tabs === 'completed' ? statusFilter : tabs
    await HttpClient.get(`${AppConfig.baseUrl}/job/${jobId}/appllicants`, {
      page,
      take: pageItems,
      status: statusParam,
      vesseltype_id: vesselTypeFilter?.id,
      city_id: cityFilter?.id
    }).then(response => {
      setCandidateList(response.data.applicants.data)
      setTotalCandidates(response.data.applicants.total)
    })
    HttpClient.get('/public/data/vessel-type?page=1&take=1000').then(async response => {
      const data: VesselType[] = await response.data.vesselTypes.data
      getVesselType(data)
    })
    await HttpClient.get(AppConfig.baseUrl + '/public/data/city?country_id=100').then(response => {
      const data = response.data.cities
      getCity(data)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    firstLoad()

    if (jobId) {
      const updatedPathname = `/company/job-management/${jobId}`
      const newQuery = new URLSearchParams(params.toString())

      newQuery.delete('id')
      if (tabs === 'completed') {
        newQuery.set('tabs', statusFilter)
      } else {
        newQuery.set('tabs', tabs)
      }
      router.replace(`${updatedPathname}?${newQuery.toString()}`, undefined, { shallow: true, scroll: false })
    }
  }, [tabs, page, pageItems, statusFilter, vesselTypeFilter, cityFilter, refetch])

  useEffect(() => {
    clearFilters()
    if (tabs === 'completed') {
      if (tabStatus !== 'RJ') {
        setStatusFilter('AP')
      }
    }
  }, [tabs])

  useEffect(() => {
    if (tabStatus === 'all' || tabStatus === 'RJ' || tabStatus === 'AP') {
      if (tabStatus !== 'all') {
        setTabs('completed')
        setStatusFilter(tabStatus)
      } else setTabs('all')
    } else if (tabStatus) {
      setTabs(tabStatus)
    }
  }, [tabStatus])

  const clearFilters = () => {
    setSearch('')
    setSort('asc')
    setStatusFilter('')
    setVesselTypeFilter(null)
    setPage(1)
  }

  useEffect(() => {
    count()
  }, [refetch])

  return (
    <Box
      sx={{
        borderRadius: '6px',
        boxShadow: 3,
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      <CustomTabs tabs={tabs} setTabs={setTabs} tabItems={tabItems} />
      {tabs === 'completed' && (
        <Box sx={{ display: 'flex', px: '24px' }}>
          <AnimatedTabs tabs={completedTabs} activeTab={statusFilter} setActiveTab={setStatusFilter} />
        </Box>
      )}
      <Grid container sx={{ display: 'flex', px: '24px', flexDirection: 'column', gap: '24px' }}>
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
              defaultValue='asc'
              value={sort}
              onChange={e => setSort(e.target.value)}
              sx={{
                border: 'none',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
            >
              <MenuItem value='asc'>Newest to Oldest</MenuItem>
              <MenuItem value='desc'>Oldest to Newest</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '70px' }}>
          <Grid container spacing={4}>
            {tabs === 'all' && (
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
                  <MenuItem value='WR'>Waiting for Review</MenuItem>
                  <MenuItem value='VD'>Viewed</MenuItem>
                  <MenuItem value='PR'>Proceed</MenuItem>
                </Select>
              </Grid>
            )}
            <Grid item xs={4}>
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
                noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                autoHighlight
                options={city || []}
                getOptionLabel={option => option.city_name || ''}
                value={city?.find(city => city.id === cityFilter?.id) || null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, newValue) => {
                  setCityFilter(newValue ? newValue : null)
                }}
                renderInput={field => <TextField {...field} placeholder='Pilih kota' size='small' />}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.id} value={option.id}>
                    {option.city_name}
                  </MenuItem>
                )}
                noOptionsText='Hasil pencaian tidak ditemukan. Coba gunakan kata kunci lain atau periksa kembali pencarian Anda'
              />
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography sx={{ color: '#404040', fontSize: 14 }}>Show</Typography>
          <Select
            size='small'
            defaultValue={10}
            value={pageItems}
            onChange={e => setPageItems(Number(e.target.value))}
            sx={{
              border: '1px solid #E7E7E7',
              width: '80px'
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
          <Typography sx={{ color: '#404040', fontSize: 14 }}>Entry</Typography>
        </Box>
      </Grid>
      {isLoading ? (
        <Grid sx={{ display: 'flex', justifyContent: 'center', mb: '24px' }}>
          <CircularProgress size={24} />
        </Grid>
      ) : candidateList && candidateList.length === 0 ? (
        <Grid
          container
          sx={{ display: 'flex', py: '24px', gap: '40px', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box component='img' src='/images/no-applicant.png' sx={{ width: 'auto', height: '200px' }} />
          <Typography sx={{ color: '#999999', fontSize: 14, fontWeight: 400 }}>
            There are no candidates in your list right now.
          </Typography>
        </Grid>
      ) : (
        <>
          <Candidate candidates={candidateList} refetch={() => setRefetch(v4())} />
          <Grid container justifyContent='center' sx={{ mb: '24px' }}>
            <Pagination
              size='small'
              count={Math.ceil(totalCandidates / pageItems)}
              page={page}
              onChange={(_, newValue) => setPage(newValue)}
              variant='outlined'
              shape='rounded'
              renderItem={item => <CustomPaginationItem {...item} />}
            />
          </Grid>
        </>
      )}
    </Box>
  )
}

export default CandidateListTabs
