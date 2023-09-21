// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Card, CardContent, Typography, Divider } from '@mui/material'

import ReactHtmlParser from 'react-html-parser';

import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'

const JobDetail = () => {
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)
  const [jobDetail, setJobDetail] = useState<Job>()
  const license: any[] = Object.values((jobDetail?.license != undefined) ? jobDetail?.license : '')
  // Styled Grid component
  const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))


  const firstload = () => {
    HttpClient.get(AppConfig.baseUrl + '/job/' + params.get('id')).then(response => {
      const job = response.data.job
      setJobDetail(job)
    })
  }
  useEffect(() => {
    firstload()
  }, [])

  return (
    <Grid item xs={12} mt={-2}>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
        <Grid container>
          <StyledGrid item xs={12} sm={4}>
            <CardContent>
              <Box sx={{
                display: 'flex',
                alignContent: 'center',
                '& svg': { color: 'text.secondary' }
              }}>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}
                  ml={2}
                  mr={3}
                >
                  <Typography
                    sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                    ml='0.5rem'
                    mt={3}
                    mb={2}
                    variant='body2'
                  >
                    Job Name
                  </Typography>

                  <Grid item container>
                    <Grid xs={1}>
                      <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
                    </Grid>
                    <Grid xs={11}>
                      <Typography ml='0.7rem' mt='0.2rem' sx={{ fontWeight: 'bold', color: '#0a66c2' }} fontSize={14}>
                        <strong>{jobDetail?.role_type?.name}</strong>
                      </Typography>
                      <Typography sx={{ color: 'text.primary' }} ml='0.7rem' mt='0.2rem' fontSize={12}>
                        {jobDetail?.category?.name} | {jobDetail?.rolelevel?.levelName}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography
                    sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                    ml='0.5rem'
                    mt={3}
                    mb={2}
                    variant='body2'
                  >
                    Detail Job
                  </Typography>
                  <Grid item container>
                    {jobDetail?.category?.employee_type != 'offship' ? (
                      <>
                        <Grid xs={1}>
                          <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {license.map(e => e.title).join(' , ')}
                          </Typography>
                        </Grid>
                        <Grid xs={1}>
                          <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid xs={11} maxWidth={'90%'}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {jobDetail?.vessel_type?.name}
                          </Typography>
                        </Grid>
                        <Grid xs={1}>
                          <Icon icon='solar:calendar-bold-duotone' color='#32487A' fontSize={20} />
                        </Grid>
                        <Grid xs={11}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.7rem' fontSize={12}>
                            {jobDetail?.onboard_at}
                          </Typography>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid xs={1}>
                          <Icon icon='solar:square-academic-cap-bold-duotone' color='#32487A' fontSize={'20px'} />
                        </Grid>
                        <Grid xs={11}>
                          <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                            {jobDetail?.degree?.name}
                          </Typography>
                        </Grid>
                      </>
                    )}


                  </Grid>
                </Box>
              </Box>


            </CardContent>
          </StyledGrid>
          <Grid item xs={12} sm={8}>
            <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
              <Grid container>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'left',
                    flexDirection: 'column',
                    borderRight: theme => `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} ml={2} mr={3} mt={5} >
                    <Typography sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }} ml="0.5rem" mt={3} mb={3} variant='body2'>
                      Experience
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
                      <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                        <strong>{jobDetail?.experience}</strong> &nbsp; Contract
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={5} >
                    <Typography sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }} ml="0.5rem" variant='body2'>
                      Description
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }} >
                      <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                        {ReactHtmlParser(`${jobDetail?.description}`)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider
                sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: theme => `${theme.spacing(7.5)} !important` }}
              />
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#32487A' }}>
                  <CardContent sx={{ p: theme => `${theme.spacing(3.25, 3, 4.5)} !important` }}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
                      ml={2}
                      mr={3}
                      mt={2}
                    >
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
                          fontWeight={500}
                          fontFamily={'Barlow'}
                          textAlign={'justify'}
                        >
                          {ReactHtmlParser(`${jobDetail?.company?.about}`)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

            </CardContent>
          </Grid>
        </Grid>
      </Card >
    </Grid >
  )
}


JobDetail.acl = {
  action: 'read',
  subject: 'home'
};
export default JobDetail
