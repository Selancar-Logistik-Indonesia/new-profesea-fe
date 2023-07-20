// ** React Imports
import React , { useEffect, useState } from 'react'

// ** MUI Components
import Box  from '@mui/material/Box'  
import {   Avatar, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'

// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import {   Grid } from '@mui/material'  

import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'  

const JobDetail = () => { 
   const windowUrl = window.location.search
   const params = new URLSearchParams(windowUrl)
   const [jobDetail, setJobDetail] = useState<Job>()
 
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
      <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 7 }}>
                  <Box
                    height={150}
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                      '& svg': { color: 'text.secondary' }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={3} ml={2} mr={3}>
                      <Avatar src={jobDetail?.company?.photo} alt='profile-picture' sx={{ width: 100, height: 100 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }} marginTop={3}>
                      <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }} fontSize={20}>
                        {jobDetail?.rolelevel?.levelName}
                      </Typography>
                      <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={16}>
                        {jobDetail?.company?.name ?? "-"}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1}>
                        <Icon icon='mdi:currency-usd' fontSize={20}/>
                        <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={16}>
                          Up to Rp. {jobDetail?.salary_end}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1}>
                        <Icon icon='mdi:school' fontSize={20}/>
                        <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={16}>
                          {jobDetail?.degree?.name}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} ml={-1}>
                        <Icon icon='mdi:work' fontSize={20}/>
                        <Typography sx={{ color: 'text.primary' }} ml="0.5rem" fontSize={16}>
                          {jobDetail?.experience}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-end'] }} marginTop={-30} marginRight={15} marginBottom={25}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-center'] }}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Button variant='contained' color='warning'>
                          Lamar
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant='contained' color='secondary'>
                            Share
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={5} >
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" variant='h6'>
                      Skill
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
                        <Typography sx={{ color: 'text.secondary' }} ml="0.5rem" fontSize={20}>
                          {jobDetail?.experience}
                        </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} ml={2} mr={3} mt={5} >
                    <Typography sx={{ color: 'text.primary' }} ml="0.5rem" variant='h6'>
                      Description
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }} >
                        <Typography sx={{ color: 'text.secondary' }} ml="0.5rem" fontSize={20}>
                          {jobDetail?.experience}
                        </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} ml={2} mr={3} mt={5} >
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader title='Tentang Perusahaan'>
                        </CardHeader>
                          <CardContent> 
                            {jobDetail?.company?.about}
                          </CardContent>
                      </Card>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
      </Grid>
  )
}
 

JobDetail.acl = {
  action: 'read',
  subject: 'home'
};
export default JobDetail
