import { Container } from '@mui/material'
import { MOCK_SERVICES } from '../assets/mocks/services.mock'
import FilterCardService from '../components/ui/FilterCardService'
import Filters from '../components/ui/Filters'
import styles from './SearchDetailPage.module.scss'

const SearchDetailPage = () => {
  const handleAddToCart = (serviceId: string) => {
    console.log('Añadir al carrito:', serviceId)
  }

  const handleViewDetails = (serviceId: string) => {
    console.log('Ver detalles:', serviceId)
  }

  const handleFiltersChange = (filters: any) => {
    console.log('Filtros actualizados:', filters)
    // TODO: Implementar la lógica de filtrado
  }

  return (
    <Container component="main" className={styles.search}>
      <div className={styles.search__content}>
        <Filters onFiltersChange={handleFiltersChange} />
        <div className={styles.search__results}>
          <div className={styles.search__grid}>
            {MOCK_SERVICES.map((service) => (
              <div key={service.id} className={styles.search__item}>
                <FilterCardService
                  {...service}
                  onAddToCart={() => handleAddToCart(service.id)}
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