import JobCategory from "./job_category"
import Degree from "./degree"
import Company from "./company"
import RoleLevel from "./role_level"

interface Job {
    id: number,
    user_id: number,
    rolelevel_id: number,
    edugrade_id: number,
    category_id: number,
    employee_type: string,
    salary_start: number,
    salary_end: number,
    license: string,
    experience: string,
    description: string,
    created_at: string,
    updated_at: string,
    category: JobCategory,
    company : Company,
    rolelevel : RoleLevel,
    degree: Degree
}

export default Job;