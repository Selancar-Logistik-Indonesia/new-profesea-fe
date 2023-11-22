
import Member from "./member";
 
interface Alumni {
  find(arg0: (item: any) => boolean): unknown
  id: number
  user_id: number
  title: string
  schedule: string
  description: string
  alumnibanner: any
  member: Member
  statusmember: any
  profilepicture: string
  files: File | null
  count_member: any
  sekolah:any
}

export default Alumni