import { IUser } from "./user"

interface ISocialFeed {
    id: number
    user_id: number
    content: string
    attachments: any
    content_type: string
    h_created_at: string
    created_at: string
    updated_at: string

    user: IUser
}

export default ISocialFeed;