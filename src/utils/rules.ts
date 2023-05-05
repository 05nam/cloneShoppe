import { yupResolver } from '@hookform/resolvers/yup'
import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email không được để trống'
//     },
//     pattern: {
//       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
//       message: 'Email không đúng định dạng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 5 - 160 kí tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài từ 5 - 160 kí tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Nhập Password là bắt buộc'
//     },

//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: ' Nhập lại  Password là bắt buộc'
//     },

//     maxLength: {
//       value: 160,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài từ 6 - 160 kí tự'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => {
//             if (value === getValues('password')) {
//               return true
//             }
//             return ' Nhập lại password không khớp'
//           }
//         : undefined
//   }
// })

export const schema = yup.object({
  email: yup
    .string()
    .required('Email không được để trống')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 kí tự')
    .max(160, 'Độ dài từ 5 - 160 kí tự'),
  password: yup
    .string()
    .required('Nhập Password là bắt buộc')
    .max(160, 'Độ dài từ 6 - 160 kí tự')
    .min(6, 'Độ dài từ 6 - 160 kí tự'),
  confirm_password: yup
    .string()
    .required(' Nhập lại  Password là bắt buộc')
    .max(160, 'Độ dài từ 6 - 160 kí tự')
    .min(6, 'Độ dài từ 6 - 160 kí tự')
    .oneOf([yup.ref('password')], ' Nhập lại password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: ' Gia khong phu hop',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: ' Giá Không Phù Hợp',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  })
})

export type Schema = yup.InferType<typeof schema>
