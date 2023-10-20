import { ReactNode, createContext, useMemo, useState } from "react";
import { AppConfig } from "src/configs/api";
import Job from "src/contract/models/job";
import JobContextType from "src/contract/types/job_context_type";
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: JobContextType = {    
    page: 1,
    totalJob: 0,
    setPage: () => { },
    listJobs: [],
    onLoading: false,
    hasNextPage: false,
    fetchJobs: () => Promise.resolve()

}

const JobContext = createContext(defaultValue);

const JobProvider = (props: Props) => {
    const [page, setPage] = useState(1);
    const [listJobs, setJobs] = useState<Job[]>([]);
    const [onLoading, setOnLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalJob, setTotalJob] = useState(0);

    const fetchJobs = async (payload: {take: number, search?:any, roletype_id?: any, category_id?: any, rolelevel_id?: any, edugrade_id?: any, city_id?: any, country_id?: any, vesseltype_id?: any, sailing_region?: any, onboard_at?: any }) => {
        // only trigger in page 1

        if (page == 1) { 
            setOnLoading(true) 
            setJobs([])
        }
        
        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/job', {
                page: page,
                ...payload
            })

            if (response.status == 200) {
                const { jobs } = response.data as { jobs: { data: Job[], next_page_url?: string, total: number } };
                
                if (jobs.data.length && jobs.data.length > 0) {
                    setJobs(old => {
                        const newItems = old;
                        jobs.data.forEach(e => newItems.push(e));
                        setTotalJob(newItems.length); 

                        return newItems;
                    });

                    if(jobs.total > 9){
                        setPage(page => page + 1);
                    }
                }
                setHasNextPage(jobs.next_page_url != null);
            }
        } catch (error) {
            console.error(error);
        }
        
        setOnLoading(false);
    }


    const values = useMemo(() => ({
        page,
        setPage,
        listJobs,
        totalJob,
        onLoading,
        hasNextPage,
        fetchJobs,
    }), [
        page,
        setPage,
        listJobs,
        totalJob,
        onLoading,
        hasNextPage,
        fetchJobs,
    ]);

    return <JobContext.Provider value={values}>{props.children}</JobContext.Provider>;
}

export {
    JobProvider,
}

export default JobContext;