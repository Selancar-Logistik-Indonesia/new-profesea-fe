import { Icon } from '@iconify/react'
import { Avatar, Box, Card, Grid, Paper, Typography } from '@mui/material'
import { format } from 'date-fns'
// import Link from 'next/link'
import Job from 'src/contract/models/job'
import { renderSalary, renderTimeAgo } from 'src/utils/helpers'
import { useRouter } from 'next/navigation'

interface IRelatedJobViewProps {
  jobDetailSugestion: Job[]
  handleJobSave: (jobId: any) => Promise<void>
  handleDeleteJobSave: (jobId: any, jobJobSavedId: any) => Promise<void>
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

const RelatedJobView: React.FC<IRelatedJobViewProps> = ({ jobDetailSugestion, handleJobSave, handleDeleteJobSave }) => {
  const router = useRouter()
  // const { handleJobSave, handleDeleteJobSave } = useJob()
  const handleSavedJob = async (id: any) => {
    await handleJobSave(id)
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
      <Grid sx={{ padding: 3 }} container spacing={6}>
        {jobDetailSugestion.map(item => {
          const userPhoto = item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'
          const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
          const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''
          const isSaved = item?.job_save === null ? false : true

          return (
            <Grid item xs={12} md={12} key={item?.id}>
              {/* <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: 'auto' }} elevation={0}>
                <Link style={{ textDecoration: 'none' }} href={`/candidate/job/?id=${item?.id}`}>
                  <Box
                    height={70}
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                      '& svg': { color: 'text.secondary' }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                      <Avatar
                        src={item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'}
                        alt='profile-picture'
                        sx={{ width: 50, height: 50 }}
                      />
                    </Box>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                      marginTop={2}
                    >
                      <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                        {textEllipsis(item?.role_type?.name, 5) ?? '-'}
                      </Typography>
                      <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                        {item?.company?.name ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={2}>
                  <Grid container mr={5}>
                    <Grid item xs={1}>
                      <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                        {item?.rolelevel?.levelName} | {item?.category?.name}
                      </Typography>
                    </Grid>

                    {item?.category?.employee_type != 'offship' ? (
                      <>
                        <Grid item xs={1}>
                          <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                            {item?.vessel_type?.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Icon icon='ri:calendar-fill' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                            {format(new Date(item?.onboard_at), 'dd MMMM yyyy')}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Icon icon='mdi:timer-sand' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                            {item?.contract_duration ? `${item?.contract_duration} months` : '-'}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ opacity: item?.hide_salary ? 0 : 100 }}>
                          <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'} sx={{ opacity: item?.hide_salary ? 0 : 100 }}>
                          <TruncatedTypography line={1} fontSize={16}>
                            <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                              {renderSalary(item?.salary_start, item?.salary_end, item?.currency as string)}
                            </Typography>
                          </TruncatedTypography>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={1}>
                          <Icon icon='solar:square-academic-cap-bold-duotone' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {item?.degree?.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Icon icon='mdi:location' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {item?.city?.city_name} | {item?.employment_type ? item?.employment_type : ''}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ opacity: item?.hide_salary ? 0 : 100 }}>
                          <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'} sx={{ opacity: item?.hide_salary ? 0 : 100 }}>
                          <TruncatedTypography line={1} fontSize={16}>
                            <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                              {renderSalary(item?.salary_start, item?.salary_end, item?.currency as string)}
                            </Typography>
                          </TruncatedTypography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </Paper> */}
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
                        console.log('test')
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
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export default RelatedJobView
