interface INews {
  id: number
  forum_id: number
  user_id: number
  title: string
  title_eng: string
  imgnews: any
  snap_content: any
  content: any
  content_eng: any
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
  featured_news?: any
}

export default INews
