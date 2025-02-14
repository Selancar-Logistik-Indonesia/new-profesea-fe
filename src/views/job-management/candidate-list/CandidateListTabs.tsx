import { Icon } from '@iconify/react'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import Job from 'src/contract/models/job'
import { IUser } from 'src/contract/models/user'

const CandidateListTabs = ({ job }: { job: Job }) => {
  const [candidateList, setCandidateList] = useState<IUser[] | null>(null)
  const [tabs, setTabs] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('post')

  const firstLoad = () => {}

  useEffect(() => {
    firstLoad()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue)
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

  return (
    <Box
      sx={{
        borderRadius: '6px',
        boxShadow: 3,
        backgroundColor: '#FFF'
      }}
    >
      <TabContext value={tabs}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs onChange={handleChange}>
            <Tab label='Candidate List' value='all' />
            <Tab label='Waiting to Review' value='WR' />
            <Tab label='CV Reviewed' value='VD' />
            <Tab label='Proceed' value='AP' />
            <Tab label='Not Suitable' value='RJ' />
          </Tabs>
        </Box>
        <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            <Box sx={{ width: '230px', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'right' }}>
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
        </Grid>
        <TabPanel value='all'>Item One</TabPanel>
        <TabPanel value='WR'>Item Two</TabPanel>
        <TabPanel value='VD'>Item Three</TabPanel>
        <TabPanel value='AP'>Item Three</TabPanel>
        <TabPanel value='RJ'>Item Three</TabPanel>
      </TabContext>
    </Box>
  )
}

export default CandidateListTabs
