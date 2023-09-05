import Training from "../models/training";

type TrainingContextType = {
    page: number,
    totalTraining: number,
    setPage: (page: number) => void,
    onLoading: boolean,
    listTrainings: Training[],
    hasNextPage: boolean,
    fetchTrainings: (payload: {take: number, ongoing?:any, instant?:any, category_id?:any, search?:any}) => Promise<void>,
    joinTraining: (id:any) => Promise<void>
}

export default TrainingContextType;