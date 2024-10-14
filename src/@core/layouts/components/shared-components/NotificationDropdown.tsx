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
import { Settings } from 'src/@core/context/settingsContext'
import CustomChip from 'src/@core/components/mui/chip'
import { HttpClient } from 'src/services'
import INotification from 'src/contract/models/notification'
import NotificationsType from './NotificationsType'
import NotificationItem from './NotificationItem'
import buildNotifies from 'src/pages/notifications/buildNotifies'

import DialogMarkConfirmation from 'src/pages/notifications/DialogMarkConfirmation'

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
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  '&:not(:last-of-type)': {}
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

const NotificationDropdown = (props: Props) => {
  const { settings } = props
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const { direction } = settings
  const [notifies, setNotifies] = useState<NotificationsType[]>([])
  const [selectedMenu, setSelectedMenu] = useState('All')
  const [showMarkConfirm, setShowMarkConfirm] = useState(false)

  const handleSelectedmenu = (menu: string) => {
    if (selectedMenu == menu) {
      return (
        <CustomChip
          skin='light'
          size='small'
          color='primary'
          label={menu}
          sx={{
            lineHeight: '16.8px',
            fontSize: '14px',
            fontWeight: 700,
            borderRadius: '12px',
            marginRight: '18px',
            ':hover': {
              cursor: 'pointer'
            }
          }}
        />
      )
    }

    return (
      <Typography
        sx={{
          lineHeight: '16.8px',
          fontSize: '14px',
          fontWeight: 700,
          borderRadius: '12px',
          marginRight: '18px',
          ':hover': {
            cursor: 'pointer'
          }
        }}
      >
        {menu}
      </Typography>
    )
  }

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = async () => {
    setAnchorEl(null)
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

  const getUnreadNotifications = async () => {
    const response = await HttpClient.get('/user/notification/unread/', {
      page: 1,
      take: 35
    })

    if (response.status != 200) {
      alert(response.data?.message ?? 'Unknow error')

      return
    }

    const { notifications } = response.data as { notifications: { data: INotification[] } }
    const unreadNotifies = notifications.data.map(buildNotifies)

    setNotifies(unreadNotifies)
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
          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 700, marginRight: '10px', fontSize: '16px' }}>
              Notifications
            </Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={`${notifies.filter(e => !e.read_at).length}`}
              sx={{ lineHeight: '16.8px', fontSize: '14px', fontWeight: 700, borderRadius: '5px' }}
            />
          </Box>
          <Box>
            <Button sx={{ textTransform: 'none' }} size='small' onClick={() => setShowMarkConfirm(!showMarkConfirm)}>
              Mark as read
            </Button>
          </Box>
        </MenuItem>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', width: '100%' }}>
            <span
              onClick={() => {
                setSelectedMenu('All')
                getNotifications()
              }}
            >
              {handleSelectedmenu('All')}
            </span>
            <span
              onClick={() => {
                setSelectedMenu('Unread')
                getUnreadNotifications()
              }}
            >
              {handleSelectedmenu('Unread')}
            </span>
          </Box>
          <Box>
            <Button
              sx={{ textTransform: 'none', fontSize: '14px', fontWeight: 400 }}
              size='small'
              href='/notifications'
            >
              See all
            </Button>
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {notifies.length > 0 ? (
            notifies.map((notification: NotificationsType) => (
              <NotificationItem key={notification.id} item={notification} />
            ))
          ) : (
            <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src='/images/no-notification.png' />
              <div style={{ margin: '20px 0 0 0' }}>You have no notification.</div>
            </Box>
          )}
        </ScrollWrapper>
      </Menu>
      <DialogMarkConfirmation
        visible={showMarkConfirm}
        onCloseClick={() => setShowMarkConfirm(!showMarkConfirm)}
        loadNotifications={getNotifications}
        loadUnreadNotifications={getUnreadNotifications}
      />
    </Fragment>
  )
}

export default NotificationDropdown
