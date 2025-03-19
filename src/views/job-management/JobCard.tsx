import { Icon } from '@iconify/react'
import { Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Skeleton, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

import { toast } from 'react-hot-toast'
import Job from 'src/contract/models/job'
import { HttpClient } from 'src/services'
import { calculateDaysDifference, dateProgress, getDateMonth } from 'src/utils/helpers'
import DialogDelete from './DialogDelete'
import { DraftToggle } from './Component'

interface StatusCardProps {
  id: number
  label: string
  total: number
  backgroundColor: string
  icon: string
  iconColor: string
  tabs: string
  draft: boolean
}

const StatusCard = (props: StatusCardProps) => {
  const { id, label, total, backgroundColor, icon, iconColor, tabs, draft } = props

  return (
    <Grid
      item
      component={draft ? 'div' : Link}
      href={`/company/job-management/${id}?tabs=${tabs}`}
      sx={{ flexBasis: '33%', p: '16px 20px' }}
      flexDirection='column'
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '12px' }}>
        <Box
          sx={{
            backgroundColor: draft ? '#E7E7E7' : backgroundColor,
            borderRadius: '4px',
            p: '6px',
            height: '28px',
            aspectRatio: 1 / 1
          }}
        >
          <Icon icon={icon} color={draft ? '#BFBFBF' : iconColor} fontSize={16} />
        </Box>
        <IconButton>
          <Icon icon='ph:arrow-right-bold' fontSize={16} color='#404040' />
        </IconButton>
      </Box>
      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>{total}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{label}</Typography>
    </Grid>
  )
}

const JobCard = ({ job, refetch }: { job: Job; refetch: VoidFunction }) => {
  const [status, setStatus] = useState(job.is_active)
  const [boosted, setBoosted] = useState(job.is_boosted)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [deleteJob, setDeleteJob] = useState(false)

  const handleStatus = async (selectedId: number, currentStatus: boolean) => {
    await HttpClient.patch(`/job/change-status/${selectedId}`, {
      is_active: !currentStatus
    }).then(
      () => {
        toast.success('Status successfully changed!')
        setStatus(!currentStatus)

        setTimeout(() => {
          refetch()
        }, 500)
      },
      error => {
        toast.error('Failed to change job status: ' + error.response.data.message)
      }
    )
  }

  const handleBoost = async (selectedId: number, currentStatus: boolean) => {
    await HttpClient.patch(`/job/${selectedId}`, {
      is_boosted: !currentStatus
    }).then(
      () => {
        toast.success('Status successfully changed!')
        setStatus(!currentStatus)

        setTimeout(() => {
          refetch()
        }, 500)
      },
      error => {
        toast.error('Failed to change job status: ' + error.response.data.message)
      }
    )
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const posted_at = new Date(job.created_at)
  const expired_at = new Date(job.onboard_at)
  const progress = calculateDaysDifference(Date.now(), expired_at)

  return (
    <>
      <Box sx={{ p: '0px', border: '1.5px solid #E7E7E7', borderRadius: '6px' }}>
        <Box
          sx={{
            backgroundImage: 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)',
            display: job.is_boosted ? 'flex' : 'none',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            padding: '.5rem 1.45rem',
            borderRadius: '6px 6px 0px 0px'
          }}
        >
          <Icon icon='ph:lightning-fill' color='#FFFFFF' fontSize={20} />
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Hot Opportunity</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Typography
              component={job.is_draft ? Box : Link}
              {...(job.is_draft ? {} : { href: `/company/job/${job.id}` })}
              sx={{
                fontSize: 18,
                fontWeight: 700,
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.3,
                minHeight: '2.6em',
                '& > span': {
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  width: '100%'
                }
              }}
            >
              <span>
                {job.category.employee_type === 'onship'
                  ? job.role_type?.name ?? 'Unnamed Job'
                  : job.job_title
                  ? job.job_title.toLowerCase()
                  : job.role_type?.name
                  ? job.role_type.name.toLowerCase()
                  : 'Unnamed Job'}
              </span>
            </Typography>
            <Box>
              <Box sx={{ display: 'flex', alignItems:'center' ,gap: '6px', justifyContent: 'flex-end' }}>
                {job.is_draft ? (
                  <DraftToggle />
                ) : (
                  <Box
                    onClick={() => handleStatus(job.id, job.is_active)}
                    sx={{
                      position: 'relative',
                      width: '84px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      pl: status ? '16px' : '22px',
                      backgroundColor: status ? '#4CAF50' : '#868686',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease, padding 0.5s ease'
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#FFF',
                        userSelect: 'none',
                        fontSize: 14,
                        fontWeight: '400'
                      }}
                    >
                      {status ? 'Active' : 'Inactive'}
                    </Typography>
                    <Box
                      sx={{
                        position: 'absolute',
                        backgroundColor: '#FFF',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        top: '4px',
                        left: status ? 'calc(100% - 18px)' : '4px',
                        transition: 'left 0.5s ease-in-out'
                      }}
                    />
                  </Box>
                )}

                <IconButton onClick={handleOpen}>
                  <Icon icon='tabler:dots' fontSize={24} color='#868686' />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem
                    component={Link}
                    disabled={job.is_draft}
                    href={`/company/job/${job.id}`}
                    sx={{ color: '#428FDC' }}
                  >
                    <Icon icon='tabler:eye-filled' fontSize={20} style={{ marginRight: 8 }} />
                    View Job Detail
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href={`/company/job-management/edit-job/?id=${job.id}`}
                    sx={{ color: '#404040' }}
                  >
                    <Icon icon='tabler:edit' fontSize={20} style={{ marginRight: 8 }} />
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setDeleteJob(true)
                      handleClose()
                    }}
                    sx={{ color: '#FF2222' }}
                  >
                    <Icon icon='tabler:trash' fontSize={20} style={{ marginRight: 8 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                onClick={() => handleBoost(job.id, job.is_boosted)}
                sx={{
                  position: 'relative',
                  width: '188px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  pl: boosted ? '16px' : '22px',
                  backgroundColor: boosted ? '' : '#868686',
                  backgroundImage: boosted ? 'linear-gradient(270deg, #2561EB 0%, #968BEB 100%)' : '',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, padding 0.5s ease',
                  mr:10
                }}
              >
                <Typography
                  sx={{
                    color: '#FFF',
                    userSelect: 'none',
                    fontSize: 14,
                    fontWeight: '400'
                  }}
                >
                  {boosted ? 'Boost Job Activated' : 'Boost Job Deactivated'}
                </Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    backgroundColor: '#FFF',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    top: '4px',
                    left: boosted ? 'calc(100% - 18px)' : '4px',
                    transition: 'left 0.5s ease-in-out'
                  }}
                />
              </Box>
            </Box>
          </Box>
          {job.category.employee_type === 'onship' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon icon='ph:anchor' fontSize={16} color='#32497A' style={{ flexShrink: 0 }} />
                {job.is_draft ? (
                  <Skeleton variant='text' animation={false} width={220} height={22} />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {job.category?.name ?? 'N/A'}, {job.job_title ?? 'N/A'}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon icon='ph:files-duotone' fontSize={16} color='#32497A' />
                {job.is_draft ? (
                  <Skeleton variant='text' animation={false} width={180} height={22} />
                ) : (
                  <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{job.contract_duration} months</Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon icon='ph:sailboat-duotone' fontSize={16} color='#32497A' />
                {job.is_draft ? (
                  <Skeleton variant='text' animation={false} width={200} height={22} />
                ) : (
                  <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{job.vessel_type?.name ?? ''}</Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon icon='ph:circles-three-plus-duotone' fontSize={16} color='#32497A' style={{ flexShrink: 0 }} />
                {job.is_draft ? (
                  <Skeleton variant='text' animation={false} width={220} height={22} />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {job.rolelevel?.levelName ?? 'N/A'}, {job.category?.name ?? 'N/A'}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon icon='ph:clock-duotone' fontSize={16} color='#32497A' />
                {job.is_draft ? (
                  <Skeleton variant='text' animation={false} width={180} height={22} />
                ) : (
                  <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                    {job.work_arrangement ?? 'N/A'}, {job.employment_type ?? 'N/A'}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Icon icon='ph:map-pin-duotone' fontSize={16} color='#32497A' />
                {job.is_draft ? (
                  <Skeleton variant='text' animation={false} width={200} height={22} />
                ) : (
                  <Typography sx={{ fontSize: 14, fontWeight: 400 }}>
                    {job.city?.city_name ?? 'N/A'}, {job.country.nicename ?? 'N/A'}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          <Grid
            container
            sx={{
              display: 'flex',
              flexWrap: 1,
              justifyContent: 'space-between',
              borderRadius: '6px',
              backgroundColor: '#F8F8F7'
            }}
          >
            <StatusCard
              id={job.id}
              label='Candidate Applied'
              total={job.total_applied ?? 0}
              backgroundColor='#CBE2F9'
              icon='ph:user-check-bold'
              iconColor='#32497A'
              tabs='all'
              draft={job.is_draft}
            />
            <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
            <StatusCard
              id={job.id}
              label='Proceed'
              total={job.total_proceed ?? 0}
              backgroundColor='#CBE2F9'
              icon='ph:files-bold'
              iconColor='#0B58A6'
              tabs='PR'
              draft={job.is_draft}
            />
            <Divider sx={{ borderWidth: '1px', bgcolor: '#E7E7E7' }} />
            <StatusCard
              id={job.id}
              label='Hired'
              total={job.total_hired ?? 0}
              backgroundColor='#D9F2DA'
              icon='ph:thumbs-up-bold'
              iconColor='#4CAF50'
              tabs='AP'
              draft={job.is_draft}
            />
          </Grid>
          <Grid container sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!job.is_draft && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '8px' }}>
                    <Icon icon='ph:calendar-dots' color='#868686' fontSize={16} />
                    <Typography>
                      Posted at {getDateMonth(posted_at, true, true)} - Close at {getDateMonth(expired_at, true, true)}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                    {progress === 'Expired' ? progress : `${progress} Left`}
                  </Typography>
                </>
              </Box>
            )}
            {job.is_draft ? (
              <Button
                component={Link}
                href={`/company/job-management/edit-job/?id=${job.id}`}
                variant='contained'
                size='medium'
                sx={{ textTransform: 'none' }}
              >
                Continue Editing
              </Button>
            ) : (
              <Box sx={{ width: '100%', backgroundColor: '#DBDBDB', borderRadius: '100px', overflow: 'hidden' }}>
                <Box
                  sx={{
                    borderRadius: '8px',
                    width: `${dateProgress(posted_at, expired_at)}%`,
                    height: '6px',
                    backgroundColor: progress === 'Expired' || job.is_active === false ? '#868686' : '#0B58A6'
                  }}
                />
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
      {deleteJob && (
        <DialogDelete job={job} visible={deleteJob} refetch={refetch} onCloseClick={() => setDeleteJob(false)} />
      )}
    </>
  )
}

export default JobCard
