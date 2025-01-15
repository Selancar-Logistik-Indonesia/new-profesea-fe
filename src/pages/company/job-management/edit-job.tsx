import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import ProfessionalJob from 'src/views/job-management/form/ProfessionalJob'
import SeafarerJob from 'src/views/job-management/form/SeafarerJob'

const EditJob = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  if (!id) return router.back()
  const [job, setJob] = useState<Job | null>(null)

  const firstLoad = () => {
    HttpClient.get('/job/' + id).then(response => {
      const data = response.data.job
      if (!data) return router.back()
      setJob(data)
    })
  }

  useEffect(() => {
    firstLoad()
  }, [])

  return (
    <>
      <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '24px', pb: '48px' }}>
        <Grid item xs={11}>
          <Breadcrumbs separator={<MdNavigateNext fontSize={'17px'} color='black' />} aria-label='breadcrumb'>
            <Link key='1' href='/' sx={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: '#32497A',
                  fontSize: '14px',
                  fontWeight: 400
                }}
              >
                Homepage
              </Typography>
            </Link>
            <Link key='2' href='/company/job-management/v2' sx={{ textDecoration: 'none' }}>
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
              key='3'
              sx={{
                color: '#949EA2',
                fontSize: '14px',
                fontWeight: 400,
                cursor: 'pointer'
              }}
            >
              Edit Job
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={11}>
          {job === null ? null : job.category.employee_type === 'onship' ? (
            <SeafarerJob job={job} type='edit' />
          ) : (
            <ProfessionalJob job={job} type='edit' />
          )}
        </Grid>
      </Grid>
    </>
  )
}

EditJob.acl = {
  action: 'read',
  subject: 'user-job-management'
}

export default EditJob
