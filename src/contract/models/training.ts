import TrainingCategory from "./training_category"
import { IUser } from "./user";

interface Training {
    id: number,
    user_id: number,
    price: number,
    category_id: number,
    title: string,
    schedule: string,
    short_description: string,
    joined_at?: string,
    thumbnail: string,
    category: TrainingCategory,
    trainer: IUser
    count_participant: number
}

export default Training;