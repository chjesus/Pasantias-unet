
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Card,
  CardContent
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useCartStore, type CartItem as CartItemType } from '../../../store/cartStore'
import { formattedPrice } from '../../../utils/formattedPrice'
import styles from './CartItem.module.scss'

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const { modifyItemQuantity, removeItem } = useCartStore()

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      modifyItemQuantity(item.id, item.quantity - 1)
    } else {
      removeItem(item.id)
    }
  }

  const handleQuantityIncrease = () => {
    modifyItemQuantity(item.id, item.quantity + 1)
  }

  const handleRemoveItem = () => {
    removeItem(item.id)
  }

  const totalPrice = item.price * item.quantity

  return (
    <Card className={styles['cart-item']}>
      <CardContent className={styles['cart-item__content']}>
        <Box className={styles['cart-item__image-container']}>
          <img
            src={item.image}
            alt={item.name}
            className={styles['cart-item__image']}
          />
        </Box>

        <Box className={styles['cart-item__details']}>
          <Typography 
            variant="h6" 
            component="h3"
            className={styles['cart-item__title']}
          >
            {item.name}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            className={styles['cart-item__provider']}
          >
            {item.providerName}
          </Typography>

          {/* Configuración desde los chips */}
          {item.configuration && item.configuration.length > 0 && (
            <Box className={styles['cart-item__configuration']}>
              <Typography 
                variant="caption" 
                className={styles['cart-item__configuration-label']}
              >
                Configuración:
              </Typography>
              <Box className={styles['cart-item__chips']}>
                {item.configuration.map((config, index) => (
                  <Chip
                    key={index}
                    label={config}
                    size="small"
                    variant="outlined"
                    className={styles['cart-item__chip']}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Typography 
            variant="h6" 
            color="primary"
            className={styles['cart-item__price']}
          >
            {formattedPrice(totalPrice)} {item.currency}
          </Typography>
        </Box>

        <Box className={styles['cart-item__controls']}>
          <Box className={styles['cart-item__quantity-controls']}>
            <IconButton
              size="small"
              onClick={handleQuantityDecrease}
              className={styles['cart-item__quantity-btn']}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography 
              variant="body2"
              className={styles['cart-item__quantity']}
            >
              {item.quantity}
            </Typography>

            <IconButton
              size="small"
              onClick={handleQuantityIncrease}
              className={styles['cart-item__quantity-btn']}
            >
              <AddIcon fontSize="small" />
            </IconButton>

            <IconButton
              color="error"
              onClick={handleRemoveItem}
              className={styles['cart-item__delete-btn']}
              aria-label="Eliminar del carrito"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CartItem