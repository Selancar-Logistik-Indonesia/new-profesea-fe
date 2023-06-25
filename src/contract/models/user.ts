import { ITeam } from "./team"

export interface IUser {
    id: number
    team_id: number
    country_id: number
    industry_id?: number
    employee_type: string
    name: string
    username: string
    email: string
    phone: string
    email_verified_at: string
    website?: string
    plan_type?: string
    created_at: string
    updated_at: string
    about?: string
    photo: string
    banner?: string
    role: string
    team: ITeam
}
