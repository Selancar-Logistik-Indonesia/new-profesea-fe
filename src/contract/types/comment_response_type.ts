import ISocialFeedComment from "../models/social_feed_comment"

type CommentResponseType = {
    next_page_url?: string
    data: ISocialFeedComment[]
}

export default CommentResponseType;