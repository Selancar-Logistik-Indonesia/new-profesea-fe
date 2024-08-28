import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Avatar, Card, CardContent, Typography, CircularProgress } from '@mui/material'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'
import { toast } from 'react-hot-toast'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useSearchParams } from 'next/navigation'
import RelatedJobView from 'src/views/find-job/RelatedJobView'
import localStorageKeys from 'src/configs/localstorage_keys'
import secureLocalStorage from 'react-secure-storage'
// import ShareButton from 'src/views/find-job/ShareButton';
import { IUser } from 'src/contract/models/user'
import CompleteDialog from './CompleteDialog'
import HeaderJobDetail from 'src/views/job-detail/HeaderJobDetail'
import SectionOneJobDetail from 'src/views/job-detail/SectionOneJobDetail'
import SectionTwoJobDetail from 'src/views/job-detail/SectionTwoJobDetail'
import SectionThreeJobDetail from 'src/views/job-detail/SectionThreeJobDetal'
import CertificateDialog from './CertificateDialog'

const JobDetail = () => {
  // const url = window.location.href
  const [onApplied, setOnApplied] = useState(false)
  const [jobDetail, setJobDetail] = useState<Job | null>(null)
  // const license: any[] = Object.values(jobDetail?.license != undefined ? jobDetail?.license : '')
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  // const [open, setOpen] = React.useState(false)
  // const anchorRef = React.useRef<HTMLDivElement>(null)
  // const [selectedIndex, setSelectedIndex] = React.useState(1)
  const searchParams = useSearchParams()
  const jobId = searchParams.get('id')

  const [jobDetailSugestion, setJobDetailSugestion] = useState<Job[]>([])

  // const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
  //   setSelectedIndex(index)
  //   setOpen(false)
  // }

  // const handleToggle = () => {
  //   setOpen(prevOpen => !prevOpen)
  // }

  // const handleClose = (event: Event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
  //     return;
  //   }

  //   setOpen(false)
  // }

  const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

  const firstload = async (mJobId: string) => {
    setIsLoading(true)
    try {
      const resp = await HttpClient.get('/job/' + mJobId)
      const job = resp.data.job

      setIsLoading(false)
      if (job?.applied_at != null) {
        setOnApplied(true)
      }

      setJobDetail(job)
    } catch (error) {
      setIsLoading(false)
      alert(error)
    }
  }

  useEffect(() => {
    HttpClient.get('/job?take=4&page=1').then(response => {
      const jobs = response.data.jobs.data
      setJobDetailSugestion(jobs)
    })
  }, [])

  useEffect(() => {
    firstload(jobId!)
  }, [jobId])

  const handleApply = async () => {
    if (user.license != null && user.photo != '' && user.country_id != null) {
      if (user.license.length == 0 && jobDetail?.category.employee_type == 'onship') {
        setOpenCertificateDialog(!openCertificateDialog)
      } else {
        setOpenDialog(!openDialog)
      }
    } else {
      toast.error(`Please complete your resume !`)
    }

    // if (
    //   user.banner != '' &&
    //   user.license != null &&
    //   user.photo != '' &&
    //   user.address != null &&
    //   user.about != null &&
    //   user.country_id != null
    // ) {
    //   if (user.license.length == 0 && jobDetail?.category.employee_type == 'onship') {
    //     setOpenCertificateDialog(!openCertificateDialog)
    //   } else {
    //     setOpenDialog(!openDialog)
    //   }
    // } else {
    //   toast.error(`Please complete your resume !`)
    // }
  }

  // const handleApply = async () => {
  //   try {
  //     const resp = await HttpClient.get(`/job/${jobDetail?.id}/apply`);
  //     if (resp.status != 200) {
  //       throw resp.data.message ?? "Something went wrong!";
  //     }

  //     setOnApplied(true);
  //     toast.success(`${jobDetail?.role_type?.name} applied successfully!`);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            px: {
              md: '5rem'
            }
          }}
        >
          <Grid
            item
            xs={12}
            md={jobDetailSugestion.length !== 0 ? 9 : 12}
            lg={jobDetailSugestion.length !== 0 ? 9 : 12}
            style={{ maxHeight: '100vh', overflow: 'auto' }}
          >
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              {isLoading ? (
                <Box textAlign={'center'} mt={10}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container>
                  <StyledGrid item xs={12} sx={{ py: '20px' }}>
                    <CardContent>
                      <HeaderJobDetail jobDetail={jobDetail} onApplied={onApplied} handleApply={handleApply} />
                      <SectionOneJobDetail jobDetail={jobDetail} />
                      <SectionTwoJobDetail jobDetail={jobDetail} />
                      {jobDetail?.category?.employee_type == 'onship' && (
                        <SectionThreeJobDetail jobDetail={jobDetail} />
                      )}
                    </CardContent>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', px: '20px' }}
                    >
                      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#32487A' }}>
                        <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
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
                              <Typography sx={{ color: 'common.white', mb: 1 }} fontSize={14}>
                                <strong>{jobDetail?.company?.name ?? '-'}</strong>
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
                            ml={2}
                            mr={3}
                            mt={5}
                          >
                            <Typography
                              sx={{ color: 'common.white', fontSize: '16px', fontWeight: '600' }}
                              ml='0.5rem'
                              variant='body2'
                            >
                              About Recruiter
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }}>
                              <Typography
                                sx={{ color: 'common.white' }}
                                ml='0.5rem'
                                fontSize={12}
                                fontWeight={400}
                                fontFamily={'Outfit'}
                                textAlign={'justify'}
                              >
                                {jobDetail?.company?.about}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </StyledGrid>
                </Grid>
              )}
            </Card>
          </Grid>
          {jobDetailSugestion.length !== 0 && (
            <Grid item xs={12} md={3} lg={3}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  padding: '10px',
                  width: '100&',
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
