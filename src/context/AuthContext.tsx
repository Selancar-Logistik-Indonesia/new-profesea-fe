// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { HttpClient } from 'src/services'

// ** Defaults
const defaultProvider: AuthValuesType = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    // ** States
    const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

    // ** Hooks
    const router = useRouter()

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
            if (storedToken) {
                setLoading(true)
                await HttpClient
                    .get(authConfig.meEndpoint)
                    .then(async response => {
                        console.log("response.data.user", response.data.user);
                        
                        setLoading(false)
                        setUser({ ...response.data.user })
                    }).catch(() => {
                        localStorage.removeItem('userData')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('accessToken')
                        setUser(null)
                        setLoading(false)

                        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                            router.replace('/login');
                        }
                    })
            } else {
                setLoading(false);
            }
        }

        initAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
        HttpClient
            .post(authConfig.loginEndpoint, params)
            .then(async response => {
                console.log("here 1", response);

                const returnUrl = router.query.returnUrl

                setUser({ ...response.data.user })
                window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
                window.localStorage.setItem('userData', JSON.stringify(response.data.user));

                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
                await router.replace(redirectURL as string);
            })

            .catch(err => {
                console.log(err);
                if (errorCallback) errorCallback(err)
            })
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        router.push('/login');
    }

    const values = {
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
