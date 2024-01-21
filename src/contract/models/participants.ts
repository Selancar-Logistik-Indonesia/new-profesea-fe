import {IUser} from "./user"

interface Participants {
    id: number,
    user_id: number,
    training_id: number,
    status: string,
    user: IUser
}

export default Participants;