import IThread from "../models/thread";

type ThreadContextType = {
    page: number,
    // totalThread: number,
    setPage: (page: number) => void,
    // onLoading: boolean,
    // threads: IThread[],
    // hasNextPage: boolean,
}

export default ThreadContextType;