import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, CircularProgress, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import Link from 'next/link'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { HttpClient } from 'src/services'
import { useAuth } from 'src/hooks/useAuth'
import { timeCreated } from 'src/utils/helpers'

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

const JobsValue = (props: { icon: string; children: any }) => {
  const { icon, children } = props

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, mb: 1.5 }}>
      <Icon icon={icon} color='#32487A' fontSize={'20px'} />
      <Grid item xs={true} sx={{ flexGrow: 1 }}>
        <TruncatedTypography line={1} fontSize={16}>
          {children}
        </TruncatedTypography>
      </Grid>
    </Grid>
  )
}

export type ParamMain = {
  name: string
  skill: string
  location: string
}

const renderList = (listJobs: Job[] | null) => {
  if (!listJobs || listJobs.length == 0) {
    return <></>
  }

  const renderSalary = (salaryStart: any, salaryEnd: any, currency: string) => {
    if (+salaryStart == 0) {
      return '-'
    }

    if (salaryStart && salaryEnd) {
      if (currency == 'IDR') {
        // IDR
        if (+salaryEnd == 0) {
          return `${salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} (${currency})`
        } else {
          return `${
            salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
            ' - ' +
            salaryEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
          } (${currency})`
        }
      } else {
        // USD
        if (+salaryEnd == 0) {
          return `${salaryStart} (${currency})`
        } else {
          return `${salaryStart} - ${salaryEnd} (${currency})`
        }
      }
    } else {
      return '-'
    }
  }

  return listJobs.map(item => {
    const { user } = useAuth()

    const userPhoto = item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'
    const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
    const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''
    const link = user
      ? `/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`
      : `/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`

    return (
      <Grid item xs={12} md={6} lg={4} key={item?.id}>
        <Link style={{ textDecoration: 'none' }} href={link}>
          <Paper
            sx={{
              p: 4,
              border: '2px solid #eee',
              transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',
              '&:hover': { borderColor: 'primary.main' }
            }}
            elevation={0}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                height: '4em',
                mb: 3
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1
                }}
              >
                <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50, mr: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <TruncatedTypography line={2} fontWeight='bold' mb={0.5}>
                    {item?.role_type?.name ?? '-'}
                  </TruncatedTypography>
                  <TruncatedTypography fontSize={14} color={'#0a66c2'}>
                    {item?.company?.name ?? '-'}
                  </TruncatedTypography>
                </Box>
              </Box>
              <Box
                ml={1}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'right',
                  width: { sm: '100px', md: '80px', lg: '100px' }
                }}
              >
                <Typography align='right' sx={{ color: 'text.primary' }} fontSize={12}>
                  {item?.created_at ? timeCreated(item.created_at) : '-'}
                </Typography>
              </Box>
            </Box>
            <Grid item container>
              {item?.category?.employee_type == 'onship' ? (
                <>
                  <JobsValue icon='solar:case-minimalistic-bold-duotone'>
                    {`${item?.category?.name ?? '-'} | `}
                    {item?.job_title ?? ''}
                  </JobsValue>
                  <JobsValue icon='ri:ship-fill'>{item?.vessel_type?.name ?? '-'}</JobsValue>
                  <JobsValue icon='ri:calendar-fill'>
                    {format(new Date(item?.onboard_at), 'dd MMMM yyyy') ?? '-'}
                  </JobsValue>
                  <JobsValue icon='mdi:timer-sand'>
                    {item?.contract_duration ? `${item?.contract_duration} months` : '-'}
                  </JobsValue>
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1.5,
                      opacity: item?.hide_salary ? 0 : 100
                    }}
                  >
                    <Icon icon='ph:money-bold' color='#32487A' fontSize={'20px'} />
                    <Grid item xs={true} sx={{ flexGrow: 1 }}>
                      <TruncatedTypography line={1} fontSize={16}>
                        <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                          {renderSalary(item?.salary_start, item?.salary_end, item?.currency as string)}
                        </Typography>
                      </TruncatedTypography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <JobsValue icon='solar:case-minimalistic-bold-duotone'>
                    {`${item?.category?.name ?? '-'} | `}
                    {item?.rolelevel?.levelName ?? ''}
                  </JobsValue>
                  <JobsValue icon='solar:square-academic-cap-bold-duotone'>{item?.degree?.name ?? '-'}</JobsValue>
                  <JobsValue icon='mdi:location'>
                    {item?.city?.city_name ?? '-'} | {item?.employment_type ?? '-'}
                  </JobsValue>
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1.5,
                      opacity: item?.hide_salary ? 0 : 100
                    }}
                  >
                    <Icon icon='ph:money-bold' color='#32487A' fontSize={'20px'} />
                    <Grid item xs={true} sx={{ flexGrow: 1 }}>
                      <TruncatedTypography line={1} fontSize={16}>
                        <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                          {renderSalary(item?.salary_start, item?.salary_end, item?.currency as string)}
                        </Typography>
                      </TruncatedTypography>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Link>
      </Grid>
    )
  })
}

const OngoingJobScreen = ({ searchJob, employeeType }: { searchJob: string | null; employeeType: string | null }) => {
  const [listJobs, setJob] = useState<Job[] | null>(null)
  const [onLoading, setOnLoading] = useState(false)
  const payload = {
    page: 1,
    take: 12,
    search: searchJob,
    country_id: 100,
    employee_type: employeeType
  }

  const fetchJobs = async () => {
    try {
      setOnLoading(true)
      const resp = await HttpClient.get(`/public/data/job`, { ...payload })

      if (resp.status == 200) {
        const data = resp.data.jobs.data
        setJob(data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [searchJob, employeeType])

  if (onLoading) {
    return (
      <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ my: 20 }} />
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {renderList(listJobs)}
    </Grid>
  )
}

export default OngoingJobScreen
