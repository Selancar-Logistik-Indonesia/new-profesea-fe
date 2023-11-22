interface FetchFeedPayload {
  take: number
  search?: string
  username?: string
  user_id?: any
  group_id?: string
  alumni_id?: string
  mPage?: number
}

export default FetchFeedPayload;