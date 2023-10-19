
import Member from "./member";
 
interface Group {
  find(arg0: (item: any) => boolean): unknown; 
  id: number
  user_id: number
  title: string
  schedule: string
  description: string
  groupbanner: any
  member:Member
  statusmember:any
}

export default Group;