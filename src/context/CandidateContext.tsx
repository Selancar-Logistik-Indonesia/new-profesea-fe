import { ReactNode, createContext, useMemo, useState } from 'react'
import { AppConfig } from 'src/configs/api'
import { IUser } from 'src/contract/models/user'
import CandidateContextType from 'src/contract/types/candidate_context_type'
import { HttpClient } from 'src/services'

type Props = { children: ReactNode }
const defaultValue: CandidateContextType = {
  page: 1,
  totalCandidate: 0,
  setPage: () => {},
  listCandidates: [],
  onLoading: false,
  hasNextPage: false,
  fetchCandidates: () => Promise.resolve()
}

const CandidateContext = createContext(defaultValue)

const CandidateProvider = (props: Props) => {
  const [page, setPage] = useState(1)
  const [listCandidates, setCandidates] = useState<IUser[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [totalCandidate, setTotalCandidate] = useState(0)

  const fetchCandidates = async (payload: {
    take: number
    search?: any
    vesseltype_id?: any
    roletype_id?: any
    rolelevel_id?: any
    include_all_word?: any
    include_one_word?: any
    exact_phrase?: any
    exclude_all_these?: any
    spoken?: any
    employee_type?: any
    search_by_position?: any
    experience_in_contract?: string
    experience_in_years?: string
    country?: any
    visaUsa?: any
    visaSchengen?: any
  }) => {
    setOnLoading(true)
    setCandidates([])

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/candidate', {
        page: page,
        ...payload
      })

      if (response.status === 200) {
        const { candidates } = response.data as {
          candidates: { data: IUser[]; next_page_url?: string; total: number }
        }

        setCandidates(old => (page === 1 ? candidates.data : [...old, ...candidates.data]))
        setTotalCandidate(candidates.total)
        setHasNextPage(candidates.next_page_url != null)
      } else {
        setTotalCandidate(0)
        setCandidates([])
        setHasNextPage(false)
      }
    } catch (error) {
      console.error(error)
      setCandidates([])
      setTotalCandidate(0)
      setHasNextPage(false)
    }

    setOnLoading(false)
  }

  const values = useMemo(
    () => ({
      page,
      setPage,
      listCandidates,
      totalCandidate,
      onLoading,
      hasNextPage,
      fetchCandidates
    }),
    [page, setPage, listCandidates, totalCandidate, onLoading, hasNextPage, fetchCandidates]
  )

  return <CandidateContext.Provider value={values}>{props.children}</CandidateContext.Provider>
}

export { CandidateProvider }
export default CandidateContext
