import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

const OfflineNotification: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <Snackbar
      open={!isOnline}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ zIndex: 2000 }}
    >
      <Alert severity="warning" variant="filled">
        Sin conexión a Internet. Funcionando en modo offline.
      </Alert>
    </Snackbar>
  );
};

export default OfflineNotification;