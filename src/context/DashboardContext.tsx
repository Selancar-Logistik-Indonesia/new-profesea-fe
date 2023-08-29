import { ReactNode, createContext, useMemo, useState } from "react";
import { AppConfig } from "src/configs/api";
import DashboardContextType from "src/contract/types/dashboard_context_type";
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: DashboardContextType = {    
    onLoading: false,
    dataOffship:[],
    dataOnship:[],
    dataTotalUser:[],
    statOfCandidateOff: () => Promise.resolve(),
    statOfCandidateOn: () => Promise.resolve(),
    statOfUserByRole: () => Promise.resolve()
}

const DashboardContext = createContext(defaultValue);

const DashboardProvider = (props: Props) => {
    const [dataOffship, setDataOffship] = useState<any[]>([]);
    const [dataOnship, setDataOnship] = useState<any[]>([]);
    const [dataTotalUser, setDataTotalUser] = useState<any[]>([]);
    const [onLoading, setOnLoading] = useState(false);

    console.log(dataOnship);
    const statOfCandidateOff = async () => {
        // only trigger in page 1

        setOnLoading(true)

        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/dashboard/candidate/offship')

            if (response.status == 200) {
                const result = response.data as { data : any[]} ;

                if (result.data.length && result.data.length > 0) {
                    setDataOffship(old => {
                        const newItems = old;
                        result.data.forEach(e => newItems.push(e));

                        return newItems;
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        
        setOnLoading(false);
    }

    const statOfCandidateOn = async () => {
        // only trigger in page 1

        setOnLoading(true)

        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/dashboard/candidate/onship')

            if (response.status == 200) {
                const result = response.data as { data : any[]} ;

                if (result.data.length && result.data.length > 0) {
                    setDataOnship(old => {
                        const newItems = old;
                        result.data.forEach(e => newItems.push(e));

                        return newItems;
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        
        setOnLoading(false);
    }

    const statOfUserByRole = async () => {
        // only trigger in page 1

        setOnLoading(true)

        try {
            const response = await HttpClient.get(AppConfig.baseUrl + '/dashboard/users/total')

            if (response.status == 200) {
                const result = response.data as { data : any[]} ;

                if (result.data.length && result.data.length > 0) {
                    setDataTotalUser(old => {
                        const newItems = old;
                        result.data.forEach(e => newItems.push(e));

                        return newItems;
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        
        setOnLoading(false);
    }

    


    const values = useMemo(() => ({
        onLoading,
        dataOffship,
        dataOnship,
        dataTotalUser,
        statOfCandidateOff,
        statOfCandidateOn,
        statOfUserByRole
    }), [
        onLoading,
        dataOffship,
        dataOnship,
        dataTotalUser,
        statOfCandidateOff,
        statOfCandidateOn,
        statOfUserByRole
    ]);

    return <DashboardContext.Provider value={values}>{props.children}</DashboardContext.Provider>;
}

export {
    DashboardProvider,
}

export default DashboardContext;