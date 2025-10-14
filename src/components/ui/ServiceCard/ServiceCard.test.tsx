import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ServiceCard from './ServiceCard'

describe('ServiceCard Component', () => {
  const defaultProps = {
    id: '1',
    title: 'Plumbing Repair Service',
    provider: 'John Plumber Co.',
    rating: 4.5,
    price: 150000,
    image: '/service-image.jpg'
  }

  it('renders service card with all information', () => {
    render(<ServiceCard {...defaultProps} />)
    
    expect(screen.getByText('Plumbing Repair Service')).toBeTruthy()
    expect(screen.getByText('Por: John Plumber Co.')).toBeTruthy()
    expect(screen.getByText(/150\.000/)).toBeTruthy()
  })

  it('displays service title correctly', () => {
    render(<ServiceCard {...defaultProps} />)
    const title = screen.getByText('Plumbing Repair Service')
    expect(title).toBeTruthy()
  })

  it('displays provider name with "Por:" prefix', () => {
    render(<ServiceCard {...defaultProps} />)
    const provider = screen.getByText('Por: John Plumber Co.')
    expect(provider).toBeTruthy()
  })

  it('formats price correctly in Colombian pesos', () => {
    render(<ServiceCard {...defaultProps} />)
    const price = screen.getByText(/150\.000/)
    expect(price).toBeTruthy()
  })

  it('renders service image with correct src and alt', () => {
    render(<ServiceCard {...defaultProps} />)
    const image = screen.getByAltText('Plumbing Repair Service')
    expect(image).toBeTruthy()
    expect(image.getAttribute('src')).toBe('/service-image.jpg')
  })

  it('renders rating component', () => {
    const { container } = render(<ServiceCard {...defaultProps} />)
    const rating = container.querySelector('.MuiRating-root')
    expect(rating).toBeTruthy()
  })

  it('rating is read-only', () => {
    const { container } = render(<ServiceCard {...defaultProps} />)
    const rating = container.querySelector('.Mui-readOnly')
    expect(rating).toBeTruthy()
  })

  it('calls onClick when card is clicked', () => {
    const mockOnClick = vi.fn()
    render(<ServiceCard {...defaultProps} onClick={mockOnClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders without onClick handler', () => {
    render(<ServiceCard {...defaultProps} />)
    // Should render without errors even without onClick
    expect(screen.getByText('Plumbing Repair Service')).toBeTruthy()
  })

  it('handles different rating values', () => {
    const props = { ...defaultProps, rating: 5 }
    render(<ServiceCard {...props} />)
    
    // Just verify it renders without error
    expect(screen.getByText('Plumbing Repair Service')).toBeTruthy()
  })

  it('handles zero rating', () => {
    const props = { ...defaultProps, rating: 0 }
    render(<ServiceCard {...props} />)
    
    expect(screen.getByText('Plumbing Repair Service')).toBeTruthy()
  })

  it('formats large price numbers correctly', () => {
    const props = { ...defaultProps, price: 1500000 }
    render(<ServiceCard {...props} />)
    
    expect(screen.getByText(/1\.500\.000/)).toBeTruthy()
  })

  it('formats small price numbers correctly', () => {
    const props = { ...defaultProps, price: 50000 }
    render(<ServiceCard {...props} />)
    
    expect(screen.getByText(/50\.000/)).toBeTruthy()
  })

  it('handles long service titles', () => {
    const longTitle = 'Very Long Service Title That Should Still Display Correctly Without Breaking Layout'
    const props = { ...defaultProps, title: longTitle }
    render(<ServiceCard {...props} />)
    
    expect(screen.getByText(longTitle)).toBeTruthy()
  })

  it('handles long provider names', () => {
    const longProvider = 'Very Long Provider Company Name That Should Display Correctly'
    const props = { ...defaultProps, provider: longProvider }
    render(<ServiceCard {...props} />)
    
    expect(screen.getByText(`Por: ${longProvider}`)).toBeTruthy()
  })

  it('handles special characters in title', () => {
    const specialTitle = 'Reparación & Mantenimiento (24/7)'
    const props = { ...defaultProps, title: specialTitle }
    render(<ServiceCard {...props} />)
    
    expect(screen.getByText(specialTitle)).toBeTruthy()
  })

  it('renders as article element for semantic HTML', () => {
    const { container } = render(<ServiceCard {...defaultProps} />)
    const article = container.querySelector('article')
    expect(article).toBeTruthy()
  })

  it('renders button for interaction', () => {
    render(<ServiceCard {...defaultProps} />)
    const button = screen.getByRole('button')
    expect(button).toBeTruthy()
  })
})