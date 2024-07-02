import Training from "../models/training";

type TrainingContextType = {
    page: number,
    totalTraining: number,
    setPage: (page: number) => void,
    onLoading: boolean,
    listTrainings: Training[],
    hasNextPage: boolean,
    fetchTrainings: (payload: { take: number, ongoing?: any, instant?: any, category_id?: any, search?: any, username?: any }) => Promise<void>,
    joinTraining: (id: any) => Promise<void>,
    updateScore: (id: any, payload: { user_id: number, result_id: number, score?: number }) => Promise<void>
}

export default TrainingContextType;
