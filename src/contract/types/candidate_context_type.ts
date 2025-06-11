import { IUser } from '../models/user'

type CandidateContextType = {
  page: number
  totalCandidate: number
  setPage: (page: number) => void
  onLoading: boolean
  listCandidates: IUser[]
  hasNextPage: boolean
  fetchCandidates: (payload: {
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
    category_id?: any
    employee_type?: any
    search_by_position?: string
    experience_in_contract?: string
    experience_in_years?: string
    country?: any
    visaUsa?: any
    visaSchengen?: any
    saved?: any
  }) => Promise<void>
  handleCandidateSave: (id: any, isSaved?: boolean) => Promise<void>
}

export default CandidateContextType
