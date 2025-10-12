import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import dashboardRoutes from '@/routes/dashboardRoutes'

const HomePage = Loadable(lazy(() => import('@pages/Home')))
const LoginPage = Loadable(lazy(() => import('@pages/Login')))
const RegisterPage = Loadable(lazy(() => import('@pages/Register')))
const ForgotPasswordPage = Loadable(lazy(() => import('@pages/ForgotPassword')))
const ServicesPage = Loadable(lazy(() => import('@pages/ServicesPage')))
const SearchDetailPage = Loadable(lazy(() => import('@pages/SearchDetailPage')))
// const ServiceDetailPage = Loadable(lazy(() => import('@pages/ServiceDetailPage')))

const router = createBrowserRouter([
  { index: true, path: '/', element: <HomePage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/search', element: <SearchDetailPage /> },
  // { path: '/services/:id', element: <ServiceDetailPage /> },
  { path: '*', element: <div>ERROR 404</div> },
  authRoutes,
  dashboardRoutes,
])

export default router
