import JobCategory from "./job_category"

interface RoleType {
    id: number
    category_id: number
    name: string
    category: JobCategory
    created_at: string
    updated_at: string
}

export default RoleType;