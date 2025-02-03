import { Icon } from '@iconify/react'
import { Avatar, Box, Card, Grid, Paper, Typography } from '@mui/material'
import { format } from 'date-fns'
import Link from 'next/link'
import Job from 'src/contract/models/job'
import { textEllipsis } from 'src/utils/helpers'

interface IRelatedJobViewProps {
  jobDetailSugestion: Job[]
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

const RelatedJobView: React.FC<IRelatedJobViewProps> = ({ jobDetailSugestion }) => {
  const renderSalary = (salaryStart: any, salaryEnd: any, currency: string) => {
    if (salaryStart == 0) {
      return '-'
    }

    if (salaryStart) {
      return (
        <>
          {`${salaryStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ${currency}`}
          {salaryEnd !== null &&
            salaryEnd !== salaryStart &&
            ` - ${salaryEnd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ${currency}`}
        </>
      )
    } else {
      return '-'
    }
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
      <Grid sx={{ padding: 3 }} container>
        {jobDetailSugestion.map(item => {
          return (
            <Grid item xs={12} md={12} key={item?.id}>
              <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: 'auto' }} elevation={0}>
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
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

export default RelatedJobView
