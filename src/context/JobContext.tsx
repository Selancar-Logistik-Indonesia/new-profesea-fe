import { Box, Typography } from '@mui/material'
import { ReactNode, createContext, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AppConfig } from 'src/configs/api'
import Job from 'src/contract/models/job'
import JobContextType from 'src/contract/types/job_context_type'
import { HttpClient } from 'src/services'
import Icon from 'src/@core/components/icon'

type Props = { children: ReactNode }
const defaultValue: JobContextType = {
  page: 1,
  totalJob: 0,
  setPage: () => {},
  listJobs: [],
  onLoading: false,
  hasNextPage: false,
  fetchJobs: () => Promise.resolve(),
  handleJobSave: () => Promise.resolve(),
  handleDeleteJobSave: () => Promise.resolve()
}

const JobContext = createContext(defaultValue)

const JobProvider = (props: Props) => {
  const [page, setPage] = useState(1)
  const [listJobs, setJobs] = useState<Job[]>([])
  const [onLoading, setOnLoading] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [totalJob, setTotalJob] = useState(0)

  const fetchJobs = async (payload: {
    take: number
    search?: any
    roletype_id?: any
    category_id?: any
    rolelevel_id?: any
    edugrade_id?: any
    city_id?: any
    country_id?: any
    vesseltype_id?: any
    sailing_region?: any
    onboard_at?: any
    employment_type?: any
    username?: any
    work_arrangement?: any
    sortBy?: any
  }) => {
    // only trigger in page 1

    if (page == 1) {
      setOnLoading(true)
      setJobs([])
    }

    try {
      setOnLoading(true)
      const response = await HttpClient.get(AppConfig.baseUrl + '/job', {
        page: page,
        ...payload
      })

      if (response.status == 200) {
        const { jobs } = response.data as { jobs: { data: Job[]; next_page_url?: string; total: number } }

        if (jobs.data.length && jobs.data.length > 0) {
          // setJobs(old => (page === 1 ? jobs.data : [...old, ...jobs.data]))
          setJobs(jobs.data)
          // setJobs(old => {
          //   const existingJobId = new Set(old.map(job => job.id))
          //   const newJobs = jobs.data.filter(job => !existingJobId.has(job.id))
          //   const newItems = [...old, ...newJobs]

          //   return newItems
          // })
          setTotalJob(jobs.total)

          // if (jobs.total > 9) {
          //   setPage(page => page + 1)
          // }
        }
        setHasNextPage(jobs.next_page_url != null)
      }
    } catch (error) {
      console.error(error)
    }

    setOnLoading(false)
  }

  const handleJobSave = async (jobId: any) => {
    try {
      const response = await HttpClient.post('/job/save', {
        job_id: jobId
      })

      if (response?.status === 201) {
        setJobs(prevState => prevState.map(p => (p.id === jobId ? { ...p, job_save: response?.data?.data } : p)))
        toast(
          t => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Icon
                  style={{ cursor: 'pointer' }}
                  icon={'charm:cross'}
                  fontSize={'16px'}
                  onClick={() => toast.dismiss(t.id)}
                />
              </Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>
                You’ve saved this job{' '}
                <span
                  onClick={() => window.location.replace('/candidate/find-job/?tabs=3')}
                  style={{ fontSize: '16px', fontWeight: 700, color: '#0B58A6', cursor: 'pointer' }}
                >
                  See saved jobs
                </span>
              </Typography>
            </Box>
          ),
          {
            position: 'bottom-left'
          }
        )
      }
    } catch (error) {
      console.log(error)
      toast.error('Error save job')
    }
  }

  const handleDeleteJobSave = async (jobId: any, jobSaveId: any) => {
    try {
      const response = await HttpClient.del(`/job/save/${jobSaveId}`)

      if (response?.status === 200) {
        setJobs(prevState => prevState.map(p => (p.id === jobId ? { ...p, job_save: null } : p)))
        toast.success('Success unsaved job')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error unsaved job')
    }
  }

  const values = useMemo(
    () => ({
      page,
      setPage,
      listJobs,
      totalJob,
      onLoading,
      hasNextPage,
      fetchJobs,
      handleJobSave,
      handleDeleteJobSave
    }),
    [page, setPage, listJobs, totalJob, onLoading, hasNextPage, fetchJobs]
  )

  return <JobContext.Provider value={values}>{props.children}</JobContext.Provider>
}

export { JobProvider }

export default JobContext
