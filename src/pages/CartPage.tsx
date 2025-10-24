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