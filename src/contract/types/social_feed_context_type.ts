import ISocialFeed from "../models/social_feed"
import FetchFeedPayload from "../params/fetch_feed_payload";
import UpdateStatusPayload from "../params/update_status_payload";
import CommentResponseType from "./comment_response_type";

type SocialFeedContextType = {
  page: number
  totalFeed: number
  setPage: (page: number) => void
  onLoading: boolean
  feeds: ISocialFeed[]
  hasNextPage: boolean
  commentSignature: string
  subCommentSignature: string
  fetchFeeds: (payload: FetchFeedPayload) => Promise<void>
  updateStatus: (payload: UpdateStatusPayload) => Promise<void>
  likeUnlikeFeed: (likeableId: number, likeableType: string) => Promise<void>
  postComment: (feedId: number, replyable_type: 'feed' | 'comment', content: string) => Promise<void>
  deleteFeed: (feedId: number) => Promise<void>
  getComments: (
    feedId: number,
    page: number,
    take: number,
    replyable_type: 'feed' | 'comment'
  ) => Promise<CommentResponseType>
}

export default SocialFeedContextType;