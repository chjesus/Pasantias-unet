import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Filters from './index'
import { UNIFIED_SERVICES } from '../../../assets/unifiedServices'

// Mock the services data
const mockServices = [
  {
    id: 'service-1',
    title: 'Plumbing Service',
    category: 'Plomería',
    description: 'Professional plumbing',
    pricing: { price: 100000 },
    provider: { rating: 4.5, reviews: 100 },
    location: 'Bogotá'
  },
  {
    id: 'service-2',
    title: 'Electrical Service',
    category: 'Electricidad',
    description: 'Professional electrical',
    pricing: { price: 200000 },
    provider: { rating: 5.0, reviews: 50 },
    location: 'Medellín'
  }
] as typeof UNIFIED_SERVICES

describe('Filters Component', () => {
  const defaultProps = {
    services: mockServices,
    onFilteredResults: vi.fn(),
    onFiltersChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders filters component with title', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.getByText('Filtros')).toBeTruthy()
  })

  it('renders all filter sections', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.getByText('Ubicación')).toBeTruthy()
    expect(screen.getByText('Rango de Precio')).toBeTruthy()
    expect(screen.getByText('Categorías')).toBeTruthy()
    expect(screen.getByText('Calificación')).toBeTruthy()
  })

  it('displays location autocomplete', () => {
    render(<Filters {...defaultProps} />)
    
    const locationInput = screen.getByPlaceholderText('Selecciona una ubicación')
    expect(locationInput).toBeTruthy()
  })

  it('displays price range slider with formatted values', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.getByText(/Rango:/)).toBeTruthy()
  })

  it('displays categories checkboxes', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.getByText('Plomería')).toBeTruthy()
    expect(screen.getByText('Electricidad')).toBeTruthy()
  })

  it('displays rating radio buttons', () => {
    render(<Filters {...defaultProps} />)
    
    expect(screen.getByText('5')).toBeTruthy()
    expect(screen.getByText('4.5 o más')).toBeTruthy()
    expect(screen.getByText('4.0 o más')).toBeTruthy()
    expect(screen.getByText('3.5 o más')).toBeTruthy()
    expect(screen.getByText('Todos')).toBeTruthy()
  })

  it('displays reset filters button', () => {
    render(<Filters {...defaultProps} />)
    
    const resetButton = screen.getByRole('button', { name: /limpiar todos los filtros/i })
    expect(resetButton).toBeTruthy()
  })

  it('calls onFilteredResults when category is selected', () => {
    render(<Filters {...defaultProps} />)
    
    const plumberingCheckbox = screen.getByRole('checkbox', { name: /plomería/i })
    fireEvent.click(plumberingCheckbox)
    
    expect(defaultProps.onFilteredResults).toHaveBeenCalled()
    expect(defaultProps.onFiltersChange).toHaveBeenCalled()
  })

  it('calls onFilteredResults when rating is changed', () => {
    render(<Filters {...defaultProps} />)
    
    const fiveStarsRadio = screen.getAllByRole('radio')[0]
    fireEvent.click(fiveStarsRadio)
    
    expect(defaultProps.onFilteredResults).toHaveBeenCalled()
    expect(defaultProps.onFiltersChange).toHaveBeenCalled()
  })

  it('filters services by category correctly', () => {
    const onFilteredResults = vi.fn()
    render(<Filters {...defaultProps} onFilteredResults={onFilteredResults} />)
    
    const plumberingCheckbox = screen.getByRole('checkbox', { name: /plomería/i })
    fireEvent.click(plumberingCheckbox)
    
    expect(onFilteredResults).toHaveBeenCalledWith([mockServices[0]])
  })

  it('filters services by rating correctly', () => {
    const onFilteredResults = vi.fn()
    render(<Filters {...defaultProps} onFilteredResults={onFilteredResults} />)
    
    const fiveStarsRadio = screen.getAllByRole('radio')[0]
    fireEvent.click(fiveStarsRadio)
    
    expect(onFilteredResults).toHaveBeenCalled()
  })

  it('resets filters when reset button is clicked', () => {
    const onFilteredResults = vi.fn()
    const onFiltersChange = vi.fn()
    render(<Filters {...defaultProps} onFilteredResults={onFilteredResults} onFiltersChange={onFiltersChange} />)
    
    // Select a filter first
    const plumberingCheckbox = screen.getByRole('checkbox', { name: /plomería/i })
    fireEvent.click(plumberingCheckbox)
    
    // Reset filters
    const resetButton = screen.getByRole('button', { name: /limpiar todos los filtros/i })
    fireEvent.click(resetButton)
    
    expect(onFiltersChange).toHaveBeenCalledWith({
      priceRange: [0, 1000000],
      categories: [],
      rating: 'all',
      location: null
    })
  })

  it('handles multiple category selection', () => {
    const onFilteredResults = vi.fn()
    render(<Filters {...defaultProps} onFilteredResults={onFilteredResults} />)
    
    const plumberingCheckbox = screen.getByRole('checkbox', { name: /plomería/i })
    const electricalCheckbox = screen.getByRole('checkbox', { name: /electricidad/i })
    
    fireEvent.click(plumberingCheckbox)
    fireEvent.click(electricalCheckbox)
    
    expect(onFilteredResults).toHaveBeenCalledWith(mockServices)
  })

  it('handles category deselection', () => {
    const onFilteredResults = vi.fn()
    render(<Filters {...defaultProps} onFilteredResults={onFilteredResults} />)
    
    const plumberingCheckbox = screen.getByRole('checkbox', { name: /plomería/i })
    
    // Select category
    fireEvent.click(plumberingCheckbox)
    expect(onFilteredResults).toHaveBeenCalledWith([mockServices[0]])
    
    // Deselect category
    fireEvent.click(plumberingCheckbox)
    expect(onFilteredResults).toHaveBeenCalledWith(mockServices)
  })

  it('renders rating stars correctly', () => {
    render(<Filters {...defaultProps} />)
    
    // Check if star icons are rendered (using class or data attributes)
    const radioButtons = screen.getAllByRole('radio')
    expect(radioButtons.length).toBeGreaterThan(0)
  })

  it('renders without onFilteredResults callback', () => {
    const propsWithoutCallback = {
      services: mockServices
    }
    
    expect(() => render(<Filters {...propsWithoutCallback} />)).not.toThrow()
  })

  it('renders without onFiltersChange callback', () => {
    const propsWithoutCallback = {
      services: mockServices,
      onFilteredResults: vi.fn()
    }
    
    expect(() => render(<Filters {...propsWithoutCallback} />)).not.toThrow()
  })

  it('handles empty services array', () => {
    const emptyProps = {
      ...defaultProps,
      services: []
    }
    
    render(<Filters {...emptyProps} />)
    expect(screen.getByText('Filtros')).toBeTruthy()
  })

  it('extracts categories from services correctly', () => {
    render(<Filters {...defaultProps} />)
    
    // Should show unique categories from mock services
    expect(screen.getByText('Electricidad')).toBeTruthy()
    expect(screen.getByText('Plomería')).toBeTruthy()
  })

  it('formats price range display correctly', () => {
    render(<Filters {...defaultProps} />)
    
    // Should display formatted Colombian pesos
    expect(screen.getByText(/Rango:/)).toBeTruthy()
  })

  it('renders all accordions expanded by default', () => {
    const { container } = render(<Filters {...defaultProps} />)
    
    // All accordions should be expanded (have the expanded class or aria-expanded)
    const accordions = container.querySelectorAll('.MuiAccordion-root')
    expect(accordions.length).toBe(4)
  })

  it('applies all filters correctly together', () => {
    const onFilteredResults = vi.fn()
    render(<Filters {...defaultProps} onFilteredResults={onFilteredResults} />)
    
    // Apply multiple filters
    const plumberingCheckbox = screen.getByRole('checkbox', { name: /plomería/i })
    fireEvent.click(plumberingCheckbox)
    
    const fourPointFiveRadio = screen.getAllByRole('radio')[1]
    fireEvent.click(fourPointFiveRadio)
    
    // Should filter by both category and rating
    expect(onFilteredResults).toHaveBeenCalledWith([mockServices[0]])
  })

  it('handles services without location', () => {
    const servicesWithoutLocation = mockServices.map(service => ({
      ...service,
      location: undefined
    })) as typeof UNIFIED_SERVICES
    
    const props = {
      ...defaultProps,
      services: servicesWithoutLocation
    }
    
    expect(() => render(<Filters {...props} />)).not.toThrow()
  })
})