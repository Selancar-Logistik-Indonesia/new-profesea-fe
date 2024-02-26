import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Avatar, Button, Card, CardContent, Typography, Divider, CircularProgress } from '@mui/material'
import ReactHtmlParser from 'react-html-parser'
import { Icon } from '@iconify/react'
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
import ShareArea from './ShareArea'
import { IUser } from 'src/contract/models/user'
import CompleteDialog from './CompleteDialog'

const JobDetail = () => {
  // const url = window.location.href
  const [onApplied, setOnApplied] = useState(false)
  const [jobDetail, setJobDetail] = useState<Job | null>(null)
  const license: any[] = Object.values(jobDetail?.license != undefined ? jobDetail?.license : '')
  const [isLoading, setIsLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser
  // const [open, setOpen] = React.useState(false)
  // const anchorRef = React.useRef<HTMLDivElement>(null)
  // const [selectedIndex, setSelectedIndex] = React.useState(1)
  const searchParams = useSearchParams()
  const jobId = searchParams.get('id')

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
    console.log('user:', user)

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
    firstload(jobId!)
  }, [jobId])

  const handleApply = async () => {
    if (
      user.banner != '' &&
      user.license != null &&
      user.photo != '' &&
      user.address != null &&
      user.about != null &&
      user.country_id != null
    ) {
      setOpenDialog(!openDialog)
    } else {
      toast.error(`Please complete your resume !`)
    }
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
        <Grid container spacing={2}>
          <Grid item lg={9} md={9} xs={12} style={{ maxHeight: '100vh', overflow: 'auto' }}>
            <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#FFFFFF' }}>
              {isLoading ? (
                <Box textAlign={'center'} mt={10}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container>
                  <StyledGrid item xs={12} sm={3}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignContent: 'center',
                          '& svg': { color: 'text.secondary' }
                        }}
                      >
                        <Box
                          sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}
                          ml={2}
                          mr={3}
                        >
                          <Typography
                            sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                            ml='0.5rem'
                            mt={3}
                            mb={2}
                            variant='body2'
                          >
                            Job Name
                          </Typography>

                          <Grid item container>
                            <Grid xs={1}>
                              <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
                            </Grid>
                            <Grid xs={11}>
                              <Typography
                                ml='0.7rem'
                                mt='0.2rem'
                                sx={{ fontWeight: 'bold', color: '#0a66c2' }}
                                fontSize={14}
                              >
                                <strong>{jobDetail?.role_type?.name}</strong>
                              </Typography>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' mt='0.2rem' fontSize={12}>
                                {jobDetail?.category?.name} | {jobDetail?.rolelevel?.levelName}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Typography
                            sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                            ml='0.5rem'
                            mt={3}
                            mb={2}
                            variant='body2'
                          >
                            Detail Job
                          </Typography>
                          <Grid item container>
                            {jobDetail?.category?.employee_type != 'offship' ? (
                              <>
                                <Grid xs={1}>
                                  <Icon
                                    icon='solar:medal-ribbons-star-bold-duotone'
                                    color='#32487A'
                                    fontSize={'20px'}
                                  />
                                </Grid>
                                <Grid xs={11} maxWidth={'90%'}>
                                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                    {license.map(e => e.title).join(' , ')}
                                  </Typography>
                                </Grid>
                                <Grid xs={1}>
                                  <Icon icon='ri:ship-fill' color='#32487A' fontSize={'20px'} />
                                </Grid>
                                <Grid xs={11} maxWidth={'90%'}>
                                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                    {jobDetail?.vessel_type?.name}
                                  </Typography>
                                </Grid>
                                <Grid xs={1}>
                                  <Icon icon='solar:calendar-bold-duotone' color='#32487A' fontSize={20} />
                                </Grid>
                                <Grid xs={11}>
                                  <Typography sx={{ color: 'text.primary' }} ml='0.7rem' fontSize={12}>
                                    {jobDetail?.onboard_at}
                                  </Typography>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid xs={1}>
                                  <Icon
                                    icon='solar:square-academic-cap-bold-duotone'
                                    color='#32487A'
                                    fontSize={'20px'}
                                  />
                                </Grid>
                                <Grid xs={11}>
                                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                    {jobDetail?.degree?.name}
                                  </Typography>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledGrid>
                  <Grid item xs={12} sm={9}>
                    <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
                      <Grid container marginTop={5}>
                        <Grid item xs={6} mt={2}></Grid>
                        <Grid item xs={6} mt={2}>
                          <Grid container spacing={1} alignItems='right' justifyContent='center'>
                            <Grid item>
                              {onApplied == false ? (
                                <>
                                  <Button
                                    onClick={handleApply}
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    startIcon={<Icon icon='iconoir:submit-document' fontSize={10} />}
                                  >
                                    Apply Job
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    startIcon={<Icon icon='iconoir:submit-document' fontSize={10} />}
                                  >
                                    Applied
                                  </Button>
                                </>
                              )}
                            </Grid>
                            <Grid item>
                              <ShareArea
                                subject={`Job For ${jobDetail?.role_type?.name}.`}
                                url={`/candidate/job/?id=${jobDetail?.id}`}
                              ></ShareArea>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: 'flex',
                            alignItems: 'left',
                            flexDirection: 'column',
                            borderRight: theme => `1px solid ${theme.palette.divider}`
                          }}
                        >
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                            ml={2}
                            mr={3}
                            mt={5}
                          >
                            <Typography
                              sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                              ml='0.5rem'
                              mt={3}
                              mb={3}
                              variant='body2'
                            >
                              Experience
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}>
                              <Typography
                                sx={{ color: 'text.primary' }}
                                ml='0.5rem'
                                fontSize={12}
                                fontWeight={500}
                                fontFamily={'Outfit'}
                              >
                                <strong>{jobDetail?.experience}</strong> &nbsp; Contract
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
                            ml={2}
                            mr={3}
                            mt={5}
                          >
                            <Typography
                              sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                              ml='0.5rem'
                              mt={3}
                              variant='body2'
                            >
                              Description
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}>
                              <Typography
                                sx={{ color: 'text.primary' }}
                                ml='0.5rem'
                                fontSize={12}
                                fontWeight={500}
                                fontFamily={'Outfit'}
                                textAlign={'justify'}
                              >
                                {ReactHtmlParser(`${jobDetail?.description}`)}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                      <Divider
                        sx={{
                          mt: theme => `${theme.spacing(6)} !important`,
                          mb: theme => `${theme.spacing(7.5)} !important`
                        }}
                      />

                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
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
                    </CardContent>
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <RelatedJobView />
          </Grid>
          {openDialog && (
            <CompleteDialog
              onClose={() => setOpenDialog(!openDialog)}
              selectedItem={jobDetail}
              openDialog={openDialog}
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
