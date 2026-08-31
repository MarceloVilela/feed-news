export interface Content {
  id: string
  link: string
  title: string
  thumb: string
  created_at: string
  posted_at?: string
}

export interface NewsResponse {
  data: Content[]
  total: number
}
