import Address from './address'
import Countries from './country'
import FieldPreference from './field_preference'
import Industry from './industry'
import JobCategory from './job_category'
import Province from './province'
import seafarer_competency from './seafarer_competency'
import ITeam from './team'
import VesselType from './vessel_type'

export interface ILastExperience {
  id: number
  user_id: number
  institution: string
  logo: string
  position: string
  start_date: string | null
  end_date: string | null
  still_here: number
  description: string
  created_at: string
  updated_at: string
  vesseltype_id: number | null
}

export interface ILastSeaExperience {
  id: number
  vessel_name: string
  grt: number
  dwt: number
  me_power: number
  company: string
  sign_in: string | null
  sign_off: string | null
  created_at: string
  updated_at: string
  user_id: number
  rank_id: number | null
  vessel_type_id: number | null
}

export interface ILastEducation {
  id: number
  user_id: number
  title: string
  logo: string
  major: string
  degree: string
  start_date: string | null
  end_date: string | null
  still_here: number
  description: string
  created_at: string
  updated_at: string
}

export interface IUser {
  id: number
  team_id: number
  country_id: number
  industry_id?: number
  employee_type: string
  name: string
  username: string
  email: string
  phone: string
  email_verified_at: string
  build_profile_at: string
  website?: string
  plan_type?: string
  created_at: string
  updated_at: string
  about?: string
  photo: string
  banner?: string
  role: string
  team: ITeam
  country: Countries
  industry: Industry
  address: Address
  field_preference?: FieldPreference
  frienship_status?: string
  blocked_at?: string
  items?: any
  gender?: any
  location_province?: Province
  jobcategory?: JobCategory
  license?: any
  vessel_type?: VesselType
  verified_at: string
  is_crewing: number
  no_experience: boolean
  date_of_birth: string
  last_experience: ILastExperience | null
  last_sea_experience: ILastSeaExperience | null
  last_education: ILastEducation | null
  total_experience_in_years?: number
  last_coc?: seafarer_competency
  is_agree_policy_post?: boolean
  last_step: string
  documents: any[]
}
