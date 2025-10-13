import React from 'react'
import {
  Avatar,
  Box,
  Rating,
  Typography
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import styles from './ReviewCard.module.scss'

export interface ReviewCardProps {
  userName: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  rating,
  comment,
  date,
  avatar
}) => {
  return (
    <Box className={styles['review-card']}>
      <Box className={styles['review-card__header']}>
        <Avatar
          src={avatar}
          alt={userName}
          className={styles['review-card__avatar']}
        >
          {!avatar && <PersonIcon />}
        </Avatar>
        
        <Box className={styles['review-card__info']}>
          <Typography className={styles['review-card__name']}>
            {userName}
          </Typography>
          <Typography className={styles['review-card__date']}>
            {date}
          </Typography>
        </Box>
      </Box>

      <Box className={styles['review-card__rating']}>
        <Rating
          value={rating}
          precision={0.5}
          readOnly
          size="small"
          className={styles['review-card__stars']}
        />
      </Box>

      <Typography className={styles['review-card__comment']}>
        {comment}
      </Typography>
    </Box>
  )
}

export default ReviewCard