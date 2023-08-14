import IThread from "../models/thread";

type ThreadContextType = {
    page: number,
    totalThread: number,
    totalComments: number,
    setPage: (page: number) => void,
    onLoading: boolean,
    threads: IThread[],
    comments: any[],
    hasNextPage: boolean,
    fetchThreads: (payload : { take: number, search?:any }) => Promise<void>,
    fetchComments: (payload : { take: number, replyable_id :any, replyable_type?:'thread' }) => Promise<void>,
    postComments: (json:any) => Promise<void>,
}

export default ThreadContextType;