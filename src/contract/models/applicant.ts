import TrainingCategory from "./training_category"
import {IUser} from "./user"

interface Applicant {
    id: number,
    user_id: number,
    job_id: number,
    status: string,
    user: IUser
}

export default Applicant;