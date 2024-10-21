import { ReactNode } from 'react'
import { ThemeColor } from 'src/@core/layouts/types'

type NotificationsType = {
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

export default NotificationsType
