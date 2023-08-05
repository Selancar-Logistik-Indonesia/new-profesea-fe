import {IUser} from "./user"

interface Directory {
    id: number,
    user_id: number,
    dirable_id: number,
    status: string,
    dirable: IUser,
    created_at: string,
    updated_at: string
}

export default Directory;