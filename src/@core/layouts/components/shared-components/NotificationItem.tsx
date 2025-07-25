import { styled } from '@mui/material/styles'
import StyledBadge from 'src/pages/notifications/StyleBadge'

import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import { Box, Typography } from '@mui/material'
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
  const { avatarAlt, avatarIcon, avatarText, avatarColor, payload, type } = notification
  const notificationTypes = [
    'App\\Notifications\\ApplicantApplied',
    'App\\Notifications\\NewApplicantNotification',
    'App\\Notifications\\FeedCommentNotification'
  ]

  if (payload?.photo) {
    return <Avatar alt={avatarAlt} src={payload?.photo} sx={{ width: 54, height: 54 }} />
  } else if (notificationTypes.includes(type)) {
    return <Avatar sx={{ width: 54, height: 54 }} alt={avatarAlt} src={avatarIcon as any} />
  } else if (avatarIcon) {
    return (
      <Avatar skin='light' color={avatarColor} sx={{ width: 54, height: 54 }}>
        {avatarIcon}
      </Avatar>
    )
  } else {
    return (
      <Avatar skin='light' color={avatarColor} sx={{ width: 54, height: 54 }}>
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
  const newApplicantJobId = item?.data?.job?.id

  const handleClick = async () => {
    setDialogOpen(true)
    await HttpClient.post('/user/notification/mark-as-read', {
      notification_id: [item.id]
    })

    switch (item.type) {
      case NotificationType.applicantApplied:
        router.push(`/candidate/job/${toLinkCase(item?.data?.company?.name)}/${newApplicantJobId}/`)
        // router.push(`/candidate/find-job/?tabs=2`)
        break

      case NotificationType.newApplicant:
        // const newApplicantName = item?.data?.candidate?.name
        if (!newApplicantJobId) {
          return
        }

        router.push(`/company/job-management/${newApplicantJobId}/?tabs=all`)
        break
      case NotificationType.companyOnboarding:
        router.push(`/company/`)
        break

      case NotificationType.completeProfileEncouragement:
        router.push(`${user?.role === 'Seafarer' ? '/candidate/?tabs=0' : '/company'}`)
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
      case NotificationType.feedComment:
        router.push(`/feed/${item?.data?.feed?.id}`)
        break
      case NotificationType.communityJoinRequest:
        router.push(`/community/${item?.data?.community?.id}`)
        break
      case NotificationType.communityRejectRequest:
        router.push(`/community/`)
        break
      case NotificationType.communityApproveRequest:
        router.push(`/community/${item?.data?.community?.id}`)
        break
      case NotificationType.jobOffer:
        const companyNameUrl = item?.data?.company?.name.toLowerCase().split(' ').join('-')
        const jobTitleUrl = item?.data?.job?.job_title
          ? item?.data?.job?.job_title.toLowerCase().split(' ').join('-')
          : ''

        router.push(`/candidate/job/${companyNameUrl}/${item?.data?.job?.id}/${jobTitleUrl}`)
        break

      default:
        console.log('No action required..')
        break
    }
  }

  return (
    <>
      <MenuItem key={item.id} onClick={() => handleClick()}>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
          {!item.read_at ? (
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant='dot'>
              <RenderAvatar notification={item} />
            </StyledBadge>
          ) : (
            <RenderAvatar notification={item} />
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              gap: '6px'
            }}
          >
            <Box
              component='span'
              sx={{
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'normal',
                wordBreak: 'break-word'
              }}
            >
              <Typography
                component='span'
                sx={{
                  color: '#1F1F1F',
                  fontSize: 14,
                  fontWeight: 700
                }}
              >
                {item.title}{' '}
              </Typography>
              <Typography
                component='span'
                sx={{
                  color: '#1F1F1F',
                  fontSize: 14,
                  fontWeight: 400
                }}
              >
                {item.subtitle}
              </Typography>
            </Box>

            <Typography sx={{ color: '#525252', fontSize: 12, fontWeight: 400 }}>{item.meta}</Typography>
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
