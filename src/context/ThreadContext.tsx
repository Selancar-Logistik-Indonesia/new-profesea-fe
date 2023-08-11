import { ReactNode, createContext, useMemo, useState } from "react";
import IThread from "src/contract/models/thread";
import ThreadContextType from "src/contract/types/thread_context_type";

type Props = { children: ReactNode };
const defaultValue: ThreadContextType = {
    page: 1,
    // totalThread: 0,
    setPage: () => { },
    // threads: [],
    // onLoading: false,
    // hasNextPage: false,
}

const ThreadContext = createContext(defaultValue);
const ThreadProvider = (props: Props) => {
    const [page, setPage] = useState(1);
    // const [threads, setThreads] = useState<IThread[]>([]);
    // const [onLoading, setOnLoading] = useState(false);
    // const [hasNextPage, setHasNextPage] = useState(true);
    // const [totalThread, setTotalThread] = useState(0);

    const values = useMemo(() => ({
        page,
        setPage,
        // threads,
        // totalThread,
        // onLoading,
        // hasNextPage,
    }), [
        page,
        setPage,
        // threads,
        // totalThread,
        // onLoading,
        // hasNextPage,
    ]);

    return <ThreadContext.Provider value={values} children={props.children} />;
}

export {
    ThreadProvider,
}

export default ThreadContext;