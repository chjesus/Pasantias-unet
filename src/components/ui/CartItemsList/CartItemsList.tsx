import {
  Box,
  Typography,
  Paper
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCartStore } from '../../../store/cartStore'
import CartItem from '../CartItem'
import styles from './CartItemsList.module.scss'

const CartItemsList = () => {
  const { items } = useCartStore()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <Paper className={styles['cart-items-list__empty']}>
        <ShoppingCartIcon className={styles['cart-items-list__empty-icon']} />
        <Typography variant="h6" className={styles['cart-items-list__empty-title']}>
          Tu carrito está vacío
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Agrega algunos servicios para continuar
        </Typography>
      </Paper>
    )
  }

  return (
    <Box className={styles['cart-items-list']}>
      <Box className={styles['cart-items-list__header']}>
        <Typography variant="h5" component="h2" className={styles['cart-items-list__title']}>
          Carrito de Compras
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
        </Typography>
      </Box>

      <Box className={styles['cart-items-list__items']}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  )
}

export default CartItemsList