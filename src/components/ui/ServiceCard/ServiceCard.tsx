import { Button, Rating } from '@mui/material'
import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
  id: string
  title: string
  provider: string
  rating: number
  price: number
  image: string
  onClick?: () => void
}

const ServiceCard = ({
  title,
  provider,
  rating,
  price,
  image,
  onClick,
}: ServiceCardProps) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <article className={styles['service-card']}>
      <img
        src={image}
        alt={title}
        className={styles['service-card__image']}
      />
      
      <div className={styles['service-card__content']}>
        <span className={styles['service-card__provider']}>
          Por: {provider}
        </span>
        
        <h3 className={styles['service-card__title']}>
          {title}
        </h3>

        <div className={styles['service-card__rating']}>
          <Rating 
            value={rating} 
            precision={0.5} 
            readOnly 
            size="small"
          />
          <span className={styles['service-card__rating-score']}>
            ({rating.toFixed(1)})
          </span>
        </div>

        <div className={styles['service-card__price']}>
          <span className={styles['service-card__price-amount']}>
            {formattedPrice}
          </span>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onClick}
            className={styles['service-card__button']}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard