import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'src/utils/debounce'
import { useRouter } from 'next/router'
import { HttpClient } from 'src/services'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'

const TruncatedTypography = (props: { children: any; line?: number; [key: string]: any }) => {
  const { children, line, ...rest } = props
  const maxLine = line ? line : 1

  return (
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxHeight: `calc(${maxLine} * 1.2em)`,
        minHeight: '1.2em',
        lineHeight: '1.2em',
        fontSize: '16px',
        ...rest
      }}
    >
      {children}
    </Typography>
  )
}

const JobArchived = () => {
  // pagination
  const take = 999
  const page = 1

  // breakpoint
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [firstload, setFirstLoad] = useState(true)
  const [onLoading, setOnLoading] = useState(false)
  const [dataArchived, setDataArchived] = useState<any>([])

  // router
  const router = useRouter()

  // filter search and sort by
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('desc')

  const handleFetchJobArchivedList = async () => {
    setOnLoading(true)

    try {
      const response = await HttpClient.get(
        `/job/applicant/archives?page=${page}&take=${take}&search=${search}&sort=${sortBy}`
      )

      setDataArchived(response?.data?.data?.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Error fetching job saved list')
    } finally {
      setOnLoading(false)
      setFirstLoad(false)
    }
  }

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value)
    }, 500),
    []
  )

  const handleBrowseJob = () => {
    router.replace('/candidate/find-job/?tabs=1')
  }

  const handleChangeSelect = (event: any) => {
    setSortBy(event?.target?.value)
  }

  function getAppliedDuration(createdAt: any) {
    // Menghitung jarak waktu dari sekarang
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

    // Menghasilkan teks dengan format "Applied 3mo ago"
    return `Applied ${distance}`
  }

  const renderList = (data: any[]) => {
    return data.map(item => {
      const companyPhoto = item?.job?.company?.photo ? item?.job?.company?.photo : '/images/avatars/default-user.png'
      const companyNameUrl = item?.job?.company.name.toLowerCase().split(' ').join('-')
      const jobTitleUrl = item?.job?.job_title ? item?.job?.job_title?.toLowerCase().split(' ').join('-') : ''

      return (
        <Grid item xs={12} md={6} lg={4} key={item?.id}>
          <Paper
            sx={{
              p: isMobile ? '16px' : '24px',
              border: '2px solid #eee',
              transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',
              '&:hover': { borderColor: 'primary.main' },
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              cursor: 'pointer'
            }}
            elevation={0}
            onClick={() => router.push(`/candidate/job/${companyNameUrl}/${item?.job_id}/${jobTitleUrl}`)}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: '4em'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                <Avatar src={companyPhoto} alt='profile-picture' sx={{ width: 50, height: 50, mr: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: '20px'
                  }}
                >
                  <TruncatedTypography line={2} fontWeight='bold' mb={0.5} textTransform='capitalize'>
                    {item?.job?.role_type?.name ?? '-'}
                  </TruncatedTypography>
                  <TruncatedTypography fontSize={14} color={'#404040'}>
                    {item?.job?.company?.name ?? '-'}
                  </TruncatedTypography>
                </Box>
              </Box>
            </Box>
            {item?.job?.category?.employee_type === 'onship' ? (
              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '80px' }}>
                  <Typography fontSize={14} fontWeight={400} color={'#999'}>
                    {item?.job?.contract_duration ? `${item?.job?.contract_duration} months` : '-'}
                  </Typography>
                  <Typography fontSize={14} fontWeight={400} color={'#999'}>
                    {item?.job?.vessel_type ? item?.job?.vessel_type?.name : '-'}
                  </Typography>
                  <Typography fontSize={14} fontWeight={400} color={'#999'}>
                    {item?.created_at ? getAppliedDuration(item?.created_at) : '-'}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '80px' }}>
                  <Typography fontSize={14} fontWeight={400} color={'#999'}>
                    {item?.job?.work_arrangement ? item?.job?.work_arrangement : '-'}
                  </Typography>
                  <Typography fontSize={14} fontWeight={400} color={'#999'}>
                    {item?.job?.employment_type ? item?.job?.employment_type : '-'}
                  </Typography>
                  <Typography fontSize={14} fontWeight={400} color={'#999'}>
                    {item?.created_at ? getAppliedDuration(item?.created_at) : '-'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      )
    })
  }

  const handleConditionalRendering = () => {
    if (firstload) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </Box>
      )
    }

    if (dataArchived.length == 0) {
      return (
        <CardContent>
          <Grid container spacing={4} sx={{ marginBottom: '32px' }}>
            <Grid item xs={12} md={9}>
              <TextField
                variant='outlined'
                size='small'
                placeholder='Search'
                onChange={e => handleSearch(e.target.value)}
                sx={{ width: isMobile ? '100%' : '80%' }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Typography width={'80px'}>Sort By :</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={sortBy}
                    onChange={handleChangeSelect}
                    size='small'
                  >
                    <MenuItem value={'desc'}>Newest to Oldest </MenuItem>
                    <MenuItem value={'asc'}>Oldest to Newest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Image
                src={'/images/rafiki.png'}
                alt='assets-applied'
                width={isMobile ? 300 : 350}
                height={isMobile ? 200 : 260}
                style={{
                  margin: '0 auto'
                }}
              />
              <Typography
                sx={{ fontSize: '18px', fontWeight: 700, color: '#32497A', marginTop: '40px', marginBottom: '24px' }}
              >
                You haven’t save for any jobs yet
              </Typography>
              <Button variant='outlined' size='small' sx={{ textTransform: 'capitalize' }} onClick={handleBrowseJob}>
                Browse Job
              </Button>
            </Box>
          </Box>
        </CardContent>
      )
    }

    return (
      <CardContent>
        <Grid container spacing={4} sx={{ marginBottom: '32px' }}>
          <Grid item xs={12} md={9}>
            <TextField
              variant='outlined'
              size='small'
              placeholder='Search'
              onChange={e => handleSearch(e.target.value)}
              sx={{ width: isMobile ? '100%' : '80%' }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Typography width={'80px'}>Sort By :</Typography>
              <FormControl fullWidth>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={sortBy}
                  onChange={handleChangeSelect}
                  size='small'
                >
                  <MenuItem value={'desc'}>Newest to Oldest </MenuItem>
                  <MenuItem value={'asc'}>Oldest to Newest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        {onLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={6}>
              {renderList(dataArchived)}
            </Grid>
          </>
        )}
      </CardContent>
    )
  }

  useEffect(() => {
    handleFetchJobArchivedList()
  }, [search, page, sortBy])

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12} sm={6} md={12}>
        <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
          {handleConditionalRendering()}
        </Card>
      </Grid>
    </Grid>
  )
}

JobArchived.acl = {
  action: 'read',
  subject: 'home'
}

export default JobArchived
