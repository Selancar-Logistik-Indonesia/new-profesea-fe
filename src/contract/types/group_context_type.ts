 
type GroupContextType = {
    page: number,
    totalGroup: number,
    setPage: (page: number) => void,
    onLoading: boolean,
    listGroup: any,
    hasNextPage: boolean,
    fetchGroups: (payload: {take: number, search?:any}) => Promise<void>,
}

export default GroupContextType;