import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
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
import { useState } from 'react'
import styles from './Filters.module.scss'
import { MOCK_LOCATIONS } from '@/assets/mocks/locations.mock'

const CATEGORIES = [
  'Hogar',
  'Electricidad',
  'Plomería',
  'Carpintería',
  'Pintura',
  'Limpieza',
  'Jardinería'
]

const RATINGS = [
  { value: '5.0', label: '5.0', stars: 5 },
  { value: '4.5+', label: '4.5 o más', stars: 4.5 },
  { value: '4.0+', label: '4.0 o más', stars: 4 },
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
  onFiltersChange?: (filters: FiltersState) => void
}

const Filters = ({ onFiltersChange }: FiltersProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 100000],
    categories: [],
    rating: 'all',
    location: null
  })

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const newFilters = {
      ...filters,
      priceRange: newValue as number[]
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c: string) => c !== category)
      : [...filters.categories, category]
    const newFilters = {
      ...filters,
      categories: newCategories
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      rating: event.target.value
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleLocationChange = (_event: any, newValue: string | null) => {
    const newFilters = {
      ...filters,
      location: newValue
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
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
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={5000}
            />
            <Box className={styles.filters__price}>
              <TextField
                size="small"
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  handlePriceChange(undefined as any, [
                    Number(e.target.value),
                    filters.priceRange[1]
                  ])
                }
                inputProps={{ min: 0, max: filters.priceRange[1] }}
              />
              <TextField
                size="small"
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handlePriceChange(undefined as any, [
                    filters.priceRange[0],
                    Number(e.target.value)
                  ])
                }
                inputProps={{ min: filters.priceRange[0], max: 100000 }}
              />
            </Box>
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
            {CATEGORIES.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
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
    </Paper>
  )
}

export default Filters