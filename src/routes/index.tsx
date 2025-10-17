import { createBrowserRouter, Navigate } from 'react-router'

import dashboardRoutes from '@/routes/dashboardRoutes'
import authRoutes from '@/routes/authRoutes'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/auth/login" replace /> },
  { path: '*', element: <div>ERROR 404</div> },
  dashboardRoutes,
  authRoutes,
])

export default router
