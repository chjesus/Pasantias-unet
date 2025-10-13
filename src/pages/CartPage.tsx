import { useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Box,
  Alert
} from '@mui/material'
import { useCartStore } from '../store/cartStore'
import CartItemsList from '../components/ui/CartItemsList'
import OrderSummary from '../components/ui/OrderSummary'
import styles from './CartPage.module.scss'

const CartPage = () => {
  const { addItem } = useCartStore()
  const [showAlert, setShowAlert] = useState(false)

  // Ejemplo de cómo agregar items al carrito
  const addExampleItem = () => {
    const exampleItem = {
      id: '1',
      name: 'Instalación de Grifo de Cocina',
      quantity: 1,
      price: 75000,
      currency: 'COP',
      providerName: 'Maestro Fontanero Juan',
      image: '/api/placeholder/80/80',
      configuration: ['Material: Acero Inoxidable', 'Tipo: Monomando', 'Garantía: 2 años']
    }
    
    addItem(exampleItem)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const addAnotherExampleItem = () => {
    const exampleItem2 = {
      id: '2',
      name: 'Instalación Climatización Split',
      quantity: 1,
      price: 450000,
      currency: 'COP',
      providerName: 'ClimaPro Solutions',
      image: '/api/placeholder/80/80',
      configuration: ['Potencia: 3000 frigorías', 'Eficiencia: A+++', 'Instalación: Pared']
    }
    
    addItem(exampleItem2)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <div className={styles['cart-page']}>
      <Container maxWidth="lg">
        <Box className={styles['cart-page__header']}>
          <Typography variant="h3" component="h1" className={styles['cart-page__title']}>
            Tu carrito de servicios
          </Typography>
          
          <Typography variant="body1" color="text.secondary" className={styles['cart-page__description']}>
            Revisa y administra los servicios que has seleccionado
          </Typography>

          <Box className={styles['cart-page__demo-buttons']}>
            <Button
              variant="contained"
              onClick={addExampleItem}
            >
              Agregar Grifo al Carrito
            </Button>
            
            <Button
              variant="outlined"
              onClick={addAnotherExampleItem}
            >
              Agregar Climatización al Carrito
            </Button>
          </Box>

          {showAlert && (
            <Alert severity="success" className={styles['cart-page__alert']}>
              ¡Artículo agregado al carrito exitosamente!
            </Alert>
          )}
        </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start'
        }}
      >
        {/* Lista de items del carrito - Izquierda */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 65%' } }}>
          <CartItemsList />
        </Box>

        {/* Resumen del pedido - Derecha */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 35%' } }}>
          <OrderSummary />
        </Box>
      </Box>
      </Container>
    </div>
  )
}

export default CartPage