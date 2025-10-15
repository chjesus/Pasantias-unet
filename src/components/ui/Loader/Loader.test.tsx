import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Loader from './Loader'

describe('Loader Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Loader />)
    expect(container.firstChild).toBeTruthy()
  })

  it('contains LinearProgress component', () => {
    const { container } = render(<Loader />)
    const progressBar = container.querySelector('.MuiLinearProgress-root')
    expect(progressBar).toBeTruthy()
  })

  it('has primary color', () => {
    const { container } = render(<Loader />)
    const progressBar = container.querySelector('.MuiLinearProgress-colorPrimary')
    expect(progressBar).toBeTruthy()
  })

  it('renders with wrapper', () => {
    const { container } = render(<Loader />)
    expect(container.firstChild).toBeTruthy()
  })
})