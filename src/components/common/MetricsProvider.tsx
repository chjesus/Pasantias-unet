import React from 'react';
import { useMetricsTracker } from '../../hooks/useMetricsTracker';
import { MetricsContext, type MetricsContextType } from '../../contexts/MetricsContext';

// Componente provider que integra métricas en cualquier página
export const MetricsProvider: React.FC<{ children: React.ReactNode; pageName: string }> = ({ 
  children, 
  pageName 
}) => {
  const metrics = useMetricsTracker(pageName);

  // Funciones de conveniencia para usar en los componentes hijos
  const metricsContext: MetricsContextType = {
    // Métricas de rendimiento
    measureAction: metrics.measureActionTime,
    
    // Métricas de usabilidad - funciones simplificadas
    trackClick: (element: string, extra?: Record<string, string | number | boolean>) => 
      metrics.trackClick(element, extra),
    
    trackSearch: (query: string) => 
      metrics.trackSearch(query),
    
    trackCartAdd: (serviceId: string) => 
      metrics.trackCartAction('add', serviceId),
    
    trackCartRemove: (serviceId: string) => 
      metrics.trackCartAction('remove', serviceId),
    
    trackServiceView: (serviceId: string) => 
      metrics.trackServiceView(serviceId),
    
    trackFilterApply: (filterType: string, value: string) => 
      metrics.trackFilterApply(filterType, value),
    
    trackFormSubmit: (formName: string) => 
      metrics.trackFormSubmit(formName),

    // Obtener estadísticas en tiempo real
    getStats: () => ({
      sessionData: metrics.sessionData,
      mostFrequentInteractions: metrics.getMostFrequentInteractions(5),
      memoryUsage: metrics.getMemoryMetrics(),
      resourceMetrics: metrics.getResourceMetrics()
    })
  };

  return (
    <MetricsContext.Provider value={metricsContext}>
      {children}
    </MetricsContext.Provider>
  );
};