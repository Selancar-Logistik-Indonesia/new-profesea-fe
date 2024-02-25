import IRank from "./role_type"
import ICountry from "./country"
import IVesselType from "./vessel_type"

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