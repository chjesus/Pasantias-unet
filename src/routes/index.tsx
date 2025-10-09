import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import Loadable from '@/utils/Loadable'
import dashboardRoutes from '@/routes/dashboardRoutes'

const HomePage = Loadable(lazy(() => import('@pages/Home')))
const LoginPage = Loadable(lazy(() => import('@pages/Login')))
const RegisterPage = Loadable(lazy(() => import('@pages/Register')))
const ForgotPasswordPage = Loadable(lazy(() => import('@pages/ForgotPassword')))

const router = createBrowserRouter([
  { index: true, path: '/', element: <HomePage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '*', element: <div>ERROR 404</div> },
  dashboardRoutes,
])

export default router
