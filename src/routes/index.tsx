import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

const HomePage = lazy(() => import('@pages/Home'))
const LoginPage = lazy(() => import('@pages/Login'))

const router = createBrowserRouter([
  { index: true, path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <div>ERROR 404</div> },
])

export default router
