import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import AnimatedTabs from 'src/@core/components/animated-tabs'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import type Training from 'src/contract/models/training'
import { IUser } from 'src/contract/models/user'
import { HttpClient } from 'src/services'
import TrainingCard from 'src/views/training-management/TrainingCard'
import TrainingCardSkeleton from 'src/views/training-management/TrainingCardSkeleton'
import { v4 } from 'uuid'

const tabsOption = [
  { value: 'activeTraining', label: 'Active Training' },
  { value: 'inactiveTraining', label: 'Inactive Training' }
]

const bookingTypeOption = [
  { value: 'instant_access', label: 'Instant' },
  { value: 'quota_based', label: 'Quota Based' },
  { value: 'fixed_date', label: 'Fixed Date' }
]

const TrainingPage = () => {
  const router = useRouter()

  //page settings
  const pageItems = 10
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('activeTraining')
  const [refetch, setRefetch] = useState(v4())

  // filters settings
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('desc')
  const [status, setStatus] = useState<string | null>(null)
  const [bookingType, setBookingType] = useState<string>('')
  const [trainer, setTrainer] = useState<string>('')

  //datas
  const [trainings, setTrainings] = useState<Training[] | null>(null)
  const [trainerData, setTrainerData] = useState<IUser[] | null>()
  const [totalShowedTraining, setTotalShowedTrainings] = useState<number>(0)

  const getTrainings = async () => {
    setLoading(true)
    try {
      const res = await HttpClient.get(`/training`, {
        username: trainer,
        search: search,
        take: pageItems,
        page: page,
        sort: sort,
        booking_scheme: bookingType,
        active: activeTab === 'activeTraining'
      })
      const data = res.data.trainings.data

      setTrainings(data)
      setTotalShowedTrainings(res.data.trainings.total)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const firstLoad = () => {
    HttpClient.get('/training/trainer', { page: 1, take: 1000, isTraining: 1 }).then(
      response => {
        const trainers = response.data.training.data
        setTrainerData(trainers)
      },
      error => {
        toast.error('Failed to get trainer data: ' + error.response.data.message)
      }
    )
  }

  useEffect(() => {
    firstLoad()
  }, [])

  const clearFilters = () => {
    setSearch('')
    setSort('desc')
    setStatus(null)
    setBookingType('')
    setTrainer('')
  }

  useEffect(() => {
    getTrainings()
  }, [sort, search, bookingType, trainer, status, page, refetch, activeTab])

  useEffect(() => {
    setPage(1)
  }, [activeTab])

  return (
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
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#404040' }}>Training Management</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#868686' }}>
              Organize, track, and update sessions easily. Schedule, monitor progress, and gather feedback—all in one
              place.
            </Typography>
          </Box>
          <Button
            onClick={() => {
              router.push('training-management/create-training/')
            }}
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

      <Divider variant='middle' sx={{ border: '1px', backgroundColor: '#E7E7E7', color: '#E7E7E7' }} />

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
              <MenuItem value='desc'>Newest to Oldest</MenuItem>
              <MenuItem value='asc'>Oldest to Newest</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '70px' }}>
          <Grid container spacing={6}>
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
            <Grid item xs={4}>
              <Select fullWidth size='small' value={trainer} onChange={e => setTrainer(e.target.value)} displayEmpty>
                <MenuItem value=''>
                  <Typography sx={{ color: '#949EA2', fontWeight: 400 }}>Training Center</Typography>
                </MenuItem>
                {trainerData &&
                  trainerData.map((type, i) => (
                    <MenuItem key={i} value={type.username}>
                      {type.name}
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
                <TrainingCardSkeleton />
              </Grid>
            ))
        ) : trainings && trainings.length > 0 ? (
          trainings.map((training, i) => (
            <Grid item key={i} xs={6}>
              <TrainingCard pageView='admin' trainingData={training} refetch={() => setRefetch(v4())} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Box component='img' src='/images/no-connection-request.png' sx={{ height: '160px', width: '160px' }} />
            <Typography sx={{ color: '#949EA2', fontSize: 12, fontWeight: 400 }}>
              You have no training available right now
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* pagination */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#949EA2', fontSize: 12, fontWeight: 400 }}>{`Showing ${
          page * pageItems < totalShowedTraining ? page * pageItems : totalShowedTraining
        } out of ${totalShowedTraining} results`}</Typography>
        <Pagination
          size='small'
          count={Math.ceil(totalShowedTraining / pageItems)}
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

TrainingPage.acl = {
  action: 'read',
  subject: 'admin-training-management'
}

export default TrainingPage
