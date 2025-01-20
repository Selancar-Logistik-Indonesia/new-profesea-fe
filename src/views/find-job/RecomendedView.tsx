import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import { format, formatDistanceToNow } from 'date-fns'
import { useJob } from 'src/hooks/useJob'
import { useRouter } from 'next/navigation'

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
    <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <Icon icon={icon} color='#32487A' fontSize={'20px'} />
      <Grid item xs={true} sx={{ flexGrow: 1 }}>
        <TruncatedTypography line={1} fontSize={14} fontWeight={400} color={'#666'}>
          {children}
        </TruncatedTypography>
      </Grid>
    </Grid>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderSalary = (salaryStart: any, salaryEnd: any, currency: any) => {
  if (salaryEnd.toString() == '0') {
    return (
      <Typography sx={{ color: '#666', fontWeight: 400 }} fontSize={14}>
        {salaryStart ? `Rp. ${salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : '-'}
      </Typography>
    )
  }

  if (salaryStart.toString() !== '0' && salaryEnd.toString() !== '0') {
    return (
      <Typography sx={{ color: '#666', fontWeight: 400 }} fontSize={14}>
        {salaryStart && salaryEnd
          ? `${
              'Rp. ' +
              salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
              ' - ' +
              'Rp. ' +
              salaryEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
            }`
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleJobSave, handleDeleteJobSave } = useJob()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const handleSavedJob = async (id: any) => {
    await handleJobSave(id)
  }

  function renderTimeAgo(dateString: string): string {
    const date = new Date(dateString) // Parse the date string

    return `${formatDistanceToNow(date)} ago`
  }

  if (!listJob || listJob.length == 0) {
    return null
  }

  return listJob.map(item => {
    const userPhoto = item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'
    const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
    const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''
    const isSaved = item?.job_save === null ? false : true

    return (
      <Grid item xs={12} md={6} lg={4} key={item?.id}>
        <Paper
          sx={{
            p: '24px',
            border: '2px solid #eee',
            transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',
            '&:hover': { borderColor: 'primary.main' },
            cursor: 'pointer'
          }}
          elevation={0}
          onClick={() => router.push(`/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`)}
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
                  justifyContent: 'center',
                  marginLeft: '20px'
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
                justifyContent: 'right'
              }}
            >
              <Icon
                icon={isSaved ? 'iconoir:bookmark-solid' : 'iconoir:bookmark'}
                color='rgba(50, 73, 122, 1)'
                fontSize={'16px'}
                style={{ cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation()
                  isSaved ? handleDeleteJobSave(item?.id, item?.job_save?.id) : handleSavedJob(item?.id)
                }}
              />
            </Box>
          </Box>
          <Grid item>
            {item?.category?.employee_type == 'onship' ? (
              <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <JobsValue icon='ph:anchor-light'>
                    {`${item?.category?.name ?? '-'} | `}
                    {item?.job_title ?? ''}
                  </JobsValue>
                  <JobsValue icon='ph:calendar-dots-duotone'>
                    {format(new Date(item?.onboard_at), 'dd MMMM yyyy') ?? '-'}
                  </JobsValue>
                  <JobsValue icon='ph:clock-duotone'>
                    {item?.contract_duration ? `${item?.contract_duration} months` : '-'}
                  </JobsValue>
                  <JobsValue icon='ph:sailboat-light'>{item?.vessel_type?.name ?? '-'}</JobsValue>
                  {item?.hide_salary ? (
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Icon icon='ph:money-bold' color='#32487A' fontSize={'20px'} />
                      <Typography sx={{ color: '#666', fontWeight: 400 }} fontSize={14}>
                        Salary undisclosed
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Icon icon='ph:money-bold' color='#32487A' fontSize={'20px'} />
                      <Grid item xs={true} sx={{ flexGrow: 1 }}>
                        <TruncatedTypography line={1} fontSize={14} fontWeight={400} color={'#666'}>
                          {item?.currency == 'IDR' ? (
                            item?.salary_start && item?.salary_end ? (
                              renderSalary(item?.salary_start, item?.salary_end, item?.currency)
                            ) : null
                          ) : item?.salary_start && item?.salary_end ? (
                            <Typography sx={{ color: '#666', fontWeight: 400 }} fontSize={14}>
                              {item?.salary_end.toString() !== '0'
                                ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                                : `${item?.salary_start} (${item?.currency})`}
                            </Typography>
                          ) : null}
                        </TruncatedTypography>
                      </Grid>
                    </Grid>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#999' }}>
                      {item?.applied_at != null ? 'Applied' : renderTimeAgo(item?.created_at)}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <JobsValue icon='ph:briefcase-duotone'>
                    {`${item?.category?.name ?? '-'} | `}
                    {item?.rolelevel?.levelName ?? ''}
                  </JobsValue>
                  {/* <JobsValue icon='solar:square-academic-cap-bold-duotone'>{item?.degree?.name ?? '-'}</JobsValue> */}
                  <JobsValue icon='ph:clock-duotone'>{item?.employment_type ?? '-'}</JobsValue>
                  <JobsValue icon='ph:map-pin-duotone'>{item?.city?.city_name ?? '-'}</JobsValue>
                  {item?.hide_salary ? (
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Icon icon='ph:money-bold' color='#32487A' fontSize={'20px'} />
                      <Typography sx={{ color: '#666', fontWeight: 400 }} fontSize={14}>
                        Salary undisclosed
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      <Icon icon='ph:money-bold' color='#32487A' fontSize={'20px'} />
                      <Grid item xs={true} sx={{ flexGrow: 1 }}>
                        <TruncatedTypography line={1} fontSize={14} fontWeight={400} color={'#666'}>
                          {item?.currency == 'IDR' ? (
                            item?.salary_start && item?.salary_end ? (
                              renderSalary(item?.salary_start, item?.salary_end, item?.currency)
                            ) : null
                          ) : item?.salary_start && item?.salary_end ? (
                            <Typography sx={{ color: '#666', fontWeight: 400 }} fontSize={14}>
                              {item?.salary_end.toString() !== '0'
                                ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                                : `${item?.salary_start} (${item?.currency})`}
                            </Typography>
                          ) : null}
                        </TruncatedTypography>
                      </Grid>
                    </Grid>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#999' }}>
                      {item?.applied_at != null ? 'Applied' : renderTimeAgo(item?.created_at)}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Grid>
        </Paper>
        {/* </Link> */}
      </Grid>
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listJob } = props

  return (
    <Grid container spacing={6}>
      {renderList(listJob)}
    </Grid>
  )
}

export default RecomendedView
