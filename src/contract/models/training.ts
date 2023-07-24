import TrainingCategory from "./training_category"
import { IUser } from "./user";

interface Training {
    id: number,
    user_id: number,
    category_id: number,
    title: string,
    schedule: string,
    short_description: string,
    thumbnail: string,
    category: TrainingCategory,
    trainer: IUser
}

export default Training;