import TrainingCategory from "./training_category"
import { IUser } from "./user";

interface Training {
    id: number,
    user_id: number,
    price: number,
    discounted_price: number,
    category_id: number,
    title: string,
    schedule: string,
    short_description: string,
    requirements?: string,
    cta: string,
    joined_at?: string,
    thumbnail: string,
    score: number,
    category: TrainingCategory,
    trainer: IUser
    count_participant: number
}

export default Training;
