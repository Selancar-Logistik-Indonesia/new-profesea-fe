import { IUser } from "./user"

interface ISocialFeedComment {
    id: number
    feed_id: number
    user_id: number
    content: string
    h_created_at: string
    created_at: string
    updated_at: string
    count_replies: number
    count_likes: number
    liked_at: string
    replyable_id:number
    user: IUser
}

export default ISocialFeedComment;