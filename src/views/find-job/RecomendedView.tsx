import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import Link from 'next/link'
import { format } from 'date-fns'
import moment from 'moment'

const TruncatedTypography = ({ text }: any) => {
  return (
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxHeight: 'calc(2 * 1.2em)',
        minHeight: '1.2em',
        lineHeight: '1.2em',
        fontWeight: 'bold',
        color: '#0a66c2',
        fontSize: 20
      }}
    >
      {text}
    </Typography>
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

const renderList = (listJob: Job[]) => {
  if (!listJob || listJob.length == 0) {
    return null
  }

  console.log(listJob)

  return listJob.map(item => {
    const userPhoto = item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'
    const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
    const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''

    return (
      <Grid item xs={12} md={6} lg={4} key={item?.id}>
        <Link style={{ textDecoration: 'none' }} href={`/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`}>
          <Paper
            sx={{
              p: 4,
              border: '2px solid #eee',
              height: '250px',
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
                height: { sm: 65, md: 75, lg: 65 },
                mb: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexGrow: 1,
                  '& svg': { color: 'text.secondary' }
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
                  <TruncatedTypography text={item?.role_type?.name ?? '-'} />
                  <Typography sx={{ color: 'text.primary' }} fontSize={14}>
                    {item?.company?.name ?? '-'}
                  </Typography>
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
                <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                  {item?.created_at ? moment(item.created_at).fromNow() : '-'}
                </Typography>
              </Box>
            </Box>
            <Grid item container>
              <Grid container mb={1}>
                <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid item xs={11}>
                  <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                    {item?.job_title ?? '-'} | {item?.category?.name ?? '-'}
                  </Typography>
                </Grid>
              </Grid>

              {item?.category?.employee_type != 'offship' ? (
                <>
                  <Grid container mb={1}>
                    <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11} maxWidth={'90%'}>
                      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                        {item?.vessel_type?.name ?? '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container mb={1}>
                    <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon='ri:calendar-fill' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11} maxWidth={'90%'}>
                      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                        {format(new Date(item?.onboard_at), 'dd MMMM yyyy') ?? '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container mb={1}>
                    <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon='mdi:timer-sand' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11} maxWidth={'90%'}>
                      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                        {item?.contract_duration ? `${item?.contract_duration} months` : '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                  {!item?.hide_salary && (
                    <>
                      <Grid container mb={1}>
                        <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid xs={11} maxWidth={'90%'}>
                          {item?.currency == 'IDR' ? (
                            <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                              {item?.salary_start && item?.salary_end
                                ? `${
                                    item?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                    ' - ' +
                                    item?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                  } (${item?.currency})`
                                : '-'}
                            </Typography>
                          ) : (
                            <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                              {item?.salary_start && item?.salary_end
                                ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                                : '-'}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Grid container mb={1}>
                    <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon='solar:square-academic-cap-bold-duotone' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11}>
                      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                        {item?.degree?.name ?? '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container mb={1}>
                    <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon icon='mdi:location' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11}>
                      <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                        {item?.city?.city_name ?? '-'} | {item?.employment_type ?? '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                  {!item?.hide_salary && (
                    <>
                      <Grid container mb={1}>
                        <Grid xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid xs={11} maxWidth={'90%'}>
                          {item?.currency == 'IDR' ? (
                            <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                              {item?.salary_start && item?.salary_end
                                ? `${
                                    item?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                    ' - ' +
                                    item?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                  } (${item?.currency})`
                                : '-'}
                            </Typography>
                          ) : (
                            <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                              {item?.salary_start && item?.salary_end
                                ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                                : '-'}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
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
