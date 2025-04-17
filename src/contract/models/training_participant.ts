import Training from './training'
import { IUser } from './user'

export type TrainingParticipantStatus =
    | 'unregistered'
    | 'contacted'
    | 'unpaid'
    | 'paid'
    | 'registered'
    | 'onhold'
    | 'ongoing'
    | 'complete'
    | 'canceled'

export interface ParticipantStatusCount {
    all: number;
    unregistered?: number;
    contacted?: number;
    unpaid?: number;
    paid?: number;
    registered: number;
    onhold: number;
    ongoing: number;
    complete: number;
    canceled?: number;
}

export interface ITrainingParticipant {
    id: number
    user_id: number
    training_id: number
    status: TrainingParticipantStatus
    created_at: string
    updated_at: string
    enroll_type?: string
    fullname?: string
    email?: string
    whatsapp_number?: string
    address?: string
    cancel_reason?: string
    self_enroll?: boolean
    pic_name?: string
    company_name?: string
    user: IUser
    training?: Training
    date_registered?: string
    schedule?: string
}

export default ITrainingParticipant
