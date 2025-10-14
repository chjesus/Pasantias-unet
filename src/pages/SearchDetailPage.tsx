import { useState, useEffect, useCallback } from 'react'
import { Container, Skeleton, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { UNIFIED_SERVICES } from '../assets/unifiedServices'
import FilterCardService from '../components/ui/FilterCardService'
import Filters from '../components/ui/Filters'
import styles from './SearchDetailPage.module.scss'

const SearchDetailPage = () => {
  const { text } = useParams<{ text: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(UNIFIED_SERVICES)
  const [filteredServices, setFilteredServices] = useState(UNIFIED_SERVICES)

  useEffect(() => {
    setIsLoading(true)
    
    const timeoutId = setTimeout(() => {
      const results = UNIFIED_SERVICES.filter(service =>
        service.title.toLowerCase().includes(text?.toLowerCase() || '')
      )
      
      setSearchResults(results)
      setFilteredServices(results)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [text])

  const handleViewDetails = (serviceId: string) => {
    console.log('Ver detalles:', serviceId)
    navigate(`/services/${serviceId}`)
  }

  const handleFilteredResults = useCallback((filtered: typeof UNIFIED_SERVICES) => {
    setFilteredServices(filtered)
  }, [])

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
        <Filters 
          key={text || 'all'}
          services={searchResults} 
          onFilteredResults={handleFilteredResults} 
        />
        <div className={styles.search__results}>
          <div className={styles.search__grid}>
            {isLoading
              ? renderSkeletonCards()
              : filteredServices.map((service) => (
                <div key={service.id} className={styles.search__item}>
                  <FilterCardService
                    image={service.image}
                    title={service.title}
                    description={service.description}
                    rating={service.rating}
                    reviews={service.reviewCount}
                    price={service.pricing.price}
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
