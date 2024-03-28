import { Grid } from '@mui/material'
import React from 'react'

const JobDetail = () => {
  return <Grid>Job Detail</Grid>
}

JobDetail.acl = {
  action: 'read',
  subject: 'seafarer-jobs'
}

export default JobDetail
