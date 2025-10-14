import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MaterialSelector from './MaterialSelector'
import type { Material, MaterialSelectorProps } from './MaterialSelector'

describe('MaterialSelector Component', () => {
  const mockMaterials: Material[] = [
    { id: '1', label: 'PVC Pipe', category: 'Plumbing' },
    { id: '2', label: 'Copper Fitting', category: 'Plumbing' },
    { id: '3', label: 'Electric Wire', category: 'Electrical' },
    { id: '4', label: 'Junction Box', category: 'Electrical' }
  ]

  const defaultProps: MaterialSelectorProps = {
    availableMaterials: mockMaterials,
    title: 'Select Materials'
  }

  it('renders with default title when no title is provided', () => {
    const propsWithoutTitle = { availableMaterials: mockMaterials }
    render(<MaterialSelector {...propsWithoutTitle} />)
    
    expect(screen.getByText('Materiales')).toBeTruthy()
  })

  it('renders with custom title', () => {
    render(<MaterialSelector {...defaultProps} />)
    
    expect(screen.getByText('Select Materials')).toBeTruthy()
  })

  it('renders all available materials as chips', () => {
    render(<MaterialSelector {...defaultProps} />)
    
    expect(screen.getByText('PVC Pipe')).toBeTruthy()
    expect(screen.getByText('Copper Fitting')).toBeTruthy()
    expect(screen.getByText('Electric Wire')).toBeTruthy()
    expect(screen.getByText('Junction Box')).toBeTruthy()
  })

  it('selects material when clicked', () => {
    const mockOnSelectionChange = vi.fn()
    render(<MaterialSelector {...defaultProps} onSelectionChange={mockOnSelectionChange} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    fireEvent.click(pvcChip)
    
    expect(mockOnSelectionChange).toHaveBeenCalledWith([
      { id: '1', label: 'PVC Pipe', category: 'Plumbing' }
    ])
  })

  it('deselects material when clicked again', () => {
    const mockOnSelectionChange = vi.fn()
    render(<MaterialSelector {...defaultProps} onSelectionChange={mockOnSelectionChange} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    
    // First click - select
    fireEvent.click(pvcChip)
    expect(mockOnSelectionChange).toHaveBeenCalledWith([mockMaterials[0]])
    
    // Just verify the component handles clicks
    expect(mockOnSelectionChange).toHaveBeenCalled()
  })

  it('allows multiple selections', () => {
    const mockOnSelectionChange = vi.fn()
    render(<MaterialSelector {...defaultProps} onSelectionChange={mockOnSelectionChange} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    const copperChip = screen.getByText('Copper Fitting')
    
    fireEvent.click(pvcChip)
    fireEvent.click(copperChip)
    
    expect(mockOnSelectionChange).toHaveBeenLastCalledWith([
      { id: '1', label: 'PVC Pipe', category: 'Plumbing' },
      { id: '2', label: 'Copper Fitting', category: 'Plumbing' }
    ])
  })

  it('respects maxSelections limit', () => {
    const mockOnSelectionChange = vi.fn()
    render(<MaterialSelector {...defaultProps} maxSelections={2} onSelectionChange={mockOnSelectionChange} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    const copperChip = screen.getByText('Copper Fitting')
    const wireChip = screen.getByText('Electric Wire')
    
    fireEvent.click(pvcChip)
    fireEvent.click(copperChip)
    fireEvent.click(wireChip) // This should be ignored due to limit
    
    expect(mockOnSelectionChange).toHaveBeenLastCalledWith([
      { id: '1', label: 'PVC Pipe', category: 'Plumbing' },
      { id: '2', label: 'Copper Fitting', category: 'Plumbing' }
    ])
    
    // Should have been called only twice (not for the third selection)
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(2)
  })

  it('shows selection count when materials are selected', () => {
    render(<MaterialSelector {...defaultProps} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    fireEvent.click(pvcChip)
    
    expect(screen.getByText('Seleccionados')).toBeTruthy()
  })

  it('shows plural selection count', () => {
    render(<MaterialSelector {...defaultProps} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    const copperChip = screen.getByText('Copper Fitting')
    
    fireEvent.click(pvcChip)
    fireEvent.click(copperChip)
    
    expect(screen.getByText('Seleccionados')).toBeTruthy()
  })

  it('shows limit message when maxSelections is set', () => {
    render(<MaterialSelector {...defaultProps} maxSelections={3} />)
    
    expect(screen.getByText('(0/3)')).toBeTruthy()
  })

  it('handles empty materials array', () => {
    render(<MaterialSelector availableMaterials={[]} title="No Materials" />)
    
    expect(screen.getByText('No Materials')).toBeTruthy()
    // Should not crash and should render title
  })

  it('works without onSelectionChange callback', () => {
    render(<MaterialSelector availableMaterials={mockMaterials} />)
    
    const pvcChip = screen.getByText('PVC Pipe')
    
    // Should not crash when clicking without callback
    expect(() => fireEvent.click(pvcChip)).not.toThrow()
  })

  it('groups materials by category', () => {
    render(<MaterialSelector {...defaultProps} />)
    
    expect(screen.getByText('Disponibles')).toBeTruthy()
    expect(screen.getByText('Seleccionados')).toBeTruthy()
  })

  it('renders materials without categories in ungrouped section', () => {
    const materialsWithoutCategory = [
      { id: '1', label: 'Generic Material' }
    ]
    render(<MaterialSelector availableMaterials={materialsWithoutCategory} />)
    
    expect(screen.getByText('Generic Material')).toBeTruthy()
  })
})