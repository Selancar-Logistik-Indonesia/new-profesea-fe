import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import JobApplied from 'src/contract/models/applicant'
import { useRouter } from 'next/router'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '@mui/material/styles'
import { useSearchParams } from 'next/navigation'
import { HttpClient } from 'src/services'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { Icon } from '@iconify/react'
import ShareArea from '../../ShareArea'
import { format } from 'date-fns'
import { renderSalary } from 'src/utils/helpers'
import ReactHtmlParser from 'react-html-parser'
import Licensi from 'src/contract/models/licensi'
import ButtonFollowCompany from 'src/layouts/components/ButtonFollowCompany'
import toast from 'react-hot-toast'

const ApplicantStatusOptions = [
  {
    status: 'WR',
    title: 'Applied'
  },
  {
    status: 'VD',
    title: 'Viewed'
  },
  {
    status: 'PR',
    title: 'Proceed'
  },
  {
    status: 'RJ',
    title: 'Not Suitable'
  },
  {
    status: 'WD',
    title: 'Withdrawn'
  }
]

const statusColor = (status: string) => {
  switch (status) {
    case 'WR':
      return {
        bgColor: '#FFEBCF',
        textColor: '#FE9602'
      }
    case 'VD':
      return {
        bgColor: '#CBE2F9',
        textColor: '#0B58A6'
      }
    case 'PR':
      return {
        bgColor: '#D9F2DA',
        textColor: '#4CAF50'
      }
    case 'RJ':
      return {
        bgColor: '#FFD9D9',
        textColor: '#F22'
      }
    case 'WD':
      return {
        bgColor: '#F0F0F0',
        textColor: '#999'
      }

    case 'AP':
      return {
        bgColor: '#D9F2DA',
        textColor: '#4CAF50'
      }
  }
}

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

const ApplicationStatus = (
  statusApplied?: string,
  appliedDate?: any,
  otherStatus?: string,
  otherStatusDate?: any,
  statusMsg?: string
) => {
  if (statusApplied == 'WR') {
    return (
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Box>
          <Icon icon='twemoji:radio-button' fontSize={'16px'} style={{ marginTop: '3px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>Applied</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#868686' }}>
            {format(new Date(appliedDate), 'd MMMM yyyy')} | {format(new Date(appliedDate), 'HH:mm a')}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Box>
          <Icon icon='twemoji:radio-button' fontSize={'16px'} style={{ marginTop: '3px' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{statusMsg}</Typography>
          <Box
            sx={{
              width: '110px',
              height: '27px',
              padding: '4px 6px',
              borderRadius: '4px',
              background: statusColor(otherStatus as string)?.bgColor,
              color: statusColor(otherStatus as string)?.textColor,
              textAlign: 'center'
            }}
          >
            {ApplicantStatusOptions.find(a => a.status === otherStatus)?.title}
          </Box>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#868686' }}>
            {format(new Date(otherStatusDate), 'd MMMM yyyy')} | {format(new Date(otherStatusDate), 'HH:mm a')}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        <Box>
          <Icon icon='twemoji:radio-button' fontSize={'16px'} style={{ marginTop: '3px' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 400 }}>Applied</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#868686' }}>
            {format(new Date(appliedDate), 'd MMMM yyyy')} | {format(new Date(appliedDate), 'HH:mm a')}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

const JobDetailApplied = () => {
  const router = useRouter()
  const params = useSearchParams()
  const jobId = params.get('id')
  const Theme = useTheme()
  const isMobile = useMediaQuery(Theme.breakpoints.down('md'))
  const [title, setTitle] = useState<string>('')
  const [jobDetail, setJobDetail] = useState<JobApplied | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingWithDraw, setLoadingWithDraw] = useState(false)
  const [onApplied, setOnApplied] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [jobAppliedId, setJobAppliedId] = useState(0)
  const shareUrl = window.location.href

  // user local
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const firstload = async (jobId: any) => {
    try {
      const response = await HttpClient.get(`/job/applicant/detail/${jobId}`)
      const JobDetailApplied = response?.data?.data as JobApplied

      setTitle(
        `Lowongan ${
          JobDetailApplied?.job.category.employee_type == 'onship'
            ? JobDetailApplied?.job?.role_type.name ?? ''
            : JobDetailApplied?.job.job_title ?? JobDetailApplied?.job?.role_type.name
        } ${JobDetailApplied?.job?.category.name} di Profesea`
      )

      if (JobDetailApplied?.job?.applied_at != null) {
        setOnApplied(true)
      }

      setJobDetail(JobDetailApplied)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  function addProductJsonLd() {
    return {
      __html: `{
          "@context" : "https://schema.org/",
          "@type" : "JobPosting",
          "title" : "Lowongan ${
            jobDetail?.job?.category.employee_type == 'onship'
              ? jobDetail?.job?.role_type.name ?? ''
              : jobDetail?.job?.job_title ?? jobDetail?.job?.role_type.name
          } ${jobDetail?.job?.category?.name} di Profesea",
          "description" : "${jobDetail?.job?.description}",
          "identifier": {
            "@type": "PropertyValue",
            "name": "${jobDetail?.job?.company.name}"
          },
          "datePosted" : "${jobDetail?.job?.created_at}",
          "employmentType" : "${jobDetail?.job?.employment_type}",
          "hiringOrganization" : {
            "@type" : "Organization",
            "name" : "${jobDetail?.job?.company.name}",
            "logo" : "${jobDetail?.job?.company.photo}"
          },
          "jobLocation": {
          "@type": "Place",
            "address": {
            "@type": "PostalAddress",
            "streetAddress": "${jobDetail?.job?.company.address?.address}",
            "addressLocality": "${jobDetail?.job?.company.address?.city.city_name}",
            "addressCountry": "${jobDetail?.job?.country.iso}"
            }
          },
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "IDR",
            "value": {
              "@type": "QuantitativeValue",
              "minValue": ${jobDetail?.job?.salary_start},
              "maxValue": ${jobDetail?.job?.salary_end},
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

  const filterCertificates = (license: Licensi[]) => {
    const coc = license.filter(l => l.parent === 'COC')
    const cop = license.filter(l => l.parent === 'COP')

    return [coc, cop]
  }

  const handleWithDraw = async () => {
    setLoadingWithDraw(true)

    try {
      const response = await HttpClient.put(`/job/applicant/${jobAppliedId}/withdraw`)
      if (response?.status === 200) {
        firstload(jobId)
      }
    } catch (error) {
      console.error('Error withdrawing application:', error)
      toast.error('Error withdrawing application')
      // Optionally show an error notification to the user
    } finally {
      setLoadingWithDraw(false)
      setJobAppliedId(0)
      setOpenDialog(false)
    }
  }

  const handleClickOpen = (id: any) => {
    setJobAppliedId(id)
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    firstload(jobId)
  }, [jobId])

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
        <meta property='og:description' content={jobDetail?.job?.description} />
        <meta property='og:image' content='images/logoprofesea.png' />
        <meta name='keywords' content='Job, candidate, Recruiter, Maritime industry jobs, Career, Seafarer' />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <script type='application/ld+json' dangerouslySetInnerHTML={addProductJsonLd()} key='product-jsonld' />
      </Head>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='sm'
      >
        <DialogContent sx={{ padding: '0px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', padding: '16px' }}>
            <IconButton size='small' onClick={handleClose}>
              <Icon icon='mdi:close' fontSize={'16px'} />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '28px', px: '16px', paddingBottom: '32px' }}>
            <DialogContentText sx={{ textAlign: 'center', fontSize: '16px', fontWeight: 700, color: '#404040' }}>
              Withdraw Application
            </DialogContentText>
            <DialogContentText
              id='alert-dialog-description'
              sx={{ textAlign: 'center', fontSize: '16px', fontWeight: 400, color: '#404040' }}
            >
              Are you sure you want to withdraw this application?
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #F0F0F0', padding: '16px !important' }}
        >
          <Button
            sx={{ flex: 1, textTransform: 'capitalize', background: '#F0F0F0', color: '#999' }}
            variant='contained'
            onClick={handleClose}
            color='inherit'
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            sx={{ flex: 1, textTransform: 'capitalize', background: '#F22', color: '#FFF' }}
            onClick={handleWithDraw}
            color='error'
            disabled={loadingWithDraw}
          >
            {loadingWithDraw ? <CircularProgress size={'16px'} /> : ' Withdraw'}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', px: isMobile ? 0 : '96px' }}>
        <Box>
          <IconButton onClick={handleBackPage}>
            <FontAwesomeIcon icon={faArrowLeft} size={'sm'} color='text.primary' />
          </IconButton>
        </Box>
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
                    <Avatar src={jobDetail?.job?.company?.photo} sx={{ width: 24, height: 24 }} />
                    <TruncatedTypography fontSize={14} fontWeight={400} color={'#404040'}>
                      {jobDetail?.job?.company?.name ?? '-'}
                    </TruncatedTypography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {onApplied && (
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
                    )}
                    <ShareArea
                      subject={`Job For ${
                        jobDetail?.job?.employee_type === 'onship'
                          ? jobDetail?.job?.role_type?.name
                          : jobDetail?.job?.job_title ?? jobDetail?.job?.role_type?.name ?? '-'
                      }.`}
                      url={shareUrl}
                      clean={true}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-start' }}>
                  {jobDetail?.job?.category?.employee_type == 'onship' ? (
                    <Typography sx={{ fontWeight: 'bold', color: '#32497A' }} fontSize={isMobile ? 20 : 24}>
                      <strong>{jobDetail?.job?.role_type?.name}</strong>
                    </Typography>
                  ) : (
                    <Typography sx={{ fontWeight: 'bold', color: '#32497A' }} fontSize={isMobile ? 20 : 24}>
                      <strong>{jobDetail?.job?.job_title ?? jobDetail?.job?.role_type?.name ?? '-'}</strong>
                    </Typography>
                  )}
                  <Typography sx={{ color: 'text.primary' }} fontSize={12}>
                    {jobDetail?.job?.city?.city_name}, {jobDetail?.job?.country?.name}
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
                  {jobDetail?.job?.category?.employee_type == 'onship' ? (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:anchor' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Job Category
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.category.name || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='material-symbols-light:globe' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Sail Region
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.sailing_region || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:briefcase-fill' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Experience</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.experience || '-'} years
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}></Grid>
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
                        : {jobDetail?.job?.job_title || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:steps-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Role Level</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.rolelevel?.levelName || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:laptop-thin' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Work Arrangement
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.work_arrangement || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:clock-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Employment Type
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.employment_type || '-'}
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid container spacing={4}>
                  {jobDetail?.job?.category?.employee_type == 'onship' ? (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:files-light' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Contract Duration
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.contract_duration || '-'} months
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:calendar-dots-duotone' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Date of Board
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {format(new Date(jobDetail?.job?.onboard_at), 'dd/MM/yy') ?? '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ph:sailboat' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Vessel Type
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.vessel_type.name || '-'}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ant-design:dollar-outlined' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Salary</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        :{' '}
                        {renderSalary(
                          jobDetail?.job?.salary_start,
                          jobDetail?.job?.salary_end,
                          jobDetail?.job?.currency as string
                        )}
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ant-design:dollar-outlined' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Salary</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        :{' '}
                        {renderSalary(
                          jobDetail?.job?.salary_start,
                          jobDetail?.job?.salary_end,
                          jobDetail?.job?.currency as string
                        )}
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='cil:education' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>Education</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        : {jobDetail?.job?.degree?.name || '-'}
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}></Grid>

                      {/* work experience belum ada dari API */}
                      {/* <Grid item xs={6} sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Icon icon='ep:suitcase' color='#32487A' fontSize={'16px'} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#404040' }}>
                          Work Experience
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        :{' '}
                        {renderSalary(
                          jobDetail?.job?.salary_start,
                          jobDetail?.job?.salary_end,
                          jobDetail?.job?.currency as string
                        )}
                      </Grid> */}
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
                    {ReactHtmlParser(`${jobDetail?.job?.description}`)}
                  </Typography>
                </Box>
              </Box>
              {/* Certificate */}
              {jobDetail?.job?.category?.employee_type == 'onship' && (
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
                        <ol>
                          {filterCertificates(jobDetail?.job?.license)[0].map((l, index) => (
                            <li key={index}>{l.title}</li>
                          ))}
                        </ol>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#303030' }}>
                          Certificate of Proficiency
                        </Typography>
                        <ol>
                          {filterCertificates(jobDetail?.job?.license)[1].map((l, index) => (
                            <li key={index}>{l.title}</li>
                          ))}
                        </ol>
                      </Box>
                    </Box>
                  </Box>
                </>
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
                    <Avatar src={jobDetail?.job?.company?.photo} sx={{ width: 51, height: 51 }} />
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() =>
                        router.push(`/company/${jobDetail?.job?.company?.id}/${jobDetail?.job?.company?.username}`)
                      }
                    >
                      <TruncatedTypography fontSize={14} fontWeight={700} color={'#303030'}>
                        {jobDetail?.job?.company?.name ?? '-'}
                      </TruncatedTypography>
                      {/* industry company belum ada di api */}
                      {/* todo add industry company */}
                    </Box>
                  </Box>
                  <ButtonFollowCompany user_id={jobDetail?.job?.company?.id as number} friend_id={Number(user?.id)} />
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
                    {jobDetail?.job?.company?.about}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              padding: '0px !important'
            }}
          >
            <Card
              sx={{
                border: 0,
                boxShadow: 0,
                backgroundColor: '#FFFFFF',
                py: '16px',
                px: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#32497A' }}>Application Status</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  borderTop: '1px solid #EDEDED',
                  paddingTop: '10px'
                }}
              >
                {jobDetail?.status === 'WR'
                  ? ApplicationStatus(jobDetail?.status, jobDetail?.created_at)
                  : jobDetail?.status === 'VD'
                  ? ApplicationStatus(
                      '',
                      jobDetail?.created_at,
                      'VD',
                      jobDetail?.updated_at,
                      'CV Reviewed: Ready for the Next Step'
                    )
                  : jobDetail?.status === 'WD'
                  ? ApplicationStatus(
                      '',
                      jobDetail?.created_at,
                      'WD',
                      jobDetail?.updated_at,
                      'Application Succesfully Withdrawn'
                    )
                  : jobDetail?.status === 'PR'
                  ? ApplicationStatus(
                      '',
                      jobDetail?.created_at,
                      'PR',
                      jobDetail?.updated_at,
                      'Application Accepted: Next Phase Starts'
                    )
                  : jobDetail?.status === 'RJ'
                  ? ApplicationStatus(
                      '',
                      jobDetail?.created_at,
                      'RJ',
                      jobDetail?.updated_at,
                      'Unfortunately, You`ve Not Been Selected'
                    )
                  : null}
              </Box>
              {jobDetail?.status == 'WR' && (
                <Box>
                  <Button
                    onClick={() => handleClickOpen(jobDetail?.id)}
                    fullWidth
                    variant='contained'
                    color='error'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    Withdraw Job Applicant
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

JobDetailApplied.acl = {
  action: 'read',
  subject: 'seafarer-jobs'
}

export default JobDetailApplied
