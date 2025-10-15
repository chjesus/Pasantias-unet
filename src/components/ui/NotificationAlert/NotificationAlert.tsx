import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import type { AlertColor } from '@mui/material/Alert'

type NotificationAlertProps = {
  open: boolean
  message: string
  severity: AlertColor
  handleClose: () => void
}

function NotificationAlert({
  open,
  message,
  severity,
  handleClose,
}: NotificationAlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default NotificationAlert
