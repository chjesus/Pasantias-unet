import { RouterProvider } from 'react-router'
import router from '@/routes'
import CustomThemeProvider from '@/utils/theme'
import { useMetricsTracker } from '@/hooks/useMetricsTracker'
import { metricsService } from '@/services/metricsService'
import { useEffect } from 'react'

function App() {
  const metrics = useMetricsTracker('App');

  // Inicializar el servicio de métricas
  useEffect(() => {
    metricsService.startPeriodicFlush();
    
    // Capturar errores no manejados
    const handleError = (event: ErrorEvent) => {
      metrics.trackError(new Error(event.message), event.filename);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      metrics.trackError(new Error(event.reason));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [metrics]);

  return (
    <CustomThemeProvider>
      <RouterProvider router={router}></RouterProvider>
    </CustomThemeProvider>
  )
}

export default App
