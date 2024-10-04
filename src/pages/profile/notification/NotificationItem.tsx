import React, { ReactNode, useEffect, useState } from 'react'

import { Avatar, Box, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import style from './../../../../styles/css/NotificationTab.module.css'
import StyledBadge from './StyleBadge'
import { HttpClient } from 'src/services'
import { getInitials } from 'src/@core/utils/get-initials'
import { toLinkCase } from 'src/utils/helpers'
// import { IUser } from 'src/contract/models/user'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'

import NotificationType from 'src/contract/types/notification_type'

import FriendshipIssuingDialog from 'src/@core/layouts/components/shared-components/FriendshipIssuingDialog'
import { ThemeColor } from 'src/@core/layouts/types'

interface Iprops {
  item: any
  key: number
  getNotifications: VoidFunction
}

export type NotificationsTypeProps = {
  id: string
  meta: string
  title: string
  subtitle: JSX.Element
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

const RenderAvatar = ({ notification }: { notification: NotificationsTypeProps }) => {
  const { avatarAlt, avatarIcon, avatarText, avatarColor, payload } = notification

  if (payload?.photo) {
    return <Avatar sx={{ width: 54, height: 54 }} alt={avatarAlt} src={payload?.photo} />
  } else if (avatarIcon) {
    return (
      <Avatar sx={{ width: 54, height: 54 }} color={avatarColor}>
        {avatarIcon}
      </Avatar>
    )
  } else {
    return (
      <Avatar sx={{ width: 54, height: 54 }} color={avatarColor}>
        {getInitials(avatarText as string)}
      </Avatar>
    )
  }
}

export default function NotificationItem({ item, key, getNotifications }: Iprops) {
  const { user } = useAuth()
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const newApplicantJobId = item?.data?.job?.id
  const handleClick = async () => {
    setDialogOpen(true)
    getNotifications()
    await HttpClient.post('/user/notification/mark-as-read', {
      notification_id: [item.id]
    })

    switch (item.type) {
      case NotificationType.applicantApplied:
        router.push(`/candidate/job/${toLinkCase(item?.data?.company?.name)}/${newApplicantJobId}/`)
        //router.push(`/candidate/find-job/?tabs=2`)
        break

      case NotificationType.newApplicant:
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
      case NotificationType.connectRequest:
      case NotificationType.connectRequestApproved:
      case NotificationType.connectRequestRejected:
        router.push('/profile/connections')
        break

      default:
        console.log('No action required..')
        break
    }
  }

  useEffect(() => {}, [])

  return (
    <Box key={key} className={style['list-box']}>
      <ListItem alignItems='flex-start' sx={{ cursor: 'pointer' }} onClick={() => handleClick()}>
        <ListItemAvatar sx={{ marginTop: '-2px' }}>
          {!item.read_at ? (
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant='dot'>
              <RenderAvatar notification={item} />
            </StyledBadge>
          ) : (
            <RenderAvatar notification={item} />
          )}
        </ListItemAvatar>
        <ListItemText
          className={style['list-item-text']}
          primary={
            <React.Fragment>
              <div className={style['title']}>{item.subtitle}</div>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <div className={style['subtitle']}>{item.meta}</div>
            </React.Fragment>
          }
        />
      </ListItem>
      {dialogOpen && item.type == NotificationType.connectRequest && (
        <FriendshipIssuingDialog item={item} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      )}
    </Box>
  )
}
