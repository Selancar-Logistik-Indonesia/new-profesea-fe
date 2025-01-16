import JobCategory from './job_category'
import Degree from './degree'
import Company from './company'
import RoleLevel from './role_level'
import RoleType from './role_type'
import Country from './country'
import City from './city'
import VesselType from './vessel_type'

interface IJobSave {
  id: number
  user_id: number
  job_id: number
  created_at: string
  updated_at: string
}

interface Job {
  id: number
  user_id: number
  rolelevel_id: number
  roletype_id: number
  edugrade_id: number
  category_id: number
  vesseltype_id: number
  city_id: number
  country_id: number
  employee_type: string
  salary_start: number
  salary_end: number
  count_applicant: number
  license: any
  experience: number
  description: string
  sailing_region: string
  onboard_at: string
  applied_at: string
  created_at: string
  updated_at: string
  category: JobCategory
  company: Company
  rolelevel: RoleLevel
  role_type: RoleType
  degree: Degree
  city: City
  country: Country
  vessel_type: VesselType
  employment_type: string
  work_arrangement: string
  text_role: string
  contractDuration?: number
  contract_duration?: number
  job_title?: string
  hide_salary?: boolean
  currency?: string
  rotational?: boolean
  is_active: boolean
  deleted_at: string
  total_applied?: number
  total_proceed?: number
  total_rejected?: number

  job_save?: null | IJobSave
}

export default Job
