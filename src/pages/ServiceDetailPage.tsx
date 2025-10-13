import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Rating,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Card,
  CardContent
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ReviewCard from '../components/ui/ReviewCard'
import MetricCard from '../components/ui/MetricCard'
import MaterialSelector from '../components/ui/MaterialSelector'
import ServiceGallery from '../components/ui/ServiceGallery'
import { getServiceById, type ServiceData } from '../assets/mockServiceData'
import styles from './ServiceDetailPage.module.scss'
import { formattedPrice } from '@/utils/formattedPrice'

interface ServiceDetailPageProps {
  serviceId?: string
}

const ServiceDetailPage = ({ serviceId = '1' }: ServiceDetailPageProps) => {
  const [visibleReviews, setVisibleReviews] = useState(3)
  
  // Obtener datos del servicio por ID
  const serviceData = getServiceById(serviceId)
  
  // Si no se encuentra el servicio, mostrar página de error o redireccionar
  if (!serviceData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Servicio no encontrado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          El servicio que buscas no existe o ha sido eliminado.
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => window.history.back()}
        >
          Volver atrás
        </Button>
      </Container>
    )
  }

  const handleLoadMore = () => {
    setVisibleReviews(prev => prev + 3)
  }

  const displayedReviews = serviceData.reviews.slice(0, visibleReviews)
  const hasMoreReviews = visibleReviews < serviceData.reviews.length

  return (
    <>
      <div className={styles['service-detail']}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box className={styles['service-detail__header']}>
            <Typography
              component="h1"
              className={styles['service-detail__title']}
            >
              {serviceData.title}
            </Typography>
      
            <Typography
              component="p"
              className={styles['service-detail__description']}
            >
              {serviceData.description}
            </Typography>
      
            <Box className={styles['service-detail__provider']}>
              <Avatar
                src={serviceData.provider.image}
                alt={serviceData.provider.name}
                className={styles['service-detail__provider-avatar']}
              />
              <Box className={styles['service-detail__provider-info']}>
                <Typography className={styles['service-detail__provider-name']}>
                  {serviceData.provider.name}
                </Typography>
                <Box className={styles['service-detail__provider-meta']}>
                  <Rating
                    value={serviceData.provider.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography component="span">
                    ({serviceData.provider.reviews} reseñas)
                  </Typography>
                  <Typography component="span" sx={{ mx: 1 }}>•</Typography>
                  <Typography component="span">
                    12 años de experiencia
                  </Typography>
                </Box>
              </Box>
            </Box>
      
            <Box className={styles['service-detail__actions']}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={styles['service-detail__button']}
                endIcon={<ArrowForwardIcon />}
              >
                Contratar Servicio
              </Button>
              <Button
                variant="outlined"
                size="large"
                className={styles['service-detail__button']}
              >
                Solicitar Presupuesto
              </Button>
            </Box>
          </Box>

          {/* Description */}
          <Box className={styles['service-detail__content']}>
            <div className={styles['service-detail__section']}>
              <Typography
                component="h2"
                className={styles['service-detail__section-title']}
              >
                Descripción del Servicio
              </Typography>
              
              <Typography className={styles['service-detail__section-text']}>
                En ClimaPro Solutions, somos especialistas en la instalación y mantenimiento de todo tipo de sistemas de
                climatización, desde equipos residenciales hasta soluciones industriales. Nos comprometemos a ofrecer un servicio de
                máxima calidad, garantizando la eficiencia energética y el confort en sus espacios.
              </Typography>

              <Typography className={styles['service-detail__section-text']}>
                Nuestro equipo técnico está altamente cualificado y cuenta con las certificaciones más recientes del sector. Utilizamos
                solo materiales de primera calidad y las últimas tecnologías para asegurar la durabilidad y el rendimiento óptimo de su
                sistema.
              </Typography>

              <Typography className={styles['service-detail__section-text']}>
                Ofrecemos soluciones personalizadas adaptadas a sus necesidades, incluyendo la instalación de sistemas split,
                multisplit, conductos, aerotermia y suelo radiante. Realizamos diagnósticos precisos, reparaciones eficientes y
                mantenimientos preventivos que prolongan la vida útil de sus equipos.
              </Typography>
            </div>
          </Box>

          {/* Details */}
          <Box className={styles['service-detail__content']}>
            <div className={styles['service-detail__section']}>
              <Typography
                component="h2"
                className={styles['service-detail__section-title']}
              >
                Detalles del Servicio
              </Typography>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="incluye-content"
                  id="incluye-header"
                >
                  <Typography>¿Qué incluye este servicio?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={styles['service-detail__list']}>
                    {serviceData.details.incluye.map((item: string, index: number) => (
                      <li key={index} className={styles['service-detail__list-item']}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="no-incluye-content"
                  id="no-incluye-header"
                >
                  <Typography>¿Qué no incluye este servicio?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul className={styles['service-detail__list']}>
                    {serviceData.details.noIncluye.map((item: string, index: number) => (
                      <li key={index} className={styles['service-detail__list-item']}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>

          {/* Four Cards Grid Section */}
          <Box className={styles['service-detail__four-cards-container']}>
            {/* Materials Card - Top Left */}
            <Card className={styles['service-detail__materials-card']}>
              <CardContent>
                <MaterialSelector
                  availableMaterials={serviceData.materials}
                  title="Materiales del Servicio"
                  maxSelections={5}
                  onSelectionChange={(selectedMaterials) => {
                    console.log('Materiales seleccionados:', selectedMaterials)
                  }}
                />
                
                <Box className={styles['service-detail__duration-info']}>
                  <AccessTimeIcon className={styles['service-detail__duration-icon']} />
                  <Typography className={styles['service-detail__duration-text']}>
                    Duración Estimada: {serviceData.pricing.estimatedDuration}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Pricing Card - Top Right */}
            <Card className={styles['service-detail__pricing-card']}>
              <CardContent>
                <Box className={styles['service-detail__pricing-header']}>
                  <AttachMoneyIcon className={styles['service-detail__pricing-icon']} />
                  <Typography
                    component="h3"
                    className={styles['service-detail__card-title']}
                  >
                    Precio y Tarifas
                  </Typography>
                </Box>

                <Box className={styles['service-detail__pricing-main']}>
                  <Typography className={styles['service-detail__pricing-amount']}>
                    {formattedPrice(serviceData.pricing.price)}
                  </Typography>
                  <Typography className={styles['service-detail__pricing-currency']}>
                    {serviceData.pricing.currency}
                  </Typography>
                  <Typography className={styles['service-detail__pricing-unit']}>
                    {serviceData.pricing.unit}
                  </Typography>
                </Box>

                <Typography className={styles['service-detail__pricing-original']}>
                  Precio original: {formattedPrice(serviceData.pricing.originalPrice)}
                </Typography>

                <Box className={styles['service-detail__promotions']}>
                  <Box className={styles['service-detail__promotions-header']}>
                    <LocalOfferIcon className={styles['service-detail__promotions-icon']} />
                    <Typography className={styles['service-detail__promotions-title']}>
                      Promociones:
                    </Typography>
                  </Box>
                  <ul className={styles['service-detail__promotions-list']}>
                    {serviceData.pricing.promotions.map((promo: string, index: number) => (
                      <li key={index} className={styles['service-detail__promotions-item']}>
                        {promo}
                      </li>
                    ))}
                  </ul>
                </Box>

                <Box className={styles['service-detail__urgent-service']}>
                  <FlashOnIcon className={styles['service-detail__urgent-icon']} />
                  <Typography className={styles['service-detail__urgent-label']}>
                    Servicio de Urgencia
                  </Typography>
                  <Switch
                    checked={serviceData.pricing.urgentService}
                    className={styles['service-detail__urgent-switch']}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  className={styles['service-detail__add-service-button']}
                  sx={{ mt: 2 }}
                >
                  Agregar servicio
                </Button>
              </CardContent>
            </Card>

            {/* Image Card - Bottom Left */}
            <Card className={styles['service-detail__image-card']}>
              <CardContent>
                <ServiceGallery 
                  images={serviceData.gallery}
                  title="Galería del Servicio"
                />
              </CardContent>
            </Card>

            {/* Additional Info Card - Bottom Right */}
            <Card className={styles['service-detail__additional-info-card']}>
              <CardContent>
                <Typography
                  component="h3"
                  className={styles['service-detail__card-title']}
                >
                  Información Adicional
                </Typography>

                <Box className={styles['service-detail__info-item']}>
                  <Box className={styles['service-detail__info-icon']}>
                    🛡️
                  </Box>
                  <Box>
                    <Typography className={styles['service-detail__info-item-title']}>
                      {serviceData.additionalInfo.warranty.title}
                    </Typography>
                    <Typography className={styles['service-detail__info-item-description']}>
                      {serviceData.additionalInfo.warranty.description}
                    </Typography>
                  </Box>
                </Box>

                <Box className={styles['service-detail__info-item']}>
                  <Box className={styles['service-detail__info-icon']}>
                    💳
                  </Box>
                  <Box>
                    <Typography className={styles['service-detail__info-item-title']}>
                      {serviceData.additionalInfo.paymentMethods.title}
                    </Typography>
                    <Typography className={styles['service-detail__info-item-description']}>
                      {serviceData.additionalInfo.paymentMethods.description}
                    </Typography>
                  </Box>
                </Box>

                <Box className={styles['service-detail__info-item']}>
                  <Box className={styles['service-detail__info-icon']}>
                    📋
                  </Box>
                  <Box>
                    <Typography className={styles['service-detail__info-item-title']}>
                      {serviceData.additionalInfo.clientTypes.title}
                    </Typography>
                    <Typography className={styles['service-detail__info-item-description']}>
                      {serviceData.additionalInfo.clientTypes.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Reviews and Metrics Section */}
          <Box className={styles['service-detail__reviews-metrics-container']}>
            {/* Reviews Section */}
            <Box className={styles['service-detail__reviews-section']}>
              <Typography
                component="h2"
                className={styles['service-detail__section-title']}
              >
                Reseñas de Clientes
              </Typography>
              
              <Box className={styles['service-detail__reviews']}>
                {displayedReviews.map((review: ServiceData['reviews'][0], index: number) => (
                  <ReviewCard
                    key={index}
                    userName={review.userName}
                    rating={review.rating}
                    comment={review.comment}
                    date={review.date}
                    avatar={review.avatar}
                  />
                ))}
              </Box>

              {hasMoreReviews && (
                <Box className={styles['service-detail__load-more']}>
                  <Button
                    variant="outlined"
                    onClick={handleLoadMore}
                    className={styles['service-detail__load-more-button']}
                  >
                    Ver más reseñas
                  </Button>
                </Box>
              )}
            </Box>

            {/* Metrics Section */}
            <Box className={styles['service-detail__metrics-section']}>
              <MetricCard
                title={serviceData.metrics.responseRate.title}
                percentage={serviceData.metrics.responseRate.percentage}
                description={serviceData.metrics.responseRate.description}
                type="response"
              />
              
              <MetricCard
                title={serviceData.metrics.completionRate.title}
                percentage={serviceData.metrics.completionRate.percentage}
                description={serviceData.metrics.completionRate.description}
                type="completion"
              />
            </Box>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default ServiceDetailPage