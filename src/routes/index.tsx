import { createBrowserRouter, Navigate } from 'react-router'

import dashboardRoutes from '@/routes/dashboardRoutes'
import authRoutes from '@/routes/authRoutes'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/auth/login" replace /> },
  dashboardRoutes,
  authRoutes,
  { path: '*', element: <Navigate to="/auth/login" replace /> },
])

export default router
