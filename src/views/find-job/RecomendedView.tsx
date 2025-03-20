import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import { format } from 'date-fns'
import { useJob } from 'src/hooks/useJob'
import { useRouter } from 'next/navigation'
import { renderSalary, renderTimeAgo } from 'src/utils/helpers'

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
        textTransform: 'capitalize',
        ...rest
      }}
    >
      {children}
    </Typography>
  )
}

export const JobsValue = (props: { icon: string; children: any }) => {
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

export type ParamMain = {
  name: string
  skill: string
  location: string
}

interface Props {
  listJob: Job[]
}

const RenderList = (listJob: Job[]) => {
  const router = useRouter()
  const { handleJobSave, handleDeleteJobSave } = useJob()
  const handleSavedJob = async (id: any) => {
    await handleJobSave(id)
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
            p: item.is_boosted ? '0px' : '38px 20px',
            border: '2px solid #eee',
            transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',
            '&:hover': { borderColor: 'primary.main' },
            cursor: 'pointer'
          }}
          elevation={0}
          onClick={() => router.push(`/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`)}
        >
          <Box sx={{backgroundImage:'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)', display: item.is_boosted ? 'flex' : 'none' , flexDirection:'row', alignItems:'center', gap:1, padding:'.45rem 1.4rem', borderRadius:'3px 3px 0px 0px'}}>
            <Icon icon="ph:lightning-fill" color='#FFFFFF' fontSize={20}/>
            <Typography sx={{color: '#fff', fontWeight: 700, fontSize:14}}>Hot Opportunity</Typography>
        </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              height: '4em',
              mb: 3,
              p: item.is_boosted ?  '24px' : '0px',
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
                {item?.category?.employee_type == 'onship' ? (
                  <TruncatedTypography line={2} fontWeight='bold' mb={0.5}>
                    {item?.role_type?.name ?? '-'}
                  </TruncatedTypography>
                ) : (
                  <TruncatedTypography line={2} fontWeight='bold' mb={0.5}>
                    {item.job_title ?? item?.role_type?.name ?? '-'}
                  </TruncatedTypography>
                )}
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
          <Grid item sx={{ p: item.is_boosted ? '24px' : '0px', mb:item.is_boosted ? '0px' : 2 }}>
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
                          {renderSalary(item?.salary_start, item?.salary_end, item?.currency as string)}
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
                          {renderSalary(item?.salary_start, item?.salary_end, item?.currency as string)}
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
      {RenderList(listJob)}
    </Grid>
  )
}

export default RecomendedView
