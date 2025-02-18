import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'
import { IUser } from 'src/contract/models/user'
import VesselType from 'src/contract/models/vessel_type'
import { HttpClient } from 'src/services'
import Candidate from './Candidate'

const CandidateListTabs = ({ job }: { job: Job }) => {
  const [candidateList, setCandidateList] = useState<IUser[] | null>(null)
  const [totalCandidates, setTotalCandidates] = useState<number>(0)
  const [tabs, setTabs] = useState<string>('all')
  const [vesselType, getVesselType] = useState<VesselType[] | null>(null)

  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<number>(10)
  const [sort, setSort] = useState('newest')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [vesselTypeFilter, setVesselTypeFilter] = useState<VesselType | null>(null)

  const firstLoad = () => {
    HttpClient.get(`${AppConfig.baseUrl}/job/${job.id}/appllicants`, {
      page,
      take: pageItems,
      status: statusFilter,
      vesseltype_id: vesselTypeFilter
    }).then(response => {
      setCandidateList(response.data.job)
      setTotalCandidates(response.data.total)
    })
    HttpClient.get('/public/data/vessel-type?page=1&take=1000').then(async response => {
      const data: VesselType[] = await response.data.vesselTypes.data
      getVesselType(data)
    })
  }

  useEffect(() => {
    firstLoad()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue)
  }

  const clearFilters = () => {
    setSearch('')
    setSort('post')
    setStatusFilter('')
    setVesselTypeFilter(null)
    setPage(1)
  }

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
      <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
        <Tabs onChange={handleChange}>
          <Tab label='Candidate List' value='all' />
          <Tab label='Waiting to Review' value='WR' />
          <Tab label='CV Reviewed' value='VD' />
          <Tab label='Proceed' value='AP' />
          <Tab label='Not Suitable' value='RJ' />
        </Tabs>
      </Box>
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
              defaultValue='newest'
              value={sort}
              onChange={e => setSort(e.target.value)}
              sx={{
                border: 'none',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                }
              }}
            >
              <MenuItem value='newest'>Newest to Oldest</MenuItem>
              <MenuItem value='oldest'>Oldest to Newest</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '70px' }}>
          <Grid container spacing={6}>
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
              {job.category.employee_type === 'onship' && (
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
              )}
            </Grid>
          </Grid>
          <Box sx={{ flexShrink: 0, display: 'flex', width: '230px', justifyContent: 'right' }}>
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
      <Candidate candidates={candidateList!} />
      <Grid>
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
    </Box>
  )
}

export default CandidateListTabs
