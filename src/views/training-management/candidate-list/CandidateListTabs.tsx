import { Icon } from '@iconify/react'
import {
  Box,
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
import { useEffect, useRef, useState } from 'react'
import CustomTabs from 'src/@core/components/custom-tabs'
import CustomPaginationItem from 'src/@core/components/pagination/item'
import { AppConfig } from 'src/configs/api'
import Training from 'src/contract/models/training'
import ITrainingParticipant from 'src/contract/models/training_participant'
import { HttpClient } from 'src/services'
import AdminCandidate from '../admin/AdminCandidate'
import AdminStatusFilter from '../admin/AdminStatusFilter'
import Candidate from './Candidate'

const tabItemsAdmin = (training: Training) => {
  return [
    { label: 'All', value: 'all', count: training.count_participant },
    { label: 'Waiting', value: 'unregistered', count: training.count_participant_status.unregistered },
    { label: 'Verifying', value: 'contacted', count: training.count_participant_status.contacted },
    { label: 'Unpaid', value: 'unpaid', count: training.count_participant_status.unpaid },
    { label: 'Paid', value: 'paid', count: training.count_participant_status.paid },
    { label: 'Registered', value: 'registered', count: training.count_participant_status.registered },
    { label: 'Onhold', value: 'onhold', count: training.count_participant_status.on_hold },
    { label: 'Ongoing', value: 'ongoing', count: training.count_participant_status.on_going },
    { label: 'Completed', value: 'complete', count: training.count_participant_status.completed }
  ]
}

const tabItemsTrainer = [
  { label: 'Registered Participant', value: 'registered' },
  { label: 'Onhold', value: 'onhold' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Training Completed', value: 'complete' }
]

const CandidateListTabs = ({
  training,
  pageView = 'trainer',
  count
}: {
  training?: Training
  pageView?: string
  count: VoidFunction
}) => {
  const searchParams = useSearchParams()
  const tabStatus = searchParams.get('tabs')
  const trainingId = searchParams.get('id')
  const prevTabStatus = useRef(tabStatus)
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [candidateList, setCandidateList] = useState<ITrainingParticipant[]>([])
  const [totalCandidates, setTotalCandidates] = useState<number>(0)

  const [tabs, setTabs] = useState<string>(tabStatus ?? 'registered')
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState(1)
  const [pageItems, setPageItems] = useState<number>(10)
  const [sort, setSort] = useState('asc')

  const clearFilters = () => {
    setSearch('')
    setSort('asc')
    setPage(1)
  }

  const getParticipants = async () => {
    await HttpClient.get(`${AppConfig.baseUrl}/training/${trainingId}/participants`, {
      page,
      take: pageItems,
      search,
      sort,
      status: tabs !== 'all' ? tabs : null
    }).then(response => {
      setCandidateList(response.data.participants.data)
      setTotalCandidates(response.data.participants.total)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getParticipants()
  }, [tabs, tabStatus, page, pageItems, search, sort])

  useEffect(() => {
    if (prevTabStatus.current !== tabStatus) {
      count()
      setTabs(tabStatus ?? 'registered')
      prevTabStatus.current = tabStatus
    } else {
      router.replace(`/${pageView}/training-management/${trainingId}/?tabs=${tabs}`, undefined, {
        shallow: true,
        scroll: false
      })
    }
  }, [tabStatus, tabs])

  useEffect(() => {
    clearFilters()
  }, [tabs])

  return (
    <Box
      sx={{
        borderRadius: '6px',
        boxShadow: 3,
        backgroundColor: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden'
      }}
    >
      {pageView === 'admin' ? (
        <AdminStatusFilter tabs={tabs} setTabs={setTabs} tabItems={tabItemsAdmin(training!)} />
      ) : (
        <CustomTabs tabs={tabs} setTabs={setTabs} tabItems={tabItemsTrainer} />
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
          {pageView === 'admin' ? (
            <AdminCandidate candidates={candidateList} />
          ) : (
            <Candidate candidates={candidateList} />
          )}
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
