import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import dashboardRoutes from '@/routes/dashboardRoutes'
import authRoutes from '@/routes/authRoutes'
import Loadable from '@/utils/Loadable'

const ServicesPage = Loadable(lazy(() => import('@pages/ServicesPage')))
const SearchDetailPage = Loadable(lazy(() => import('@pages/SearchDetailPage')))
const ServiceDetailPage = Loadable(lazy(() => import('@pages/ServiceDetailPage')))

const router = createBrowserRouter([
  { path: '/services', element: <ServicesPage /> },
  { path: '/search', element: <SearchDetailPage /> },
  { path: '/services/:id', element: <ServiceDetailPage /> },
  { path: '*', element: <div>ERROR 404</div> },
  authRoutes,
  dashboardRoutes,
])

export default router
