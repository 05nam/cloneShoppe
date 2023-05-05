import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import categoryApi from 'src/apis/Category.api'
import productApi from 'src/apis/Product.api'
import Pagination from 'src/components/Paginate'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/producr.type'
import AsideFilter from './AsideFilter'
import Product from './Product/Product'
import ShortProductList from './ShortProductList'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getproduct(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  // console.log(data?.data.data.products)

  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <ShortProductList queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
              <div className=' mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((products) => (
                  <div className=' col-span-1' key={products._id}>
                    <Product product={products} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
