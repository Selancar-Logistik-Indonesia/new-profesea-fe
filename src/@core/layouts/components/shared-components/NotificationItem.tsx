import { styled } from '@mui/material/styles'
import StyledBadge from 'src/pages/notifications/StyleBadge'

import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { Box, TypographyProps, Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { getInitials } from 'src/@core/utils/get-initials'
import { useState } from 'react'
import { toLinkCase } from 'src/utils/helpers'
import { HttpClient } from 'src/services'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

import NotificationType from 'src/contract/types/notification_type'
import NotificationsType from './NotificationsType'

import FriendshipIssuingDialog from './FriendshipIssuingDialog'

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  whiteSpace: 'break-spaces',
  fontSize: '11px'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {}
}))

const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
  const { avatarAlt, avatarIcon, avatarText, avatarColor, payload } = notification

  if (payload?.photo) {
    return <Avatar alt={avatarAlt} src={payload?.photo} sx={{ width: '54px', height: '54px' }} />
  } else if (avatarIcon) {
    return (
      <Avatar skin='light' color={avatarColor} sx={{ width: '54px', height: '54px' }}>
        {avatarIcon}
      </Avatar>
    )
  } else {
    return (
      <Avatar skin='light' color={avatarColor} sx={{ width: '54px', height: '54px' }}>
        {getInitials(avatarText as string)}
      </Avatar>
    )
  }
}

const NotificationItem = (props: { item: NotificationsType }) => {
  const { item } = props
  const [dialogOpen, setDialogOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleClick = async () => {
    setDialogOpen(true)
    await HttpClient.post('/user/notification/mark-as-read', {
      notification_id: [item.id]
    })

    switch (item.type) {
      case NotificationType.applicantApplied:
        router.push(`/candidate/find-job/?tabs=2`)
        break

      case NotificationType.newApplicant:
        const newApplicantJobId = item?.data?.job?.id
        const newApplicantName = item?.data?.candidate?.name
        if (!newApplicantJobId) {
          return
        }

        router.push(`/company/job/?tabs=2&id=${newApplicantJobId}&applicant=${toLinkCase(newApplicantName)}`)
        break
      case NotificationType.companyOnboarding:
        router.push(`/company/`)
        break

      case NotificationType.completeProfileEncouragement:
        router.push(`/${user?.role === 'Seafarer' ? 'profile' : 'company'}/${user?.id}/${toLinkCase(user?.username)}`)
        break

      case NotificationType.applicantViewed:
        router.push(`/candidate/find-job?tabs=2`)
        break

      case NotificationType.applicantRejected:
        router.push(`/candidate/find-job?tabs=2`)
        break
      case NotificationType.applicantApproved:
        router.push(`/candidate/find-job?tabs=2`)
        break

      default:
        console.log('No action required..')
        break
    }
  }

  return (
    <>
      <MenuItem key={item.id} onClick={() => handleClick()}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {!item.read_at ? (
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant='dot'>
              <RenderAvatar notification={item} />
            </StyledBadge>
          ) : (
            <RenderAvatar notification={item} />
          )}
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ mx: 4 }}>
              <MenuItemTitle sx={{ fontSize: '14px', fontWeight: 400, wordBreak: 'break-all', width: '85%' }}>
                {item.subtitle}
              </MenuItemTitle>
              <MenuItemSubtitle variant='body2'> {item.meta}</MenuItemSubtitle>
            </Box>
          </Box>
        </Box>
      </MenuItem>

      {dialogOpen && item.type == NotificationType.connectRequest && (
        <FriendshipIssuingDialog item={item} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      )}
    </>
  )
}

export default NotificationItem
