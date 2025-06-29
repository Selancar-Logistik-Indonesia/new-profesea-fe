import { createContext, ReactNode, useMemo, useState } from 'react'
import { HttpClient } from 'src/services'
import { Dispatch, SetStateAction } from 'react'

type Props = { children: ReactNode }

type Community = {
  id: number
  name: string
  description: string
  banner_url: string
  is_private: boolean
  is_joined: boolean
  total_members: number
  total_feeds: number
  created_by: {
    id: number
    name: string
    address: string
    country: string
    job_title: string
    job_category: string
    photo: string
  }
  created_at: string
  updated_at: string
}

type CommunitiesContextType = {
  communities: Community[]
  totalCommunities: number
  onLoading: boolean
  isFetchingMore: boolean
  page: number
  hasNextPage: boolean
  fetchCommunities: (payload?: { take?: number; mPage?: number; isJoined?: boolean; userId?: any, search?:string }) => Promise<void>
  setPage: Dispatch<SetStateAction<number>>
  setHasNextPage: Dispatch<SetStateAction<boolean>>
}

const defaultValue: CommunitiesContextType = {
  communities: [],
  totalCommunities: 0,
  onLoading: false,
  isFetchingMore: false,
  page: 1,
  hasNextPage: false,
  fetchCommunities: async () => {},
  setPage: () => {},
  setHasNextPage: () => {}
}

const CommunitiesContext = createContext<CommunitiesContextType>(defaultValue)

const CommunitiesProvider = ({ children }: Props) => {
  const [communities, setCommunities] = useState<Community[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCommunities, setTotalCommunities] = useState(0)

  const fetchCommunities = async (payload?: { take?: number; mPage?: number; isJoined?: boolean; userId?: any, search?:string }) => {
    const requestedPage = payload?.mPage ?? page
    const perPage = payload?.take ?? 6

    // const currentFilters = payload?.isJoined ? { isJoined: payload.isJoined, userId: payload.userId } : filters
    const currentFilters = { isJoined: payload?.isJoined, userId: payload?.userId, search: payload?.search }

    const params: any = {
      page: requestedPage,
      take: perPage,
      search: payload?.search
    }

    if (currentFilters?.isJoined) {
      params['user_id'] = currentFilters.userId
    }

    if (!hasNextPage && requestedPage !== 1) return

    if (requestedPage === 1) {
      setOnLoading(true)
    } else {
      setIsFetchingMore(true)
    }

    try {
      const response = await HttpClient.get('/community/', params)
      if (response.status === 200) {
        const resData = response.data
        const communitiesData = resData.data || []

        if (requestedPage === 1) {
          setCommunities(communitiesData)
        } else {
          setCommunities(prev => [...prev, ...communitiesData])
        }

        setTotalCommunities(resData.total || communitiesData.length)

        const nextPage = resData.current_page + 1
        const hasMore = resData.current_page < resData.last_page

        setPage(nextPage)
        setHasNextPage(hasMore)
      }
    } catch (err) {
      console.error('Failed to fetch communities:', err)
    } finally {
      setOnLoading(false)
      setIsFetchingMore(false)
    }
  }

  const values = useMemo(
    () => ({
      communities,
      totalCommunities,
      onLoading,
      isFetchingMore,
      page,
      hasNextPage,
      fetchCommunities,
      setPage,
      setHasNextPage
    }),
    [communities, totalCommunities, onLoading, isFetchingMore, page, hasNextPage, setHasNextPage]
  )

  return <CommunitiesContext.Provider value={values}>{children}</CommunitiesContext.Provider>
}

export { CommunitiesProvider }
export default CommunitiesContext
