import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePerformanceMetrics } from './usePerformanceMetrics'

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => 100),
    getEntriesByType: vi.fn((type) => {
      if (type === 'navigation') {
        return [{
          domContentLoadedEventStart: 100,
          domContentLoadedEventEnd: 200,
          loadEventEnd: 300,
          fetchStart: 50
        }]
      }
      if (type === 'paint') {
        return [
          { name: 'first-contentful-paint', startTime: 150 }
        ]
      }
      if (type === 'largest-contentful-paint') {
        return [{ startTime: 250 }]
      }
      return []
    }),
    getEntriesByName: vi.fn(() => [])
  },
  writable: true
})

Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: 'test-agent'
  },
  writable: true
})

Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000/test'
  },
  writable: true
})

describe('usePerformanceMetrics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePerformanceMetrics('TestComponent'))
    
    expect(result.current.measureActionTime).toBeDefined()
    expect(result.current.measureRenderTime).toBeDefined()
    expect(result.current.getBrowserPerformanceMetrics).toBeDefined()
  })

  it('should measure action time correctly', async () => {
    const { result } = renderHook(() => usePerformanceMetrics())
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    const syncAction = () => {
      // Simulate some work
    }
    
    result.current.measureActionTime('test-action', syncAction)
    
    // Should have logged the action time
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Action "test-action" took')
    )
    
    consoleSpy.mockRestore()
  })

  it('should get browser performance metrics', () => {
    const { result } = renderHook(() => usePerformanceMetrics())
    
    const metrics = result.current.getBrowserPerformanceMetrics()
    
    expect(metrics).toHaveProperty('domContentLoaded')
    expect(metrics).toHaveProperty('firstContentfulPaint')
    expect(metrics).toHaveProperty('largestContentfulPaint')
    expect(metrics).toHaveProperty('initialLoadTime')
  })

  it('should get resource metrics', () => {
    const { result } = renderHook(() => usePerformanceMetrics())
    
    const resourceMetrics = result.current.getResourceMetrics()
    
    expect(resourceMetrics).toHaveProperty('totalResources')
    expect(resourceMetrics).toHaveProperty('slowResources')
    expect(resourceMetrics).toHaveProperty('averageResourceLoadTime')
  })
})