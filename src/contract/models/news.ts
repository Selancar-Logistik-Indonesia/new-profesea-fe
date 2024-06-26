interface INews {
  id: number
  forum_id: number
  user_id: number
  title: string
  imgnews: any
  snap_content: any
  content: any
  type: any
  posting_at: any
  created_at: string
  updated_at: string
  replies_count: string
  date: string
  time: string
  slug: string
  cost: string
  organizer: string
  website: string
  phone: string
  venue: string
  email: string
  meet?: string
  category?: any
}

export default INews
