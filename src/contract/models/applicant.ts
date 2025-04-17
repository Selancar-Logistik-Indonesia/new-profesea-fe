import Job from './job'
import Reject_Reason from './reject_reason'
import { IUser } from './user'

interface Applicant {
  id: number
  user_id: number
  job_id: number
  status: 'WR' | 'WD' | 'VD' | 'PR' | 'RJ' | 'AP'
  user: IUser
  job: Job
  reject_reasons: Reject_Reason
  is_offer: boolean
  is_saved: boolean
  created_at?: string
  updated_at?: string
  resume_type?: string
}

export default Applicant
