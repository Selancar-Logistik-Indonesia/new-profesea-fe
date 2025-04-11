import TrainingCategory from './training_category'
import { IUser } from './user'

export enum EBookingScheme {
  INSTANT_ACCESS = 'instant_access',
  QUOTA_BASED = 'quota_based',
  FIXED_DATE = 'fixed_date'
}

interface Training {
  id: number
  user_id: number
  price: number
  discounted_price: number
  category_id: number
  title: string
  schedule: string
  short_description: string
  requirements?: string
  cta: string
  joined_at?: string
  thumbnail: string
  score: number
  category: TrainingCategory
  trainer: IUser
  count_participant: number
  participants: number
  booking_scheme: EBookingScheme
  start_date?: string | null
  end_date?: string | null
  is_active?:boolean
  currency?:string
  count_participant_status: {completed:number, on_going:number, on_hold:number, registered:number}
}

export default Training
