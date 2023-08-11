// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import { Avatar, Button, Card, CardContent, Typography, Divider, Paper, CircularProgress, ButtonGroup, Popper, ClickAwayListener, MenuList, MenuItem, Grow } from '@mui/material'
// ** Layout Import
import ReactHtmlParser from 'react-html-parser';

// ** Hooks 

// ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
// import { Grid } from '@mui/material'

import { Icon } from '@iconify/react'
import { HttpClient } from 'src/services'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'
import { toast } from 'react-hot-toast'

import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Link from 'next/link';
import CopyLinkButton from './coplink';
import EmailShareButton from './emailshare';
  

const JobDetail = () => {
  const windowUrl = window.location.search 
  const url = window.location.href 
  const params = new URLSearchParams(windowUrl)
  const [onApplied, setOnApplied] = useState(false);
  const [jobDetail, setJobDetail] = useState<Job>()
  const [jobDetailSugestion, setJobDetailSugestion] = useState<Job[]>([])
  const license:any[] = Object.values((jobDetail?.license != undefined) ? jobDetail?.license : '')
  const [isLoading, setIsLoading] = useState(true)
  const options = ['Whatsapp', 'Email','Link' ]
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(1) 
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index)
    setOpen(false)
  }
   const handleToggle = () => {
     setOpen(prevOpen => !prevOpen)
   }

   const handleClose = (event: Event) => {
     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
       return
     }

     setOpen(false)
   }
  // Styled Grid component
  const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

   
  const firstload =  async () => {
     setIsLoading(true)
     try {
       const resp = await HttpClient.get('/job/' + params.get('id')) 
       const job  = resp.data.job 
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
    firstload()
  }, [])
  
 useEffect(() => {
    HttpClient.get(AppConfig.baseUrl + '/job?take=4&page=1').then(response => {
      const jobs = response.data.jobs.data
      setJobDetailSugestion(jobs)
    })
 }, [])
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
          <Grid item lg={9} md={9} xs={12} style={{ maxHeight: '110vh', overflow: 'auto' }}>
            <Card>
              {isLoading ? (
                <Box textAlign={'center'} mt={10}>
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container item height={'100vh'}>
                  <StyledGrid item xs={12} sm={3}>
                    <CardContent>
                      <Box
                        // height={250}

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
                          <Grid item container justifyContent={'center'} ml={2} mr={3} mt={5}>
                            <Avatar
                              src={jobDetail?.company?.photo}
                              alt='profile-picture'
                              sx={{ width: 150, height: 70 }}
                            />
                          </Grid>
                          <Grid item container justifyContent={'center'}>
                            <Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }} fontSize={18}>
                              {jobDetail?.role_type?.name}
                            </Typography>
                            <Typography sx={{ color: 'text.primary', mb: 3 }} fontSize={12}>
                              {jobDetail?.company?.name ?? '-'}
                            </Typography>
                          </Grid>

                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                            ml={-1}
                            mb={2}
                          >
                            <Icon icon='ic:round-business-center' fontSize={20} color='#32487A' />
                            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                              {jobDetail?.rolelevel?.levelName} - {jobDetail?.category?.name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                            ml={-1}
                            mb={2}
                          >
                            <Icon icon='mdi:school' fontSize={20} color='#32487A' />
                            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                              {jobDetail?.degree?.name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                            ml={-1}
                            mb={2}
                          >
                            <Icon icon='mingcute:ship-fill' fontSize={20} color='#32487A' />
                            <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                              Type of Vessel
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                            ml={-1}
                            mb={2}
                          >
                            <Grid item container>
                              <Grid xs={1}>
                                <Icon icon='game-icons:ship-bow' color='#32487A' fontSize={20} />
                              </Grid>
                              <Grid xs={11}>
                                <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                                  Date on Board
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                            ml={-1}
                            mb={2}
                          >
                            <Grid item container>
                              <Grid xs={1}>
                                <Icon icon='mdi:license' color='#32487A' fontSize={20} />
                              </Grid>
                              <Grid xs={11}>
                                <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                                  {license.map(e => e.title).join(', ')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledGrid>
                  <Grid item xs={12} sm={9}>
                    <CardContent sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
                      <Grid container>
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
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
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
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
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
                      <Grid container>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
                            ml={2}
                            mr={3}
                            mt={5}
                          >
                            <Typography
                              sx={{ color: 'text.primary', fontSize: '16px', fontWeight: '600' }}
                              ml='0.5rem'
                              variant='body2'
                            >
                              About Recruiter
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: ['left', 'flex-start'] }}>
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                                {jobDetail?.company?.about}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
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
                              <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
                                {options[selectedIndex] == 'Link' ? (
                                  <CopyLinkButton linkToCopy={url} />
                                ) : options[selectedIndex] == 'Whatsapp' ? (
                                  <Typography sx={{ color: 'text.primary' }} ml='0.5rem' fontSize={12}>
                                    <Button
                                      variant='contained'
                                      color='warning'
                                      href={'https://web.whatsapp.com/send?text=' + url}
                                      target='_blank'
                                    >
                                      <Box mr={2}>
                                        <Icon icon='mdi:share' />
                                      </Box>
                                      {options[selectedIndex]}
                                    </Button>
                                  </Typography>
                                ) : (
                                  <>
                                    <EmailShareButton
                                      subject={'Job For ' + jobDetail?.rolelevel?.levelName}
                                      body={url}
                                    />
                                    {/* <Button variant='contained' onClick={() => setOpenAddModal(!openAddModal)}></Button> */}
                                  </>
                                )}

                                <Button
                                  variant='contained'
                                  color='warning'
                                  size='small'
                                  aria-controls={open ? 'split-button-menu' : undefined}
                                  aria-expanded={open ? 'true' : undefined}
                                  aria-label='select merge strategy'
                                  aria-haspopup='menu'
                                  onClick={handleToggle}
                                >
                                  <Icon icon='solar:arrow-down-bold' />
                                </Button>
                              </ButtonGroup>
                              <Popper
                                sx={{
                                  zIndex: 1
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                              >
                                {({ TransitionProps, placement }) => (
                                  <Grow
                                    {...TransitionProps}
                                    style={{
                                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                                    }}
                                  >
                                    <Paper>
                                      <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id='split-button-menu' autoFocusItem>
                                          {options.map((option, index) => (
                                            <MenuItem
                                              key={option}
                                              selected={index === selectedIndex}
                                              onClick={event => handleMenuItemClick(event, index)}
                                            >
                                              {option}
                                            </MenuItem>
                                          ))}
                                        </MenuList>
                                      </ClickAwayListener>
                                    </Paper>
                                  </Grow>
                                )}
                              </Popper>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <Card>
              <Grid item xs={12} sm={12}>
                <Grid sx={{ padding: 5 }} container style={{ maxHeight: '100vh', overflow: 'auto' }}>
                  {jobDetailSugestion.map(item => {
                    return (
                      <Grid item xs={12} md={12} key={item?.id}>
                        <Paper sx={{ marginTop: '10px', border: '1px solid #eee', height: 185 }} elevation={0}>
                          <Link
                            style={{ textDecoration: 'none' }}
                            href={'/candidate/job/?id=' + item?.id}
                            onClick={firstload}
                          >
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
                                  src={item?.company?.photo ? item?.company?.photo : '/images/avatars/default-user.png'}
                                  alt='profile-picture'
                                  sx={{ width: 50, height: 50 }}
                                />
                              </Box>
                              <Box
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}
                                marginTop={2}
                              >
                                <Typography sx={{ fontWeight: 'bold', color: '#0a66c2', mb: 1 }} fontSize={14}>
                                  {item?.role_type?.name ?? '-'}
                                </Typography>
                                <Typography sx={{ color: 'text.primary', mb: 1 }} fontSize={12}>
                                  {item?.company?.name ?? '-'}
                                </Typography>
                              </Box>
                            </Box>
                          </Link>
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
                            ml={2}
                            mr={3}
                            mt={2}
                          >
                            <Box
                              sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                              mb={2}
                            >
                              <Icon icon='ic:round-business-center' color='#32487A' />
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                {item?.rolelevel?.levelName} - {item?.category?.name}
                              </Typography>
                            </Box>

                            <Box
                              sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                              mb={2}
                            >
                              <Icon icon='mdi:school' color='#32487A' />
                              <Typography sx={{ color: 'text.primary' }} ml='0.5rem' mt='0.2rem' fontSize={12}>
                                {item?.degree?.name}
                              </Typography>
                            </Box>

                            <Box
                              sx={{ display: 'flex', flexDirection: 'row', alignItems: ['center', 'flex-start'] }}
                              mb={2}
                            >
                              <Grid item container>
                                <Grid xs={1}>
                                  <Icon icon='mdi:license' color='#32487A' />
                                </Grid>
                                <Grid xs={10}>
                                  <Typography
                                    sx={{
                                      color: 'text.primary',
                                      display: '-webkit-box',
                                      overflow: 'hidden',
                                      WebkitBoxOrient: 'vertical',
                                      WebkitLineClamp: 2
                                    }}
                                    mt='0.2rem'
                                    fontSize={12}
                                  >
                                    {license.map(e => e.title).join(', ')}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Card>
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
