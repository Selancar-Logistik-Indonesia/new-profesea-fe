import { ReactNode, createContext, useMemo, useState } from "react";
import { AppConfig } from "src/configs/api";
import { IUser } from "src/contract/models/user";
 import AlumniContextType from "src/contract/types/alumni_context_type";
import { HttpClient } from "src/services";

type Props = { children: ReactNode };
const defaultValue: AlumniContextType = {
  page: 1,
  totalAlumni: 0,
  setPage: () => {},
  listAlumni: [],
  onLoading: false,
  hasNextPage: false,
  fetchAlumnis: () => Promise.resolve()
}

const AlumniContext = createContext(defaultValue);

const AlumniProvider = (props: Props) => {
  const [page, setPage] = useState(1)
  const [listAlumni, setAlumni] = useState<IUser[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [totalAlumni, setTotalAlumni] = useState(0)

  const fetchAlumnis = async (payload: { take: number; search?: any }) => {
    // only trigger in page 1

    if (page == 1) {
      setOnLoading(true)
      setAlumni([])
    }
    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/alumni', {
        page: page,
        ...payload
      })

      if (response.status == 200) {
        const { alumnis } = response.data as { alumnis: { data: IUser[]; next_page_url?: string; total: number } }

        console.log(alumnis.total)
        if (alumnis.data.length && alumnis.data.length > 0) {
          setAlumni(old => {
            const newItems = old
            alumnis.data.forEach(e => newItems.push(e))
            setTotalAlumni(newItems.length)

            return newItems
          })

          if (alumnis.total > 9) {
            setPage(page => page + 1)
          }
        } else {
          setTotalAlumni(0)
          setAlumni([])
        }
        setHasNextPage(alumnis.next_page_url != null)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

   
  const values = useMemo(
    () => ({
      page,
      totalAlumni,
      setPage,
      listAlumni,
      onLoading,
      hasNextPage,
      fetchAlumnis
    }),
    [page, totalAlumni, setPage, listAlumni, onLoading, hasNextPage, fetchAlumnis]
  )
  
return <AlumniContext.Provider value={values}>{props.children}</AlumniContext.Provider>
  

}

export {
    AlumniProvider,
}

export default AlumniContext;