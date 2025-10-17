import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { WifiOff } from '@mui/icons-material';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

const OfflineNotification: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <Snackbar
      open={!isOnline}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 2 }}
    >
      <Alert
        severity="warning"
        icon={<WifiOff />}
        sx={{
          width: '100%',
          alignItems: 'center',
        }}
      >
        Sin conexión a Internet. Algunas funciones pueden estar limitadas.
      </Alert>
    </Snackbar>
  );
};

export default OfflineNotification;