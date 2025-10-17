import { useEffect, useCallback } from 'react';
import { usePerformanceMetrics } from './usePerformanceMetrics';
import { useUsabilityMetrics } from './useUsabilityMetrics';
import { metricsService } from '../services/metricsService';
import { InteractionType } from '../types/metrics';

export const useMetricsTracker = (componentName?: string) => {
  const performanceMetrics = usePerformanceMetrics(componentName);
  const usabilityMetrics = useUsabilityMetrics();

  // Enviar métricas combinadas al servicio
  const sendMetrics = useCallback(async () => {
    if (performanceMetrics.metrics && usabilityMetrics.metrics) {
      const payload = metricsService.createMetricsPayload(
        performanceMetrics.metrics,
        usabilityMetrics.metrics,
        usabilityMetrics.sessionData.sessionId
      );

      await metricsService.sendMetrics(payload);
    }
  }, [
    performanceMetrics.metrics,
    usabilityMetrics.metrics,
    usabilityMetrics.sessionData.sessionId
  ]);

  // Enviar métricas periódicamente
  useEffect(() => {
    const interval = setInterval(sendMetrics, 30000); // Cada 30 segundos
    return () => clearInterval(interval);
  }, [sendMetrics]);

  // Enviar métricas cuando el componente se desmonta
  useEffect(() => {
    return () => {
      sendMetrics();
    };
  }, [sendMetrics]);

  return {
    // Métricas de rendimiento
    performanceMetrics: performanceMetrics.metrics,
    measureActionTime: performanceMetrics.measureActionTime,
    measureRenderTime: performanceMetrics.measureRenderTime,
    getMemoryMetrics: performanceMetrics.getMemoryMetrics,
    getResourceMetrics: performanceMetrics.getResourceMetrics,

    // Métricas de usabilidad
    usabilityMetrics: usabilityMetrics.metrics,
    sessionData: usabilityMetrics.sessionData,
    trackInteraction: usabilityMetrics.trackInteraction,
    trackError: usabilityMetrics.trackError,
    getMostFrequentInteractions: usabilityMetrics.getMostFrequentInteractions,

    // Control de envío de métricas
    sendMetrics,
    
    // Funciones de conveniencia para rastrear interacciones específicas
    trackClick: (element: string, metadata?: Record<string, string | number | boolean>) =>
      usabilityMetrics.trackInteraction(InteractionType.CLICK, element, metadata),
    
    trackSearch: (query: string, element: string = 'search-input') =>
      usabilityMetrics.trackInteraction(InteractionType.SEARCH, element, { query }),
    
    trackCartAction: (action: 'add' | 'remove', serviceId: string) =>
      usabilityMetrics.trackInteraction(
        action === 'add' ? InteractionType.CART_ADD : InteractionType.CART_REMOVE,
        'cart',
        { serviceId }
      ),
    
    trackServiceView: (serviceId: string) =>
      usabilityMetrics.trackInteraction(InteractionType.SERVICE_VIEW, 'service-card', { serviceId }),
    
    trackFilterApply: (filterType: string, filterValue: string) =>
      usabilityMetrics.trackInteraction(InteractionType.FILTER_APPLY, filterType, { filterValue }),
    
    trackFormSubmit: (formName: string) =>
      usabilityMetrics.trackInteraction(InteractionType.FORM_SUBMIT, formName)
  };
};