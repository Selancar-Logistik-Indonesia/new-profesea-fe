import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { MdNavigateNext } from 'react-icons/md'
import ProfessionalJob from 'src/views/job-management/form/ProfessionalJob'
import SeafarerJob from 'src/views/job-management/form/SeafarerJob'

const CreateJob = () => {
  const searchParams = useSearchParams()
  const jobType = searchParams.get('type')
  const router = useRouter()

  if (!jobType) return router.back()

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
            <Link key='2' href='/company/job-management' sx={{ textDecoration: 'none' }}>
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
              Add New Job
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={11}>
          {jobType === 'seafarer' ? <SeafarerJob type='create' /> : <ProfessionalJob type='create' />}
        </Grid>
      </Grid>
    </>
  )
}

CreateJob.acl = {
  action: 'read',
  subject: 'user-job-management'
}

export default CreateJob
