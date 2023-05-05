import { type } from 'os'

export interface ErrorResponse<Data> {
  massage: string
  data?: Data
}

export interface SuccessReponse<Data> {
  massage: string
  data: Data
}

export type NoUndefinedField<T> = {
  [p in keyof T]-?: NoUndefinedField<NonNullable<T[p]>>
}
