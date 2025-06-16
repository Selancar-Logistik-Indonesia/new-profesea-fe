import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Box, Button, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import { Icon } from '@iconify/react'
import ReportedTab from 'src/views/admin/community-management/ReportedTab'

const tabsOption = [
  { value: 'community', label: 'Community Management' },
  { value: 'content', label: 'Reported Content Management' }
]

const visibilityOption = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' }
]

const CommunityManagement = () => {

  


  //filter settings
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('desc')
  const [visibility, setVisibility] = useState('')

  //page settings
  const [activeTab, setActiveTab] = useState('community')
  const [page, setPage] = useState(1)
  const [rowCount, setRowCount] = useState(0)
  const [perPage, setPerPage] = useState(10)




  const clearFilters = () => {
    setSearch('')
    setSort('desc')
    setVisibility('')
    setPage(1)
  }

  useEffect(() => {
    clearFilters()
  }, [activeTab])


  return (
    <>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            <CardHeader
              sx={{
                '.MuiCardHeader-action': {
                  alignSelf: 'center'
                }
              }}
              title={
                <Typography variant='body2' style={{ fontSize: '18px', fontWeight: '600', color: '#404040' }}>
                  Community Management
                </Typography>
              }
              subheader={
                <Typography variant='body2' style={{ fontSize: '16px', fontWeight: '400', color: '#868686' }}>
                  Oversee, moderate, and manage community groups across the platform to ensure a safe, respectful, and
                  high-quality environment for users.
                </Typography>
              }
              action={
                <Button variant='contained' size='small' sx={{ textTransform: 'none' }}>
                  Create New Community
                </Button>
              }
            />
            <CardContent sx={{ display:'flex', flexDirection:'column', gap:5}}>
              <AnimatedTabs tabs={tabsOption} activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* filter section */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                  <Box
                    sx={{ width: '240px', display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'right' }}
                  >
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
                      <MenuItem value='desc'>Newest to Oldest</MenuItem>
                      <MenuItem value='asc'>Oldest to Newest</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '70px' }}>
                  <Grid container spacing={6}>
                    <Grid item xs={4} sx={{display: activeTab === 'community' ? 'flex' : 'none'}}>
                      <Select
                        fullWidth
                        size='small'
                        value={visibility}
                        onChange={e => setVisibility(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value=''>
                          <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Visibility Type</Typography>
                        </MenuItem>
                        {visibilityOption.map((type, i) => (
                          <MenuItem key={i} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
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
                  <Box>
                    {}
                  </Box>
                </Box>
              </Box>

              <ReportedTab tab={activeTab} search={search} sort={sort}/>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

CommunityManagement.acl = {
  action: 'read',
  subject: 'admin-community-management'
}

export default CommunityManagement
