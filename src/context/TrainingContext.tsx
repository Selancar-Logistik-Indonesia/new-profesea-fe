import { ReactNode, createContext, useMemo, useState } from "react";
import { AppConfig } from "src/configs/api";
import Training from "src/contract/models/training";
import TrainingContextType from "src/contract/types/training_context_type";
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: TrainingContextType = {    
    page: 1,
    totalTraining: 0,
    setPage: () => { },
    listTrainings: [],
    onLoading: false,
    hasNextPage: false,
    fetchTrainings: () => Promise.resolve()
}

const TrainingContext = createContext(defaultValue);

const TrainingProvider = (props: Props) => {
    const [page, setPage] = useState(1);
    const [listTrainings, setTrainings] = useState<Training[]>([]);
    const [onLoading, setOnLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalTraining, setTotalTraining] = useState(0);

    const fetchTrainings = async (payload : { take: number,  ongoing?:any, instant?:any, category_id?:any, search?:any }) => {
        // only trigger in page 1

        if (page == 1) setOnLoading(true);

        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/training', {
                page: page,
                ...payload
            })

            if (response.status == 200) {
                const { trainings } = response.data as { trainings: { data: Training[], next_page_url?: string, total: number } };
                

                if (trainings.data.length && trainings.data.length > 0) {
                    setTrainings(old => {
                        const newItems = old;
                        trainings.data.forEach(e => newItems.push(e));
                        setTotalTraining(newItems.length); 

                        return newItems;
                    });
                    // if(payload.take > 5){
                        setPage(page => page + 1);
                    // }
                }
                setHasNextPage(trainings.next_page_url != null);
            }
        } catch (error) {
            console.error(error);
        }
        
        setOnLoading(false);
    }

    


    const values = useMemo(() => ({
        page,
        setPage,
        listTrainings,
        totalTraining,
        onLoading,
        hasNextPage,
        fetchTrainings,
    }), [
        page,
        setPage,
        listTrainings,
        totalTraining,
        onLoading,
        hasNextPage,
        fetchTrainings,
    ]);

    return <TrainingContext.Provider value={values}>{props.children}</TrainingContext.Provider>;
}

export {
    TrainingProvider,
}

export default TrainingContext;