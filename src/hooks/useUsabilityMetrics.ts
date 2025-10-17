import { useEffect, useRef, useState, useCallback } from 'react';
import { InteractionType, type UsabilityMetrics, type InteractionData, type SessionData } from '../types/metrics';

// Generar un ID único de sesión
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useUsabilityMetrics = () => {
  const [metrics, setMetrics] = useState<UsabilityMetrics | null>(null);
  const [sessionData, setSessionData] = useState<SessionData>(() => ({
    sessionId: generateSessionId(),
    startTime: Date.now(),
    totalClicks: 0,
    totalPageViews: 1,
    timeOnPage: {},
    searchQueries: [],
    cartInteractions: 0,
    serviceViews: [],
    errors: []
  }));

  const interactionsMap = useRef<Map<string, InteractionData>>(new Map());
  const pageStartTime = useRef<number>(Date.now());
  const currentPage = useRef<string>(window.location.pathname);

  // Actualizar métricas compiladas
  const updateMetrics = useCallback(() => {
    const interactions = Array.from(interactionsMap.current.values())
      .sort((a, b) => b.count - a.count);

    setMetrics({
      mostFrequentInteractions: interactions,
      sessionData,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }, [sessionData]);

  // Rastrear tiempo en página
  const trackTimeOnPage = useCallback(() => {
    const currentPath = window.location.pathname;
    const timeSpent = Date.now() - pageStartTime.current;
    
    setSessionData(prev => ({
      ...prev,
      timeOnPage: {
        ...prev.timeOnPage,
        [currentPage.current]: (prev.timeOnPage[currentPage.current] || 0) + timeSpent
      }
    }));
    
    currentPage.current = currentPath;
    pageStartTime.current = Date.now();
  }, []);

  // Registrar una interacción
  const trackInteraction = useCallback((
    type: InteractionType,
    element: string,
    metadata?: Record<string, string | number | boolean>
  ) => {
    const key = `${type}_${element}`;
    const currentTime = Date.now();
    
    interactionsMap.current.set(key, {
      type,
      element,
      count: (interactionsMap.current.get(key)?.count || 0) + 1,
      lastInteraction: currentTime,
      metadata
    });

    // Actualizar datos de sesión según el tipo de interacción
    setSessionData(prev => {
      const updates: Partial<SessionData> = {};
      
      switch (type) {
        case InteractionType.CLICK:
          updates.totalClicks = (prev.totalClicks || 0) + 1;
          break;
        case InteractionType.CART_ADD:
        case InteractionType.CART_REMOVE:
          updates.cartInteractions = (prev.cartInteractions || 0) + 1;
          break;
        case InteractionType.SERVICE_VIEW:
          if (metadata?.serviceId && typeof metadata.serviceId === 'string') {
            updates.serviceViews = [...prev.serviceViews, metadata.serviceId];
          }
          break;
        case InteractionType.SEARCH:
          if (metadata?.query && typeof metadata.query === 'string') {
            updates.searchQueries = [...prev.searchQueries, metadata.query];
          }
          break;
        case InteractionType.NAVIGATION:
          updates.totalPageViews = (prev.totalPageViews || 0) + 1;
          break;
      }
      
      return { ...prev, ...updates };
    });

    // Actualizar métricas generales
    updateMetrics();
  }, [updateMetrics]);

  // Rastrear errores
  const trackError = useCallback((error: Error, componentStack?: string) => {
    setSessionData(prev => ({
      ...prev,
      errors: [
        ...prev.errors,
        {
          type: error.name,
          message: error.message,
          timestamp: Date.now(),
          stack: error.stack,
          componentStack
        }
      ]
    }));
  }, []);

  // Obtener estadísticas de interacciones más frecuentes
  const getMostFrequentInteractions = useCallback((limit: number = 10): InteractionData[] => {
    return Array.from(interactionsMap.current.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }, []);

  // Obtener tiempo promedio por tipo de interacción
  const getAverageInteractionTime = useCallback((type: InteractionType): number => {
    const typeInteractions = Array.from(interactionsMap.current.values())
      .filter(interaction => interaction.type === type)
      .filter(interaction => interaction.averageTime !== undefined);
    
    if (typeInteractions.length === 0) return 0;
    
    return typeInteractions.reduce((sum, interaction) => 
      sum + (interaction.averageTime || 0), 0
    ) / typeInteractions.length;
  }, []);

  // Setup de event listeners para capturar interacciones automáticamente
  useEffect(() => {
    // Capturar clicks globales
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const element = target.tagName.toLowerCase();
      const className = target.className;
      const id = target.id;
      
      const elementIdentifier = id ? `#${id}` : 
                               className ? `.${className.split(' ')[0]}` : 
                               element;
      
      trackInteraction(InteractionType.CLICK, elementIdentifier, {
        x: event.clientX,
        y: event.clientY,
        button: event.button
      });
    };

    // Capturar scroll
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackInteraction(InteractionType.SCROLL, 'window', {
          scrollY: window.scrollY,
          scrollX: window.scrollX
        });
      }, 100);
    };

    // Capturar inputs
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const elementType = target.type || 'text';
      
      trackInteraction(InteractionType.INPUT, elementType, {
        valueLength: target.value.length
      });
    };

    // Capturar cambios de página
    const handlePageChange = () => {
      trackTimeOnPage();
      trackInteraction(InteractionType.NAVIGATION, window.location.pathname);
    };

    // Event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('input', handleInput);
    window.addEventListener('beforeunload', trackTimeOnPage);
    
    // Para SPAs
    window.addEventListener('popstate', handlePageChange);
    
    // Override history methods para SPAs
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handlePageChange();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handlePageChange();
    };

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('input', handleInput);
      window.removeEventListener('beforeunload', trackTimeOnPage);
      window.removeEventListener('popstate', handlePageChange);
      
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      
      clearTimeout(scrollTimeout);
    };
  }, [trackInteraction, trackTimeOnPage]);

  // Actualizar métricas periódicamente
  useEffect(() => {
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, [updateMetrics]);

  return {
    metrics,
    sessionData,
    trackInteraction,
    trackError,
    getMostFrequentInteractions,
    getAverageInteractionTime,
    trackTimeOnPage
  };
};