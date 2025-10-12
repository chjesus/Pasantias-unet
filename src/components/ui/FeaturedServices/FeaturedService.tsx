import { Button } from '@mui/material'
import styles from './FeaturedService.module.scss'

interface ServiceProps {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  onClick?: () => void
}

const FeaturedService = ({
  title,
  description,
  price,
  originalPrice,
  discount,
  image,
  onClick,
}: ServiceProps) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(originalPrice)
    : null

  return (
    <article className={styles['featured-service']}>
      <img
        src={image}
        alt={title}
        className={styles['featured-service__image']}
      />
      <div className={styles['featured-service__content']}>
        <h3 className={styles['featured-service__title']}>{title}</h3>
        <p className={styles['featured-service__description']}>{description}</p>
        
        <div className={styles['featured-service__price-container']}>
          <span className={styles['featured-service__price']}>
            {formattedPrice}
          </span>
          {originalPrice && (
            <span className={styles['featured-service__original-price']}>
              {formattedOriginalPrice}
            </span>
          )}
          {discount && (
            <span className={styles['featured-service__discount']}>
              {discount}% OFF
            </span>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          className={styles['featured-service__button']}
        >
          Ver Servicio
        </Button>
      </div>
    </article>
  )
}

export default FeaturedService