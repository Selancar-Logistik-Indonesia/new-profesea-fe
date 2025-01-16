import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Popper,
  Select,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import { useRouter } from 'next/router'
import debounce from 'src/utils/debounce'
import { Icon } from '@iconify/react'

import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import CertificateDialog from '../../job/CertificateDialog'
import CompleteDialog from '../../job/CompleteDialog'
import { formatDistanceToNow } from 'date-fns'

interface IJobSaved {
  id: number
  user_id: number
  job_id: number
  created_at: string
  updated_at: string
  job: Job
}

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

const CustomPaginationItem = (props: any) => {
  const { selected, ...other } = props

  return (
    <PaginationItem
      {...other}
      sx={{
        ...(selected
          ? {
              backgroundColor: '#32497A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#32497A'
              }
            }
          : {
              backgroundColor: '#DDDDDD',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#CCCCCC'
              }
            }),
        fontWeight: 300,
        borderRadius: '4px',
        margin: '0 2px'
      }}
    />
  )
}

const JobSaved = () => {
  // user
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  // router
  const router = useRouter()

  // breakpoint
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // pagination

  const take = 15
  const [page, setPage] = useState(1)

  const [firstload, setFirstLoad] = useState(true)
  const [onLoading, setOnLoading] = useState(false)
  const [dataSaved, setDataSaved] = useState<IJobSaved[]>([])
  const [openPopperId, setOpenPopperId] = useState(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [totalJob, setTotalJob] = useState(0)
  const [license, setLicense] = useState<any[] | undefined>()
  const [openDialog, setOpenDialog] = useState(false)
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false)
  const [jobDetail, setJobDetail] = useState<Job | null>(null)

  // filter search and sort by
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('desc')

  const handleFetchJobSavedList = async () => {
    setOnLoading(true)

    try {
      const response = await HttpClient.get(`/job/save/list?page=${page}&take=${take}&search=${search}&sort=${sortBy}`)

      const resp2 = await HttpClient.get(`/user/${user.id}`)
      const applicant = resp2.data.user

      setDataSaved(response?.data?.data?.data)
      setTotalJob(response?.data?.data?.total ?? 0)
      setLicense(applicant.seafarer_competencies.concat(applicant.seafarer_proficiencies))
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

  const handleChangeSelect = (event: any) => {
    setSortBy(event?.target?.value)
  }

  const handleBrowseJob = () => {
    router.replace('/candidate/find-job/?tabs=1')
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: any) => {
    if (openPopperId === id) {
      // Close the Popper if it is already open
      setOpenPopperId(null)
      setAnchorEl(null)
    } else {
      // Open the Popper for the clicked item
      setAnchorEl(event.currentTarget)
      setOpenPopperId(id)
    }
  }

  const handleApply = async (id: any, jobLicense: any[], jobCategory: any, jobDetail: Job) => {
    setJobDetail(jobDetail)
    if (user?.license != null && user?.photo != '' && user.address.city_id != null) {
      if (license?.length === 0 && jobLicense.length !== 0 && jobCategory.employee_type == 'onship') {
        setOpenCertificateDialog(!openCertificateDialog)
      } else {
        setOpenDialog(!openDialog)
      }
    } else {
      toast.error(`Please complete your resume !`)
    }
  }

  const handleDeleteJobSave = async (jobId: any) => {
    try {
      const response = await HttpClient.del(`/job/save/${jobId}`)

      if (response?.status === 200) {
        setDataSaved(prevState => prevState.filter(p => p.id !== jobId))
        toast.success('Success unsaved job')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error unsaved job')
    }
  }

  function getAppliedDuration(createdAt: any) {
    // Menghitung jarak waktu dari sekarang
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true })

    // Menghasilkan teks dengan format "Applied 3mo ago"
    return `Applied ${distance}`
  }

  useEffect(() => {
    handleFetchJobSavedList()
  }, [page, search, sortBy])

  const renderList = (data: IJobSaved[]) => {
    return data.map(item => {
      const companyPhoto = item?.job?.company?.photo ? item?.job?.company?.photo : '/images/avatars/default-user.png'

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
              gap: '10px'
            }}
            elevation={0}
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
              <Box
                ml={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  gap: '2px'
                }}
              >
                <Icon
                  icon={'iconoir:bookmark-solid'}
                  color='rgba(50, 73, 122, 1)'
                  fontSize={'20px'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteJobSave(item?.id)}
                />
                <IconButton
                  aria-label='dot-menu'
                  size='small'
                  type='button'
                  onClick={event => handleClick(event, item.id)}
                >
                  <Icon icon={'ph:dots-three-bold'} color='rgba(50, 73, 122, 1)' fontSize={'20px'} />
                </IconButton>
                <Popper
                  id={`popper-${item.id}`}
                  open={openPopperId === item.id}
                  anchorEl={openPopperId === item.id ? anchorEl : null}
                  placement='bottom-end'
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      padding: '8px',
                      borderRadius: '4px',
                      background: '#FFF',
                      boxShadow: '2px 2px 5px -1px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <Box
                      onClick={() => handleApply(item?.id, item?.job?.license, item?.job?.category, item?.job)}
                      sx={{ display: 'flex', gap: '10px', cursor: 'pointer' }}
                    >
                      <Icon icon={'clarity:cursor-hand-click-line'} width={20} height={20} />
                      <Typography>Apply Job</Typography>
                    </Box>
                  </Box>
                </Popper>
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

    if (dataSaved.length == 0) {
      return (
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
              {renderList(dataSaved)}
            </Grid>
            <Box
              sx={{
                width: 'full',
                display: 'flex',
                justifyContent: 'end',
                marginTop: '50px',
                marginBottom: '40px'
              }}
            >
              <Pagination
                page={page}
                count={Math.ceil(totalJob / take)}
                onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                  setPage(value)
                }}
                variant='outlined'
                shape='rounded'
                renderItem={item => <CustomPaginationItem {...item} />}
              />
            </Box>
          </>
        )}
      </CardContent>
    )
  }

  return (
    <>
      {openCertificateDialog && (
        <CertificateDialog
          selectedItem={undefined}
          onClose={() => setOpenCertificateDialog(!openCertificateDialog)}
          openDialog={openCertificateDialog}
        />
      )}

      {openDialog && (
        <CompleteDialog
          onClose={() => setOpenDialog(!openDialog)}
          selectedItem={jobDetail}
          openDialog={openDialog}
          setApply={() => {}}
        />
      )}

      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={12}>
          <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
            {handleConditionalRendering()}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

JobSaved.acl = {
  action: 'read',
  subject: 'home'
}

export default JobSaved
