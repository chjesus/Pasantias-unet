import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCartStore } from '../../../store/cartStore'
import CartItem from '../CartItem'
import { formattedPrice } from '../../../utils/formattedPrice'
import styles from './CartList.module.scss'

const CartList = () => {
  const { items, clearCart } = useCartStore()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Asumimos que todos los items tienen la misma moneda (tomamos la del primer item)
  const currency = items.length > 0 ? items[0].currency : 'USD'

  if (items.length === 0) {
    return (
      <Container maxWidth="md" className={styles['cart-list']}>
        <Paper className={styles['cart-list__empty']}>
          <ShoppingCartIcon className={styles['cart-list__empty-icon']} />
          <Typography variant="h6" className={styles['cart-list__empty-title']}>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Agrega algunos servicios para continuar
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" className={styles['cart-list']}>
      <Box className={styles['cart-list__header']}>
        <Typography variant="h4" component="h1" className={styles['cart-list__title']}>
          Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
        </Typography>
      </Box>

      <Box className={styles['cart-list__items']}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Box>

      <Paper className={styles['cart-list__summary']}>
        <Box className={styles['cart-list__summary-content']}>
          <Typography variant="h6" className={styles['cart-list__summary-title']}>
            Resumen del Pedido
          </Typography>
          
          <Divider className={styles['cart-list__divider']} />
          
          <Box className={styles['cart-list__summary-row']}>
            <Typography variant="body1">
              Subtotal ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}):
            </Typography>
            <Typography variant="h6" color="primary">
              {formattedPrice(totalPrice)} {currency}
            </Typography>
          </Box>

          <Box className={styles['cart-list__actions']}>
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
              className={styles['cart-list__clear-btn']}
            >
              Vaciar Carrito
            </Button>
            <Button
              variant="contained"
              size="large"
              className={styles['cart-list__checkout-btn']}
            >
              Proceder al Pago
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default CartList