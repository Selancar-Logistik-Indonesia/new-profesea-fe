 
type AlumniContextType = {
  page: number
  totalAlumni: number
  setPage: (page: number) => void
  onLoading: boolean
  listAlumni: any
  hasNextPage: boolean
  fetchAlumnis: (payload: { take: number; search?: any; status?: any }) => Promise<void>
  fetchMember: (payload: { take: number; search?: any; status?: any ;id?:any}) => Promise<void>
}

export default AlumniContextType;