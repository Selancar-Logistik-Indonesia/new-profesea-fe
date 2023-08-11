import { ReactNode, createContext, useMemo, useState } from "react";
import { AppConfig } from "src/configs/api";
import IThread from "src/contract/models/thread";
import ThreadContextType from "src/contract/types/thread_context_type";
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: ThreadContextType = {
    page: 1,
    totalThread: 0,
    setPage: () => { },
    threads: [],
    onLoading: false,
    hasNextPage: false,
    fetchThreads: () => Promise.resolve(),
    
}

const ThreadContext = createContext(defaultValue);
const ThreadProvider = (props: Props) => {
    const [page, setPage] = useState(1);
    const [threads, setThreads] = useState<IThread[]>([]);
    const [onLoading, setOnLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalThread, setTotalThread] = useState(0);

    const fetchThreads = async (payload : { take: number }) => {
        // only trigger in page 1

        if (page == 1) setOnLoading(true);

        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/thread', {
                page: page,
                ...payload
            })

            if (response.status == 200) {
                const { threads } = response.data as { threads: { data: IThread[], next_page_url?: string, total: number } };
                
                if (threads.data.length && threads.data.length > 0) {
                    setThreads(old => {
                        const newItems = old;
                        threads.data.forEach(e => newItems.push(e));
                        setTotalThread(newItems.length); 

                        return newItems;
                    });
                    setPage(page => page + 1);
                }
                setHasNextPage(threads.next_page_url != null);
            }
        } catch (error) {
            console.error(error);
        }

        setOnLoading(false);
    }

    const values = useMemo(() => ({
        page,
        setPage,
        threads,
        totalThread,
        onLoading,
        hasNextPage,
        fetchThreads,
    }), [
        page,
        setPage,
        threads,
        totalThread,
        onLoading,
        hasNextPage,
        fetchThreads,
    ]);

    return <ThreadContext.Provider value={values}>{props.children}</ThreadContext.Provider>;
}

export {
    ThreadProvider,
}

export default ThreadContext;