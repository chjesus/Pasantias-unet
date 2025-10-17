import { Navigate } from 'react-router'
import Loadable from '@/utils/Loadable'
import { lazy } from 'react'

import DashboardLayout from '@/components/layout/Dashboard'
const HomePage = Loadable(lazy(() => import('@pages/ServicesPage')))
const SearchDetailPage = Loadable(lazy(() => import('@pages/SearchDetailPage')))
const ServiceDetailPage = Loadable(
  lazy(() => import('@pages/ServiceDetailPage'))
)
const CartPage = Loadable(lazy(() => import('@pages/CartPage')))

export const routesDashboard = {
  home: '/app/home',
  search: '/app/search',
  searchText: (text: string) => `/app/search/${encodeURIComponent(text)}`,
  serviceDetail: (id: string) => `/app/services/${id}`,
  cart: '/app/cart',
}

const dashboardRoutes = {
  path: '/app',
  element: <DashboardLayout />,
  children: [
    { index: true, element: <Navigate to="home" replace /> },
    { path: 'home', element: <HomePage /> },
    { path: 'search', element: <SearchDetailPage /> },
    { path: 'search/:text', element: <SearchDetailPage /> },
    { path: 'services/:id', element: <ServiceDetailPage /> },
    { path: 'cart', element: <CartPage /> },
  ],
}



export default dashboardRoutes
