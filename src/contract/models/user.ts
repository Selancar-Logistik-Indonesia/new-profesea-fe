import Address from "./address"
import Countries from "./country"
import FieldPreference from "./field_preference"
import Industry from "./industry"
import ITeam from "./team"

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
}
