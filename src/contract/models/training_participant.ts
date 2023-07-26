import Training from "./training"
import { IUser } from "./user"

export interface ITrainingParticipant {
    id: number
    user_id: number
    training_id: number
    status: string
    created_at: string
    updated_at: string
    user: IUser
    training?: Training
}

export default ITrainingParticipant;
