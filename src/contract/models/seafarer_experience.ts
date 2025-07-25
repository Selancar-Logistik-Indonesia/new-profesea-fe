import IRank from "./role_type"
import ICountry from "./country"
import IVesselType from "./vessel_type"
import RoleType from "./role_type"

export default interface seafarer_experience {
    id: number
    user_id: number
    rank_id: number
    country_id: number
    vessel_type_id: number
    vessel_name: string
    grt: number
    dwt: number
    me_power: number
    sign_in: Date
    sign_off: Date
    company: string
    rank: IRank,
    country: ICountry,
    vessel_type: IVesselType
}

export interface IHospitalityExperienceData {
    id: number
    user_id: number
    position: string
    country_id: number
    country: ICountry
    description: string
    start_date: string
    end_date: string
    is_current:boolean
    institution: string
    logo: string
    role_type: RoleType
    work_place:string
}