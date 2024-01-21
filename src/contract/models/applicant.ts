import Job from "./job";
import {IUser} from "./user"

interface Applicant {
    id: number,
    user_id: number,
    job_id: number,
    status: string,
    user: IUser,
    job: Job
}

export default Applicant;