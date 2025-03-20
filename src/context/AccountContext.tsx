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
}

const defaultProvider: AccountType = {
  users: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean //,
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
      await HttpClient.get('https://api.staging.selancar.elogi.id/api/user/all')
        .then(async response => {
          console.log(response)
          setUser({ ...response.data.users })
        })
        .catch(error => console.error(`Error : ${error}`))
    }

    initAccount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const values = {
    users,
    loading,
    setUser,
    setLoading
  }

  return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
}

export { AccountContext, AccountProvider }
