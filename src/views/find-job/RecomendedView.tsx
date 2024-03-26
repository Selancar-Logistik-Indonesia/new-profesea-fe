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
    // const license: any[] = Object.values(item?.license)

    const companyNameUrl = item.company.name.toLowerCase().split(' ').join('-')
    const jobTitleUrl = item.job_title ? item.job_title?.toLowerCase().split(' ').join('-') : ''

    return (
      <Grid item xs={12} md={4} key={item?.id}>
        <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: '250px' }} elevation={0}>
          <Link style={{ textDecoration: 'none' }} href={`/candidate/job/${companyNameUrl}/${item?.id}/${jobTitleUrl}`}>
            <Box
              height={65}
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                  <Avatar src={userPhoto} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}
                  marginTop={2}
                >
                  <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                    {item?.role_type?.name ?? '-'}
                  </Typography>
                  <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
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
          <Grid item container ml={5} mr={5}>
            <Grid xs={1}>
              <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid xs={11}>
              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                {item?.rolelevel?.levelName} | {item?.category?.name}
              </Typography>
            </Grid>

            {item?.category?.employee_type != 'offship' ? (
              <>
                {/* <Grid xs={1}>
                  <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid xs={11} maxWidth={'90%'}>
                  <Typography
                    sx={{
                      color: 'text.primary',
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      maxWidth: '70%'
                    }}
                    ml='0.5rem'
                    mt='0.2rem'
                    fontSize={12}
                  >
                    {license.map(e => e.title).join(', ')}
                  </Typography>
                </Grid> */}
                <Grid xs={1}>
                  <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid xs={11} maxWidth={'90%'}>
                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                    {item?.vessel_type?.name}
                  </Typography>
                </Grid>
                <Grid xs={1}>
                  <Icon icon='ri:calendar-fill' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid xs={11} maxWidth={'90%'}>
                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                    {format(new Date(item?.onboard_at), 'dd MMMM yyyy')}
                  </Typography>
                </Grid>
                <Grid xs={1}>
                  <Icon icon='mdi:timer-sand' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid xs={11} maxWidth={'90%'}>
                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                    {item?.contract_duration ? `${item?.contract_duration} months` : '-'}
                  </Typography>
                </Grid>
                {!item?.hide_salary && (
                  <>
                    <Grid xs={1}>
                      <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11} maxWidth={'90%'}>
                      {item?.currency == 'IDR' ? (
                        <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                          {item?.salary_start && item?.salary_end
                            ? `${
                                item?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                ' - ' +
                                item?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                              } (${item?.currency})`
                            : '-'}
                        </Typography>
                      ) : (
                        <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                          {item?.salary_start && item?.salary_end
                            ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                            : '-'}
                        </Typography>
                      )}
                    </Grid>
                  </>
                )}
              </>
            ) : (
              <>
                <Grid xs={1}>
                  <Icon icon='solar:square-academic-cap-bold-duotone' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid xs={11}>
                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                    {item?.degree?.name}
                  </Typography>
                </Grid>
                <Grid xs={1}>
                  <Icon icon='mdi:location' color='#32487A' fontSize={'20px'} />
                </Grid>
                <Grid xs={11}>
                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                    {item?.city?.city_name} | {item?.employment_type ? item?.employment_type : ''}
                  </Typography>
                </Grid>
                {!item?.hide_salary && (
                  <>
                    <Grid xs={1}>
                      <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11} maxWidth={'90%'}>
                      {item?.currency == 'IDR' ? (
                        <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                          {item?.salary_start && item?.salary_end
                            ? `${
                                item?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                ' - ' +
                                item?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                              } (${item?.currency})`
                            : '-'}
                        </Typography>
                      ) : (
                        <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                          {item?.salary_start && item?.salary_end
                            ? `${item?.salary_start + ' - ' + item?.salary_end} (${item?.currency})`
                            : '-'}
                        </Typography>
                      )}
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
