import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import {
  Avatar,
  Card,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'
import { toast } from 'react-hot-toast'
import Grid from '@mui/material/Grid'
import { Icon } from '@iconify/react'

import RelatedJobView from 'src/views/find-job/RelatedJobView'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { IUser } from 'src/contract/models/user'
import CompleteDialog from 'src/pages/candidate/job/CompleteDialog'
// import HeaderJobDetail from 'src/views/job-detail/HeaderJobDetail'
// import SectionOneJobDetail from 'src/views/job-detail/SectionOneJobDetail'
// import SectionTwoJobDetail from 'src/views/job-detail/SectionTwoJobDetail'
import SectionThreeJobDetail from 'src/views/job-detail/SectionThreeJobDetal'
import CertificateDialog from 'src/pages/candidate/job/CertificateDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { linkToTitleCase, renderSalary } from 'src/utils/helpers'
import { useTheme } from '@mui/material/styles'
import ShareArea from '../../../ShareArea'
import { format } from 'date-fns'
import ReactHtmlParser from 'react-html-parser'
import Licensi from 'src/contract/models/licensi'
import ButtonFollowCompany from 'src/layouts/components/ButtonFollowCompany'

const TruncatedTypography = (props: { children: any; line?: number; [key: string]: any }) => {
  const { children, line, ...rest } = props
  const maxLine = line ? line : 1

  return (
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLine,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        maxHeight: `calc(${maxLine} * 1.2em)`,
        minHeight: '1.2em',
        lineHeight: '1.2em',
        fontSize: '16px',
        ...rest
      }}
    >
      {children}
    </Typography>
  )
}

const JobDetail = () => {
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [title, setTitle] = useState<string>()
  const [onApplied, setOnApplied] = useState(false)
  const [jobDetail, setJobDetail] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false)
  const [openDialogDeclined, setOpenDialogDecline] = useState(false)
  const [openDialogConfirmAccepted, setOpenDialogConfirmAccepted] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [license, setLicense] = useState<any[] | undefined>()
  const router = useRouter()

  const params = useSearchParams()
  const jobId = params.get('id')
  const companyname = linkToTitleCase(params.get('companyname'))
  const jobtitle = params.get('jobtitle')

  const [jobDetailSugestion, setJobDetailSugestion] = useState<Job[]>([])

  const shareUrl = window.location.href

  const firstload = async (companyname: any, jobId: any, jobTitle: any) => {
    try {
      const resp = await HttpClient.get(`/job/${companyname}/${jobId}/${jobTitle}`)

      const job = resp.data?.job
      setTitle(
        `Lowongan ${
          job.category.employee_type == 'onship' ? job.role_type?.name ?? '' : job.job_title ?? job.role_type?.name
        } ${job.category?.name} di Profesea`
      )

      const resp2 = await HttpClient.get(`/user/${user.id}`)
      const applicant = resp2.data.user

      if (job?.applied_at != null) {
        setOnApplied(true)
      }

      setLicense(applicant.seafarer_competencies.concat(applicant.seafarer_proficiencies))
      setJobDetail(job)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  useEffect(() => {
    if (jobDetail) {
      HttpClient.get(`/job?search=&take=4&page=1&username=${jobDetail?.company.username}`).then(response => {
        const jobs = response.data.jobs.data
        setJobDetailSugestion(jobs)
      })
    }
  }, [jobDetail])

  useEffect(() => {
    firstload(companyname, jobId, jobtitle)
  }, [companyname, jobId, jobtitle])

  const handleApply = async () => {
    if (user.license != null && user.photo != '' && user.address.city_id != null) {
      if (license?.length === 0 && jobDetail?.license.length !== 0 && jobDetail?.category.employee_type == 'onship') {
        setOpenCertificateDialog(!openCertificateDialog)
      } else {
        setOpenDialog(!openDialog)
      }
    } else {
      toast.error(`Please complete your resume !`)
    }
  }

  function addProductJsonLd() {
    return {
      __html: `{
      "@context" : "https://schema.org/",
      "@type" : "JobPosting",
      "title" : "Lowongan ${
        jobDetail?.category.employee_type == 'onship'
          ? jobDetail?.role_type?.name ?? ''
          : jobDetail?.job_title ?? jobDetail?.role_type?.name
      } ${jobDetail?.category?.name} di Profesea",
      "description" : "${jobDetail?.description}",
      "identifier": {
        "@type": "PropertyValue",
        "name": "${jobDetail?.company.name}"
      },
      "datePosted" : "${jobDetail?.created_at}",
      "employmentType" : "${jobDetail?.employment_type}",
      "hiringOrganization" : {
        "@type" : "Organization",
        "name" : "${jobDetail?.company.name}",
        "logo" : "${jobDetail?.company.photo}"
      },
      "jobLocation": {
      "@type": "Place",
        "address": {
        "@type": "PostalAddress",
        "streetAddress": "${jobDetail?.company.address?.address}",
        "addressLocality": "${jobDetail?.company.address?.city.city_name}",
        "addressCountry": "${jobDetail?.country.iso}"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "IDR",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": ${jobDetail?.salary_start},
          "maxValue": ${jobDetail?.salary_end},
          "unitText": "MONTH"
        }
      }
    }
  `
    }
  }

  const handleBackPage = () => {
    router.back()
  }

  const handleJobSave = async (jobId: any) => {
    try {
      const response = await HttpClient.post('/job/save', {
        job_id: jobId
      })
      if (response?.status === 201) {
        setJobDetailSugestion(prevState =>
          prevState.map(p => (p.id === jobId ? { ...p, job_save: response?.data?.data } : p))
        )
        toast(
          t => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Icon
                  style={{ cursor: 'pointer' }}
                  icon={'charm:cross'}
                  fontSize={'16px'}
                  onClick={() => toast.dismiss(t.id)}
                />
              </Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>
                You've saved this job{' '}
                <span
                  onClick={() => window.location.replace('/candidate/find-job/?tabs=3')}
                  style={{ fontSize: '16px', fontWeight: 700, color: '#0B58A6', cursor: 'pointer' }}
                >
                  See saved jobs
                </span>
              </Typography>
            </Box>
          ),
          {
            position: 'bottom-left'
          }
        )
      }
    } catch (error) {
      console.log(error)
      toast.error('Error save job')
    }
  }
  const handleDeleteJobSave = async (jobId: any, jobSaveId: any) => {
    try {
      const response = await HttpClient.del(`/job/save/${jobSaveId}`)

      if (response?.status === 200) {
        setJobDetailSugestion(prevState => prevState.map(p => (p.id === jobId ? { ...p, job_save: null } : p)))
        toast.success('Success unsaved job')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error unsaved job')
    }
  }

  const filterCertificates = (license: Licensi[]) => {
    const coc = license.filter(l => l.parent === 'COC')
    const cop = license.filter(l => l.parent === 'COP')

    return [coc, cop]
  }

  const handleUpdateStatusOffering = async (status: string) => {
    try {
      await HttpClient.put(`/job/offer/${jobDetail?.job_offer_detail?.id}/candidate-response`, {
        status: status
      })

      setOpenDialogDecline(false)
      firstload(companyname, jobId, jobtitle)

      if (status === 'declined') {
        toast.success('The offer has been declined. You can still apply anytime.')
      } else {
        toast.success('Your job application has been successfully submitted')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong!')
    }
  }

  const renderButtonOffering = (isOffering: boolean | undefined) => {
    if (isOffering) {
      return (
        <Box>
          <Button
            onClick={handleOpenDialogDecline}
            size='small'
            variant='outlined'
            sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize', marginRight: '10px' }}
          >
            Decline Offer
          </Button>
          <Button
            onClick={() => handleUpdateStatusOffering('accepted')}
            size='small'
            variant='contained'
            sx={{ fontSize: '14px', fontWeight: 400, textTransform: 'capitalize' }}
          >
            Accept Offer
          </Button>
        </Box>
      )
    }

    return (
      <Button
        onClick={handleApply}
        variant='contained'
        color='primary'
        size='small'
        startIcon={<Icon icon='clarity:cursor-hand-click-line' fontSize={10} />}
        sx={{
          fontSize: '14px',
          fontWeight: 400,
          textTransform: 'capitalize'
        }}
      >
        Apply Job
      </Button>
    )
  }

  const handleOpenDialogDecline = () => {
    setOpenDialogDecline(true)
  }

  const handleOnCloseDialogDecline = () => {
    setOpenDialogDecline(false)
  }

  if (isLoading) {
    return (
      <Box textAlign={'center'} mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta property='og:description' content={jobDetail?.description} />
        <meta property='og:image' content='images/logoprofesea.png' />
        <meta name='keywords' content='Job, candidate, Recruiter, Maritime industry jobs, Career, Seafarer' />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <script type='application/ld+json' dangerouslySetInnerHTML={addProductJsonLd()} key='product-jsonld' />
      </Head>

      <Dialog
        open={openDialogDeclined}
        onClose={handleOnCloseDialogDecline}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box
          sx={{ display: 'flex', padding: '16px', justifyContent: 'space-between', borderBottom: '1px solid #F0F0F0' }}
        >
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040' }}>Confirm decline</Typography>
          <Icon icon={'bitcoin-icons:cross-outline'} fontSize={20} onClick={handleOnCloseDialogDecline} />
        </Box>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' sx={{ fontSize: '14px', fontWeight: 400, color: '#404040' }}>
            You can still apply later, but you won’t appear in the company’s offered list
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='outlined'
            size='small'
            onClick={() => handleUpdateStatusOffering('declined')}
            sx={{ flex: 1, textTransform: 'capitalize' }}
          >
            Decline Offer
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={handleOnCloseDialogDecline}
            sx={{ flex: 1, textTransform: 'capitalize' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogConfirmAccepted} onClose={() => setOpenDialogConfirmAccepted(false)}>
        <Box
          sx={{ display: 'flex', padding: '16px', justifyContent: 'space-between', borderBottom: '1px solid #F0F0F0' }}
        >
          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#404040' }}>Completed Apply for Job</Typography>
          <Icon
            icon={'bitcoin-icons:cross-outline'}
            fontSize={20}
            onClick={() => setOpenDialogConfirmAccepted(false)}
          />
        </Box>
        <DialogContent>
          <DialogContentText id='alert-dialog-description' sx={{ fontSize: '14px', fontWeight: 400, color: '#404040' }}>
            Are you sure you want to apply for this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='outlined'
            size='small'
            onClick={() => setOpenDialogConfirmAccepted(false)}
            sx={{ flex: 1, textTransform: 'capitalize' }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={() => handleUpdateStatusOffering('accepted')}
            sx={{ flex: 1, textTransform: 'capitalize' }}
          >
            Apply Job
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: 'relative' }}>
        <Grid container sx={{ position: 'absolute', top: '12px', left: '-72px' }}>
          <IconButton onClick={handleBackPage}>
            <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
          </IconButton>
        </Grid>
        <Grid
          container
          gap={isMobile ? '16px' : '32px'}
          sx={{ flexWrap: 'nowrap', flexDirection: isMobile ? 'column' : 'row' }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '16px' : '24px',
              padding: '0px !important'
            }}
          >
            <Card
              sx={{
                border: 0,
                boxShadow: 0,
                backgroundColor: '#FFFFFF',
                padding: isMobile ? '24px' : '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              {/* Header */}
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}
                >
                  <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Avatar src={jobDetail?.company?.photo} sx={{ width: 24, height: 24 }} />
                    <TruncatedTypography fontSize={14} fontWeight={400} color={'#404040'}>
                      {jobDetail?.company?.name ?? '-'}
                    </TruncatedTypography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {onApplied == false ? (
                      <>{renderButtonOffering(jobDetail?.isOffering)}</>
                    ) : (
                      <>
                        <Box
                          sx={{
                            py: '8px',
                            px: '12px',
                            fontSize: '14px',
                            fontWeight: 400,
                            color: '#999',
                            backgroundColor: '#F0F0F0',
                            borderRadius: '4px'
                          }}
                        >
                          Applied
                        </Box>
                      </>
                    )}
                    <ShareArea
                      subject={`Job For ${
                        jobDetail?.employee_type === 'onship'
                          ? jobDetail?.role_type?.name
                          : jobDetail?.job_title ?? jobDetail?.role_type?.name ?? '-'
                      }.`}
                      url={shareUrl}
                      clean={true}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-start' }}>
                  {jobDetail?.category?.employee_type == 'onship' ? (
                    <Typography sx={{ fontWeight: 'bold', color: '#32497A' }} fontSize={isMobile ? 20 : 24}>
                      <strong>{jobDetail?.role_type?.name}</strong>
                    </Typography>
                  ) : (
                    <Typography sx={{ fontWeight: 'bold', color: '#32497A' }} fontSize={isMobile ? 20 : 24}>
                      <strong>{jobDetail?.job_title ?? jobDetail?.role_type?.name ?? '-'}</strong>
                    </Typography>
                  )}
                  <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                    {jobDetail?.city?.city_name}, {jobDetail?.country?.name}
                  </Typography>
                </Box>
              </Box>
              {/* Detail With Icons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '10px' : '32px',
                  py: '24px',
                  borderTop: '1px solid #EDEDED',
                  borderBottom: '1px solid #EDEDED'
                }}
              >
                <Grid container spacing={4}>
                  {jobDetail?.category?.employee_type == 'onship' ? (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:anchor' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Job Category
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.category?.name || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='material-symbols-light:globe' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Sail Region
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.sailing_region === 'iv' ? 'International Voyage' : 'Near Coastal Voyage (NCV)'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Experience</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.experience || '-'} contract
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:chats-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Interview Location
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.city?.city_name || '-'}
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Job Category
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job_title || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:steps-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Role Level</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.rolelevel?.levelName || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:laptop-thin' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Work Arrangement
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.work_arrangement || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:clock-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Employment Type
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.employment_type || '-'}
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid container spacing={4}>
                  {jobDetail?.category?.employee_type == 'onship' ? (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:files-light' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Contract Duration
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.contract_duration || '-'} months
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:calendar-dots-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Date of Board
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {format(new Date(jobDetail?.onboard_at), 'dd/MM/yy') ?? '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:sailboat' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Vessel Type
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.vessel_type?.name || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ant-design:dollar-outlined' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Salary</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {renderSalary(jobDetail?.salary_start, jobDetail?.salary_end, jobDetail?.currency as string)}
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ant-design:dollar-outlined' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Salary</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {renderSalary(jobDetail?.salary_start, jobDetail?.salary_end, jobDetail?.currency as string)}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Work Experience
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.experience || '-'} years
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='cil:education' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Education</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.degree?.name || '-'}
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}></Grid>
                    </>
                  )}
                </Grid>
              </Box>
              {/* Description */}
              <Box>
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
                    {ReactHtmlParser(`${jobDetail?.description}`)}
                  </Typography>
                </Box>
              </Box>

              {/* Certificate */}
              {jobDetail?.category?.employee_type == 'onship' && (
                <>
                  <Box>
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
                          {filterCertificates(jobDetail?.license)[0].map((l, index) => (
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
                          {filterCertificates(jobDetail?.license)[1].map((l, index) => (
                            <li key={index} style={{ fontSize: '14px', fontWeight: 400 }}>
                              {l.title}
                            </li>
                          ))}
                        </ol>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}
              {jobDetail?.category?.employee_type == 'onship' && (
                <SectionThreeJobDetail jobDetail={jobDetail} license={license} />
              )}
            </Card>

            <Card sx={{ border: 0, boxShadow: 0, backgroundColor: '#FFFFFF', padding: isMobile ? '24px' : '32px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#303030'
                    }}
                  >
                    About the company
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Avatar src={jobDetail?.company?.photo} sx={{ width: 51, height: 51 }} />
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => router.push(`/company/${jobDetail?.company?.username}`)}
                    >
                      <TruncatedTypography fontSize={14} fontWeight={700} color={'#303030'}>
                        {jobDetail?.company?.name ?? '-'}
                      </TruncatedTypography>
                      {/* industry company belum ada di api */}
                      {/* todo add industry company */}
                      <TruncatedTypography fontSize={14} fontWeight={400} color={'#868686'}>
                        {jobDetail?.company?.industry?.name ?? '-'}
                      </TruncatedTypography>
                    </Box>
                  </Box>
                  <ButtonFollowCompany user_id={jobDetail?.company?.id as number} friend_id={Number(user?.id)} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }}>
                  <Typography
                    sx={{
                      color: '#5E5E5E',
                      fontSize: 14,
                      fontWeight: 400,
                      whiteSpace: 'pre-line'
                    }}
                    textAlign={'justify'}
                  >
                    {jobDetail?.company?.about}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {jobDetailSugestion.length !== 0 && (
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                padding: '0px !important'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  padding: '10px',
                  width: '100%',
                  bgcolor: '#d5e7f7',
                  color: '#5ea1e2'
                }}
              >
                Jobs post by the company
              </Box>
              <RelatedJobView
                jobDetailSugestion={jobDetailSugestion}
                handleJobSave={handleJobSave}
                handleDeleteJobSave={handleDeleteJobSave}
              />
            </Grid>
          )}

          {openDialog && (
            <CompleteDialog
              onClose={() => setOpenDialog(!openDialog)}
              selectedItem={jobDetail}
              openDialog={openDialog}
              setApply={setOnApplied}
            />
          )}

          {openCertificateDialog && (
            <CertificateDialog
              selectedItem={undefined}
              onClose={() => setOpenCertificateDialog(!openCertificateDialog)}
              openDialog={openCertificateDialog}
            />
          )}
        </Grid>
      </Box>
    </>
  )
}

JobDetail.acl = {
  action: 'read',
  subject: 'seafarer-jobs'
}

export default JobDetail
