import { createContext, useEffect, useState, ReactNode } from 'react'
import { HttpClient } from 'src/services'

export type AccountParams = {
    address: string
    country_id: number
    created_at: string
    email: string
    email_verified_at: string
    id: number
    joblevel_id: number
    name: string
    phone: string
    role: string
    team: string
    team_id: number
    updated_at: string
    username: string
}

export type AccountType = {
    loading: boolean
    users: AccountParams | null
    setLoading: (value: boolean) => void
    setUser: (value: AccountParams | null) => void

    // addAccount: (params: AccountParams, errorCallback?: ErrCallbackType) => void
    // updateAccount: (params: AccountParams, errorCallback?: ErrCallbackType) => void
    // deleteAccount: (params: AccountParams, errorCallback?: ErrCallbackType) => void
}

const defaultProvider: AccountType = {
    users: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean //,
    // addAccount: () => Promise.resolve(),
    // updateAccount: () => Promise.resolve(),
    // deleteAccount: () => Promise.resolve()
}
const AccountContext = createContext(defaultProvider)

type Props = {
    children: ReactNode
}

const AccountProvider = ({ children }: Props) => {
    // ** States
    const [users, setUser] = useState<AccountParams | null>(defaultProvider.users)
    const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

    useEffect(() => {
        const initAccount = async (): Promise<void> => {
            // setLoading(true)
            await HttpClient.get("https://api.staging.selancar.elogi.id/api/user/all")
                .then(async response => {
                    console.log(response);
                    setUser({ ...response.data.users })
                }).catch(error => console.error(`Error : ${error}`));
        }

        initAccount()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const showAll = (errorCallback?: ErrCallbackType) => {
    //     HttpClient.get(AppConfig.baseUrl+"/user/all")
    //             .then((response)=>{
    //                 const allData = response.data.users;
    //                 setUser(allData);
    //             })

    //         .catch(err => {
    //             console.log(err);
    //             if (errorCallback) errorCallback(err)
    //         })
    // }

    // const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    //     HttpClient
    //         .post(authConfig.loginEndpoint, params)
    //         .then(async response => {
    //             console.log("here 1", response);

    //             const returnUrl = router.query.returnUrl

    //             setUser({ ...response.data.user })
    //             window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken);
    //             window.localStorage.setItem('userData', JSON.stringify(response.data.user));

    //             const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/home'
    //             console.log(`redirectURL: ${redirectURL}`);

    //             await router.replace(redirectURL as string);
    //         })

    //         .catch(err => {
    //             console.log(err);
    //             if (errorCallback) errorCallback(err)
    //         })
    // }

    // const handleLogout = async () => {
    //     setUser(null)
    //     window.localStorage.removeItem('userData')
    //     window.localStorage.removeItem(authConfig.storageTokenKeyName)
    //     await router.push('/login');
    // }

    const values = {
        users,
        loading,
        setUser,
        setLoading //,
        // login: handleLogin,
        // logout: handleLogout
    }

    return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
}

export { AccountContext, AccountProvider }
