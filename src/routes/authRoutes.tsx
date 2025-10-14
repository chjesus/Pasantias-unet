import { lazy } from 'react'
import { Navigate } from 'react-router'

import AuthLayout from '@/components/layout/Auth'

import Loadable from '@/utils/Loadable'
const LoginPage = Loadable(lazy(() => import('@pages/Login')))
const RegisterPage = Loadable(lazy(() => import('@pages/Register')))
const ForgotPasswordPage = Loadable(lazy(() => import('@pages/ForgotPassword')))

const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: 'login', element: <LoginPage /> },
    { path: 'signup', element: <RegisterPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
  ],
}

export default authRoutes
