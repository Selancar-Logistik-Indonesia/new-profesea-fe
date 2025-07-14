import TrainingCategory from './training_category'
import { IUser } from './user'

export enum EBookingScheme {
    INSTANT_ACCESS = 'instant_access',
    QUOTA_BASED = 'quota_based',
    FIXED_DATE = 'fixed_date'
}

type countParticipantStatus = {
    unregistered: number,
    contacted: number,
    unpaid: number,
    paid: number,
    registered: number,
    on_hold: number,
    on_going: number,
    completed: number,
    canceled: number,
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
    is_active?: boolean
    currency?: string
    count_participant_status: countParticipantStatus
}

export default Training
