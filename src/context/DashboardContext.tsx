import { ReactNode, createContext, useMemo, useState } from 'react'
import { AppConfig } from 'src/configs/api'
import DashboardContextType from 'src/contract/types/dashboard_context_type'
import { HttpClient } from 'src/services'

type Props = { children: ReactNode }
const defaultValue: DashboardContextType = {
  onLoading: false,
  dataOffship: [],
  dataOnship: [],
  dataTotalUser: [],
  dataTopCompany: [],
  dataTopCommunity: [],
  dataTopTraining: [],
  dataChartSubs: [],
  dataLastJob: [],
  dataTopCategory: [],
  dataAds: [],
  totalUsers: 0,
  totalSeafarer: 0,
  totalSeafarerVerified: 0,
  totalProfessional: 0,
  totalProfessionalVerified: 0,
  totalCompany: 0,
  totalCompanyVerified: 0,
  totalTrainer: 0,
  totalTrainerVerified: 0,
  totalCPGreen: 0,
  totalCPOrange: 0,
  totalCPRed: 0,
  totalCandidate: 0,
  progressTotalUsers: 0,
  progressTotalSeafarer: 0,
  progressTotalProfessional: 0,
  progressTotalCompany: 0,
  progressTotalTrainer: 0,
  statOfCandidateOff: () => Promise.resolve(),
  statOfCandidateOn: () => Promise.resolve(),
  statOfUserByRole: () => Promise.resolve(),
  statTopList: () => Promise.resolve(),
  chartSubscriptions: () => Promise.resolve(),
  userOverview: () => Promise.resolve(),
  dataLastJobList: () => Promise.resolve(),
  dataTopCategoryList: () => Promise.resolve(),
  dataAdsList: () => Promise.resolve(),
  userProgressiveOverview: () => Promise.resolve(),
  userCompletionPercentage: () => Promise.resolve()
}

const DashboardContext = createContext(defaultValue)

const DashboardProvider = (props: Props) => {
  const [dataOffship, setDataOffship] = useState<any[]>([])
  const [dataOnship, setDataOnship] = useState<any[]>([])
  const [dataTotalUser, setDataTotalUser] = useState<any[]>([])
  const [dataTopCompany, setDataTopCompany] = useState<any[]>([])
  const [dataTopCategory, setDataTopCategory] = useState<any[]>([])
  const [dataTopCommunity, setDataTopCommunity] = useState<any[]>([])
  const [dataTopTraining, setDataTopTraining] = useState<any[]>([])

  const [progressTotalUsers, setProgressTotalUsers] = useState(0)
  const [progressTotalSeafarer, setProgressTotalSeafarer] = useState(0)
  const [progressTotalProfessional, setProgressTotalProfessional] = useState(0)
  const [progressTotalCompany, setProgressTotalCompany] = useState(0)
  const [progressTotalTrainer, setProgressTotalTrainer] = useState(0)

  const [dataLastJob, setDataLastJob] = useState<any[]>([])
  const [dataAds, setDataAds] = useState<any[]>([])
  const [dataChartSubs, setDataChartSubs] = useState<any>()
  const [onLoading, setOnLoading] = useState(false)

  const [totalCPGreen, setTotalCPGreen] = useState(0)
  const [totalCPOrange, setTotalCPOrange] = useState(0)
  const [totalCPRed, setTotalCPRed] = useState(0)
  const [totalCandidate, setTotalCandidate] = useState(0)

  const [totalUsers, setTotalUsers] = useState(0)
  const [totalSeafarer, setTotalSeafarer] = useState(0)
  const [totalSeafarerVerified, setTotalSeafarerVerified] = useState(0)
  const [totalProfessional, setTotalProfessional] = useState(0)
  const [totalProfessionalVerified, setTotalProfessionalVerified] = useState(0)
  const [totalCompany, setTotalCompany] = useState(0)
  const [totalCompanyVerified, setTotalCompanyVerified] = useState(0)
  const [totalTrainer, setTotalTrainer] = useState(0)
  const [totalTrainerVerified, setTotalTrainerVerified] = useState(0)

  const statOfCandidateOff = async () => {
    // only trigger in page 1

    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/dashboard/candidate/offship')

      if (response.status == 200) {
        const result = response.data as { data: any[] }

        if (result.data.length && result.data.length > 0) {
          setDataOffship(old => {
            const newItems = old
            result.data.forEach(e => newItems.push(e))

            return newItems
          })
        }
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const statOfCandidateOn = async () => {
    // only trigger in page 1

    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/dashboard/candidate/onship')

      if (response.status == 200) {
        const result = response.data as { data: any[] }

        if (result.data.length && result.data.length > 0) {
          setDataOnship(old => {
            const newItems = old
            result.data.forEach(e => newItems.push(e))

            return newItems
          })
        }
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const statOfUserByRole = async () => {
    // only trigger in page 1

    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + '/dashboard/users/total')

      if (response.status == 200) {
        const result = response.data as { data: any[] }

        if (result.data.length && result.data.length > 0) {
          setDataTotalUser(old => {
            const newItems = old
            result.data.forEach(e => newItems.push(e))

            return newItems
          })
        }
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const statTopList = async (payload: { contribType: string; segment?: any }) => {
    // only trigger in page 1
    setDataTopCompany([])
    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/top-contributor/${payload.contribType}`, {
        segment: payload.segment
      })

      if (response.status == 200) {
        const result = response.data as { data: any[] }

        if (result.data.length && result.data.length > 0) {
          if (payload.contribType === 'jobpost') {
            setDataTopCompany(old => {
              const newItems = old
              result.data.forEach(e => newItems.push(e))

              return newItems
            })
          } else if (payload.contribType === 'community') {
            setDataTopCommunity(old => {
              const newItems = old
              result.data.forEach(e => newItems.push(e))

              return newItems
            })
          } else if (payload.contribType === 'training-attendance') {
            setDataTopTraining(old => {
              const newItems = old
              result.data.forEach(e => newItems.push(e))

              return newItems
            })
          }
        }
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const chartSubscriptions = async (payload: { data_type: string; range?: any }) => {
    // only trigger in page 1

    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/charts/subscriptions`, { ...payload })

      if (response.status == 200) {
        const result = response.data
        setDataChartSubs(result.data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const userOverview = async (timeframe: string) => {
    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/users/overview?timeframe=${timeframe}`)

      if (response.status == 200) {
        const result = response.data

        setTotalUsers(result.user_total)
        setTotalSeafarer(result.seafarer_total)
        setTotalSeafarerVerified(result.seafarer_verified_total)
        setTotalProfessional(result.professional_total)
        setTotalProfessionalVerified(result.professional_verified_total)
        setTotalCompany(result.company_total)
        setTotalCompanyVerified(result.company_verified_total)
        setTotalTrainer(result.trainer_total)
        setTotalTrainerVerified(result.trainer_verified_total)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const userProgressiveOverview = async (timeframe: string) => {
    setOnLoading(true)

    try {
      const response = await HttpClient.get(
        AppConfig.baseUrl + `/dashboard/users/total-progressive?timeframe=${timeframe}`
      )

      if (response.status == 200) {
        const result = response.data

        setProgressTotalUsers(result.data.progressTotalUsers)
        setProgressTotalSeafarer(result.data.progressTotalSeafarer)
        setProgressTotalProfessional(result.data.progressTotalProfessional)
        setProgressTotalCompany(result.data.progressTotalCompany)
        setProgressTotalTrainer(result.data.progressTotalTrainer)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const dataLastJobList = async () => {
    // only trigger in page 1
    setDataLastJob([])
    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/users/last-job`)

      if (response.status == 200) {
        const result = response.data as { data: any[] }
        setDataLastJob(result.data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const dataTopCategoryList = async () => {
    // only trigger in page 1
    setDataTopCategory([])
    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/categories/top-category`)

      if (response.status == 200) {
        const result = response.data as { data: any[] }
        setDataTopCategory(result.data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const dataAdsList = async () => {
    // only trigger in page 1
    setDataAds([])
    setOnLoading(true)

    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/ads`)

      if (response.status == 200) {
        const result = response.data as { data: any[] }
        setDataAds(result.data)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const userCompletionPercentage = async (candidate: string) => {
    setOnLoading(true)
    try {
      const response = await HttpClient.get(AppConfig.baseUrl + `/dashboard/user-cp/total/?candidate=${candidate}`)

      if (response.status == 200) {
        const result = response.data as any
        setTotalCPGreen(result?.totalCPGreen)
        setTotalCPOrange(result?.totalCPOrange)
        setTotalCPRed(result?.totalCPRed)
        setTotalCandidate(result?.totalCandidate)
      }
    } catch (err) {
      console.log(err)
      setTotalCPGreen(50)
      setTotalCPOrange(30)
      setTotalCPRed(20)
      setTotalCandidate(100)
    }
    setOnLoading(false)
  }

  const values = useMemo(
    () => ({
      onLoading,
      dataOffship,
      dataOnship,
      dataTotalUser,
      dataTopCompany,
      dataTopCommunity,
      dataTopTraining,
      dataChartSubs,
      totalUsers,
      totalSeafarer,
      totalSeafarerVerified,
      totalProfessional,
      totalProfessionalVerified,
      totalCompany,
      totalCompanyVerified,
      totalTrainer,
      totalTrainerVerified,
      totalCPGreen,
      totalCPOrange,
      totalCPRed,
      totalCandidate,
      progressTotalUsers,
      progressTotalSeafarer,
      progressTotalProfessional,
      progressTotalCompany,
      progressTotalTrainer,
      dataLastJob,
      dataTopCategory,
      dataAds,
      statOfCandidateOff,
      statOfCandidateOn,
      statOfUserByRole,
      statTopList,
      chartSubscriptions,
      userOverview,
      dataLastJobList,
      dataTopCategoryList,
      dataAdsList,
      userProgressiveOverview,
      userCompletionPercentage
    }),
    [
      onLoading,
      dataOffship,
      dataOnship,
      dataTotalUser,
      dataTopCompany,
      dataChartSubs,
      totalUsers,
      totalSeafarer,
      totalSeafarerVerified,
      totalProfessional,
      totalProfessionalVerified,
      totalCompany,
      totalCompanyVerified,
      totalTrainer,
      totalTrainerVerified,
      totalCPGreen,
      totalCPOrange,
      totalCPRed,
      totalCandidate,
      progressTotalUsers,
      progressTotalSeafarer,
      progressTotalProfessional,
      progressTotalCompany,
      progressTotalTrainer,
      dataLastJob,
      dataTopCategory,
      dataAds,
      statOfCandidateOff,
      statOfCandidateOn,
      statOfUserByRole,
      statTopList,
      chartSubscriptions,
      userOverview,
      dataLastJobList,
      dataTopCategoryList,
      dataAdsList,
      userProgressiveOverview,
      userCompletionPercentage
    ]
  )

  return <DashboardContext.Provider value={values}>{props.children}</DashboardContext.Provider>
}

export { DashboardProvider }

export default DashboardContext
