import ICountry from "./country"

export default interface seafarfer_travel_document {
    id: number
    document: string
    no: string
    date_of_issue: Date
    valid_date: Date
    country_of_issue: number
    user_id: number
    is_lifetime: boolean
    required_document: string
    country: ICountry
    filename:string
}