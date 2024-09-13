interface IEducation {
  id: number
  user_id: number
  title: string
  logo: string
  major: string
  degree: string
  start_date: string
  end_date: string
  still_here: number
  description: string
  created_at: string
  updated_at: string
  is_current: boolean | null
}

export default IEducation
