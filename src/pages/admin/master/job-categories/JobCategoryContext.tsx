import { useState, createContext, ReactNode, useContext } from "react";

export type JobCategoryType = {
    triggerRefresh: () => void;  
    changePaging: (newPage:number) => void;
    pagingMeta: number;
    
  }
  
  const defaultProvider:JobCategoryType = {
    triggerRefresh: () => Promise.resolve(),
    changePaging: () => Promise.resolve(),
    pagingMeta: 1
  }
  
  const JobCategoryContext = createContext(defaultProvider); 
  
  const JobCategoryProvider = ({ children }: { children: ReactNode }) => {
    const [pagingMeta, setPagingMeta] = useState<number>(defaultProvider.pagingMeta)
  
    const triggerRefresh = () => {
        setPagingMeta(2);
    }

    const changePaging = (newPage: number) => {
        setPagingMeta(2);
    }

    const values = {
      triggerRefresh,
      changePaging,
      pagingMeta
    }
  
    console.log(pagingMeta);
    
    return <JobCategoryContext.Provider value={values}>{children}</JobCategoryContext.Provider>
    ;
  };

  const useJobCategoryContext = () => {
    return useContext(JobCategoryContext);
  }
  
  export { JobCategoryContext, JobCategoryProvider }

  export default useJobCategoryContext