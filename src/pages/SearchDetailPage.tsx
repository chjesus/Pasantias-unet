import { useState, useEffect, useCallback } from 'react'
import { Container, Skeleton, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { UNIFIED_SERVICES } from '../assets/unifiedServices'
import FilterCardService from '../components/ui/FilterCardService'
import Filters from '../components/ui/Filters'
import styles from './SearchDetailPage.module.scss'
import { routesDashboard } from '@/routes/dashboardRoutes'
import { getAllApiServices } from '../services/apiService'

const SearchDetailPage = () => {
  const { text } = useParams<{ text: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(UNIFIED_SERVICES)
  const [filteredServices, setFilteredServices] = useState(UNIFIED_SERVICES)
  const [apiServices, setApiServices] = useState<typeof UNIFIED_SERVICES>([])
  const [isLoadingApiServices, setIsLoadingApiServices] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [visibleCount, setVisibleCount] = useState(9)

  const sortServices = useCallback((services: typeof UNIFIED_SERVICES, sortType: string) => {
    const sorted = [...services]
    
    switch (sortType) {
      case 'price-high':
        return sorted.sort((a, b) => b.pricing.price - a.pricing.price)
      case 'price-low':
        return sorted.sort((a, b) => a.pricing.price - b.pricing.price)
      case 'relevance':
      default:
        // Para relevancia, ordenamos por rating del proveedor y número de reseñas
        return sorted.sort((a, b) => {
          const scoreA = a.provider.rating * a.reviewCount
          const scoreB = b.provider.rating * b.reviewCount
          return scoreB - scoreA
        })
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setVisibleCount(9) // Reiniciar contador al cambiar búsqueda
    
    const timeoutId = setTimeout(() => {
      const results = UNIFIED_SERVICES.filter(service =>
        service.title.toLowerCase().includes(text?.toLowerCase() || '')
      )
      
      setSearchResults(results)
      const sortedResults = sortServices(results, sortBy)
      setFilteredServices(sortedResults)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [text, sortServices, sortBy])

  // Efecto para cargar servicios del API cuando se entre a la vista /search
  useEffect(() => {
    const loadApiServices = async () => {
      setIsLoadingApiServices(true)
      try {
        const servicesFromApi = await getAllApiServices()
        setApiServices(servicesFromApi)
        
        // Si no hay texto de búsqueda específico, agregar servicios del API al final
        if (!text || text.trim() === '') {
          const combinedServices = [...UNIFIED_SERVICES, ...servicesFromApi]
          const uniqueServices = combinedServices.filter((service, index, self) => 
            index === self.findIndex(s => s.id === service.id)
          )
          setSearchResults(uniqueServices)
          const sortedResults = sortServices(uniqueServices, sortBy)
          setFilteredServices(sortedResults)
        }
      } catch (error) {
        console.error('Error loading API services:', error)
      } finally {
        setIsLoadingApiServices(false)
      }
    }

    loadApiServices()
  }, [sortServices, sortBy, text])

  const handleViewDetails = (serviceId: string) => {
    navigate(routesDashboard.serviceDetail(serviceId))
  }

  const handleFilteredResults = useCallback((filtered: typeof UNIFIED_SERVICES) => {
    // Combinar servicios filtrados con servicios del API si están disponibles
    let combinedFiltered = filtered
    if (apiServices.length > 0) {
      // Filtrar servicios del API según el término de búsqueda si existe
      const apiFiltered = text && text.trim() !== '' 
        ? apiServices.filter(service =>
            service.title.toLowerCase().includes(text.toLowerCase()) ||
            service.description.toLowerCase().includes(text.toLowerCase()) ||
            service.category.toLowerCase().includes(text.toLowerCase())
          )
        : apiServices
      
      combinedFiltered = [...filtered, ...apiFiltered]
      
      // Eliminar duplicados basados en ID
      combinedFiltered = combinedFiltered.filter((service, index, self) => 
        index === self.findIndex(s => s.id === service.id)
      )
    }
    
    const sortedFiltered = sortServices(combinedFiltered, sortBy)
    setFilteredServices(sortedFiltered)
    setVisibleCount(9) // Reiniciar contador cuando cambien los filtros
  }, [sortServices, sortBy, apiServices, text])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortChange = (event: any) => {
    const newSortBy = event.target.value as string
    setSortBy(newSortBy)
    const sortedServices = sortServices(filteredServices, newSortBy)
    setFilteredServices(sortedServices)
    setVisibleCount(9) // Reiniciar contador al cambiar ordenamiento
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
        <Filters 
          key={text || 'all'}
          services={searchResults} 
          onFilteredResults={handleFilteredResults} 
        />
        <div className={styles.search__results}>
          {/* Header con título, contador y filtro de ordenamiento */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
                Resultados de búsqueda
                {text && (
                  <Typography component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                    {` para "${text}"`}
                  </Typography>
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isLoading ? 'Buscando...' : `${filteredServices.length} resultado${filteredServices.length !== 1 ? 's' : ''} encontrado${filteredServices.length !== 1 ? 's' : ''}`}
                {isLoadingApiServices && (
                  <>
                    <br />
                    <span style={{ color: '#666', fontSize: '0.75rem' }}>
                      ⏳ Cargando servicios adicionales...
                    </span>
                  </>
                )}
              </Typography>
            </Box>
            
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={sortBy}
                label="Ordenar por"
                onChange={handleSortChange}
              >
                <MenuItem value="relevance">Más relevantes</MenuItem>
                <MenuItem value="price-high">Mayor precio</MenuItem>
                <MenuItem value="price-low">Menor precio</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div className={styles.search__grid}>
            {isLoading
              ? renderSkeletonCards()
              : filteredServices.slice(0, visibleCount).map((service) => (
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

          {/* Botón Cargar más */}
          {!isLoading && filteredServices.length > visibleCount && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 4,
              mb: 2 
            }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handleLoadMore}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              >
                Mostrar más servicios
              </Button>
            </Box>
          )}
        </div>
      </div>
    </Container>
  )
}

export default SearchDetailPage
