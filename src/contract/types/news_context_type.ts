import INews from "../models/news"; 

type NewsContextType = {
    page: number,
    totalNews: number,
    totalComments: number,
    setPage: (page: number) => void,
    onLoading: boolean,
    newss: INews[],
    comments: any[],
    hasNextPage: boolean,
    fetchNews: (payload : { take: number, search?:any }) => Promise<void>,
    fetchComments: (payload : { take: number, replyable_id :any, replyable_type?:'news' }) => Promise<void>,
    postComments: (json:any) => Promise<void>,
}

export default NewsContextType