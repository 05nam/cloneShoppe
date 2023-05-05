import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authApi from 'src/apis/auth.api'
import { ErrorResponse } from 'src/types/untils.type'
import { isAxiosUnprocessableEntyError } from 'src/utils/checkError'
import Input from 'src/components/input'
import { useContext } from 'react'
import { AppContext } from 'src/components/contexts/app.Context'
import Button from 'src/components/Button'

type FormData = Pick<Schema, 'email' | 'password'>
const schemaLogin = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/profile')
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntyError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'sever'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'sever'
            })
          }
        }
      }
    })
  })

  const bg = '/public/Img/LoginRegister/Bg-login-register.png'
  return (
    <div className='bg-orange'>
      <div
        className='container flex items-center'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          margin: '0 auto',
          minHeight: '600px',
          width: '1040px'
        }}
      >
        <div className='  ml-auto   grid max-w-7xl grid-cols-1 lg:grid-cols-5 '>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form
              className=' bg-white p-10 shadow-sm'
              onSubmit={(data) => {
                onSubmit(data)
              }}
              noValidate
            >
              <div className='text-2xl'>Đăng Nhập</div>

              <Input
                name='email'
                className='mt-8'
                placeholder='Email'
                register={register}
                type='email'
                errorMEssage={errors.email?.message}
              />
              <Input
                name='password'
                className='mt-2'
                placeholder='password'
                register={register}
                type='password'
                errorMEssage={errors.password?.message}
              />

              <div className='mt-3'>
                <Button
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  type='submit'
                  className='w-full bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 '>
                <div className='flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link className='ml-2 text-red-400' to='/register'>
                    Đăng Ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
