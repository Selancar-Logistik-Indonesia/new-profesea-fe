import ICountry from "./country"
import ICompetency from "./licensi"

export default interface seafarer_competency {
    id: number
    user_id: number
    country_id: number
    certificate_number: string
    is_lifetime: boolean
    valid_until: Date
    filename: string
    coc_id: number
    country: ICountry,
    competency: ICompetency
}