import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import { AuthValuesType, LoginParams, LoginSilentParams, ErrCallbackType } from './types'
import { HttpClient } from 'src/services'
import secureLocalStorage from 'react-secure-storage'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import IAbilities from 'src/contract/models/abilities'

const defaultProvider: AuthValuesType = {
  user: null,
  abilities: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  glogin: () => Promise.resolve(),
  login: () => Promise.resolve(),
  loginSilent: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(defaultProvider.user)
  const [abilities, setAbilities] = useState<IAbilities | null>(defaultProvider.abilities)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const router = useRouter()

  const initAuth = async (): Promise<void> => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    if (storedToken) {
      setLoading(true)
      await HttpClient.get(authConfig.meEndpoint)
        .then(async response => {
          setLoading(false)
          setUser({ ...response.data.user })
          setAbilities(response.data.abilities)
          secureLocalStorage.setItem(localStorageKeys.userData, response.data.user)
          secureLocalStorage.setItem(localStorageKeys.abilities, response.data.abilities)

          if (response.data.user.verified_at === null) {
            router.push(`/verify-email/`)
          }
        })
        .catch(error => {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          secureLocalStorage.clear()

          setUser(null)
          setLoading(false)

          if (error.response.status == 401) {
            router.replace('/login')
          }
        })
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType, noReturn?: boolean) => {
    setLoading(true)

    HttpClient.post(authConfig.loginEndpoint, params)
      .then(async response => {
        setLoading(false)
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.user })
        localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        secureLocalStorage.setItem(localStorageKeys.userData, response.data.user)
        secureLocalStorage.setItem(localStorageKeys.abilities, response.data.abilities)
        initAuth()

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/home'
        if (!noReturn) {
          if (params.namaevent != null) {
            await router.replace('/home/?event=true' as string)
          } else {
            router.replace(redirectURL as string)
          }
        }
      })
      .catch(err => {
        setLoading(false)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLoginSilent = async (params: LoginSilentParams, errorCallback?: ErrCallbackType) => {
    HttpClient.post(authConfig.loginSilentEndpoint, params)
      .then(async response => {
        setLoading(false)
        setUser({ ...response.data.user })
        localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        secureLocalStorage.setItem(localStorageKeys.userData, response.data.user)
        secureLocalStorage.setItem(localStorageKeys.abilities, response.data.abilities)
        initAuth()
        router.replace('/home' as string)
      })
      .catch(err => {
        setLoading(false)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleGoogleLogin = async (
    params: { accessToken: string; namaevent: any },
    errorCallback?: ErrCallbackType
  ) => {
    // console.log(params.accessToken)
    localStorage.setItem(authConfig.storageTokenKeyName, params.accessToken)
    HttpClient.get(authConfig.meEndpoint)
      .then(async response => {
        setLoading(false)

        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.user })
        setAbilities(response.data.abilities)
        secureLocalStorage.setItem(localStorageKeys.userData, response.data.user)
        secureLocalStorage.setItem(localStorageKeys.abilities, response.data.abilities)
        initAuth()
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/home' // console.log(`redirectURL: ${redirectURL}`);
        if (params.namaevent != null) {
          await router.replace('/home/?event=true' as string)
        } else {
          await router.replace(redirectURL as string)
        }
      })
      .catch(err => {
        setLoading(false)
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = async () => {
    setUser(null)
    secureLocalStorage.clear()
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    await router.push('/login')
  }

  const values = {
    user,
    abilities,
    loading,
    setUser,
    setLoading,
    glogin: handleGoogleLogin,
    login: handleLogin,
    logout: handleLogout,
    loginSilent: handleLoginSilent
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
