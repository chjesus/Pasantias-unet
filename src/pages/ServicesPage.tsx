import { Container, Typography, Box } from '@mui/material'
import PlumbingIcon from '@mui/icons-material/Plumbing'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import HandymanIcon from '@mui/icons-material/Handyman'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import FeaturedService from '../components/ui/FeaturedServices/FeaturedService'
import ServiceCard from '../components/ui/ServiceCard/ServiceCard'
import { featuredServices, serviceCategories } from '../assets/mockData'
import styles from './ServicesPage.module.scss'
import { Fragment } from 'react/jsx-runtime'
import Header from '@/components/layout/Dashboard/Header'
// import { useNavigate } from 'react-router-dom'

const ServicesPage = () => {
  // Temporarily disabled until Router is configured
  // const navigate = useNavigate()

  const handleServiceClick = (serviceId: string) => {
    console.log('Service clicked:', serviceId)
    // Will be implemented when Router is configured:
    // navigate(`/services/${serviceId}`)
  }

  return (
    <Fragment>
      <Header />
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
                  {...service}
                  onClick={() => handleServiceClick(service.id)}
                />
              </div>
            ))}
          </div>

          {/* Service Categories */}
          {serviceCategories.map((category) => (
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
                    {category.icon === 'plumbing' && <PlumbingIcon />}
                    {category.icon === 'electric' && <ElectricalServicesIcon />}
                    {category.icon === 'carpenter' && <HandymanIcon />}
                    {category.icon === 'lock' && <LockOpenIcon />}
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
                      {...service}
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
