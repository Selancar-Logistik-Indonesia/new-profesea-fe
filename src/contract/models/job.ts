import JobCategory from "./job_category"
import Degree from "./degree"
import Company from "./company"
import RoleLevel from "./role_level"
import RoleType from "./role_type"
import Country from "./country"
import City from "./city"

interface Job {
    id: number,
    user_id: number,
    rolelevel_id: number,
    roletype_id: number,
    edugrade_id: number,
    category_id: number,
    city_id: number,
    country_id: number,
    employee_type: string,
    salary_start: number,
    salary_end: number,
    count_applicant: number,
    license: string,
    experience: string,
    description: string,
    onboard_at: string,
    created_at: string,
    updated_at: string,
    category: JobCategory,
    company : Company,
    rolelevel : RoleLevel,
    role_type : RoleType,
    degree: Degree,
    city: City,
    country: Country 
}

export default Job;