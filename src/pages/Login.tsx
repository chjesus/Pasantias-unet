import { Link } from 'react-router'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InfoIcon from '@mui/icons-material/Info'

function Login() {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Grid
        container
        sx={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}
      >
        <Grid size="auto">
          <Card sx={{ maxWidth: { xs: 325, sm: 448 }, p: { xs: 2, sm: 7 } }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ textAlign: 'center' }}
                >
                  Iniciar Sesión en Krixx
                </Typography>
              </Grid>
              <Grid size={12}>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ textAlign: 'center' }}
                >
                  Ingresa tus credenciales para acceder a tu cuenta.
                </Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="overline">Correo Electrónico</Typography>
                <OutlinedInput
                  size="small"
                  placeholder="tu@ejemplo.com"
                  sx={{ width: '100%' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon sx={{ fontSize: 18 }} />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="overline">Contraseña</Typography>
                <OutlinedInput
                  size="small"
                  type="password"
                  placeholder="Password"
                  sx={{ width: '100%' }}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon sx={{ fontSize: 18 }} />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid size={12}>
                <Button variant="contained" fullWidth>
                  Iniciar Sesión
                </Button>
              </Grid>
              <Grid size={12}>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/signup"
                  fullWidth
                >
                  Registrarse
                </Button>
              </Grid>
              <Grid size={12}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ textAlign: 'center' }}
                >
                  o
                </Typography>
              </Grid>
              <Grid size={12}>
                <Button variant="contained" startIcon={<InfoIcon />} fullWidth>
                  Necesito Servicio Urgente
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
