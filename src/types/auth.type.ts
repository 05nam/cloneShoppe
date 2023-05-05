import { SuccessReponse } from './untils.type'
import { User } from './user.type'

// chứa những interface hoặc những cái type lien quann đến login or registerr
export type AuthReponse = SuccessReponse<{
  access_token: string
  expires: string
  user: User
}>
