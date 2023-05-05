import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/producr.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/checkError'

interface props {
  product: ProductType
}

export default function Product({ product }: props) {
  // console.log(product.sold)
  return (
    <Link to='/'>
      <div className=' bg:white overflow-hidden  rounded-sm shadow transition-transform duration-100 hover:translate-y-[-0.625rem]  hover:shadow-md '>
        <div className=' relative w-full pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            className=' absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className=' overflow-hidden bg-white p-2'>
          <div className=' trun min-h-[2.5rem] text-sm line-clamp-2'>{product.name}</div>
          <div className=' mt-3 flex items-center justify-end'>
            <div className=' max-w-[50%] truncate text-gray-500 line-through'>
              ₫ {formatCurrency(product.price_before_discount)}
            </div>
            <div className=' ml-1 flex text-orange '>
              <span className=' text-sm'>₫</span>
              <span> {formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className=' mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className=' ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className=' ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
