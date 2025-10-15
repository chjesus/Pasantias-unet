import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FeaturedService from './FeaturedService'

describe('FeaturedService Component', () => {
  const defaultProps = {
    id: 'service-1',
    title: 'Premium Cleaning Service',
    description: 'Professional home and office cleaning with eco-friendly products.',
    price: 150000,
    image: '/featured-service.jpg'
  }

  it('renders featured service with all basic information', () => {
    render(<FeaturedService {...defaultProps} />)
    
    expect(screen.getByText('Premium Cleaning Service')).toBeTruthy()
    expect(screen.getByText('Professional home and office cleaning with eco-friendly products.')).toBeTruthy()
    expect(screen.getByText(/150\.000/)).toBeTruthy()
  })

  it('displays service title correctly', () => {
    render(<FeaturedService {...defaultProps} />)
    const title = screen.getByText('Premium Cleaning Service')
    expect(title).toBeTruthy()
  })

  it('displays service description correctly', () => {
    render(<FeaturedService {...defaultProps} />)
    const description = screen.getByText('Professional home and office cleaning with eco-friendly products.')
    expect(description).toBeTruthy()
  })

  it('renders service image with correct src and alt', () => {
    render(<FeaturedService {...defaultProps} />)
    const image = screen.getByAltText('Premium Cleaning Service')
    expect(image).toBeTruthy()
    expect(image.getAttribute('src')).toBe('/featured-service.jpg')
  })

  it('formats price correctly in Colombian pesos', () => {
    render(<FeaturedService {...defaultProps} />)
    const price = screen.getByText(/150\.000/)
    expect(price).toBeTruthy()
  })

  it('renders "Ver Servicio" button', () => {
    render(<FeaturedService {...defaultProps} />)
    const button = screen.getByRole('button', { name: /ver servicio/i })
    expect(button).toBeTruthy()
  })

  it('calls onClick when button is clicked', () => {
    const mockOnClick = vi.fn()
    render(<FeaturedService {...defaultProps} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button', { name: /ver servicio/i })
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders without onClick handler', () => {
    render(<FeaturedService {...defaultProps} />)
    // Should render without errors even without onClick
    expect(screen.getByText('Premium Cleaning Service')).toBeTruthy()
  })

  it('displays original price when provided', () => {
    const propsWithOriginal = { 
      ...defaultProps, 
      originalPrice: 200000 
    }
    render(<FeaturedService {...propsWithOriginal} />)
    
    expect(screen.getByText(/200\.000/)).toBeTruthy()
    expect(screen.getByText(/150\.000/)).toBeTruthy()
  })

  it('displays discount percentage when provided', () => {
    const propsWithDiscount = { 
      ...defaultProps, 
      discount: 25 
    }
    render(<FeaturedService {...propsWithDiscount} />)
    
    expect(screen.getByText('25% OFF')).toBeTruthy()
  })

  it('displays both original price and discount', () => {
    const propsWithBoth = { 
      ...defaultProps, 
      originalPrice: 200000,
      discount: 25 
    }
    render(<FeaturedService {...propsWithBoth} />)
    
    expect(screen.getByText(/200\.000/)).toBeTruthy()
    expect(screen.getByText(/150\.000/)).toBeTruthy()
    expect(screen.getByText('25% OFF')).toBeTruthy()
  })

  it('does not display original price when not provided', () => {
    render(<FeaturedService {...defaultProps} />)
    
    // Only current price should be displayed
    expect(screen.getByText(/150\.000/)).toBeTruthy()
    expect(screen.queryByText(/200\.000/)).toBeFalsy()
  })

  it('does not display discount when not provided', () => {
    render(<FeaturedService {...defaultProps} />)
    
    expect(screen.queryByText(/% OFF/)).toBeFalsy()
  })

  it('formats large prices correctly', () => {
    const propsWithLargePrice = { 
      ...defaultProps, 
      price: 2500000,
      originalPrice: 3000000 
    }
    render(<FeaturedService {...propsWithLargePrice} />)
    
    expect(screen.getByText(/2\.500\.000/)).toBeTruthy()
    expect(screen.getByText(/3\.000\.000/)).toBeTruthy()
  })

  it('handles small prices correctly', () => {
    const propsWithSmallPrice = { 
      ...defaultProps, 
      price: 50000 
    }
    render(<FeaturedService {...propsWithSmallPrice} />)
    
    expect(screen.getByText(/50\.000/)).toBeTruthy()
  })

  it('handles zero discount correctly', () => {
    const propsWithZeroDiscount = { 
      ...defaultProps, 
      discount: 0 
    }
    render(<FeaturedService {...propsWithZeroDiscount} />)
    
    expect(screen.queryByText('0% OFF')).toBeFalsy()
  })

  it('handles 100% discount correctly', () => {
    const propsWithFullDiscount = { 
      ...defaultProps, 
      discount: 100 
    }
    render(<FeaturedService {...propsWithFullDiscount} />)
    
    expect(screen.getByText('100% OFF')).toBeTruthy()
  })

  it('renders as article element for semantic HTML', () => {
    const { container } = render(<FeaturedService {...defaultProps} />)
    const article = container.querySelector('article')
    expect(article).toBeTruthy()
  })

  it('handles long descriptions', () => {
    const longDescription = 'This is a very long description for a featured service that should wrap properly and display all the content without breaking the layout or causing issues with the component rendering. It includes detailed information about the service.'
    const propsWithLongDesc = { 
      ...defaultProps, 
      description: longDescription 
    }
    render(<FeaturedService {...propsWithLongDesc} />)
    
    expect(screen.getByText(longDescription)).toBeTruthy()
  })

  it('handles special characters in title', () => {
    const specialTitle = 'Servicio Premium de Limpieza & Mantenimiento (24/7)'
    const propsWithSpecialTitle = { 
      ...defaultProps, 
      title: specialTitle 
    }
    render(<FeaturedService {...propsWithSpecialTitle} />)
    
    expect(screen.getByText(specialTitle)).toBeTruthy()
  })

  it('handles empty description', () => {
    const propsWithEmptyDesc = { 
      ...defaultProps, 
      description: '' 
    }
    render(<FeaturedService {...propsWithEmptyDesc} />)
    
    // Should render without errors
    expect(screen.getByText('Premium Cleaning Service')).toBeTruthy()
  })

  it('renders MUI Button component', () => {
    render(<FeaturedService {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button.classList.contains('MuiButton-root')).toBe(true)
  })

  it('button has correct variant and color', () => {
    render(<FeaturedService {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button.classList.contains('MuiButton-contained')).toBe(true)
  })
})