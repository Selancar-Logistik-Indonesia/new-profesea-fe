import { ReactNode, createContext, useMemo, useState } from "react";
import ISocialFeed from "src/contract/models/social_feed";
import FetchFeedPayload from "src/contract/params/fetch_feed_payload";
import UpdateStatusPayload from "src/contract/params/update_status_payload";
import SocialFeedContextType from "src/contract/types/social_feed_context_type";
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: SocialFeedContextType = {
    feeds: [],
    onLoading: false,
    fetchFeeds: () => Promise.resolve(),
    updateStatus: () => Promise.resolve(),
}

const SocialFeedContext = createContext(defaultValue);

const SocialFeedProvider = (props: Props) => {
    const [feeds, setFeeds] = useState<ISocialFeed[]>([]);
    const [onLoading, setOnLoading] = useState(false);

    const updateStatus = async (payload: UpdateStatusPayload) => {
        const response = await HttpClient.post('/social-feed/feed', payload);
        if (response.status != 200) {
            throw response.data?.message ?? "Something went wrong";
        }

        const { feed } = response.data as { feed: ISocialFeed };
        setFeeds(items => [
            feed,
            ...items
        ]);
    }

    const fetchFeeds = async (payload: FetchFeedPayload) => {
        setOnLoading(true);
        try {
            const response = await HttpClient.get('/social-feed/feed', payload);
            if (response.status == 200) {
                const { feeds } = response.data as { feeds: { data: ISocialFeed[] } };
                if (feeds.data.length && feeds.data.length > 0) {
                    setFeeds(feeds.data);
                }
            }
        } catch (error) {
            console.error(error);
        }

        setOnLoading(false);
    }

    const values = useMemo(() => ({
        feeds,
        onLoading,
        updateStatus,
        fetchFeeds,
    }), [feeds, updateStatus, fetchFeeds, onLoading]);
    return <SocialFeedContext.Provider value={values}>{props.children}</SocialFeedContext.Provider>
}

export {
    SocialFeedProvider,
}

export default SocialFeedContext;