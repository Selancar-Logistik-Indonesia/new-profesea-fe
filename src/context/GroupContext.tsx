import { ReactNode, createContext, useMemo, useState } from 'react'
import { AppConfig } from 'src/configs/api'
import { IUser } from 'src/contract/models/user'
import GroupContextType from 'src/contract/types/group_context_type'
import { HttpClient } from 'src/services'

type Props = { children: ReactNode }
const defaultValue: GroupContextType = {
  page: 1,
  totalGroup: 0,
  setPage: () => {},
  listGroup: [],
  onLoading: false,
  hasNextPage: false,
  fetchGroups: () => Promise.resolve()
}

const GroupContext = createContext(defaultValue)

const GroupProvider = (props: Props) => {
  const [page, setPage] = useState(1)
  const [listGroup, setGroup] = useState<IUser[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [totalGroup, setTotalGroup] = useState(0)

  const fetchGroups = async (payload: { take: number; search?: any }) => {
    // only trigger in page 1

    if (page == 1) {
      setOnLoading(true)
      setGroup([])
    }
    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/group', {
        page: page,
        ...payload
      })

      if (response.status == 200) {
        const { groups } = response.data as { groups: { data: IUser[]; next_page_url?: string; total: number } }

        if (groups.data.length && groups.data.length > 0) {
          setGroup(old => {
            const newItems = old
            groups.data.forEach(e => newItems.push(e))
            setTotalGroup(newItems.length)

            return newItems
          })

          if (groups.total > 9) {
            setPage(page => page + 1)
          }
        } else {
          setTotalGroup(0)
          setGroup([])
        }
        setHasNextPage(groups.next_page_url != null)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const values = useMemo(
    () => ({
      page,
      totalGroup,
      setPage,
      listGroup,
      onLoading,
      hasNextPage,
      fetchGroups
    }),
    [page, totalGroup, setPage, listGroup, onLoading, hasNextPage, fetchGroups]
  )

  return <GroupContext.Provider value={values}>{props.children}</GroupContext.Provider>
}

export { GroupProvider }

export default GroupContext
