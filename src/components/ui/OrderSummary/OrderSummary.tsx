import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import type { ReactPayPalScriptOptions } from '@paypal/paypal-js'
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useCartStore } from '../../../store/cartStore'
import { formattedPrice } from '../../../utils/formattedPrice'
import styles from './OrderSummary.module.scss'
import { useState } from 'react'

const OrderSummary = () => {
  const [message, setMessage] = useState('')
  const { items } = useCartStore()

  // Calcular totales
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const taxRate = 0.19
  const taxes = subtotal * taxRate
  const total = subtotal + taxes

  // Configuración del servicio del mismo día
  const sameDayServiceCost = 250000

  const initialOptions: ReactPayPalScriptOptions = {
    'client-id': import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
    'enable-funding': 'venmo',
    'buyer-country': 'US',
    currency: 'USD',
    components: 'buttons',
  }

  return (
    <Paper className={styles['order-summary']}>
      <Box className={styles['order-summary__content']}>
        <Typography
          variant="h6"
          component="h3"
          className={styles['order-summary__title']}
        >
          Resumen del Pedido
        </Typography>

        <Box className={styles['order-summary__row']}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography
            variant="body1"
            className={styles['order-summary__amount']}
          >
            {formattedPrice(subtotal)}
          </Typography>
        </Box>

        <Box className={styles['order-summary__row']}>
          <Typography variant="body1">Impuestos (19%):</Typography>
          <Typography
            variant="body1"
            className={styles['order-summary__amount']}
          >
            {formattedPrice(taxes)}
          </Typography>
        </Box>

        <Divider className={styles['order-summary__divider']} />

        <Box className={styles['order-summary__row']}>
          <Typography variant="h6" component="strong">
            Total:
          </Typography>
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
            <CalendarTodayIcon
              className={styles['order-summary__calendar-icon']}
            />
            <Typography
              variant="body1"
              className={styles['order-summary__service-title']}
            >
              Servicio el Mismo Día
            </Typography>
          </Box>

          <Typography
            variant="body2"
            className={styles['order-summary__service-description']}
          >
            Activa esta opción para priorizar tu servicio.
          </Typography>

          <Typography
            variant="body2"
            className={styles['order-summary__service-cost']}
          >
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
        <Button fullWidth sx={{ px: 0 }}>
          <div style={{ width: '100%' }}>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{
                  shape: 'rect',
                  layout: 'vertical',
                  color: 'gold',
                  label: 'paypal',
                }}
                createOrder={async () => {
                  try {
                    const response = await fetch('/api/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        cart: [
                          {
                            id: 'YOUR_PRODUCT_ID',
                            quantity: 'YOUR_PRODUCT_QUANTITY',
                          },
                        ],
                      }),
                    })
                    const orderData = await response.json()
                    if (orderData.id) {
                      return orderData.id
                    } else {
                      const errorDetail = orderData?.details?.[0]
                      const errorMessage = errorDetail
                        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                        : JSON.stringify(orderData)
                      throw new Error(errorMessage)
                    }
                  } catch (error) {
                    console.error(error)
                    setMessage(`Could not initiate PayPal Checkout...${error}`)
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    const response = await fetch(
                      `/api/orders/${data.orderID}/capture`,
                      {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                      }
                    )
                    const orderData = await response.json()
                    const errorDetail = orderData?.details?.[0]
                    if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                      return actions.restart()
                    } else if (errorDetail) {
                      throw new Error(
                        `${errorDetail.description} (${orderData.debug_id})`
                      )
                    } else {
                      const transaction =
                        orderData.purchase_units[0].payments.captures[0]
                      setMessage(
                        `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                      )
                      console.log(
                        'Capture result',
                        orderData,
                        JSON.stringify(orderData, null, 2)
                      )
                    }
                  } catch (error) {
                    setMessage(
                      `Sorry, your transaction could not be processed...${error}`
                    )
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
          <p>{message}</p>
        </Button>
      </Box>
    </Paper>
  )
}

export default OrderSummary
