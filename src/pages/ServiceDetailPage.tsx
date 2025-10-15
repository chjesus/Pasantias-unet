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
  CardContent,
  Alert,
  Snackbar
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
import { getServiceById, type Service } from '../assets/unifiedServices'
import { useCartStore } from '../store/cartStore'
import type { Material } from '../components/ui/MaterialSelector/MaterialSelector'
import { useParams } from 'react-router'
import styles from './ServiceDetailPage.module.scss'
import { formattedPrice } from '@/utils/formattedPrice'

const ServiceDetailPage = () => {
  const { id: serviceId } = useParams<{ id: string }>()
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([])
  const [showAddedAlert, setShowAddedAlert] = useState(false)
  const [isUrgentService, setIsUrgentService] = useState(false)
  const { addItem } = useCartStore()
  
  // Obtener datos del servicio por ID
  const serviceData = serviceId ? getServiceById(serviceId) : null
  
  // Si no se encuentra el servicio o no hay serviceId, mostrar página de error
  if (!serviceId || !serviceData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Servicio no encontrado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {!serviceId 
            ? 'URL de servicio inválida.'
            : 'El servicio que buscas no existe o ha sido eliminado.'
          }
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

  const handleMaterialSelection = (materials: Material[]) => {
    setSelectedMaterials(materials)
  }

  const calculateFinalPrice = () => {
    const basePrice = serviceData?.pricing.price || 0
    return isUrgentService ? basePrice * 1.35 : basePrice
  }

  const handleUrgentServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUrgentService(event.target.checked)
  }

  const handleAddToCart = () => {
    const configuration = selectedMaterials.map(material => material.label)
    if (isUrgentService) {
      configuration.push('Servicio de Urgencia (+35%)')
    }
    
    const cartItem = {
      id: serviceData.id,
      name: serviceData.title,
      quantity: 1,
      price: calculateFinalPrice(),
      currency: serviceData.pricing.currency,
      providerName: serviceData.provider.name,
      image: serviceData.gallery[0] || '/api/placeholder/80/80',
      configuration
    }

    addItem(cartItem)
    setShowAddedAlert(true)
  }

  const displayedReviews = serviceData.reviews.slice(0, visibleReviews)
  const hasMoreReviews = visibleReviews < serviceData.reviews.length

  return (
    <>
      <div className={styles['service-detail']}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box className={styles['service-detail__header']} sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 }, 
            alignItems: 'flex-start',
            mb: 4 
          }}>
            {/* Contenido izquierdo - 60% desktop, 100% mobile */}
            <Box sx={{ 
              flex: { xs: '1 1 100%', md: '0 0 60%' }, 
              pr: { xs: 0, md: 2 },
              order: { xs: 2, md: 1 }
            }}>
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
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                      gap: { xs: 0.5, sm: 1 }
                    }}>
                      <Rating
                        value={serviceData.provider.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography component="span">
                        ({serviceData.provider.reviews} reseñas)
                      </Typography>
                      <Typography component="span" sx={{ 
                        mx: { xs: 0, sm: 1 },
                        display: { xs: 'none', sm: 'inline' }
                      }}>•</Typography>
                      <Typography component="span" sx={{
                        width: { xs: '100%', sm: 'auto' },
                        mt: { xs: 0.5, sm: 0 }
                      }}>
                        12 años de experiencia
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Imagen derecha - 40% desktop, 100% mobile */}
            <Box sx={{ 
              flex: { xs: '1 1 100%', md: '0 0 40%' }, 
              pl: { xs: 0, md: 2 },
              order: { xs: 1, md: 2 }
            }}>
              <Box sx={{
                width: '100%',
                height: { xs: 250, md: 300 },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}>
                <img
                  src={serviceData.gallery[0] || '/api/placeholder/400/300'}
                  alt={serviceData.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>
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
              
              {/* Usar descripción detallada desde los datos unificados */}
              {serviceData.detailedDescription && serviceData.detailedDescription.length > 0 ? (
                serviceData.detailedDescription.map((paragraph: string, index: number) => (
                  <Typography key={index} className={styles['service-detail__section-text']}>
                    {paragraph}
                  </Typography>
                ))
              ) : (
                // Fallback a la descripción básica si no hay descripción detallada
                <Typography className={styles['service-detail__section-text']}>
                  {serviceData.description}
                </Typography>
              )}
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
                  onSelectionChange={handleMaterialSelection}
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
                    {formattedPrice(calculateFinalPrice())}
                  </Typography>
                  <Typography className={styles['service-detail__pricing-currency']}>
                    {serviceData.pricing.currency}
                  </Typography>
                  <Typography className={styles['service-detail__pricing-unit']}>
                    {serviceData.pricing.unit}
                  </Typography>
                </Box>

                {isUrgentService && (
                  <Box sx={{ 
                    mt: 1, 
                    p: 1, 
                    backgroundColor: 'warning.light', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'warning.main'
                  }}>
                    <Typography variant="body2" sx={{ 
                      color: 'warning.contrastText',
                      fontWeight: 500,
                      textAlign: 'center'
                    }}>
                      🚨 Servicio de urgencia: +35% ({formattedPrice(serviceData.pricing.price * 0.35)})
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: 'warning.contrastText',
                      display: 'block',
                      textAlign: 'center',
                      mt: 0.5
                    }}>
                      Precio base: {formattedPrice(serviceData.pricing.price)}
                    </Typography>
                  </Box>
                )}

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
                    checked={isUrgentService}
                    onChange={handleUrgentServiceChange}
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
                  onClick={handleAddToCart}
                >
                  Agregar al Carrito
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
                {displayedReviews.map((review: Service['reviews'][0], index: number) => (
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

      {/* Snackbar para mostrar mensaje de agregado al carrito */}
      <Snackbar
        open={showAddedAlert}
        autoHideDuration={3000}
        onClose={() => setShowAddedAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowAddedAlert(false)}
          severity="success"
          variant="filled"
        >
          ¡Servicio agregado al carrito exitosamente!
        </Alert>
      </Snackbar>
    </>
  )
}

export default ServiceDetailPage