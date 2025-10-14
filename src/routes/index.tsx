import { createBrowserRouter } from 'react-router'

import dashboardRoutes from '@/routes/dashboardRoutes'
import authRoutes from '@/routes/authRoutes'



const router = createBrowserRouter([
  dashboardRoutes,
  authRoutes,
  { path: '*', element: <div>ERROR 404</div> },
])

export default router
