import { Icon } from '@iconify/react'
import { Box, Grid, Typography } from '@mui/material'
import { format } from 'date-fns'
import React from 'react'
import Job from 'src/contract/models/job'

interface ISectionOneJobDetailProps {
  jobDetail: Job | null
}

const SectionOneJobDetail: React.FC<ISectionOneJobDetailProps> = ({ jobDetail }) => {
  const license: any[] = Object.values(jobDetail?.license)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingTop: '20px',
        paddingBottom: '10px',
        borderBottom: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      <Grid container>
        <Grid item>
          <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
        </Grid>
        <Grid xs={11}>
          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
            {jobDetail?.rolelevel?.levelName} | {jobDetail?.category?.name}
          </Typography>
        </Grid>
      </Grid>
      {jobDetail?.category.employee_type == 'onship' ? (
        <>
          <Grid container>
            <Grid item>
              <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid item xs={11}>
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
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                {jobDetail?.vessel_type?.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Icon icon='ri:calendar-fill' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                {format(new Date(jobDetail?.onboard_at as unknown as string), 'dd MMMM yyyy')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Icon icon='mdi:timer-sand-full' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                {jobDetail?.contract_duration ? `${jobDetail?.contract_duration} months` : '-'}
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container>
            <Grid item>
              <Icon icon='solar:square-academic-cap-bold-duotone' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                {jobDetail?.degree?.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Icon icon='mdi:location' color='#32487A' fontSize={'20px'} />
            </Grid>
            <Grid xs={11}>
              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                {jobDetail?.city?.city_name} | {jobDetail?.employment_type ? jobDetail?.employment_type : ''}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      {!jobDetail?.hide_salary && (
        <Grid container>
          <Grid item ml={'5px'}>
            <Icon icon='fa:dollar' color='#32487A' fontSize={'20px'} />
          </Grid>
          <Grid item xs={11}>
            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
              {jobDetail?.salary_start && jobDetail?.salary_end
                ? `${
                    jobDetail?.salary_start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                    ' - ' +
                    jobDetail?.salary_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  } (${jobDetail?.currency})`
                : '-'}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default SectionOneJobDetail
