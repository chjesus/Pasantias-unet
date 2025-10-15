import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CartList from './CartList'
import { useCartStore } from '../../../store/cartStore'

// Mock the cart store
vi.mock('../../../store/cartStore', () => ({
  useCartStore: vi.fn()
}))

// Mock the CartItem component
vi.mock('../CartItem', () => ({
  default: ({ item }: { item: { title: string } }) => (
    <div data-testid="cart-item">{item.title}</div>
  )
}))

// Mock the formattedPrice utility
vi.mock('../../../utils/formattedPrice', () => ({
  formattedPrice: (price: number) => `$${price.toLocaleString()}`
}))

const mockedUseCartStore = vi.mocked(useCartStore)

describe('CartList Component', () => {
  const mockCartItem = {
    id: 'item-1',
    title: 'Plumbing Service',
    price: 100000,
    quantity: 2,
    currency: 'COP'
  }

  const mockCartItem2 = {
    id: 'item-2',
    title: 'Electrical Service',
    price: 150000,
    quantity: 1,
    currency: 'COP'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders empty cart state when no items', () => {
    mockedUseCartStore.mockReturnValue({
      items: [],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
    expect(screen.getByText('Agrega algunos servicios para continuar')).toBeTruthy()
  })

  it('renders shopping cart icon in empty state', () => {
    mockedUseCartStore.mockReturnValue({
      items: [],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    const { container } = render(<CartList />)
    
    const cartIcon = container.querySelector('.MuiSvgIcon-root')
    expect(cartIcon).toBeTruthy()
  })

  it('renders cart items when items exist', () => {
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem, mockCartItem2],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    expect(screen.getByText('Carrito de Compras')).toBeTruthy()
    expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
  })

  it('displays correct item count for single item', () => {
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem2],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    expect(screen.getByText('1 artículo')).toBeTruthy()
  })

  it('displays correct item count for multiple items', () => {
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem, mockCartItem2],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    expect(screen.getByText('3 artículos')).toBeTruthy()
  })

  it('calculates and displays correct total price', () => {
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem, mockCartItem2],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    // Total: (100000 * 2) + (150000 * 1) = 350000
    expect(screen.getByText('$350,000 COP')).toBeTruthy()
  })

  it('renders "Vaciar Carrito" button', () => {
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    const clearButton = screen.getByRole('button', { name: /vaciar carrito/i })
    expect(clearButton).toBeTruthy()
  })

  it('calls clearCart when "Vaciar Carrito" is clicked', () => {
    const mockClearCart = vi.fn()
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem],
      clearCart: mockClearCart,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    const clearButton = screen.getByRole('button', { name: /vaciar carrito/i })
    fireEvent.click(clearButton)
    
    expect(mockClearCart).toHaveBeenCalledTimes(1)
  })

  it('renders each cart item component', () => {
    mockedUseCartStore.mockReturnValue({
      items: [mockCartItem, mockCartItem2],
      clearCart: vi.fn(),
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn()
    })

    render(<CartList />)
    
    const cartItems = screen.getAllByTestId('cart-item')
    expect(cartItems).toHaveLength(2)
  })
})
