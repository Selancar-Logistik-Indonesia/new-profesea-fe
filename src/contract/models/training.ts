import TrainingCategory from "./training_category"
import Trainer from "./company"

interface Training {
    id: number,
    user_id: number,
    category_id: number,
    title: string,
    schedule: string,
    short_description: string,
    thumbnail: string,
    category: TrainingCategory,
    trainer: Trainer
}

export default Training;