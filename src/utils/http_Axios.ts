import axios, { AxiosError } from 'axios'
import { AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthReponse } from 'src/types/auth.type'
import { clearS, getAccesTokenFromLS, setAccessTokenToLS, setProfileFromLS } from './Auth'
import Path from 'src/constants/Path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccesTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
        // Làm gì đó với dữ liệu response
        const { url } = response.config
        if (url === Path.login || url === Path.register) {
          const data = response.data as AuthReponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileFromLS(data.data.user)
        } else if (url === Path.logout) {
          this.accessToken = ''
          clearS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }

        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http

// http://103.179.172.169:3000'
