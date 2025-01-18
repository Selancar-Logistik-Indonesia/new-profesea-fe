import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { AppConfig } from 'src/configs/api'
import localStorageKeys from 'src/configs/localstorage_keys'
import { IUser } from 'src/contract/models/user'
import { IDetailPercentage, IUserProfilePercentage } from 'src/contract/models/user_profile_percentage'
import { HttpClient } from 'src/services'

type Props = { children: ReactNode }

interface IDefaultValue {
  percentage: number
  detail_percentage: IDetailPercentage | null
  fetchProfileCompletion: () => Promise<void>
  refetch: boolean
  setRefetch: any
}

const defaultValue: IDefaultValue = {
  percentage: 0,
  detail_percentage: null,
  fetchProfileCompletion: () => Promise.resolve(),
  refetch: false,
  setRefetch: () => {}
}

const ProfileCompletionContext = createContext(defaultValue)

const ProfileCompletionProvider = (props: Props) => {
  const user = secureLocalStorage.getItem(localStorageKeys.userData) as IUser

  const [userProfileCompletion, setUserProfileCompletion] = useState(0)
  const [userDetailPercentage, setUserDetailPercentage] = useState<IDetailPercentage | null>(null)
  const [refetch, setRefetch] = useState(false)

  const fetchProfileCompletion = async () => {
    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/public/data/user/calculate-percentage/' + user?.id)
      console.log('ini response =>', response)
      const { detail_percentage, percentage } = response?.data as IUserProfilePercentage
      console.log('ini response =>', percentage)
      setUserProfileCompletion(percentage)
      setUserDetailPercentage(detail_percentage)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProfileCompletion()
  }, [refetch])

  //   const values: IDefaultValue = useMemo(() => ({}), [])

  const values: IDefaultValue = {
    percentage: userProfileCompletion,
    detail_percentage: userDetailPercentage,
    fetchProfileCompletion,
    refetch,
    setRefetch
  }

  return <ProfileCompletionContext.Provider value={values}>{props.children}</ProfileCompletionContext.Provider>
}

export { ProfileCompletionProvider }

export default ProfileCompletionContext
