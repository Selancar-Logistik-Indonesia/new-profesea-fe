import { Icon } from '@iconify/react'
import { Box, Typography } from '@mui/material'
import { ReactNode, createContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
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
  fetchCandidates: () => Promise.resolve(),
  handleCandidateSave: () => Promise.resolve()
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
    saved?: any
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

  const handleCandidateSave = async (id: any, isSaved?: boolean) => {
    try {
      const response = await HttpClient.post('/directory/save', {
        dirable_id: id,
        dirable_type: 'user'
      })

      if (response.status === 200) {
        setCandidates(old =>
          old.map(candidate => (candidate.id === id ? { ...candidate, is_saved: !isSaved ? true : false } : candidate))
        )

        // Handle successful save
        toast(
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>
              {!isSaved ? 'You’ve saved this candidate' : 'You’ve remove this candidate from saved list'}
            </Typography>
          </Box>,
          {
            position: 'top-right'
          }
        )
      } else {
        console.error('Failed to save candidate')
      }
    } catch (error) {
      console.error('Error saving candidate:', error)
    }
  }

  const values = useMemo(
    () => ({
      page,
      setPage,
      listCandidates,
      totalCandidate,
      onLoading,
      hasNextPage,
      fetchCandidates,
      handleCandidateSave
    }),
    [page, setPage, listCandidates, totalCandidate, onLoading, hasNextPage, fetchCandidates, handleCandidateSave]
  )

  return <CandidateContext.Provider value={values}>{props.children}</CandidateContext.Provider>
}

export { CandidateProvider }
export default CandidateContext
