import ISocialFeed from "../models/social_feed"
import FetchFeedPayload from "../params/fetch_feed_payload";
import UpdateStatusPayload from "../params/update_status_payload";

type SocialFeedContextType = {
    page: number,
    setPage: (page: number) => void,
    onLoading: boolean,
    feeds: ISocialFeed[],
    hasNextPage: boolean,
    fetchFeeds: (payload: FetchFeedPayload) => Promise<void>,
    updateStatus: (payload: UpdateStatusPayload) => Promise<void>,
    // createComment: () => Promise<void>,
    // likeFeed: () => Promise<void>,
    // unlikeFeed: () => Promise<void>,
}

export default SocialFeedContextType;