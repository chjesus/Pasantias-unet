import { Container, Typography, Box } from '@mui/material'
import PlumbingIcon from '@mui/icons-material/Plumbing'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import HandymanIcon from '@mui/icons-material/Handyman'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import HomeIcon from '@mui/icons-material/Home'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import YardIcon from '@mui/icons-material/Yard'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import DevicesIcon from '@mui/icons-material/Devices'
import FeaturedService from '../components/ui/FeaturedServices/FeaturedService'
import ServiceCard from '../components/ui/ServiceCard/ServiceCard'
import { AVAILABLE_CATEGORIES, UNIFIED_SERVICES } from '../assets/unifiedServices'
import styles from './ServicesPage.module.scss'
import { Fragment } from 'react/jsx-runtime'
import { useNavigate } from 'react-router'
import { routesDashboard } from '@/routes/dashboardRoutes'

const ServicesPage = () => {
  const navigate = useNavigate()

  // Tomar los primeros 4 servicios como destacados
  const featuredServices = UNIFIED_SERVICES.slice(0, 4)
  
  // Categorías disponibles
  const availableCategories = AVAILABLE_CATEGORIES
  
  // Organizar servicios por categorías - exactamente 4 servicios por categoría
  const servicesByCategory = availableCategories.map(category => ({
    id: category.toLowerCase().replace(/\s+/g, '-'),
    title: category,
    description: `Servicios profesionales de ${category.toLowerCase()}`,
    icon: getCategoryIcon(category),
    services: UNIFIED_SERVICES.filter(service => service.category === category).slice(0, 4) // exactamente 4 por categoría
  })).filter(category => category.services.length > 0) // solo categorías con servicios

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'Hogar': return <HomeIcon />
      case 'Plomería': return <PlumbingIcon />
      case 'Electricidad': return <ElectricalServicesIcon />
      case 'Carpintería': return <HandymanIcon />
      case 'Pintura': return <FormatPaintIcon />
      case 'Jardinería': return <YardIcon />
      case 'Limpieza': return <CleaningServicesIcon />
      case 'Electrodomésticos': return <DevicesIcon />
      case 'Seguridad': return <LockOpenIcon />
      default: return <HandymanIcon />
    }
  }

  const handleServiceClick = (serviceId: string) => {
    navigate(routesDashboard.serviceDetail(serviceId))
  }

  return (
    <Fragment>
      <Box component="div" className={styles.services}>
        {/* Hero Section */}
        <Container
          component="section"
          maxWidth={false}
          className={styles.services__hero}
          disableGutters
        >
          <div className={styles['services__hero-content']}>
            <Typography
              variant="h1"
              component="h1"
              className={styles.services__title}
            >
              Servicios Profesionales para tu Hogar
            </Typography>
            <Typography
              variant="h5"
              component="p"
              className={styles.services__subtitle}
            >
              Expertos calificados para todas tus necesidades
            </Typography>
          </div>
        </Container>

        {/* Highlighted Content */}
        <Container component="main" className={styles.services__main}>
          <div className={styles['services__section-header']}>
            <Typography
              variant="h2"
              component="h2"
              className={styles['services__section-title']}
            >
              Servicios Destacados
            </Typography>
          </div>

          <div className={styles.services__grid}>
            {featuredServices.map((service) => (
              <div key={service.id} className={styles['services__grid-item']}>
                <FeaturedService
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  price={service.pricing.price}
                  originalPrice={service.pricing.originalPrice}
                  onClick={() => handleServiceClick(service.id)}
                />
              </div>
            ))}
          </div>

          {/* Service Categories */}
          {servicesByCategory.map((category) => (
            <section
              key={category.id}
              className={styles['services__category-section']}
            >
              <div className={styles['services__section-header']}>
                <Typography
                  variant="h2"
                  component="h2"
                  className={styles['services__section-title']}
                >
                  <Box
                    component="span"
                    className={styles['services__category-icon']}
                  >
                    {category.icon}
                  </Box>
                  {category.title}
                </Typography>
              </div>

              <div className={styles['services__category-grid']}>
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    className={styles['services__grid-item']}
                  >
                    <ServiceCard
                      id={service.id}
                      title={service.title}
                      provider={service.provider.name}
                      rating={service.rating}
                      price={service.pricing.price}
                      image={service.image}
                      onClick={() => handleServiceClick(service.id)}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </Container>
      </Box>
    </Fragment>
  )
}

export default ServicesPage
