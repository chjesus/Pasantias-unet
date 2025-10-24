import { describe, it, expect, beforeEach } from 'vitest'
import { metricsService } from './metricsService'

// Mock window APIs para testing
Object.defineProperty(window, 'navigator', {
  value: {
    onLine: true,
    language: 'es-ES'
  },
  writable: true
})

Object.defineProperty(window, 'screen', {
  value: {
    width: 1920,
    height: 1080
  },
  writable: true
})

Object.defineProperty(window, 'Intl', {
  value: {
    DateTimeFormat: () => ({
      resolvedOptions: () => ({ timeZone: 'America/Caracas' })
    })
  },
  writable: true
})

describe('MetricsService', () => {
  beforeEach(() => {
    metricsService.clearQueue()
  })

  it('should be a singleton', () => {
    const instance1 = metricsService
    const instance2 = metricsService
    expect(instance1).toBe(instance2)
  })

  it('should return metrics enabled status', () => {
    expect(typeof metricsService.isMetricsEnabled()).toBe('boolean')
  })

  it('should return queue statistics', () => {
    const stats = metricsService.getQueueStats()
    expect(stats).toHaveProperty('size')
    expect(stats).toHaveProperty('isOnline')
    expect(typeof stats.size).toBe('number')
    expect(typeof stats.isOnline).toBe('boolean')
  })

  it('should clear queue', () => {
    metricsService.clearQueue()
    const stats = metricsService.getQueueStats()
    expect(stats.size).toBe(0)
  })

  it('should create device info correctly', () => {
    // Crear un payload simple para verificar que deviceInfo se genera
    const mockPerformance = {
      interfaceResponseTime: 45.2,
      componentLoadTime: 123.4,
      renderTime: 12.8,
      navigationTime: 234.1,
      initialLoadTime: 1500.3,
      domContentLoaded: 890.2,
      firstContentfulPaint: 1200.5,
      largestContentfulPaint: 1800.7,
      timestamp: Date.now(),
      userAgent: 'test-agent',
      url: 'http://localhost'
    }

    const mockUsability = {
      mostFrequentInteractions: [],
      sessionData: {
        sessionId: 'test-session',
        startTime: Date.now(),
        totalClicks: 0,
        totalPageViews: 1,
        timeOnPage: {},
        searchQueries: [],
        cartInteractions: 0,
        serviceViews: [],
        errors: []
      },
      timestamp: Date.now(),
      userAgent: 'test-agent',
      url: 'http://localhost'
    }

    const payload = metricsService.createMetricsPayload(
      mockPerformance,
      mockUsability,
      'test-session',
      'test-user'
    )

    expect(payload).toHaveProperty('performance')
    expect(payload).toHaveProperty('usability')
    expect(payload).toHaveProperty('deviceInfo')
    expect(payload).toHaveProperty('sessionInfo')
    expect(payload.deviceInfo.screenWidth).toBe(1920)
    expect(payload.deviceInfo.screenHeight).toBe(1080)
    expect(payload.deviceInfo.language).toBe('es-ES')
    expect(payload.deviceInfo.timezone).toBe('America/Caracas')
  })
})