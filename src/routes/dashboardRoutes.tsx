import { Navigate } from 'react-router'

import DashboardLayout from '@/components/layout/Dashboard'

const dashboardRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: 'dashboard',
      children: [
        { index: true, element: <Navigate to="pagina1" replace /> },
        { path: 'pagina1', element: <div>Dashboard Page 1</div> },
        { path: 'pagina2', element: <div>Dashboard Page 2</div> },
      ]
    }
  ],
}

export default dashboardRoutes