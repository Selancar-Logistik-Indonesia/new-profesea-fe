import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import Link from 'next/link'
import { format } from 'date-fns'
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

const renderSalary = (salaryStart: any, salaryEnd: any, currency: any) => {
  if (salaryEnd.toString() == '0') {
    return (
      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
        {salaryStart ? `${salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} (${currency})` : '-'}
      </Typography>
    )
  }

  if (salaryStart.toString() !== '0' && salaryEnd.toString() !== '0') {
    return (
      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
        {salaryStart && salaryEnd
          ? `${
              salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
              ' - ' +
              salaryEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            } (${currency})`
          : '-'}
      </Typography>
    )
  }

  return '-'
}

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listJob: Job[]
}

const renderList = (listJob: Job[]) => {
  if (!listJob || listJob.length == 0) {
    return null
  }

  return listJob.map(item => {
    const userPhoto = item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'
    const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
    const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''

    return (
      <Grid item xs={12} md={6} lg={4} key={item?.id}>
        <Link href={`/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`}>
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
                        {item?.currency == 'IDR' ? (
                          item?.salary_start && item?.salary_end ? (
                            renderSalary(item?.salary_start, item?.salary_end, item?.currency)
                          ) : null
                        ) : item?.salary_start && item?.salary_end ? (
                          <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                            {item?.salary_end.toString() !== '0'
                              ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                              : `${item?.salary_start} (${item?.currency})`}
                          </Typography>
                        ) : null}
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
                        {item?.currency == 'IDR' ? (
                          item?.salary_start && item?.salary_end ? (
                            renderSalary(item?.salary_start, item?.salary_end, item?.currency)
                          ) : null
                        ) : item?.salary_start && item?.salary_end ? (
                          <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                            {item?.salary_end.toString() !== '0'
                              ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                              : `${item?.salary_start} (${item?.currency})`}
                          </Typography>
                        ) : null}
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

const RecomendedView = (props: Props) => {
  const { listJob } = props

  return (
    <Grid container spacing={3}>
      {renderList(listJob)}
    </Grid>
  )
}

export default RecomendedView
