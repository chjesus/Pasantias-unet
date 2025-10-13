import { createBrowserRouter } from 'react-router'

import dashboardRoutes from '@/routes/dashboardRoutes'
import authRoutes from '@/routes/authRoutes'



const router = createBrowserRouter([
  { path: '*', element: <div>ERROR 404</div> },
  authRoutes,
  dashboardRoutes,
])

export default router
