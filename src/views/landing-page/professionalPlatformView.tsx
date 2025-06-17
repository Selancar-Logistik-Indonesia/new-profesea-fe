import { Icon } from '@iconify/react'
import { Avatar, Box, Divider, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import { TFunction } from 'i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import landingPageStyle from 'src/@core/styles/landing-page/landing-page'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import { renderSalary, timeCreated } from 'src/utils/helpers'
import CarouselEvent from './carouselevent'

const JobCard = ({ job, t }: { job: Job; t: TFunction }) => {
  const userPhoto = job?.company?.photo ? job.company?.photo : '/images/avatars/default-user.png'
  const companyNameUrl = job?.company?.name?.toLowerCase().split(' ').join('-') ?? '-'
  const jobTitleUrl = job?.job_title ? job?.job_title?.toLowerCase().split(' ').join('-') : ''
  const link = `/job/${companyNameUrl}/${job.id}/${jobTitleUrl}`

  return (
    <Grid item xs={12} md={3} component={Link} href={link}>
      <Paper
        sx={{
          padding: { xs: '24px', md: '12px' },
          width: '100%',
          height: { xs: '280px', md: '100%' },
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: '1s',
          '&:hover': { boxShadow: 3, transform: 'scale(1.02)' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: { xs: '12px', md: '10px' },
            flexGrow: 1
          }}
        >
          <Typography
            sx={{
              color: '#303030',
              fontSize: { xs: 18, md: 14 },
              fontWeight: 700,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {job.job_title ? job.job_title : job.role_type.name ?? 'N/A'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar
              src={userPhoto}
              alt='profile-picture'
              sx={{ width: { xs: 50, md: 34 }, height: { xs: 50, md: 34 } }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{ color: '#2D3436', fontSize: { xs: 14, md: 12 }, fontWeight: 700 }}>
                {job?.company?.name ?? 'N/A'}
              </Typography>
              <Typography sx={{ color: '#868686', fontSize: { xs: 14, md: 12 }, fontWeight: 400 }}>
                {job?.city?.city_name ?? 'N/A'}, {job?.country?.nicename ?? 'N/A'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flexGrow: 1 }}>
            <Box
              sx={{
                height: 'fit-content',
                padding: '4px 8px',
                border: '1px solid #32497A',
                borderRadius: '4px'
              }}
            >
              <Typography
                sx={{ color: '#32497A', fontSize: { xs: 12, md: 10 }, fontWeight: 400, whiteSpace: 'nowrap' }}
              >
                {job?.category?.name ?? 'N/A'}
              </Typography>
            </Box>
            <Box
              sx={{
                height: 'fit-content',
                padding: '4px 8px',
                border: '1px solid #32497A',
                borderRadius: '4px'
              }}
            >
              <Typography
                sx={{ color: '#32497A', fontSize: { xs: 12, md: 10 }, fontWeight: 400, whiteSpace: 'nowrap' }}
              >
                {job.rolelevel.levelName ?? 'N/A'}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ color: 'black', fontSize: { xs: 14, md: 12 }, fontWeight: 400 }}>
            {job.hide_salary === true
              ? t('landing_page.for_professional.hide_salary')
              : renderSalary(job.salary_start, job.salary_end, job.currency as string)}
          </Typography>
          <Typography sx={{ color: '#525252', fontSize: { xs: 14, md: 12 }, fontWeight: 400 }}>
            Requirement <span style={{ color: '#32497A', fontWeight: 700 }}>{job.degree?.name ?? 'N/A'}</span>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '6px' } }}>
          <Divider sx={{ border: '1px solid #F0F0F0' }} />
          <Typography sx={{ color: '#868686', fontSize: 12, fontWeight: 400 }} fontSize={12}>
            {job.created_at ? timeCreated(job.created_at) : 'N/A'}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

const ProfessionalPlatformView = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  const [jobs, setJobs] = useState<Job[] | null>(null)

  const fetchJobs = async () => {
    try {
      const resp = await HttpClient.get(`/public/data/job`, {
        page: 1,
        take: 4,
        employee_type: 'offship'
      })

      if (resp.status == 200) {
        const data = resp.data.jobs.data
        setJobs(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <Grid
      container
      sx={{
        ...landingPageStyle.ProfessionalView,
        borderRadius: { xs: 0, md: '20px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden'
      }}
    >
      <Grid item container sx={{ mb: '24px', p: { xs: '24px', md: 0 }, display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{ maxWidth: '560px', ml: { xs: 0, md: '24px' } }}>
          <Typography sx={{ mb: '12px', color: 'white', fontSize: { xs: 24, md: 40 }, fontWeight: 700 }}>
            {t('landing_page.for_professional.title')}
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: 20, md: 16 },
              fontWeight: 400,
              lineHeight: { xs: '24px', md: '21px' }
            }}
          >
            {t('landing_page.for_professional.description')}
          </Typography>
        </Box>
      </Grid>
      {jobs && (
        <Grid
          item
          container
          sx={{
            p: '24px',
            height: 'fit-content',
            backgroundColor: 'rgba(134, 134, 134, 0.30)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {isXs ? (
            <CarouselEvent>
              {jobs.map((job, i) => (
                <JobCard key={i} job={job} t={t} />
              ))}
              <Grid
                item
                xs={12}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <IconButton
                  onClick={() => router.push('/find-job')}
                  sx={{ borderRadius: '200px', backgroundColor: 'gray' }}
                >
                  <Icon icon='mdi:chevron-right' color='white' fontSize={34} />
                </IconButton>
                <Typography
                  sx={{ color: 'white', width: '120px', fontSize: '14px', fontWeight: 400, textAlign: 'center' }}
                >
                  {t('landing_page.for_professional.button')}
                </Typography>
              </Grid>
            </CarouselEvent>
          ) : (
            <Grid container sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', gap: '17px' }}>
              <Grid item container spacing={4}>
                {jobs.map((job, i) => (
                  <JobCard key={i} job={job} t={t} />
                ))}
              </Grid>
              <Box
                sx={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <IconButton
                  onClick={() => router.push('/find-job')}
                  sx={{ backgroundColor: 'rgba(10, 12, 15, 0.5)', borderRadius: '200px' }}
                >
                  <Icon icon='mdi:chevron-right' color='white' fontSize={34} />
                </IconButton>
                <Typography
                  sx={{ color: 'white', width: '120px', fontSize: '14px', fontWeight: 400, textAlign: 'center' }}
                >
                  {t('landing_page.for_professional.button')}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  )
}

export default ProfessionalPlatformView
