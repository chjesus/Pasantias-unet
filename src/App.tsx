import { RouterProvider } from 'react-router'
import router from '@/routes'
import CustomThemeProvider from '@/utils/theme'
import PWAInstaller from '@/components/ui/PWAInstaller'
import OfflineNotification from '@/components/ui/OfflineNotification'

function App() {
  return (
    <CustomThemeProvider>
      <RouterProvider router={router}></RouterProvider>
      <PWAInstaller />
      <OfflineNotification />
    </CustomThemeProvider>
  )
}

export default App
