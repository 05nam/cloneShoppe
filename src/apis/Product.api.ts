import { Product, ProductList, ProductListConfig } from 'src/types/producr.type'
import { SuccessReponse } from 'src/types/untils.type'
import http from 'src/utils/http_Axios'

const URL = '/products'
const productApi = {
  getproduct(params: ProductListConfig) {
    return http.get<SuccessReponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessReponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
