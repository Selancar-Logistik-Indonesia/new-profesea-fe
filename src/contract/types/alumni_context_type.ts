 
type AlumniContextType = {
  page: number
  totalAlumni: number
  setPage: (page: number) => void
  onLoading: boolean
  listAlumni: any
  hasNextPage: boolean
  fetchAlumnis: (payload: { take: number; search?: any }) => Promise<void>
}

export default AlumniContextType;