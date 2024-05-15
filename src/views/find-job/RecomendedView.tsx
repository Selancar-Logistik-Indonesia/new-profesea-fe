import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { Avatar, Paper } from '@mui/material'
import Job from 'src/contract/models/job'
import Link from 'next/link'
import { format } from 'date-fns'
import moment from 'moment'

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
    return <></>
  }

  console.log(listJob)

  return listJob.map(item => {
    const userPhoto = item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'
    const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
    const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''

    return (
      <Grid item xs={12} md={4} key={item?.id}>
        <Paper
          sx={{ marginTop: '5px', border: '1px solid #eee', height: { xs: '235px', md: '300px', lg: '235px' } }}
          elevation={0}
        >
          <Link style={{ textDecoration: 'none' }} href={`/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`}>
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                height: { xs: 75, md: 100, lg: 75 }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  '& svg': { color: 'text.secondary' },
                  my: 2
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} ml={2} mr={3}>
                  <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={20}>
                    {item?.role_type?.name ?? '-'}
                  </Typography>
                  <Typography sx={{ color: 'text.primary' }} fontSize={14}>
                    {item?.company?.name ?? '-'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.primary', mt: 2, mr: 2 }} fontSize={12}>
                  {item?.created_at ? moment(item.created_at).fromNow() : '-'}
                </Typography>
              </Box>
            </Box>
          </Link>
          <Grid item container paddingX={5} pt={2}>
            <Grid container mb={1}>
              <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ color: 'text.primary' }} fontSize={16}>
                  {item?.rolelevel?.levelName ?? '-'} | {item?.category?.name ?? '-'}
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
      </Grid>
    )
  })
}

const RecomendedView = (props: Props) => {
  const { listJob } = props

  return (
    <Grid container spacing={2}>
      {renderList(listJob)}
    </Grid>
  )
}

export default RecomendedView
