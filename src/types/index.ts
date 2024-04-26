export type Task = {
  id: number
  title: string
  created_at: Date
  updated_at: Date
  scheduled_minutes: number
  actual_minutes: number
}
export type CsrfToken = {
  csrf_token: string
}
export type Credential = {
  email: string
  password: string
}

export type Timeline = {
  id: number
  sentence: string
  comment_count: number
  like_count: number
  created_at: Date
  updated_at: Date
  user_id: number
  email: string
}
