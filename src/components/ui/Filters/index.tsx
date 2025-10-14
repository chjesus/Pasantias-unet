import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useEffect, useState } from 'react'
import styles from './Filters.module.scss'
import { MOCK_LOCATIONS } from '@/assets/mocks/locations.mock'
import { UNIFIED_SERVICES } from '../../../assets/unifiedServices'

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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    const newCategories = checked
      ? [...filters.categories, value]
      : filters.categories.filter(cat => cat !== value)

    const newFilters = {
      ...filters,
      categories: newCategories
    }
    setFilters(newFilters)
    applyAndNotifyFilters(newFilters)
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

  return (
    <Paper className={styles.filters}>
      <Typography variant="h6" className={styles.filters__title}>
        Filtros
      </Typography>

      <Accordion defaultExpanded>
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

      <Accordion defaultExpanded>
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
            {/* Mostrar rango seleccionado formateado */}
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
            {/* <Box className={styles.filters__price}>
              <TextField
                size="small"
                type="number"
                label="Precio mínimo"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceChange({} as Event, [
                    Number(e.target.value),
                    filters.priceRange[1]
                  ])
                }
                inputProps={{ min: 0, max: filters.priceRange[1] }}
              />
              <TextField
                size="small"
                type="number"
                label="Precio máximo"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange({} as Event, [
                    filters.priceRange[0],
                    Number(e.target.value)
                  ])
                }
                inputProps={{ min: filters.priceRange[0], max: 1000000 }}
              />
            </Box> */}
            
            
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
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
                  />
                }
                label={category}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
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

      {/* Botón para resetear todos los filtros */}
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
    </Paper>
  )
}

export default Filters