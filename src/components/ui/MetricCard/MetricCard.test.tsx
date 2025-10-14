import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MetricCard from './MetricCard'
import type { MetricCardProps } from './MetricCard'

describe('MetricCard Component', () => {
  const defaultProps: MetricCardProps = {
    title: 'Response Rate',
    percentage: 95,
    description: 'Average response time within 24 hours',
    type: 'response'
  }

  it('renders correctly with all props', () => {
    render(<MetricCard {...defaultProps} />)
    
    expect(screen.getByText('Response Rate')).toBeTruthy()
    expect(screen.getByText('95%')).toBeTruthy()
    expect(screen.getByText('Average response time within 24 hours')).toBeTruthy()
  })

  it('displays title correctly', () => {
    render(<MetricCard {...defaultProps} />)
    const title = screen.getByText('Response Rate')
    expect(title).toBeTruthy()
  })

  it('displays percentage correctly', () => {
    render(<MetricCard {...defaultProps} />)
    const percentage = screen.getByText('95%')
    expect(percentage).toBeTruthy()
  })

  it('displays description correctly', () => {
    render(<MetricCard {...defaultProps} />)
    const description = screen.getByText('Average response time within 24 hours')
    expect(description).toBeTruthy()
  })

  it('renders response icon for response type', () => {
    const { container } = render(<MetricCard {...defaultProps} type="response" />)
    const responseIcon = container.querySelector('[data-testid="ChatBubbleOutlineIcon"]')
    expect(responseIcon).toBeTruthy()
  })

  it('renders completion icon for completion type', () => {
    const { container } = render(<MetricCard {...defaultProps} type="completion" />)
    const completionIcon = container.querySelector('[data-testid="CheckCircleOutlineIcon"]')
    expect(completionIcon).toBeTruthy()
  })

  it('renders linear progress bar', () => {
    const { container } = render(<MetricCard {...defaultProps} />)
    const progressBar = container.querySelector('.MuiLinearProgress-root')
    expect(progressBar).toBeTruthy()
  })

  it('sets correct progress value', () => {
    const { container } = render(<MetricCard {...defaultProps} percentage={75} />)
    const progressBar = container.querySelector('.MuiLinearProgress-bar')
    expect(progressBar).toBeTruthy()
  })

  it('handles 0% percentage', () => {
    render(<MetricCard {...defaultProps} percentage={0} />)
    expect(screen.getByText('0%')).toBeTruthy()
  })

  it('handles 100% percentage', () => {
    render(<MetricCard {...defaultProps} percentage={100} />)
    expect(screen.getByText('100%')).toBeTruthy()
  })

  it('handles different titles', () => {
    const props = { ...defaultProps, title: 'Completion Rate' }
    render(<MetricCard {...props} />)
    expect(screen.getByText('Completion Rate')).toBeTruthy()
  })

  it('handles different descriptions', () => {
    const props = { ...defaultProps, description: 'Tasks completed successfully' }
    render(<MetricCard {...props} />)
    expect(screen.getByText('Tasks completed successfully')).toBeTruthy()
  })

  it('handles decimal percentages', () => {
    const props = { ...defaultProps, percentage: 87.5 }
    render(<MetricCard {...props} />)
    expect(screen.getByText('87.5%')).toBeTruthy()
  })

  it('renders with completion type', () => {
    const props: MetricCardProps = {
      title: 'Completion Rate',
      percentage: 88,
      description: 'Projects completed on time',
      type: 'completion'
    }
    render(<MetricCard {...props} />)
    
    expect(screen.getByText('Completion Rate')).toBeTruthy()
    expect(screen.getByText('88%')).toBeTruthy()
  })
})