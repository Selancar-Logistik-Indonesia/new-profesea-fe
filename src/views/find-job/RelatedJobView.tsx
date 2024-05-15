import { Icon } from '@iconify/react'
import { Avatar, Box, Card, Grid, Paper, Typography } from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import Job from 'src/contract/models/job'
import { textEllipsis } from 'src/utils/helpers'

interface IRelatedJobViewProps {
  jobDetailSugestion: Job[]
}

const RelatedJobView: React.FC<IRelatedJobViewProps> = ({ jobDetailSugestion }) => {
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
      <Grid sx={{ padding: 3 }} container>
        {jobDetailSugestion.map(item => {
          //   const license: any[] = Object.values(item?.license != undefined ? item?.license : '')

          return (
            <Grid item xs={12} md={12} key={item?.id}>
              <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: 'auto' }} elevation={0}>
                <Link style={{ textDecoration: 'none' }} href={`/candidate/job/?id=${item?.id}`}>
                  <Box
                    height={75}
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
                      <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                        {item?.rolelevel?.levelName} | {item?.category?.name}
                      </Typography>
                    </Grid>

                    {item?.category?.employee_type != 'offship' ? (
                      <>
                        {/* <Grid item xs={1}>
                          <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
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
                        <Grid item xs={1}>
                          <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {item?.vessel_type?.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Icon icon='ri:calendar-fill' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {format(new Date(item?.onboard_at), 'dd MMMM yyyy')}
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <Icon icon='mdi:timer-sand' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid item xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {item?.contract_duration ? `${item?.contract_duration} months` : '-'}
                          </Typography>
                        </Grid>
                        {!item?.hide_salary && (
                          <>
                            <Grid item xs={1}>
                              <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                            </Grid>
                            <Grid item xs={11} maxWidth={'90%'}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                {item?.salary_start && item?.salary_end
                                  ? `${
                                      item?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                      ' - ' +
                                      item?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                    } (${item?.currency})`
                                  : '-'}
                              </Typography>
                            </Grid>
                          </>
                        )}
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
                        {!item?.hide_salary && (
                          <>
                            <Grid item xs={1}>
                              <Icon icon='clarity:dollar-line' color='#32487A' fontSize={'20px'} />
                            </Grid>
                            <Grid item xs={11} maxWidth={'90%'}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                {item?.salary_start && item?.salary_end
                                  ? `${
                                      item?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                                      ' - ' +
                                      item?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                    } (${item?.currency})`
                                  : '-'}
                              </Typography>
                            </Grid>
                          </>
                        )}
                      </>
                    )}
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export default RelatedJobView
