import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import styles from './Filters.module.scss'
import { MOCK_LOCATIONS } from '@/assets/mocks/locations.mock'
import { UNIFIED_SERVICES } from '../../../assets/unifiedServices'
import { getServicesForCategories } from '../../../services/apiService'

// Función para extraer categorías únicas de los servicios
const getCategoriesFromServices = (services: typeof UNIFIED_SERVICES): string[] => {
  const categories = services.map(service => service.category)
  return [...new Set(categories)].sort()
}

const RATINGS = [
  { value: '5', label: '5', stars: 5 },
  { value: '4.5+', label: '4.5 o más', stars: 4.5 },
  { value: '4.0+', label: '4.0 o más', stars: 4.0 },
  { value: '3.5+', label: '3.5 o más', stars: 3.5 },
  { value: 'all', label: 'Todos', stars: 0 }
]

const RatingStars = ({ rating }: { rating: number }) => {
  if (rating === 0) return null

  return (
    <Box sx={{ display: 'flex', ml: 1 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating
        const half = star - 0.5 === rating
        
        return (
          <Box
            key={star}
            sx={{
              color: 'primary.main',
              fontSize: '1rem',
              display: 'flex'
            }}
          >
            {half ? (
              <Box sx={{ position: 'relative' }}>
                <StarBorderIcon fontSize="inherit" />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '50%',
                    overflow: 'hidden',
                    display: 'flex'
                  }}
                >
                  <StarIcon fontSize="inherit" />
                </Box>
              </Box>
            ) : filled ? (
              <StarIcon fontSize="inherit" />
            ) : (
              <StarBorderIcon fontSize="inherit" />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

interface FiltersState {
  priceRange: number[]
  categories: string[]
  rating: string
  location: string | null
}

export interface FiltersProps {
  services: typeof UNIFIED_SERVICES
  onFilteredResults?: (filteredServices: typeof UNIFIED_SERVICES) => void
  onFiltersChange?: (filters: FiltersState) => void
}

export type { FiltersState }

const Filters = ({ services, onFilteredResults, onFiltersChange }: FiltersProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiServices, setApiServices] = useState<typeof UNIFIED_SERVICES>([])
  const [isLoadingApiServices, setIsLoadingApiServices] = useState(false)
  
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 1000000],
    categories: [],
    rating: 'all',
    location: null
  })

  // Obtener categorías dinámicamente de los servicios
  const availableCategories = getCategoriesFromServices(services)

  // Función para formatear precio en moneda local
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Función para aplicar filtros a los servicios
  const applyFilters = (serviceList: typeof UNIFIED_SERVICES, filterCriteria: FiltersState) => {
    return serviceList.filter(service => {
      // Filtro por rango de precio
      const priceInRange = service.pricing.price >= filterCriteria.priceRange[0] && 
                          service.pricing.price <= filterCriteria.priceRange[1]

      // Filtro por categorías (si hay categorías seleccionadas, debe coincidir con alguna)
      const categoryMatch = filterCriteria.categories.length === 0 || 
                           filterCriteria.categories.includes(service.category)

      // Filtro por calificación
      const ratingMatch = (() => {
        if (filterCriteria.rating === 'all') return true
        if (filterCriteria.rating === '5') return service.provider.rating === 5.0
        if (filterCriteria.rating === '4.5+') return service.provider.rating >= 4.5
        if (filterCriteria.rating === '4.0+') return service.provider.rating >= 4.0
        if (filterCriteria.rating === '3.5+') return service.provider.rating >= 3.5
        return true
      })()

      // Filtro por ubicación
      const locationMatch = !filterCriteria.location || 
                           (service.location && service.location.includes(filterCriteria.location))

      // Combinar todos los filtros
      return priceInRange && categoryMatch && ratingMatch && locationMatch
    })
  }

  // Función para aplicar filtros y notificar cambios
  const applyAndNotifyFilters = (newFilters: FiltersState) => {
    const filteredResults = applyFilters(services, newFilters)
    onFilteredResults?.(filteredResults)
    onFiltersChange?.(newFilters)
  }

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const newFilters = {
      ...filters,
      priceRange: newValue as number[]
    }
    setFilters(newFilters)
    applyAndNotifyFilters(newFilters)
  }

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    const newCategories = checked
      ? [...filters.categories, value]
      : filters.categories.filter(cat => cat !== value)

    const newFilters = {
      ...filters,
      categories: newCategories
    }
    setFilters(newFilters)

    // Si hay categorías seleccionadas, obtener servicios del API
    if (newCategories.length > 0) {
      setIsLoadingApiServices(true)
      try {
        const servicesFromApi = await getServicesForCategories(newCategories)
        setApiServices(servicesFromApi)
        
        // Combinar servicios locales filtrados con servicios del API
        const localFilteredServices = applyFilters(services, newFilters)
        const combinedServices = [...localFilteredServices, ...servicesFromApi]
        
        // Eliminar duplicados basados en el ID
        const uniqueServices = combinedServices.filter((service, index, self) => 
          index === self.findIndex(s => s.id === service.id)
        )
        
        onFilteredResults?.(uniqueServices)
        onFiltersChange?.(newFilters)
      } catch (error) {
        console.error('Error loading API services:', error)
        // Fallback: usar solo servicios locales
        applyAndNotifyFilters(newFilters)
      } finally {
        setIsLoadingApiServices(false)
      }
    } else {
      // Si no hay categorías seleccionadas, limpiar servicios del API y usar solo locales
      setApiServices([])
      applyAndNotifyFilters(newFilters)
    }
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      rating: event.target.value
    }
    setFilters(newFilters)
    applyAndNotifyFilters(newFilters)
  }

  const handleLocationChange = (_event: React.SyntheticEvent, newValue: string | null) => {
    const newFilters = {
      ...filters,
      location: newValue
    }
    setFilters(newFilters)
    applyAndNotifyFilters(newFilters)
  }

  // Aplicar filtros inicialmente cuando cambian los servicios
  useEffect(() => {
    const filteredResults = applyFilters(services, filters)
    onFilteredResults?.(filteredResults)
  }, [services, filters, onFilteredResults])

  const handleResetFilters = () => {
    const defaultFilters: FiltersState = {
      priceRange: [0, 1000000],
      categories: [],
      rating: 'all',
      location: null
    }
    setFilters(defaultFilters)
    applyAndNotifyFilters(defaultFilters)
  }

  // Contenido de los filtros
  const FiltersContent = () => (
    <>
      <Typography variant="h6" className={styles.filters__title}>
        Filtros
      </Typography>

      <Accordion defaultExpanded={!isMobile}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.filters__summary}
        >
          <Typography className={styles.filters__heading}>Ubicación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Autocomplete
            options={MOCK_LOCATIONS}
            value={filters.location}
            onChange={handleLocationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Selecciona una ubicación"
                size="small"
              />
            )}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={!isMobile}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.filters__summary}
        >
          <Typography className={styles.filters__heading}>
            Rango de Precio
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2, pt: 1 }}>
            <Box sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="caption">
                Rango: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              </Typography>
            </Box>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={1000000}
              step={10000}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={!isMobile}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.filters__summary}
        >
          <Typography className={styles.filters__heading}>Categorías</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {availableCategories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onChange={handleCategoryChange}
                    value={category}
                    disabled={isLoadingApiServices}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category}
                    {isLoadingApiServices && filters.categories.includes(category) && (
                      <CircularProgress size={12} />
                    )}
                  </Box>
                }
              />
            ))}
          </FormGroup>
          {/* Indicator de servicios del API */}
          {apiServices.length > 0 && (
            <Box sx={{ mt: 2, p: 1, bgcolor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="caption" color="primary.main">
                🌐 {apiServices.length} servicio(s) adicional(es) encontrado(s) del API
              </Typography>
            </Box>
          )}
          {isLoadingApiServices && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="caption" color="text.secondary">
                Buscando servicios adicionales...
              </Typography>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={!isMobile}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.filters__summary}
        >
          <Typography className={styles.filters__heading}>Calificación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup value={filters.rating} onChange={handleRatingChange}>
              {RATINGS.map((rating) => (
                <FormControlLabel
                  key={rating.value}
                  value={rating.value}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {rating.label}
                      <RatingStars rating={rating.stars} />
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Botón limpiar filtros solo en desktop */}
      {!isMobile && (
        <Box sx={{ mt: 3, px: 2, pb: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleResetFilters}
            sx={{ 
              borderStyle: 'dashed',
              '&:hover': {
                borderStyle: 'solid'
              }
            }}
          >
            Limpiar todos los filtros
          </Button>
        </Box>
      )}
    </>
  )

  // Render condicional para mobile vs desktop
  if (isMobile) {
    return (
      <>
        {/* Botón flotante para mobile */}
        <Fab
          color="primary"
          aria-label="filtros"
          className={styles.filters__fab}
          onClick={() => setIsModalOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          <FilterListIcon />
        </Fab>

        {/* Modal/Dialog para mobile */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fullScreen
          PaperProps={{
            sx: {
              bgcolor: 'background.default',
            }
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'primary.main',
              color: 'white',
              py: 2
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Filtros de Búsqueda
            </Typography>
            <IconButton
              onClick={() => setIsModalOpen(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0, width: '100%' }}>
            <Paper className={styles.filters} elevation={0} sx={{ width: '100%', maxWidth: 'none' }}>
              <FiltersContent />
            </Paper>
          </DialogContent>
          <DialogActions 
            sx={{ 
              p: 2, 
              backgroundColor: 'grey.50',
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              alignItems: 'stretch'
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handleResetFilters()
                setIsModalOpen(false)
              }}
              sx={{ 
                width: '100%',
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '0.95rem',
                borderStyle: 'dashed',
                '&:hover': {
                  borderStyle: 'solid'
                }
              }}
            >
              Limpiar todos los filtros
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsModalOpen(false)}
              sx={{ 
                width: '100%',
                py: 1.5,
                borderRadius: '8px',
                fontSize: '0.95rem'
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(false)}
              sx={{ 
                width: '100%',
                py: 1.5,
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              Aplicar Filtros
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  // Render para desktop (comportamiento original)
  return (
    <Paper className={styles.filters}>
      <FiltersContent />
    </Paper>
  )
}

export default Filters