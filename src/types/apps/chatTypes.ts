// ** Types
import { Dispatch } from 'redux'
import { ThemeColor } from 'src/@core/layouts/types'
import { IUser } from 'src/contract/models/user'

export type StatusType = 'busy' | 'away' | 'online' | 'offline' | 'true' | 'false'

export type StatusObjType = {
  busy: ThemeColor
  away: ThemeColor
  online: ThemeColor
  offline: ThemeColor
  true: ThemeColor
  false: ThemeColor
}

export type ProfileUserType = {
  id: number
  role: string
  about: string
  avatar: string
  fullName: string
  status: StatusType
  settings: {
    isNotificationsOn: boolean
    isTwoStepAuthVerificationEnabled: boolean
  }
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatType = {
  message: string
  senderId: number
  time: Date | string
  feedback: MsgFeedbackType
}

export type ChatsObj = {
  id: number
  userId: number
  chat: ChatType[]
  unseenMsgs: number
  lastMessage?: ChatType
}

export type ContactType = {
  id: number
  role: string
  about: string
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
  friend?: any
  photo?: string
  friend_id?: any
  id_chat?: any
}

export type ChatsArrType = {
  id: number
  role: string
  about: string
  chat: ChatsObj
  avatar?: string
  fullName: string
  last_chat?: string
  status: StatusType
  avatarColor?: ThemeColor
  username: string
  photo?: string
  participants?: any
  room_title?: string
  updated_at: any
  name: string
  friend_id?: any
}

export type SelectedChatType = null | {
  chat: ChatsObj
  contact: ChatsArrType
  data:any
}

export type ChatStoreType = {
  chats: ChatsArrType[] | null
  contacts: ContactType[] | null
  userProfile: IUser | null
  selectedChat: SelectedChatType
  headerchat: any
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  message: string 
  contact?: ChatsArrType
  data?: any
  id?: string
}

export type ChatContentType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch: Dispatch<any>
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  sendMsg: (params: SendMsgParamsType) => void
  handleUserProfileRightSidebarToggle: () => void
}

export type ChatSidebarLeftType = {
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  removeSelectedChat: () => void
  selectChat: (id: number) => void
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
  formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void
  headerChat:any
}

export type UserProfileLeftType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
}

export type UserProfileRightType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  getInitials: (val: string) => string
  handleUserProfileRightSidebarToggle: () => void
}

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
  id?: string
}

export type ChatLogType = {
  hidden: boolean
  data: {
    chat: ChatsObj
    contact: ContactType
    userContact: any 
  }
  logchat: any
}

export type MessageType = {
  time: string | Date
  updated_at: string | Date
  message: string
  senderId: number
  // feedback: MsgFeedbackType
  user_id: number
  content: string
}

export type ChatLogChatType = {
  msg: string
  time: string | Date
  // feedback: MsgFeedbackType
}

export type FormattedChatsType = {
  senderId: number
  messages: ChatLogChatType[]
}

export type MessageGroupType = {
  senderId: number
  messages: ChatLogChatType[]
}
