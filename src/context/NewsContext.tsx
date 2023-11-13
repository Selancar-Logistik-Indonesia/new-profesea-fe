import { ReactNode, createContext, useMemo, useState  } from "react";
import { AppConfig } from "src/configs/api";
import INews from "src/contract/models/news"; 
import NewsContextType from "src/contract/types/news_context_type"; 
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: NewsContextType = {
  page: 1,
  totalNews: 0,
  totalComments: 0,
  setPage: () => {},
  newss: [],
  comments: [],
  onLoading: false,
  hasNextPage: false,
  fetchNews: () => Promise.resolve(),
  fetchComments: () => Promise.resolve(),
  postComments: () => Promise.resolve()
}

const NewsContext = createContext(defaultValue);
const NewsProvider = (props: Props) => {
    // debugger
    const [page, setPage] = useState(1);
    const [newss, setNews] = useState<INews[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [totalComments, setTotalComments] = useState(0);
    const [onLoading, setOnLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalNews, setTotalNews] = useState(0);

    const fetchNews = async (payload : { take: number, search?:any }) => {
        // only trigger in page 1

        if (page == 1) setOnLoading(true);

        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/news', {
                page: page,
                ...payload
            })

            if (response.status == 200) {
                const { news } = response.data as { news: { data: INews[], next_page_url?: string, total: number } };
                
                if (news.data.length && news.data.length > 0) {
                    setNews(old => {
                        const newItems = old;
                        news.data.forEach(e => newItems.push(e));
                        setTotalNews(newItems.length); 

                        return newItems;
                    });
                    if(payload.take > 5){
                        setPage(page => page + 1);
                    }
                }
                setHasNextPage(news.next_page_url != null);
            }
        } catch (error) {
            console.error(error);
        }

        setOnLoading(false);
    }

    const fetchComments = async (payload : { take: number, replyable_id:any, replyable_type?:'news' }) => {
        // only trigger in page 1

        // if (page == 1) setOnLoading(true);
        setTotalComments(0)
        console.log(payload)
        // try {
            // const response = await HttpClient.get(AppConfig.baseUrl + '/news/replies', {
            //     page: page,
            //     ...payload
            // })

            // if (response.status == 200) {
            //     const { replies } = response.data as { replies: { data: any[], next_page_url?: string, total: number } };
                
            //     if (replies.data.length && replies.data.length > 0) {
            //         setComments(old => {
            //             const newItems = old;
            //             replies.data.forEach(e => newItems.push(e));
            //             setTotalComments(newItems.length); 

            //             return newItems;
            //         });
            //         setPage(page => page + 1);
            //     }
            //     setHasNextPage(replies.next_page_url != null);
            // }
        // } catch (error) {
        //     console.error(error);
        // }

        setOnLoading(false);
    }

    const postComments = async (json:any) => {
        const response = await HttpClient.post("/news/reply", json);

        if (response.status != 200) {
            alert(response.data?.message ?? "Something went wrong");
        }
        const { reply } = response.data as { reply: any[] };
        setComments(items => [
            reply,
            ...items
        ]);

    }

    const values = useMemo(() => ({
        page,
        setPage,
        newss,
        totalNews,
        comments,
        totalComments,
        onLoading,
        hasNextPage,
        fetchNews,
        fetchComments,
        postComments,
    }), [
        page,
        setPage,
        newss,
        totalNews,
        onLoading,
        hasNextPage,
        fetchNews,
        fetchComments,
        postComments,
    ]);

    return <NewsContext.Provider value={values}>{props.children}</NewsContext.Provider>
}

export {
    NewsProvider,
}

export default NewsContext