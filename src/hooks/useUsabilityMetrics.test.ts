import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUsabilityMetrics } from './useUsabilityMetrics'
import { InteractionType } from '../types/metrics'

// Mock window APIs
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: 'test-agent'
  },
  writable: true
})

Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000/test',
    pathname: '/test'
  },
  writable: true
})

describe('useUsabilityMetrics', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with session data', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    expect(result.current.sessionData).toBeDefined()
    expect(result.current.sessionData.sessionId).toMatch(/^session_/)
    expect(result.current.sessionData.totalClicks).toBe(0)
    expect(result.current.sessionData.totalPageViews).toBe(1)
  })

  it('should track interactions correctly', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    act(() => {
      result.current.trackInteraction(
        InteractionType.CLICK, 
        '.test-button', 
        { testData: 'value' }
      )
    })

    expect(result.current.sessionData.totalClicks).toBe(1)
  })

  it('should track cart interactions', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    act(() => {
      result.current.trackInteraction(
        InteractionType.CART_ADD, 
        'cart', 
        { serviceId: 'test-service' }
      )
    })

    expect(result.current.sessionData.cartInteractions).toBe(1)
  })

  it('should track search queries', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    act(() => {
      result.current.trackInteraction(
        InteractionType.SEARCH, 
        'search-input', 
        { query: 'test search' }
      )
    })

    expect(result.current.sessionData.searchQueries).toContain('test search')
  })

  it('should track service views', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    act(() => {
      result.current.trackInteraction(
        InteractionType.SERVICE_VIEW, 
        'service-card', 
        { serviceId: 'service-123' }
      )
    })

    expect(result.current.sessionData.serviceViews).toContain('service-123')
  })

  it('should track navigation', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    act(() => {
      result.current.trackInteraction(
        InteractionType.NAVIGATION, 
        '/new-page'
      )
    })

    expect(result.current.sessionData.totalPageViews).toBe(2) // 1 initial + 1 navigation
  })

  it('should track errors', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    const testError = new Error('Test error')
    
    act(() => {
      result.current.trackError(testError, 'TestComponent')
    })

    expect(result.current.sessionData.errors).toHaveLength(1)
    expect(result.current.sessionData.errors[0].message).toBe('Test error')
    expect(result.current.sessionData.errors[0].componentStack).toBe('TestComponent')
  })

  it('should get most frequent interactions', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    // Add multiple interactions
    act(() => {
      result.current.trackInteraction(InteractionType.CLICK, '.button1')
      result.current.trackInteraction(InteractionType.CLICK, '.button1')
      result.current.trackInteraction(InteractionType.CLICK, '.button2')
    })

    const topInteractions = result.current.getMostFrequentInteractions(5)
    
    expect(topInteractions).toHaveLength(2)
    expect(topInteractions[0].count).toBe(2) // .button1 clicked twice
    expect(topInteractions[1].count).toBe(1) // .button2 clicked once
  })

  it('should get average interaction time by type', () => {
    const { result } = renderHook(() => useUsabilityMetrics())
    
    const avgTime = result.current.getAverageInteractionTime(InteractionType.CLICK)
    
    expect(typeof avgTime).toBe('number')
    expect(avgTime).toBe(0) // No interactions with averageTime yet
  })
})