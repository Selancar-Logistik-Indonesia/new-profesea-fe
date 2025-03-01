import { Breadcrumbs, CardContent, Grid, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import HeaderJobDetail from 'src/views/job-detail/HeaderJobDetail'
import SectionOneJobDetail from 'src/views/job-detail/SectionOneJobDetail'
import SectionThreeJobDetail from 'src/views/job-detail/SectionThreeJobDetal'
import SectionTwoJobDetail from 'src/views/job-detail/SectionTwoJobDetail'

const JobDetail = () => {
  const params = useSearchParams()
  const jobId = params.get('id')

  const [job, setJob] = useState<Job | null>(null)

  const firstLoad = useCallback(() => {
    if (jobId) {
      HttpClient.get(`${AppConfig.baseUrl}/job/${jobId}`).then(response => {
        setJob(response.data.job)
      })
    }
  }, [jobId])

  useEffect(() => {
    firstLoad()
  }, [])

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
      <Grid item xs={11}>
        <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
          <Link key='1' href='/company/job-management' sx={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                color: '#32497A',
                fontSize: '14px',
                fontWeight: 400
              }}
            >
              Job Management
            </Typography>
          </Link>
          <Typography
            key='2'
            sx={{
              color: '#949EA2',
              fontSize: '14px',
              fontWeight: 400,
              cursor: 'pointer'
            }}
          >
            Detail Job
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={11} sx={{ borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
        <Grid container>
          <CardContent>
            <HeaderJobDetail jobDetail={job as unknown as Job} isCompany={true} />
            <SectionOneJobDetail jobDetail={job as unknown as Job} />
            <SectionTwoJobDetail jobDetail={job as unknown as Job} />
            {job?.category?.employee_type == 'onship' && <SectionThreeJobDetail jobDetail={job} />}
          </CardContent>
        </Grid>
      </Grid>
    </Grid>
  )
}

JobDetail.acl = {
  action: 'read',
  subject: 'user-job-management'
}

export default JobDetail
