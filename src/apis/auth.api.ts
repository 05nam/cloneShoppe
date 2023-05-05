import { AuthReponse } from 'src/types/auth.type'
import http from 'src/utils/http_Axios'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthReponse>('/register', body)
  },

  login(body: { email: string; password: string }) {
    return http.post<AuthReponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}

// export const registerAccount = (body: { email: string; password: string }) => http.post<AuthReponse>('/register', body)
// export const login = (body: { email: string; password: string }) => http.post<AuthReponse>('/login', body)

// export const logout = () => {
//   return http.post('/logout')
// }

export default authApi
