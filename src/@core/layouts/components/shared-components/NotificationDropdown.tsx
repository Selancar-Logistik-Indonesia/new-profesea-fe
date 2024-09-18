import { useState, SyntheticEvent, Fragment, ReactNode, useEffect } from 'react'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { ThemeColor } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'
import CustomChip from 'src/@core/components/mui/chip'
import { HttpClient } from 'src/services'
import INotification from 'src/contract/models/notification'
import moment, { now } from 'moment'
import NotificationType from 'src/contract/types/notification_type'
import NotificationItem from './NotificationItem'
import { useRouter } from 'next/navigation'

export type NotificationsType = {
  id: string
  meta: string
  title: string
  subtitle: string
  type: string
  read_at?: string
  payload?: any
  data?: any
} & (
  | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
)
interface Props {
  settings: Settings
}

const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 344
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const buildNotifies = (e: INotification) => {
  const diff = moment(e.created_at).diff(now())
  const hDiff = moment.duration(diff).humanize()

  if (e.type == NotificationType.feedLike) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.liker.name,
      title: 'New like on your feed',
      avatarIcon: <Icon icon='ic:baseline-thumb-up-off-alt' />,
      subtitle: `${e.data.liker.name} like your feed`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.connectRequest) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.friend.name,
      title: 'Connect Request',
      avatarIcon: <Icon icon='ic:baseline-person-add-alt' />,
      subtitle: `${e.data.friend.name} request to connect with You.`,
      type: e.type,
      payload: e.data.friend,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.applicantApplied) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.candidate.name,
      title: `You've Applied for "${e.data.job.job_title ? e.data.job.job_title : e.data.job.role_type.name}"`,
      avatarIcon: <Icon icon='ic:baseline-person-add-alt' />,
      subtitle: 'Check your application status.',
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.newApplicant) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.candidate.name,
      title: 'You Have New Applicant',
      avatarIcon: <Icon icon='ic:baseline-person-add-alt' />,
      subtitle: `${e.data.candidate.name} Applied for "${
        e.data.job.job_title ? e.data.job.job_title : e.data.job.role_type.name
      }".`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.connectRequestApproved) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.friend.name,
      title: 'Connect request approved',
      avatarIcon: <Icon icon='ic:round-check-circle-outline' />,
      subtitle: `${e.data.friend.name} approved your connect request.`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.connectRequestRejected) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.friend.name,
      title: 'Connect request rejected',
      avatarIcon: <Icon icon='ic:baseline-remove-circle-outline' />,
      subtitle: `${e.data.friend.name} rejected your connect request.`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.completeProfileEncouragement) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.user.name,
      title: 'Please complete your profile',
      avatarIcon: <Icon icon='ph:confetti' />,
      subtitle: `Hey ${e.data.user.name}, a warm welcome to Profesea! To boost your profile visibility and help recruiters find your resume effortlessly, we suggest filling out your profile. It's a great way to showcase your talents!`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.companyApproval) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.user.name,
      title: 'Congratulations!',
      avatarIcon: <Icon icon='ic:baseline-mark-email-read' />,
      subtitle: `Your Company Registration on Profesea Has Been Approved!`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type == NotificationType.companyOnboarding) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data.user.name,
      title: 'Complete Registration on Profesea!',
      avatarIcon: <Icon icon='ic:baseline-mark-email-read' />,
      subtitle: `Upload your document to complete Registration`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.applicantViewed) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: `Check your application status`,
      avatarIcon: <Icon icon='fluent:people-search-24-regular' />,
      subtitle: `${e?.data?.company?.name} has been viewed your application!`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.applicantRejected) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: `Check your application status`,
      avatarIcon: <Icon icon='icon-park-outline:people-delete' />,
      subtitle: `Your Application for ${
        e?.data?.job?.vesseltype_id ? e?.data?.job?.job_title : e?.data?.job?.rolelevel?.levelName
      } – Rejected`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  if (e.type === NotificationType.applicantApproved) {
    return {
      id: e.id,
      meta: hDiff,
      avatarAlt: e.data?.user?.name,
      title: `Check your application status`,
      avatarIcon: <Icon icon='fluent:people-checkmark-24-regular' />,
      subtitle: `Your Application for ${
        e?.data?.job?.vesseltype_id ? e?.data?.job?.job_title : e?.data?.job?.rolelevel?.levelName
      } – Approved`,
      type: e.type,
      read_at: e.read_at,
      data: e.data
    }
  }

  return {
    id: '0',
    meta: hDiff,
    avatarAlt: 'undefined',
    title: 'undefined',
    avatarImg: '',
    subtitle: 'undefined',
    type: '',
    read_at: '',
    data: null
  }
}

const NotificationDropdown = (props: Props) => {
  const { push } = useRouter()
  const { settings } = props
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { direction } = settings
  const [notifies, setNotifies] = useState<NotificationsType[]>([])

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = async () => {
    setAnchorEl(null)

    if (notifies) {
      await HttpClient.post('/user/notification/mark-as-read', {
        notification_id: notifies.map(e => e.id)
      })
    }

    push('/profile/notification')
  }

  const getNotifications = async () => {
    const response = await HttpClient.get('/user/notification', {
      page: 1,
      take: 35
    })

    if (response.status != 200) {
      alert(response.data?.message ?? 'Unknow error')

      return
    }

    const { notifications } = response.data as { notifications: { data: INotification[] } }
    const notifies = notifications.data.map(buildNotifies)
    setNotifies(notifies)
  }

  useEffect(() => {
    getNotifications()
  }, [anchorEl])

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          invisible={!notifies.filter(e => !e.read_at).length}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon icon='solar:bell-bing-bold-duotone' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Notifications</Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={`${notifies.filter(e => !e.read_at).length} New`}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {notifies.map((notification: NotificationsType) => (
            <NotificationItem key={notification.id} item={notification} />
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
