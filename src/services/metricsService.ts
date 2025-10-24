import axios from 'axios';
import type { MetricsPayload, PerformanceMetrics, UsabilityMetrics, DeviceInfo } from '../types/metrics';

class MetricsService {
  private static instance: MetricsService;
  private readonly apiUrl: string;
  private readonly batchSize: number = 10;
  private metricsQueue: MetricsPayload[] = [];
  private isOnline: boolean = navigator.onLine;
  
  // 🚩 FLAG PARA HABILITAR/DESHABILITAR MÉTRICAS
  // Cambiar a false para deshabilitar completamente las métricas
  private readonly METRICS_ENABLED: boolean = false;

  constructor() {
      this.apiUrl = 'https://pq7cyoqls5.execute-api.us-east-1.amazonaws.com/prod-metric-krix/metrics';

    this.setupEventListeners();
  }

  public static getInstance(): MetricsService {
    if (!MetricsService.instance) {
      MetricsService.instance = new MetricsService();
    }
    return MetricsService.instance;
  }

  private setupEventListeners(): void {
    // Detectar cambios en la conexión
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Enviar métricas antes de cerrar la página
    window.addEventListener('beforeunload', () => {
      this.flushQueue(true);
    });
  }

  public async sendMetrics(payload: MetricsPayload): Promise<void> {
    // Si las métricas están deshabilitadas, no hacer nada
    if (!this.METRICS_ENABLED) {
      console.log('📊 Métricas deshabilitadas - no se envía');
      return;
    }

    try {
      if (this.isOnline) {
        await this.postMetrics(payload);
      } else {
        this.addToQueue(payload);
      }
    } catch (error) {
      console.warn('Error sending metrics:', error);
      
      // Si es un error de CORS o red, agregar a la cola
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK' || 
            error.message.includes('CORS') ||
            error.message.includes('Cross-Origin') ||
            error.response?.status === 0) {
          console.warn('CORS or network error detected, queuing metric');
          this.addToQueue(payload);
          return;
        }
      }
      
      // Para otros errores, también agregar a la cola
      this.addToQueue(payload);
    }
  }

  private async postMetrics(payload: MetricsPayload): Promise<void> {
    // Agregar identificador fijo para todas las métricas
    const enrichedPayload = {
      id: "metrics_render",
      type: "single_metric",
      timestamp: Date.now(),
      ...payload
    };

    const response = await axios.post(this.apiUrl, enrichedPayload, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  private addToQueue(payload: MetricsPayload): void {
    this.metricsQueue.push(payload);
    
    // Limitar el tamaño de la cola para evitar uso excesivo de memoria
    if (this.metricsQueue.length > 100) {
      this.metricsQueue = this.metricsQueue.slice(-50);
    }
  }

  private async flushQueue(isBeforeUnload: boolean = false): Promise<void> {
    // Si las métricas están deshabilitadas, limpiar la cola sin enviar
    if (!this.METRICS_ENABLED) {
      this.clearQueue();
      return;
    }

    if (this.metricsQueue.length === 0 || !this.isOnline) {
      return;
    }

    const batch = this.metricsQueue.splice(0, this.batchSize);
    
    try {
      if (isBeforeUnload && navigator.sendBeacon) {
        // Usar sendBeacon para envíos al cerrar la página
        const enrichedBatch = {
          id: "metrics_render",
          type: "batch_metric",
          timestamp: Date.now(),
          batch
        };
        const blob = new Blob([JSON.stringify(enrichedBatch)], { type: 'application/json' });
        navigator.sendBeacon(this.apiUrl, blob);
      } else {
        const enrichedBatch = {
          id: "metrics_render",
          type: "batch_metric",
          timestamp: Date.now(),
          batch
        };
        await axios.post(this.apiUrl, enrichedBatch, {
          timeout: 3000,
          headers: {
            'Content-Type': 'application/json',
            'X-Metrics-Version': '1.0'
          }
        });
      }
    } catch (error) {
      console.error('Error flushing metrics queue:', error);
      // Restaurar los elementos en caso de error
      this.metricsQueue.unshift(...batch);
    }
  }

  public createMetricsPayload(
    performance: PerformanceMetrics,
    usability: UsabilityMetrics,
    sessionId: string,
    userId?: string
  ): MetricsPayload {
    return {
      performance,
      usability,
      deviceInfo: this.getDeviceInfo(),
      sessionInfo: {
        sessionId,
        userId,
        timestamp: Date.now()
      }
    };
  }

  private getDeviceInfo(): DeviceInfo {
    const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
      const width = window.screen.width;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    const getConnectionType = (): string => {
      // @ts-expect-error - navigator.connection puede no estar disponible en todos los navegadores
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      return connection?.effectiveType || 'unknown';
    };

    return {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      deviceType: getDeviceType(),
      connection: getConnectionType(),
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  // Método para enviar métricas en lotes cada cierto tiempo
  public startPeriodicFlush(intervalMs: number = 30000): void {
    setInterval(() => {
      this.flushQueue();
    }, intervalMs);
  }

  // Método para limpiar la cola manualmente
  public clearQueue(): void {
    this.metricsQueue = [];
  }

  // Método para obtener estadísticas de la cola
  public getQueueStats(): { size: number; isOnline: boolean } {
    return {
      size: this.metricsQueue.length,
      isOnline: this.isOnline
    };
  }

  // Método para verificar si las métricas están habilitadas
  public isMetricsEnabled(): boolean {
    return this.METRICS_ENABLED;
  }
}

export const metricsService = MetricsService.getInstance();
export default metricsService;