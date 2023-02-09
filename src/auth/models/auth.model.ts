export type tokenData = {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
}

export interface Token {
  token: string
  data: tokenData
}
