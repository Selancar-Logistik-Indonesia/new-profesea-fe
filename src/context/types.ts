import { IUser } from "src/contract/models/user"

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
  build_profile_at?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: IUser | null
  setLoading: (value: boolean) => void
  setUser: (value: IUser | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
