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

  deleteFeed: () => Promise.resolve(),
  setPage: () => {},
  feeds: [],
  onLoading: false,
  hasNextPage: false,
  commentSignature: '',
  subCommentSignature: '',
  fetchFeeds: () => Promise.resolve(),
  updateStatus: () => Promise.resolve(),
  EditupdateStatus: () => Promise.resolve(),
  likeUnlikeFeed: () => Promise.resolve(),
  postComment: () => Promise.resolve(),
  getComments: () => Promise.resolve() as any
}

const SocialAlumniContext = createContext(defaultValue);

const SocialAlumniProvider = (props: Props) => {
    const [feeds, setFeeds] = useState<ISocialFeed[]>([]);
    const [onLoading, setOnLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState(1);
    const [commentSignature, setCommentSignature] = useState('');
    const [subCommentSignature, setSubCommentSignature] = useState('');
    const [totalFeed, setTotalFeed] = useState(0);

    const updateStatus = async (payload: UpdateStatusPayload) => {
        
        const formData = new FormData();
        formData.append("content", payload.content);
        formData.append('content_type', payload.content_type)
        formData.append('alumni_id', payload.alumni_id)

        if (payload.feed_repost) {
            formData.append("feed_repost", payload.feed_repost);
        }

        if (payload.attachments) {
            for (const item of payload.attachments) {
                formData.append("attachments[]", item);
            }
        }

        const response = await HttpClient.post('/alumnifeeds/feed', formData);
        if (response.status != 200) {
            throw response.data?.message ?? "Something went wrong";
        }

        const { feed } = response.data as { feed: ISocialFeed };
        setFeeds(items => [
            feed,
            ...items
        ]);
    }
      const EditupdateStatus = async (payload: UpdateStatusPayload) => {
        const formData = new FormData()
        formData.append('content', payload.content)
        formData.append('content_type', payload.content_type)

        if (payload.feed_repost) {
          formData.append('feed_repost', payload.feed_repost)
        }

        if (payload.attachments) {
          for (const item of payload.attachments) {
            formData.append('attachments[]', item)
          }
        }

        const response = await HttpClient.post('/social-alumni/' + payload.id, formData)
        if (response.status != 200) {
          throw response.data?.message ?? 'Something went wrong'
        }
        // fetchFeeds
        // const { feed } = response.data as { feed: ISocialFeed }
        // setFeeds(items => [feed, ...items])
      }

    const fetchFeeds = async (payload: FetchFeedPayload) => {
        let sPage = page;
        if (payload.mPage) {
            sPage = payload.mPage;
        }
        
        // only trigger in page 1
        if (sPage == 1) setOnLoading(true);

        try {
            const url = '/alumnifeeds/feed/'
            const response = await HttpClient.get(url, {
                page: sPage,
                ...payload
            })

            if (response.status == 200) {
                const { feeds } = response.data as { feeds: { data: ISocialFeed[], next_page_url?: string, total: number } };
                if (feeds.data.length && feeds.data.length > 0) {
                    if (sPage == 1) {
                        setFeeds(feeds.data);
                        setTotalFeed(feeds.data.length);
                    } else {
                        setFeeds(old => {
                            const newItems = old;
                            feeds.data.forEach(e => newItems.push(e));
                            setTotalFeed(newItems.length);

                            return newItems;
                        });
                    }

                    setPage(sPage + 1);
                }

                setHasNextPage(feeds.next_page_url != null);
            }
        } catch (error) {
            console.error(error);
        }

        setOnLoading(false);
    }

    const likeUnlikeFeed = async (feedId: number, likeableType: string) => {
        const response = await HttpClient.get(`/alumnifeeds/like/${feedId}?likeable_type=${likeableType}`)
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
        const response = await HttpClient.post('/alumnifeeds/comment', {
          content: content,
          replyable_id: feedId,
          replyable_type: replyable_type
        })

        if (response.status != 200) {
            alert(response.data?.message ?? "Something went wrong");
        }

        if (replyable_type == 'feed')
            setCommentSignature(v4());

        if (replyable_type == 'comment')
            setSubCommentSignature(v4());
    }

    const getComments = async (feedId: number, page: number, take: number, replyable_type: 'feed' | 'comment') => {
        const response = await HttpClient.get(`/alumnifeeds/comment/${feedId}`, {
          page: page,
          take: take,
          replyable_type: replyable_type
        })

        if (response.status != 200) {
            throw response.data?.message ?? "Unknow reason";
        }
        const { comments } = response.data as { comments: CommentResponseType }

        return comments;
    }
       const deleteFeed = async (feedId: number) => {
         const response = await HttpClient.del('/social-feed/feed/' + feedId)

         if (response.status != 200) {
           alert(response.data?.message ?? 'Something went wrong')
         }
         setCommentSignature(v4())
       }

    const values = useMemo(
      () => ({
        feeds,
        totalFeed,
        onLoading,
        updateStatus,
        EditupdateStatus,
        fetchFeeds,
        hasNextPage,
        page,
        setPage,
        likeUnlikeFeed,
        postComment,
        getComments,
        commentSignature,
        subCommentSignature,
        deleteFeed
      }),
      [
        feeds,
        totalFeed,
        updateStatus,
        EditupdateStatus,
        fetchFeeds,
        onLoading,
        hasNextPage,
        page,
        setPage,
        likeUnlikeFeed,
        postComment,
        getComments,
        commentSignature,
        subCommentSignature,
        deleteFeed
      ]
    )

    return <SocialAlumniContext.Provider value={values}>{props.children}</SocialAlumniContext.Provider>
}

export {
    SocialAlumniProvider,
}

export default SocialAlumniContext;