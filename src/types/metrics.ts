// Tipos para las métricas de rendimiento
export interface PerformanceMetrics {
  // Tiempo de respuesta de la interfaz
  interfaceResponseTime: number;
  
  // Tiempo de carga de componentes
  componentLoadTime: number;
  
  // Tiempo de renderizado
  renderTime: number;
  
  // Tiempo de navegación entre páginas
  navigationTime: number;
  
  // Tiempo de carga inicial de la aplicación
  initialLoadTime: number;
  
  // Métricas del browser
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  
  // Información del contexto
  timestamp: number;
  userAgent: string;
  url: string;
  componentName?: string;
}

// Tipos para las métricas de usabilidad
export interface UsabilityMetrics {
  // Interacciones más frecuentes
  mostFrequentInteractions: InteractionData[];
  
  // Datos de la sesión actual
  sessionData: SessionData;
  
  // Información del contexto
  timestamp: number;
  userAgent: string;
  url: string;
}

export interface InteractionData {
  type: InteractionType;
  element: string;
  count: number;
  averageTime?: number;
  lastInteraction: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface SessionData {
  sessionId: string;
  startTime: number;
  totalClicks: number;
  totalPageViews: number;
  timeOnPage: Record<string, number>;
  searchQueries: string[];
  cartInteractions: number;
  serviceViews: string[];
  errors: ErrorData[];
}

export interface ErrorData {
  type: string;
  message: string;
  timestamp: number;
  stack?: string;
  componentStack?: string;
}

export const InteractionType = {
  CLICK: 'click',
  SCROLL: 'scroll',
  INPUT: 'input',
  SEARCH: 'search',
  NAVIGATION: 'navigation',
  CART_ADD: 'cart_add',
  CART_REMOVE: 'cart_remove',
  SERVICE_VIEW: 'service_view',
  FILTER_APPLY: 'filter_apply',
  FORM_SUBMIT: 'form_submit'
} as const;

export type InteractionType = typeof InteractionType[keyof typeof InteractionType];

// Tipo combinado para el envío de métricas
export interface MetricsPayload {
  performance: PerformanceMetrics;
  usability: UsabilityMetrics;
  deviceInfo: DeviceInfo;
  sessionInfo: {
    sessionId: string;
    userId?: string;
    timestamp: number;
  };
}

export interface DeviceInfo {
  screenWidth: number;
  screenHeight: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connection?: string;
  language: string;
  timezone: string;
}