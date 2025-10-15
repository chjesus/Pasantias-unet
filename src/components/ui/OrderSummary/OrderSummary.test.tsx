import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OrderSummary from './OrderSummary'
import { useCartStore } from '../../../store/cartStore'

// Mock the cart store
vi.mock('../../../store/cartStore', () => ({
  useCartStore: vi.fn()
}))

// Mock the formattedPrice utility
vi.mock('../../../utils/formattedPrice', () => ({
  formattedPrice: (price: number) => `$${price.toLocaleString()}`
}))

describe('OrderSummary Component', () => {
  const mockCartItems = [
    {
      id: '1',
      name: 'Plumbing Service',
      quantity: 1,
      price: 100000,
      currency: 'COP',
      providerName: 'John Plumber',
      image: '/image1.jpg',
      configuration: []
    },
    {
      id: '2',
      name: 'Electrical Service',
      quantity: 2,
      price: 50000,
      currency: 'COP',
      providerName: 'Jane Electrician', 
      image: '/image2.jpg',
      configuration: []
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders order summary title', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: [] })
    
    render(<OrderSummary />)
    expect(screen.getByText('Resumen del Pedido')).toBeTruthy()
  })

  it('calculates subtotal correctly', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: mockCartItems })
    
    render(<OrderSummary />)
    // Subtotal should be 100000 + (50000 * 2) = 200000
    expect(screen.getByText('$200,000')).toBeTruthy()
  })

  it('calculates taxes correctly (19%)', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: mockCartItems })
    
    render(<OrderSummary />)
    // Taxes should be 200000 * 0.19 = 38000
    expect(screen.getByText('$38,000')).toBeTruthy()
  })

  it('shows subtotal label', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: mockCartItems })
    
    render(<OrderSummary />)
    expect(screen.getByText('Subtotal:')).toBeTruthy()
  })

  it('shows taxes label', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: mockCartItems })
    
    render(<OrderSummary />)
    expect(screen.getByText('Impuestos (19%):')).toBeTruthy()
  })

  it('handles empty cart', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: [] })
    
    render(<OrderSummary />)
    expect(screen.getByText('Resumen del Pedido')).toBeTruthy()
    expect(screen.getAllByText('$0')).toHaveLength(3) // Subtotal, Tax, Total
  })

  it('handles single item in cart', () => {
    const singleItem = [mockCartItems[0]]
    vi.mocked(useCartStore).mockReturnValue({ items: singleItem })
    
    render(<OrderSummary />)
    // Should show subtotal of 100000
    expect(screen.getByText('$100,000')).toBeTruthy()
  })

  it('renders divider element', () => {
    vi.mocked(useCartStore).mockReturnValue({ items: mockCartItems })
    
    const { container } = render(<OrderSummary />)
    const divider = container.querySelector('.MuiDivider-root')
    expect(divider).toBeTruthy()
  })

  it('calculates total with different quantities', () => {
    const itemsWithDifferentQuantities = [
      { ...mockCartItems[0], quantity: 3 }, // 100000 * 3 = 300000
      { ...mockCartItems[1], quantity: 1 }  // 50000 * 1 = 50000
    ]
    vi.mocked(useCartStore).mockReturnValue({ items: itemsWithDifferentQuantities })
    
    render(<OrderSummary />)
    // Subtotal: 350000, should appear in the component
    expect(screen.getByText('$350,000')).toBeTruthy()
  })

    it('handles zero price items', () => {
    const zeroItems = [{ ...mockCartItems[0], price: 0 }]
    vi.mocked(useCartStore).mockReturnValue({ items: zeroItems })
    
    render(<OrderSummary />)
    expect(screen.getByText('Resumen del Pedido')).toBeTruthy()
    expect(screen.getAllByText('$0')).toHaveLength(3) // Subtotal, Tax, Total
  })

  it('handles large numbers correctly', () => {
    const expensiveItems = [
      { ...mockCartItems[0], price: 1000000, quantity: 1 }
    ]
    vi.mocked(useCartStore).mockReturnValue({ items: expensiveItems })
    
    render(<OrderSummary />)
    expect(screen.getByText('$1,000,000')).toBeTruthy()
  })
})