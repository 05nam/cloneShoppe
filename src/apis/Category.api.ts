import { Category } from 'src/types/Category.type'
import { SuccessReponse } from 'src/types/untils.type'
import http from 'src/utils/http_Axios'

const URL = 'categories'
const categoryApi = {
  getCategories() {
    return http.get<SuccessReponse<Category[]>>(URL)
  }
}

export default categoryApi
