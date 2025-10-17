import { useEffect, useRef, useState, useCallback } from 'react';
import type { PerformanceMetrics } from '../types/metrics';

export const usePerformanceMetrics = (componentName?: string) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const mountTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(Date.now());
  const lastNavigationTime = useRef<number>(Date.now());

  // Obtener métricas de Performance API del navegador
  const getBrowserPerformanceMetrics = useCallback((): Partial<PerformanceMetrics> => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const largestContentfulPaint = performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0;

    return {
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
      firstContentfulPaint,
      largestContentfulPaint,
      initialLoadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0
    };
  }, []);

  // Medir tiempo de renderizado del componente
  const measureRenderTime = useCallback(() => {
    renderStartTime.current = performance.now();
    
    // Usar requestAnimationFrame para medir después del renderizado
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStartTime.current;
      
      setMetrics(prev => ({
        ...prev,
        renderTime,
        componentLoadTime: Date.now() - mountTime.current,
        interfaceResponseTime: renderTime,
        navigationTime: Date.now() - lastNavigationTime.current,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        componentName,
        ...getBrowserPerformanceMetrics()
      } as PerformanceMetrics));
    });
  }, [componentName, getBrowserPerformanceMetrics]);

  // Hook para medir tiempo de respuesta de acciones específicas
  const measureActionTime = useCallback((actionName: string, actionFn: () => Promise<void> | void) => {
    const startTime = performance.now();
    
    const result = actionFn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const actionTime = performance.now() - startTime;
        console.log(`Action "${actionName}" took ${actionTime.toFixed(2)}ms`);
      });
    } else {
      const actionTime = performance.now() - startTime;
      console.log(`Action "${actionName}" took ${actionTime.toFixed(2)}ms`);
      return result;
    }
  }, []);

  // Medir tiempo de navegación
  const measureNavigationTime = useCallback(() => {
    lastNavigationTime.current = Date.now();
  }, []);

  // Obtener métricas de memoria si están disponibles
  const getMemoryMetrics = useCallback(() => {
    // @ts-expect-error - performance.memory puede no estar disponible en todos los navegadores
    const memory = performance.memory;
    if (memory) {
      return {
        usedJSMemory: memory.usedJSMemory,
        totalJSMemory: memory.totalJSMemory,
        jsMemoryLimit: memory.jsMemoryLimit
      };
    }
    return null;
  }, []);

  // Medir tiempo de carga de recursos
  const getResourceMetrics = useCallback(() => {
    const resources = performance.getEntriesByType('resource');
    const slowResources = resources.filter(resource => resource.duration > 1000);
    
    return {
      totalResources: resources.length,
      slowResources: slowResources.length,
      averageResourceLoadTime: resources.reduce((acc, res) => acc + res.duration, 0) / resources.length
    };
  }, []);

  // Effect para inicializar métricas al montar el componente
  useEffect(() => {
    mountTime.current = Date.now();
    measureRenderTime();
  }, [measureRenderTime]);

  // Effect para detectar cambios de ruta y medir navegación
  useEffect(() => {
    const handleLocationChange = () => {
      measureNavigationTime();
      setTimeout(measureRenderTime, 0); // Medir después del renderizado de la nueva ruta
    };

    // Escuchar cambios de historial (para SPAs)
    window.addEventListener('popstate', handleLocationChange);
    
    // Override pushState y replaceState para detectar navegación programática
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleLocationChange();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [measureNavigationTime, measureRenderTime]);

  return {
    metrics,
    measureActionTime,
    measureNavigationTime,
    measureRenderTime,
    getMemoryMetrics,
    getResourceMetrics,
    getBrowserPerformanceMetrics
  };
};