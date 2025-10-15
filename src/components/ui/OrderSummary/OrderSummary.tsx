import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useCartStore } from '../../../store/cartStore'
import { formattedPrice } from '../../../utils/formattedPrice'
import styles from './OrderSummary.module.scss'

const OrderSummary = () => {
  const { items } = useCartStore()

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const taxRate = 0.19 
  const taxes = subtotal * taxRate
  const total = subtotal + taxes



  // Configuración del servicio del mismo día
  const sameDayServiceCost = 250000

  return (
    <Paper className={styles['order-summary']}>
      <Box className={styles['order-summary__content']}>
        <Typography variant="h6" component="h3" className={styles['order-summary__title']}>
          Resumen del Pedido
        </Typography>

        <Box className={styles['order-summary__row']}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1" className={styles['order-summary__amount']}>
            {formattedPrice(subtotal)}
          </Typography>
        </Box>

        <Box className={styles['order-summary__row']}>
          <Typography variant="body1">Impuestos (19%):</Typography>
          <Typography variant="body1" className={styles['order-summary__amount']}>
            {formattedPrice(taxes)}
          </Typography>
        </Box>

        <Divider className={styles['order-summary__divider']} />

        <Box className={styles['order-summary__row']}>
          <Typography variant="h6" component="strong">Total:</Typography>
          <Typography 
            variant="h6" 
            component="strong" 
            className={styles['order-summary__total']}
          >
            {formattedPrice(total)}
          </Typography>
        </Box>

        <Box className={styles['order-summary__same-day-service']}>
          <Box className={styles['order-summary__service-header']}>
            <CalendarTodayIcon className={styles['order-summary__calendar-icon']} />
            <Typography variant="body1" className={styles['order-summary__service-title']}>
              Servicio el Mismo Día
            </Typography>
          </Box>
          
          <Typography variant="body2" className={styles['order-summary__service-description']}>
            Activa esta opción para priorizar tu servicio.
          </Typography>
          
          <Typography variant="body2" className={styles['order-summary__service-cost']}>
            Cargo adicional de {formattedPrice(sameDayServiceCost)}.
          </Typography>

          <FormControlLabel
            control={
              <Switch 
                className={styles['order-summary__switch']}
                color="primary"
              />
            }
            label="Activar"
            className={styles['order-summary__switch-label']}
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          className={styles['order-summary__checkout-btn']}
          disabled={items.length === 0}
        >
          Proceder al Pago: {formattedPrice(total)}
        </Button>
      </Box>
    </Paper>
  )
}

export default OrderSummary