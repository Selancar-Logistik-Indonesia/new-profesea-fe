import { Icon } from '@iconify/react'
import { Box, Button, Divider, Grid, InputAdornment, MenuItem, Pagination, Select, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import localStorageKeys from 'src/configs/localstorage_keys'
import type Training from 'src/contract/models/training'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import JobCardSkeleton from 'src/views/job-management/JobCardSkeleton'
import TrainingCard from 'src/views/training-management/TrainingCard'
import { v4 } from 'uuid'

const tabsOption = [
  { value: 'activeTraining', label: 'Active Training' },
  { value: 'trainingHistory', label: 'Training History' }
]

const bookingTypeOption = [
  { value: 'instant', label: 'Instant' },
  { value: 'quotaBased', label: 'Quota Based' },
  { value: 'fixedDate', label: 'Fixed Date' }
]

const Training = () => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const router = useRouter()

  //page settings
  const pageItems = 10
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('activeTraining')
  const [refetch, setRefetch] = useState(v4())

  // filters settings
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('newest')
  const [status, setStatus] = useState<string>('')
  const [bookingType, setBookingType] = useState<string>('')

  //datas
  const [trainings, setTrainings] = useState<Training[] | null>(null)
  const [totalTrainings, setTotalTrainings] = useState<number>(0)

  const getTrainings = async () => {
    setLoading(true)
    try {
      const res = await HttpClient.get(`/training`, {
        username: user.username,
        search: search,
        take: pageItems,
        page: page
      })
      const data = res.data.trainings.data
      
      setTrainings(data)
      setTotalTrainings(res.data.trainings.total)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearch('')
    setSort('')
    setStatus('')
    setBookingType('')
  }

  useEffect(() => {
    getTrainings()
  }, [sort, search, bookingType, status, page])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box
        sx={{
          backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
          padding: '2.5rem 2.4rem 1px 2.4rem'
        }}
      >
        {/* banner atas */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>{user.name}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#FFFFFF80',
                borderRadius: '6px',
                padding: '.95rem 1.45rem'
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#202224' }}>Total Participant</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#202224' }}>2</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#FFFFFF80',
                borderRadius: '6px',
                padding: '.95rem 1.45rem'
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#202224' }}>Active Training</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#202224' }}>2</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#FFFFFF80',
                borderRadius: '6px',
                padding: '.95rem 1.45rem'
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 400, color: '#202224' }}>All Training</Typography>
              <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#202224' }}>2</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* main content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '1.45rem',
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 2px 10px 0px #00000014'
        }}
      >
        {/* Upper section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#404040' }}>Training Management</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#868686' }}>
                Organize, track, and update sessions easily. Schedule, monitor progress, and gather feedback—all in one
                place.
              </Typography>
            </Box>
            <Button
              disabled={user?.verified_at === null}
              onClick={() => {router.push('training-management/create-training/')}}
              size='small'
              variant='contained'
              sx={{ textTransform: 'none', whiteSpace: 'nowrap', height: '38px', padding: '8px 12px' }}
            >
              Create New Training
            </Button>
          </Box>
          <Box>
            <AnimatedTabs tabs={tabsOption} activeTab={activeTab} setActiveTab={setActiveTab} />
          </Box>
        </Box>

        <Divider variant='middle' sx={{ border: '1px', backgroundColor: '#E7E7E7', color:'#E7E7E7' }} />

        {/* filter section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            <Box sx={{ width: '240px', display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'right' }}>
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
                <Select fullWidth size='small' value={status} onChange={e => setStatus(e.target.value)} displayEmpty>
                  <MenuItem value=''>
                    <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Status</Typography>
                  </MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Select
                  fullWidth
                  size='small'
                  value={bookingType}
                  onChange={e => setBookingType(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value=''>
                    <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Booking Scheme Type</Typography>
                  </MenuItem>
                  {bookingTypeOption.map((type, i) => (
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
          </Box>
        </Box>
        
        {/* training list section */}
        <Grid container sx={{ mt: 0, mb: '8px' }} spacing={6}>
            {loading ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <Grid item key={i} xs={6}>
                    <JobCardSkeleton />
                  </Grid>
                ))
            ) : user?.verified_at === null ? (
              <>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box component='img' src='/images/no-image.jpg' sx={{ width: '320px' }} />
                  <Typography sx={{ color: '#949EA2', fontSize: 14, fontWeight: 400, textAlign: 'center' }}>
                    You are currently not eligible to create a job.
                    <br /> Please{' '}
                    <Link
                    href="#"
                      onClick={() => {
                        // setOpenModal(!openModal)
                        console.log('open')
                      }}
                    //   sx={{ cursor: 'pointer' }}
                    >
                      upload the required document
                    </Link>{' '}
                    for verification or wait for our approval.
                  </Typography>
                </Grid>
              </>
            ) : trainings && trainings.length > 0 ? (
              trainings.map((training, i) => (
                <Grid item key={i} xs={6}>
                  <TrainingCard trainingData={training} />
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

          {/* pagination */}
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#949EA2', fontSize: 12, fontWeight: 400 }}>{`Showing ${
            page * pageItems < totalTrainings ? page * pageItems : totalTrainings
          } out of ${totalTrainings} results`}</Typography>
          <Pagination
            size='small'
            count={Math.ceil(totalTrainings / pageItems)}
            page={page}
            onChange={(_, newValue) => setPage(newValue)}
            variant='outlined'
            shape='rounded'
            renderItem={item => <CustomPaginationItem {...item} />}
            sx={{mr:110}}
          />
        </Grid>
      </Box>
    </Box>
  )
}

Training.acl = {
  action: 'read',
  subject: 'user-training-management'
}

export default Training
