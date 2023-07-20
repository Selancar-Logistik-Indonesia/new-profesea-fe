import Country from "./country"
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
  province: Province
}

export default FieldPreference;
