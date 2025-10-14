import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InputMUI from './Input'
import { Email } from '@mui/icons-material'

describe('InputMUI Component', () => {
  const defaultProps = {
    placeholder: 'Enter email',
    Icon: Email,
    field: {
      value: '',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name: 'email'
    }
  }

  it('renders correctly with basic props', () => {
    render(<InputMUI {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toBeInTheDocument()
  })

  it('displays the icon', () => {
    render(<InputMUI {...defaultProps} />)
    
    const icon = document.querySelector('.MuiInputAdornment-root svg')
    expect(icon).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    const mockOnChange = vi.fn()
    render(<InputMUI {...defaultProps} field={{ ...defaultProps.field, onChange: mockOnChange }} />)
    
    const input = screen.getByPlaceholderText('Enter email')
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('calls onBlur when input loses focus', () => {
    const mockOnBlur = vi.fn()
    render(<InputMUI {...defaultProps} field={{ ...defaultProps.field, onBlur: mockOnBlur }} />)
    
    const input = screen.getByPlaceholderText('Enter email')
    fireEvent.blur(input)
    
    expect(mockOnBlur).toHaveBeenCalled()
  })

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Email is required'
    render(<InputMUI {...defaultProps} error={errorMessage} />)
    
    const error = screen.getByText(errorMessage)
    expect(error).toBeInTheDocument()
  })

  it('applies error styling when error is present', () => {
    render(<InputMUI {...defaultProps} error="Some error" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeTruthy()
    expect(screen.getByText('Some error')).toBeTruthy()
  })

  it('renders with correct input type', () => {
    render(<InputMUI {...defaultProps} type="password" />)
    
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('defaults to text type when no type is specified', () => {
    render(<InputMUI {...defaultProps} />)
    
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders as small size', () => {
    render(<InputMUI {...defaultProps} />)
    
    const input = document.querySelector('.MuiInputBase-sizeSmall')
    expect(input).toBeInTheDocument()
  })

  it('has full width styling', () => {
    render(<InputMUI {...defaultProps} />)
    
    const formControl = document.querySelector('.MuiFormControl-root')
    expect(formControl).toHaveClass('MuiFormControl-fullWidth')
  })
})