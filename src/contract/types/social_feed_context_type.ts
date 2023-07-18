import ISocialFeed from "../models/social_feed"
import FetchFeedPayload from "../params/fetch_feed_payload";
import UpdateStatusPayload from "../params/update_status_payload";

type SocialFeedContextType = {
    feeds: ISocialFeed[],
    fetchFeeds: (payload: FetchFeedPayload) => Promise<void>,
    updateStatus: (payload: UpdateStatusPayload) => Promise<void>,
    // createComment: () => Promise<void>,
    // likeFeed: () => Promise<void>,
    // unlikeFeed: () => Promise<void>,
}

export default SocialFeedContextType;