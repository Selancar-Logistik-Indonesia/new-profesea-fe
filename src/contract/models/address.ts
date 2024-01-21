import City from "./city"
import Countries from "./country"

export default interface Address {
  id: number
  user_id: number
  country_id: string
  address: string
  created_at: string
  updated_at: string
  country: Countries
  city_id: number
  city: City
}
