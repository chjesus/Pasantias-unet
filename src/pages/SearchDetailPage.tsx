import { useState, useEffect } from 'react'
import { Container, Skeleton, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { MOCK_SERVICES } from '../assets/mocks/services.mock'
import FilterCardService from '../components/ui/FilterCardService'
import Filters from '../components/ui/Filters'
import type { FiltersProps } from '../components/ui/Filters'
import styles from './SearchDetailPage.module.scss'

type FiltersState = Parameters<NonNullable<FiltersProps['onFiltersChange']>>[0]
const SearchDetailPage = () => {
  const { text } = useParams<{ text: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState(MOCK_SERVICES)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      const filteredServices =
        text && text.trim().length > 0
          ? MOCK_SERVICES.filter(
              (service) =>
                service.title.toLowerCase().includes(text.toLowerCase()) ||
                service.description.toLowerCase().includes(text.toLowerCase())
            )
          : MOCK_SERVICES

      setServices(filteredServices)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [text])
  const handleViewDetails = (serviceId: string) => {
    console.log('Ver detalles:', serviceId)
    navigate(`/services/${serviceId}`)
  }

  const handleFiltersChange = (filters: FiltersState) => {
    console.log('Filtros actualizados:', filters)
    // TODO: Implementar la lógica de filtrado
  }

  const renderSkeletonCards = () => (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={`skeleton-${index}`} className={styles.search__item}>
          <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ mb: 2 }}
            />
            <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="30%" height={24} />
            </Box>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={36}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="rectangular" width="100%" height={36} />
          </Box>
        </div>
      ))}
    </>
  )

  return (
    <Container component="main" className={styles.search}>
      <div className={styles.search__content}>
        <Filters onFiltersChange={handleFiltersChange} />
        <div className={styles.search__results}>
          <div className={styles.search__grid}>
            {isLoading
              ? renderSkeletonCards()
              : services.map((service) => (
                  <div key={service.id} className={styles.search__item}>
                    <FilterCardService
                      {...service}
                      onViewDetails={() => handleViewDetails(service.id)}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SearchDetailPage
