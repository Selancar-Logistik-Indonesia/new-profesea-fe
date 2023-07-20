import { now } from "moment";
import { ReactNode, createContext, useMemo, useState } from "react";
import ISocialFeed from "src/contract/models/social_feed";
import FetchFeedPayload from "src/contract/params/fetch_feed_payload";
import UpdateStatusPayload from "src/contract/params/update_status_payload";
import CommentResponseType from "src/contract/types/comment_response_type";
import SocialFeedContextType from "src/contract/types/social_feed_context_type";
import { HttpClient } from "src/services";
import { v4 } from "uuid";

type Props = { children: ReactNode };
const defaultValue: SocialFeedContextType = {
    page: 1,
    totalFeed: 0,
    setPage: () => { },
    feeds: [],
    onLoading: false,
    hasNextPage: false,
    commentSignature: '',
    fetchFeeds: () => Promise.resolve(),
    updateStatus: () => Promise.resolve(),
    likeUnlikeFeed: () => Promise.resolve(),
    postComment: () => Promise.resolve(),
    getComments: () => Promise.resolve() as any
}

const SocialFeedContext = createContext(defaultValue);

const SocialFeedProvider = (props: Props) => {
    const [feeds, setFeeds] = useState<ISocialFeed[]>([]);
    const [onLoading, setOnLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState(1);
    const [commentSignature, setCommentSignature] = useState('');
    const [totalFeed, setTotalFeed] = useState(0);

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
        // only trigger in page 1
        if (page == 1) setOnLoading(true);

        try {
            const response = await HttpClient.get('/social-feed/feed', {
                page: page,
                ...payload
            });

            if (response.status == 200) {
                const { feeds } = response.data as { feeds: { data: ISocialFeed[], next_page_url?: string, total: number } };
                if (feeds.data.length && feeds.data.length > 0) {
                    setFeeds(old => {
                        const newItems = old;
                        feeds.data.forEach(e => newItems.push(e));
                        setTotalFeed(newItems.length);

                        return newItems;
                    });
                    setPage(page => page + 1);
                }

                setHasNextPage(feeds.next_page_url != null);
            }
        } catch (error) {
            console.error(error);
        }

        setOnLoading(false);
    }

    const likeUnlikeFeed = async (feedId: number) => {
        const response = await HttpClient.get(`/social-feed/like/${feedId}`);
        if (response.status != 200) {
            return;
        }

        const { action } = response.data;
        const newFeedList = feeds.map((item) => {
            if (item.id == feedId) {
                const updatedItem: ISocialFeed = {
                    ...item,
                    count_likes: (action == "like") ? (item.count_likes + 1) : (item.count_likes - 1),
                    liked_at: (action == "like") ? now().toString() : undefined,
                };

                return updatedItem;
            }

            return item;
        })

        setFeeds(newFeedList);
    }

    const postComment = async (feedId: number, replyable_type: 'feed' | 'comment', content: string) => {
        const response = await HttpClient.post("/social-feed/comment", {
            content: content,
            replyable_id: feedId,
            replyable_type: replyable_type
        });

        if (response.status != 200) {
            alert(response.data?.message ?? "Something went wrong");
        }

        setCommentSignature(v4());
    }

    const getComments = async (feedId: number, page: number, take: number, replyable_type: 'feed' | 'comment') => {
        const response = await HttpClient.get(`/social-feed/comment/${feedId}`, {
            page: page, take: take, replyable_type: replyable_type
        });

        if (response.status != 200) {
            throw response.data?.message ?? "Unknow reason";
        }
        const { comments } = response.data as { comments: CommentResponseType }

        return comments;
    }

    const values = useMemo(() => ({
        feeds,
        totalFeed,
        onLoading,
        updateStatus,
        fetchFeeds,
        hasNextPage,
        page,
        setPage,
        likeUnlikeFeed,
        postComment,
        getComments,
        commentSignature,
    }), [
        feeds,
        totalFeed,
        updateStatus,
        fetchFeeds,
        onLoading,
        hasNextPage,
        page,
        setPage,
        likeUnlikeFeed,
        postComment,
        getComments,
        commentSignature,
    ]);

    return <SocialFeedContext.Provider value={values}>{props.children}</SocialFeedContext.Provider>
}

export {
    SocialFeedProvider,
}

export default SocialFeedContext;