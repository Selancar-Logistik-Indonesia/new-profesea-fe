import Forum from "./forum"
import { IUser } from "./user"

interface IThread {
    id: number
    forum_id: number
    user_id: number
    title: string
    snap_content: any
    content:any
    user:IUser
    forum:Forum
    created_at: string
    updated_at: string
    replies_count: string
}

export default IThread;