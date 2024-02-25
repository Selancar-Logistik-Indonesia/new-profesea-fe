import ICountry from "./country"
import ICop from "./licensi"

export default interface seafarer_proficiency {
    id: number
    user_id: number
    country_id: number
    cop_id: number
    certificate_number: string
    is_lifetime: boolean
    valid_until: Date
    filename: string
    country: ICountry
    proficiency: ICop
}