import { RouterProvider } from 'react-router'
import router from '@/routes'
import CustomThemeProvider from '@/utils/theme'

function App() {
  return (
    <CustomThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </CustomThemeProvider>
  )
}

export default App
