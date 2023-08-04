// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Avatar, Button, Card, CardContent, Typography, Divider } from '@mui/material'
// ** Layout Import
import ReactHtmlParser from 'react-html-parser';

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
// import { Grid } from '@mui/material'

import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'
import { toast } from 'react-hot-toast'

import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

const JobDetail = () => {
  const windowUrl = window.location.search
  const params = new URLSearchParams(windowUrl)
  const [onApplied, setOnApplied] = useState(false);
  const [jobDetail, setJobDetail] = useState<Job>()
  const license:any[] = Object.values((jobDetail?.license != undefined) ? jobDetail?.license : '')

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
      if(job?.applied_at != null){
        setOnApplied(true);
      }
      setJobDetail(job)
    })
  }
  useEffect(() => {
    firstload()
  }, [])

  const handleApply = async () => {
    try {
      const resp = await HttpClient.get(`/job/${jobDetail?.id}/apply`);
      if (resp.status != 200) {
        throw resp.data.message ?? "Something went wrong!";
      }
      setOnApplied(true);
      toast.success(`${jobDetail?.role_type?.name} applied successfully!`);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid item xs={12}>
      <Card>
        <Grid container>
          <StyledGrid item xs={12} sm={4}>
            <CardContent>
              <Box
                height={250}
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                  <Avatar src={jobDetail?.company?.photo} alt='profile-picture' sx={{ width: 100, height: 100 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }} marginTop={3}>
                  <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }} fontSize={18}>
                  {jobDetail?.role_type?.name}
                  </Typography>
                  <Typography sx={{ color: 'text.primary', mb: 3 }} fontSize={12}>
                    {jobDetail?.company?.name ?? "-"}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1} mb={2}>
                    <Icon icon='ic:round-business-center' fontSize={20} color='#32487A' />
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      {jobDetail?.rolelevel?.levelName} - {jobDetail?.category?.name}
                    </Typography>
                  </Box>
                  {/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1} mb={2}>
                    <Icon icon='mdi:currency-usd' fontSize={20} color='#32487A' />
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      from Rp. {jobDetail?.salary_start} to Rp. {jobDetail?.salary_end}
                    </Typography>
                  </Box> */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1} mb={2}>
                    <Icon icon='mdi:school' fontSize={20} color='#32487A' />
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      {jobDetail?.degree?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1} mb={2}>
                    <Icon icon='mingcute:ship-fill' fontSize={20} color='#32487A' />
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      Type of Vessel
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1} mb={2}>
                    <Icon icon='game-icons:ship-bow' fontSize={20} color='#32487A' />
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      Date on Board
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1} mb={2}>
                    <Icon icon='mdi:license' fontSize={20} color='#32487A' />
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      {license.map(e => e.title).join(", ")}
                    </Typography>
                  </Box>
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
                    <Typography sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }} ml="0.5rem" mt={3} variant='body2'>
                      Experience
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
                      <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                        {jobDetail?.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={5} >
                    <Typography sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }} ml="0.5rem" variant='body2'>
                      Description
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
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
              <Grid container>
                <Grid
                  item
                  xs={8}
                  sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column'}}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={5} >
                    <Typography sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }} ml="0.5rem" variant='body2'>
                      About Recruiter
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }} >
                      <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={12}>
                      {jobDetail?.company?.about}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={2} alignItems="right" justifyContent="center">
                    <Grid item>
                      {onApplied == false ? (
                        <>
                          <Button onClick={handleApply} variant='contained' color='primary' >
                            Apply Job
                          </Button>
                        </>)
                        :
                        <>
                          <Button variant='contained' color='primary' >
                            Applied
                          </Button>
                        </>
                      }
                    </Grid>
                    <Grid item>
                      <Button variant='contained' color='secondary'>
                      <Icon icon='mdi:share' />
                        Share
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}


JobDetail.acl = {
  action: 'read',
  subject: 'seaferer-jobs'
};
export default JobDetail
