// ** React Imports
import React, { useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Typography, Avatar } from '@mui/material'

import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import Job from 'src/contract/models/job'
import HeaderJobDetail from 'src/views/job-detail/HeaderJobDetail'
import SectionOneJobDetail from 'src/views/job-detail/SectionOneJobDetail'
import SectionTwoJobDetail from 'src/views/job-detail/SectionTwoJobDetail'
import SectionThreeJobDetail from 'src/views/job-detail/SectionThreeJobDetal'

interface IJobDetailProps {
  jobDetail: Job | undefined
}

const JobDetail = (props: IJobDetailProps) => {
  const jobDetail = props.jobDetail
  // const [jobDetail, setJobDetail] = useState<Job>(props.jobDetail)
  // Styled Grid component
  const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

  // const firstload = () => {
  //   HttpClient.get(AppConfig.baseUrl + '/job/' + params.get('id')).then(response => {
  //     const job = response.data.job
  //     setJobDetail(job)
  //   })
  // }
  useEffect(() => {
    // firstload()
  }, [])

  return (
    <Grid item xs={12} mt={-2}>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <Grid container>
          <StyledGrid item xs={12} sx={{ py: '20px' }}>
            <CardContent>
              <HeaderJobDetail jobDetail={jobDetail as unknown as Job} />
              <SectionOneJobDetail jobDetail={jobDetail as unknown as Job} />
              <SectionTwoJobDetail jobDetail={jobDetail as unknown as Job} />
              {jobDetail?.category?.employee_type == 'onship' && <SectionThreeJobDetail jobDetail={jobDetail} />}
            </CardContent>
          </StyledGrid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', px: '20px' }}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#32487A' }}>
              <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Box
                  height={65}
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    '& svg': { color: 'text.secondary' }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                    <Avatar src={jobDetail?.company?.photo} alt='profile-picture' sx={{ width: 50, height: 50 }} />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                    marginTop={2}
                  >
                    <Typography sx={{ color: 'common.white', mb: 1 }} fontSize={14}>
                      <strong>{jobDetail?.company?.name ?? '-'}</strong>
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={5}>
                  <Typography
                    sx={{ color: 'common.white', fontSize: '16px', fontWeight: '600' }}
                    ml='0.5rem'
                    variant='body2'
                  >
                    About Recruiter
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }}>
                    <Typography
                      sx={{ color: 'common.white' }}
                      ml='0.5rem'
                      fontSize={12}
                      fontWeight={400}
                      textAlign={'justify'}
                    >
                      {jobDetail?.company?.about}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

JobDetail.acl = {
  action: 'read',
  subject: 'home'
}

export default JobDetail
