import { Icon } from '@iconify/react'
import { Box, Breadcrumbs, CardContent, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import HeaderJobDetail from 'src/views/job-detail/HeaderJobDetail'
import ReactHtmlParser from 'react-html-parser'
import { format } from 'date-fns'
import { renderSalary } from 'src/utils/helpers'
import Licensi from 'src/contract/models/licensi'

const JobDetail = () => {
  const params = useSearchParams()
  const jobId = params.get('id')

  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
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

  const filterCertificates = (license: Licensi[]) => {
    const coc = license.filter(l => l.parent === 'COC')
    const cop = license.filter(l => l.parent === 'COP')

    return [coc, cop]
  }

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
      <Grid item xs={12}>
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
      <Grid item xs={12} sx={{ borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
        <Grid container>
          <CardContent sx={{ width: '100%' }}>
            <HeaderJobDetail jobDetail={job as unknown as Job} isCompany={true} />
            {/* Detail With Icons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '10px' : '32px',
                py: '24px',
                ml: '8px',
                borderBottom: '1px solid #EDEDED'
              }}
            >
              <Grid container spacing={4}>
                {job?.category?.employee_type == 'onship' ? (
                  <>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:anchor' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Job Category</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.category.name || '-'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='material-symbols-light:globe' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Sail Region</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.sailing_region === 'iv' ? 'International Voyage' : 'Near Coastal Voyage (NCV)'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Experience</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.experience || '-'} contract
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:chats-duotone' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                        Interview Location
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.city?.city_name || '-'}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Job Category</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.job_title || '-'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:steps-duotone' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Role Level</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.rolelevel?.levelName || '-'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:laptop-thin' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                        Work Arrangement
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.work_arrangement || '-'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:clock-duotone' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                        Employment Type
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.employment_type || '-'}
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid container spacing={4}>
                {job?.category?.employee_type == 'onship' ? (
                  <>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:files-light' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                        Contract Duration
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.contract_duration || '-'} months
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:calendar-dots-duotone' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                        Date of Board
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {format(new Date(job?.onboard_at), 'dd/MM/yy') ?? '-'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:sailboat' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Vessel Type</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.vessel_type.name || '-'}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ant-design:dollar-outlined' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Salary</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {renderSalary(job?.salary_start, job?.salary_end, job?.currency as string)}
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ant-design:dollar-outlined' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Salary</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {renderSalary(job?.salary_start, job?.salary_end, job?.currency as string)}
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                        Work Experience
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.experience || '-'} years
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Icon icon='cil:education' color='#32487A' fontSize={'16px'} />
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Education</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      : {job?.degree?.name || '-'}
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            {/* Description */}
            <Box sx={{ ml: '8px', py: '24px', borderBottom: '1px solid #EDEDED' }}>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#32497A'
                }}
              >
                Description
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#404040' }}>
                  {ReactHtmlParser(`${job?.description}`)}
                </Typography>
              </Box>
            </Box>

            {/* Certificate */}
            {job?.category?.employee_type == 'onship' && (
              <Box sx={{ ml: '8px', py: '24px' }}>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#32497A',
                    marginBottom: '16px'
                  }}
                >
                  Mandatory Certificate
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#303030' }}>
                      Certificate of Competency
                    </Typography>
                    <ol style={{ paddingInlineStart: '20px' }}>
                      {filterCertificates(job?.license)[0].map((l, index) => (
                        <li key={index} style={{ fontSize: '14px', fontWeight: 400 }}>
                          {l.title}
                        </li>
                      ))}
                    </ol>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#303030' }}>
                      Certificate of Proficiency
                    </Typography>
                    <ol style={{ paddingInlineStart: '20px' }}>
                      {filterCertificates(job?.license)[1].map((l, index) => (
                        <li key={index} style={{ fontSize: '14px', fontWeight: 400 }}>
                          {l.title}
                        </li>
                      ))}
                    </ol>
                  </Box>
                </Box>
              </Box>
            )}
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
