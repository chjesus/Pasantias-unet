import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ReviewCard from './ReviewCard'
import type { ReviewCardProps } from './ReviewCard'

describe('ReviewCard Component', () => {
  const defaultProps: ReviewCardProps = {
    userName: 'John Doe',
    rating: 4.5,
    comment: 'Great service! Very satisfied with the quality.',
    date: '2024-01-15',
    avatar: '/avatar.jpg'
  }

  it('renders correctly with all props', () => {
    render(<ReviewCard {...defaultProps} />)
    
    expect(screen.getByText('John Doe')).toBeTruthy()
    expect(screen.getByText('Great service! Very satisfied with the quality.')).toBeTruthy()
    expect(screen.getByText('2024-01-15')).toBeTruthy()
  })

  it('displays user name correctly', () => {
    render(<ReviewCard {...defaultProps} />)
    const userName = screen.getByText('John Doe')
    expect(userName).toBeTruthy()
  })

  it('displays comment correctly', () => {
    render(<ReviewCard {...defaultProps} />)
    const comment = screen.getByText('Great service! Very satisfied with the quality.')
    expect(comment).toBeTruthy()
  })

  it('displays date correctly', () => {
    render(<ReviewCard {...defaultProps} />)
    const date = screen.getByText('2024-01-15')
    expect(date).toBeTruthy()
  })

  it('renders avatar with provided image', () => {
    render(<ReviewCard {...defaultProps} />)
    const avatar = screen.getByAltText('John Doe')
    expect(avatar).toBeTruthy()
    expect(avatar.getAttribute('src')).toBe('/avatar.jpg')
  })

  it('renders PersonIcon when no avatar is provided', () => {
    const propsWithoutAvatar = { ...defaultProps, avatar: undefined }
    const { container } = render(<ReviewCard {...propsWithoutAvatar} />)
    
    const personIcon = container.querySelector('[data-testid="PersonIcon"]')
    expect(personIcon).toBeTruthy()
  })

  it('renders rating component', () => {
    const { container } = render(<ReviewCard {...defaultProps} />)
    const rating = container.querySelector('.MuiRating-root')
    expect(rating).toBeTruthy()
  })

  it('displays correct rating value', () => {
    const { container } = render(<ReviewCard {...defaultProps} />)
    const ratingStars = container.querySelectorAll('.MuiRating-icon')
    expect(ratingStars.length).toBeGreaterThan(0)
  })

  it('rating is read-only', () => {
    const { container } = render(<ReviewCard {...defaultProps} />)
    const rating = container.querySelector('.Mui-readOnly')
    expect(rating).toBeTruthy()
  })

  it('uses small size for rating', () => {
    const { container } = render(<ReviewCard {...defaultProps} />)
    const rating = container.querySelector('.MuiRating-sizeSmall')
    expect(rating).toBeTruthy()
  })

  it('handles different rating values', () => {
    const props = { ...defaultProps, rating: 5 }
    render(<ReviewCard {...props} />)
    // Just verify it renders without error with different rating
    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  it('handles long comments', () => {
    const longComment = 'This is a very long comment that should still render correctly and not break the component layout. '.repeat(3)
    const props = { ...defaultProps, comment: longComment }
    const { container } = render(<ReviewCard {...props} />)
    
    expect(container.textContent).toContain(longComment)
  })

  it('handles special characters in user name', () => {
    const props = { ...defaultProps, userName: 'José María Ñoño' }
    render(<ReviewCard {...props} />)
    
    expect(screen.getByText('José María Ñoño')).toBeTruthy()
  })
})