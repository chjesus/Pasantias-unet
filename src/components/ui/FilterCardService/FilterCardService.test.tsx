import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterCardService from './FilterCardService'

describe('FilterCardService Component', () => {
  const defaultProps = {
    image: '/service-image.jpg',
    title: 'Professional Plumbing Service',
    description: 'Complete plumbing solutions for your home and office needs.',
    rating: 4.5,
    reviews: 127,
    price: 200000
  }

  it('renders service card with all information', () => {
    render(<FilterCardService {...defaultProps} />)
    
    expect(screen.getByText('Professional Plumbing Service')).toBeTruthy()
    expect(screen.getByText('Complete plumbing solutions for your home and office needs.')).toBeTruthy()
    expect(screen.getByText('(127 opiniones)')).toBeTruthy()
    expect(screen.getByText(/200\.000/)).toBeTruthy()
  })

  it('displays service title correctly', () => {
    render(<FilterCardService {...defaultProps} />)
    const title = screen.getByText('Professional Plumbing Service')
    expect(title).toBeTruthy()
  })

  it('displays service description correctly', () => {
    render(<FilterCardService {...defaultProps} />)
    const description = screen.getByText('Complete plumbing solutions for your home and office needs.')
    expect(description).toBeTruthy()
  })

  it('renders service image with correct src and alt', () => {
    render(<FilterCardService {...defaultProps} />)
    const image = screen.getByAltText('Professional Plumbing Service')
    expect(image).toBeTruthy()
    expect(image.getAttribute('src')).toBe('/service-image.jpg')
  })

  it('formats price correctly in Colombian pesos', () => {
    render(<FilterCardService {...defaultProps} />)
    const price = screen.getByText(/200\.000/)
    expect(price).toBeTruthy()
  })

  it('displays review count correctly', () => {
    render(<FilterCardService {...defaultProps} />)
    const reviews = screen.getByText('(127 opiniones)')
    expect(reviews).toBeTruthy()
  })

  it('renders rating component', () => {
    const { container } = render(<FilterCardService {...defaultProps} />)
    const rating = container.querySelector('.MuiRating-root')
    expect(rating).toBeTruthy()
  })

  it('rating is read-only', () => {
    const { container } = render(<FilterCardService {...defaultProps} />)
    const rating = container.querySelector('.Mui-readOnly')
    expect(rating).toBeTruthy()
  })

  it('calls onViewDetails when card is clicked', () => {
    const mockOnViewDetails = vi.fn()
    render(<FilterCardService {...defaultProps} onViewDetails={mockOnViewDetails} />)
    
    const card = screen.getByRole('article')
    fireEvent.click(card)
    
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1)
  })

  it('calls onViewDetails when button is clicked', () => {
    const mockOnViewDetails = vi.fn()
    render(<FilterCardService {...defaultProps} onViewDetails={mockOnViewDetails} />)
    
    const button = screen.getByText('Ver Detalles')
    fireEvent.click(button)
    
    expect(mockOnViewDetails).toHaveBeenCalledTimes(2)
  })

  it('renders without onViewDetails handler', () => {
    render(<FilterCardService {...defaultProps} />)
    // Should render without errors even without onViewDetails
    expect(screen.getByText('Professional Plumbing Service')).toBeTruthy()
  })

  it('handles zero rating', () => {
    const props = { ...defaultProps, rating: 0 }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText('Professional Plumbing Service')).toBeTruthy()
  })

  it('handles perfect rating', () => {
    const props = { ...defaultProps, rating: 5 }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText('Professional Plumbing Service')).toBeTruthy()
  })

  it('handles single review count', () => {
    const props = { ...defaultProps, reviews: 1 }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText('(1 opiniones)')).toBeTruthy()
  })

  it('handles zero reviews', () => {
    const props = { ...defaultProps, reviews: 0 }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText('(0 opiniones)')).toBeTruthy()
  })

  it('formats large numbers correctly', () => {
    const props = { ...defaultProps, price: 2500000, reviews: 1523 }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText(/2\.500\.000/)).toBeTruthy()
    expect(screen.getByText('(1523 opiniones)')).toBeTruthy()
  })

  it('handles long descriptions', () => {
    const longDescription = 'This is a very long description that should wrap properly and display all the content without breaking the layout or causing issues with the component rendering.'
    const props = { ...defaultProps, description: longDescription }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText(longDescription)).toBeTruthy()
  })

  it('handles special characters in title', () => {
    const specialTitle = 'Servicio de Plomería & Electricidad (24/7)'
    const props = { ...defaultProps, title: specialTitle }
    render(<FilterCardService {...props} />)
    
    expect(screen.getByText(specialTitle)).toBeTruthy()
  })

  it('renders as article element for semantic HTML', () => {
    const { container } = render(<FilterCardService {...defaultProps} />)
    const article = container.querySelector('article')
    expect(article).toBeTruthy()
  })

  it('renders "Ver detalles" button', () => {
    render(<FilterCardService {...defaultProps} />)
    const button = screen.getByRole('button', { name: /ver detalles/i })
    expect(button).toBeTruthy()
  })

  it('handles decimal ratings correctly', () => {
    const props = { ...defaultProps, rating: 3.7 }
    render(<FilterCardService {...props} />)
    
    // Just verify it renders without error
    expect(screen.getByText('Professional Plumbing Service')).toBeTruthy()
  })
})