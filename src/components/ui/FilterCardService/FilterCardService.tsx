import { Rating } from '@mui/material'
import Button from '@mui/material/Button'
import styles from './FilterCardService.module.scss'

interface FilterCardServiceProps {
  image: string
  title: string
  description: string
  rating: number
  reviews: number
  price: number
  onViewDetails?: () => void
}

const FilterCardService = ({
  image,
  title,
  description,
  rating,
  reviews,
  price,
  onViewDetails
}: FilterCardServiceProps) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <article className={styles['filter-card']} onClick={onViewDetails}>
      <div className={styles['filter-card__image-container']}>
        <img 
          src={image} 
          alt={title} 
          className={styles['filter-card__image']} 
        />
      </div>

      <div className={styles['filter-card__content']}>
        <h3 className={styles['filter-card__title']}>
          {title}
        </h3>
        <p className={styles['filter-card__description']}>
          {description}
        </p>

        <div className={styles['filter-card__rating']}>
          <Rating 
            value={rating} 
            precision={0.5} 
            readOnly 
            size="small"
          />
          <span className={styles['filter-card__reviews']}>
            ({reviews} opiniones)
          </span>
        </div>

        <div className={styles['filter-card__price']}>
          <span className={styles['filter-card__price-value']}>
            {formattedPrice}
          </span>
          <span className={styles['filter-card__price-rate']}>
            COP
          </span>
        </div>

        <div className={styles['filter-card__actions']}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onViewDetails}
            className={styles['filter-card__button']}
            fullWidth
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </article>
  )
}

export default FilterCardService