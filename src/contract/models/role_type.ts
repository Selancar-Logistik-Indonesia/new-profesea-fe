import JobCategory from "./job_category"
import { IUser } from "./user"

interface RoleType {
    id: number
    category_id: number
    name: string
    category: JobCategory
    user: IUser | any
    created_at: string
    updated_at: string
}

export interface RoleTypeAutocomplete {
    id: number
    category_id: number
    name: string
    inputValue?: string
    category: JobCategory
    user: IUser | any
    created_at: string
    updated_at: string
}

export default RoleType;