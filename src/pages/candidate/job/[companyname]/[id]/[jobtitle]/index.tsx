import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { Avatar, Card, CardContent, Typography, CircularProgress, IconButton } from '@mui/material'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'
import { toast } from 'react-hot-toast'
import Grid from '@mui/material/Grid'

import RelatedJobView from 'src/views/find-job/RelatedJobView'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
import { IUser } from 'src/contract/models/user'
import CompleteDialog from 'src/pages/candidate/job/CompleteDialog'
import HeaderJobDetail from 'src/views/job-detail/HeaderJobDetail'
import SectionOneJobDetail from 'src/views/job-detail/SectionOneJobDetail'
import SectionTwoJobDetail from 'src/views/job-detail/SectionTwoJobDetail'
import SectionThreeJobDetail from 'src/views/job-detail/SectionThreeJobDetal'
import CertificateDialog from 'src/pages/candidate/job/CertificateDialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { linkToTitleCase } from 'src/utils/helpers'

const JobDetail = () => {
  const [title, setTitle] = useState<string>()
  const [onApplied, setOnApplied] = useState(false)
  const [jobDetail, setJobDetail] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  const [license, setLicense] = useState<any[] | undefined>()
  const router = useRouter()

  const params = useSearchParams()
  const jobId = params.get('id')
  const companyname = linkToTitleCase(params.get('companyname'))
  const jobtitle = params.get('jobtitle')

  const [jobDetailSugestion, setJobDetailSugestion] = useState<Job[]>([])

  const firstload = async (companyname: any, jobId: any, jobTitle: any) => {
    try {
      const resp = await HttpClient.get(`/job/${companyname}/${jobId}/${jobTitle}`)
      const job = resp.data.job
      await setTitle(
        `Lowongan ${
          job.category.employee_type == 'onship' ? job.role_type.name ?? '' : job.job_title ?? job.role_type.name
        } ${job.category.name} di Profesea`
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
          ? jobDetail?.role_type.name ?? ''
          : jobDetail?.job_title ?? jobDetail?.role_type.name
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
        <meta property='og:image' content='images/logosamudera.png' />
        <meta name='keywords' content='Job, candidate, Recruiter, Maritime industry jobs, Career, Seafarer' />
        <meta name='viewport' content='initial-scale=0.8, width=device-width' />
        <script type='application/ld+json' dangerouslySetInnerHTML={addProductJsonLd()} key='product-jsonld' />
      </Head>
      <Box>
        <Grid container sx={{ position: 'fixed' }}>
          <IconButton onClick={handleBackPage}>
            <FontAwesomeIcon icon={faArrowLeft} color='text.primary' />
          </IconButton>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={12} md={jobDetailSugestion.length !== 0 ? 7 : 10}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              <Grid container>
                <Grid item xs={12} sx={{ py: '20px' }}>
                  <CardContent>
                    <HeaderJobDetail jobDetail={jobDetail} onApplied={onApplied} handleApply={handleApply} />
                    <SectionOneJobDetail jobDetail={jobDetail} />
                    <SectionTwoJobDetail jobDetail={jobDetail} />
                    {jobDetail?.category?.employee_type == 'onship' && (
                      <SectionThreeJobDetail jobDetail={jobDetail} license={license} />
                    )}
                  </CardContent>
                  <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', px: '20px' }}>
                    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#32487A' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box
                          height={65}
                          sx={{
                            display: 'flex',
                            alignContent: 'center',
                            '& svg': { color: 'text.secondary' }
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} ml={2} mr={3}>
                            <Avatar
                              src={jobDetail?.company?.photo}
                              alt='profile-picture'
                              sx={{ width: 50, height: 50 }}
                            />
                          </Box>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                            marginTop={2}
                          >
                            <Typography sx={{ color: 'common.white', mb: 1 }} fontSize={20}>
                              <strong>{jobDetail?.company?.name ?? '-'}</strong>
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }} mx={2} mt={2}>
                          <Typography
                            sx={{ color: 'common.white', fontSize: '16px', fontWeight: '600' }}
                            variant='body2'
                          >
                            About Recruiter
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }}>
                            <Typography
                              sx={{
                                mt: 1,
                                color: 'common.white',
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
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {jobDetailSugestion.length !== 0 && (
            <Grid item xs={12} md={3}>
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
              <RelatedJobView jobDetailSugestion={jobDetailSugestion} />
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
