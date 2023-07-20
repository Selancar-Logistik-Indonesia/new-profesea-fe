import { IUser } from "./user"

interface ISocialFeedComment {
    id: number
    feed_id: number
    user_id: number
    content: string
    h_created_at: string
    created_at: string
    updated_at: string
    user: IUser
}

export default ISocialFeedComment;