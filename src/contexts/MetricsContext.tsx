import React from 'react';
import type { SessionData, InteractionData } from '../types/metrics';

// Tipos para el contexto de métricas
export interface MetricsContextType {
  measureAction: (actionName: string, actionFn: () => Promise<void> | void) => Promise<void> | void;
  trackClick: (element: string, extra?: Record<string, string | number | boolean>) => void;
  trackSearch: (query: string) => void;
  trackCartAdd: (serviceId: string) => void;
  trackCartRemove: (serviceId: string) => void;
  trackServiceView: (serviceId: string) => void;
  trackFilterApply: (filterType: string, value: string) => void;
  trackFormSubmit: (formName: string) => void;
  getStats: () => {
    sessionData: SessionData;
    mostFrequentInteractions: InteractionData[];
    memoryUsage: {
      usedJSMemory: number;
      totalJSMemory: number;
      jsMemoryLimit: number;
    } | null;
    resourceMetrics: {
      totalResources: number;
      slowResources: number;
      averageResourceLoadTime: number;
    };
  };
}

// Context para facilitar el acceso a las métricas
export const MetricsContext = React.createContext<MetricsContextType | null>(null);

// Hook para usar el contexto de métricas
export const useMetricsContext = (): MetricsContextType => {
  const context = React.useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetricsContext must be used within a MetricsProvider');
  }
  return context;
};