import City from "./city"
import Country from "./country"
import JobCategory from "./job_category"
import Province from "./province"
import RegionTravel from "./regional_travel"
import RoleLevel from "./role_level"
import RoleType from "./role_type"
import VesselType from "./vessel_type"

interface FieldPreference {
  id: number
  available_date: string
  salary_start: string
  salary_end: string
  created_at: string
  updated_at: string
  role_type: RoleType
  role_level: RoleLevel
  vessel_type: VesselType
  region_travel: RegionTravel
  country: Country
  city: City
  province: Province
  spoken_langs: any
  open_to_opp: any
  category_id: any
  job_category?: JobCategory
  job_position:any
  job_position_id: number
}

export default FieldPreference;
