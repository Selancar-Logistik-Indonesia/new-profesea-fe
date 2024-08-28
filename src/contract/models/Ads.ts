interface Ads {
  id: number
  attachments: string[]
  expired_at?: string
  created_at?: string
  updated_at?: string
  description?: string
  cta?: string
  ads_location?: string
  ads_placement?: string
  show?: boolean
  ctr?: number
  show_case: string[]
}

export default Ads
