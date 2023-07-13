import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { HttpClient } from 'src/services'
import secureLocalStorage from "react-secure-storage";
import localStorageKeys from 'src/configs/localstorage_keys'

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
                    }).catch((error) => {
                        localStorage.removeItem('userData')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('accessToken')
                        secureLocalStorage.clear();

                        setUser(null)
                        setLoading(false)

                        if (error.response.status == 401) {
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
        setLoading(true);
        HttpClient
            .post(authConfig.loginEndpoint, params)
            .then(async response => {
                setLoading(false);

                const returnUrl = router.query.returnUrl
                setUser({ ...response.data.user })
                localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
                secureLocalStorage.setItem(localStorageKeys.userData, response.data.user);
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : (response.data.user.role == 'admin') ? '/admin' : (response.data.user.role == 'Company') ? '/company' : '/home'  // console.log(`redirectURL: ${redirectURL}`);
                await router.replace(redirectURL as string);
            }).catch(err => {
                setLoading(false);
                if (errorCallback) errorCallback(err)
            })
    }

    const handleLogout = async () => {
        setUser(null)
        secureLocalStorage.clear();
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        await router.push('/login');
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
