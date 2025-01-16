import Job from '../models/job'

type JobContextType = {
  page: number
  totalJob: number
  setPage: (page: number) => void
  onLoading: boolean
  listJobs: Job[]
  hasNextPage: boolean
  fetchJobs: (payload: {
    take: number
    search?: any
    roletype_id?: any
    category_id?: any
    rolelevel_id?: any
    edugrade_id?: any
    city_id?: any
    country_id?: any
    vesseltype_id?: any
    sailing_region?: any
    onboard_at?: any
    employment_type?: any
    employee_type?: any
    username?: any
    work_arrangement?: any
    sortBy?: any
  }) => Promise<void>
  handleJobSave: (jobId: any) => Promise<void>
  handleDeleteJobSave: (jobId: any) => Promise<void>
}

export default JobContextType
