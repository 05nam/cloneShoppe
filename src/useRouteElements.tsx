import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoginLayout from './layouts/LoginLayout'

import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import MainLayout from './layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from './components/contexts/app.Context'
import Path from './constants/Path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',

      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: Path.profile,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: Path.login,
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )
        },

        {
          path: Path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
