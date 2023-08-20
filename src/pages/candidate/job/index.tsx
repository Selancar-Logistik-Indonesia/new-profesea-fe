import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Avatar, Button, Card, CardContent, Typography, Divider, CircularProgress } from '@mui/material'
import ReactHtmlParser from 'react-html-parser';
import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import Job from 'src/contract/models/job'
import { toast } from 'react-hot-toast'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import { useSearchParams } from 'next/navigation';
import RelatedJobView from 'src/views/find-job/RelatedJobView';
import ShareButton from 'src/views/find-job/ShareButton';

const JobDetail = () => {
  const url = window.location.href
  const [onApplied, setOnApplied] = useState(false);
  const [jobDetail, setJobDetail] = useState<Job>()
  const license: any[] = Object.values((jobDetail?.license != undefined) ? jobDetail?.license : '')
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false)
  }

  const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

  const firstload = async (mJobId: string) => {
    console.log("mJobId:", mJobId);

    setIsLoading(true)
    try {
      const resp = await HttpClient.get('/job/' + mJobId);
      const job = resp.data.job;

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
    firstload(jobId!);
  }, [jobId])

  const handleApply = async () => {
    try {
      const resp = await HttpClient.get(`/job/${jobDetail?.id}/apply`);
      if (resp.status != 200) {
        throw resp.data.message ?? "Something went wrong!";
      }

      setOnApplied(true);
      toast.success(`${jobDetail?.role_type?.name} applied successfully!`);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={9} md={9} xs={12} style={{ maxHeight: '100vh', overflow: 'auto' }}>
            <Card>
              {isLoading ? (
                <Box textAlign={'center'} mt={10}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container item>
                  <StyledGrid item xs={12} sm={3}>
                    <CardContent>
                      <Box sx={{
                        display: 'flex',
                        alignContent: 'center',
                        '& svg': { color: 'text.secondary' }
                      }}>
                        <Box
                          sx={{ display: 'flex', flexDirection: 'column', alignItems: ['left', 'flex-start'] }}
                          ml={2}
                          mr={3}
                        >
                          <Grid item container justifyContent={'center'} ml={2} mr={3} mt={5}>
                            <Avatar
                              src={jobDetail?.company?.photo}
                              alt='profile-picture'
                              sx={{ width: 70, height: 70 }}
                            />
                          </Grid>
                          <Grid item container justifyContent={'center'} flexDirection={'column'}>
                            <Typography
                              sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}
                              fontSize={18}
                              textAlign={'center'}
                            >
                              {jobDetail?.role_type?.name}
                            </Typography>
                            <Typography sx={{ color: 'text.primary', mb: 3 }} fontSize={12} textAlign={'center'}>
                              {jobDetail?.company?.name ?? '-'}
                            </Typography>
                          </Grid>
                          <Grid item container>
                            <Grid xs={1}>
                              <Icon icon='solar:case-minimalistic-bold-duotone' color='#32487A' fontSize={'20px'} />
                            </Grid>
                            <Grid xs={11}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' mt='0.2rem' fontSize={12}>
                                {jobDetail?.rolelevel?.levelName}
                              </Typography>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' mt='0.2rem' fontSize={12}>
                                {jobDetail?.category?.name}
                              </Typography>
                            </Grid>

                            <Grid xs={1} mt={1}>
                              <Icon icon='solar:square-academic-cap-bold-duotone' fontSize={20} color='#32487A' />
                            </Grid>
                            <Grid xs={11} mt={1}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' fontSize={12}>
                                {jobDetail?.degree?.name}
                              </Typography>
                            </Grid>

                            <Grid xs={1}>
                              <Icon icon='icon-park-twotone:ship' fontSize={20} color='#32487A' />
                            </Grid>
                            <Grid xs={11}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' fontSize={12}>
                                Type of Vessel
                              </Typography>
                            </Grid>

                            <Grid xs={1}>
                              <Icon icon='solar:calendar-bold-duotone' color='#32487A' fontSize={20} />
                            </Grid>
                            <Grid xs={11}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' fontSize={12}>
                                Date on Board
                              </Typography>
                            </Grid>

                            <Grid xs={1}>
                              <Icon icon='solar:medal-ribbons-star-bold-duotone' color='#32487A' fontSize={20} />
                            </Grid>
                            <Grid xs={11}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.7rem' fontSize={12}>
                                {license.map(e => e.title).join(', ')}
                              </Typography>
                            </Grid>
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
                                  <Button onClick={handleApply} variant='contained' color='primary'>
                                    <Icon icon='iconoir:submit-document' color='white' fontSize={19} /> Apply Job
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button variant='contained' color='primary'>
                                    <Box mr={2}>
                                      <Icon icon='iconoir:submit-document' color='white' fontSize={19} />
                                    </Box>
                                    Applied
                                  </Button>
                                </>
                              )}
                            </Grid>
                            <Grid item>
                              <ShareButton anchorRef={anchorRef}
                                handleClose={handleClose}
                                handleMenuItemClick={handleMenuItemClick}
                                jobDetail={jobDetail} handleToggle={handleToggle}
                                open={open} selectedIndex={selectedIndex} url={url}
                              />
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
                                fontFamily={'Barlow'}
                              >
                                {jobDetail?.experience}
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
                                fontFamily={'Barlow'}
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
                                  fontFamily={'Barlow'}
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
        </Grid>
      </Box>
    </>
  )
}

JobDetail.acl = {
  action: 'read',
  subject: 'seaferer-jobs'
};

export default JobDetail
