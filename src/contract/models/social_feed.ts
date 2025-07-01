import { Community } from './community'
import ISocialFeedComment from './social_feed_comment'
import { IUser } from './user'

interface ISocialFeed {
  id: number
  community_id?: number
  user_id: number
  count_likes: number
  count_comments: number
  content: string
  attachments?: string[]
  content_type: string
  h_created_at: string
  liked_at?: string
  created_at: string
  updated_at: string
  feed_repost?: ISocialFeed
  user: IUser
  community: Community
  comments: ISocialFeedComment[]
  settings?: any
}

export default ISocialFeed
