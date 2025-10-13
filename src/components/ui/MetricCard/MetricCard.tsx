import React from 'react'
import {
  Box,
  Typography,
  LinearProgress
} from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import styles from './MetricCard.module.scss'

export interface MetricCardProps {
  title: string
  percentage: number
  description: string
  type: 'response' | 'completion'
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  percentage,
  description,
  type
}) => {
  const getIcon = () => {
    switch (type) {
      case 'response':
        return <ChatBubbleOutlineIcon className={styles['metric-card__icon']} />
      case 'completion':
        return <CheckCircleOutlineIcon className={styles['metric-card__icon']} />
      default:
        return null
    }
  }

  return (
    <Box className={styles['metric-card']}>
      <Box className={styles['metric-card__header']}>
        <Typography className={styles['metric-card__title']}>
          {title}
        </Typography>
        {getIcon()}
      </Box>

      <Typography className={styles['metric-card__percentage']}>
        {percentage}%
      </Typography>

      <LinearProgress
        variant="determinate"
        value={percentage}
        className={styles['metric-card__progress']}
      />

      <Typography className={styles['metric-card__description']}>
        {description}
      </Typography>
    </Box>
  )
}

export default MetricCard