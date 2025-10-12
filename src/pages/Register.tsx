import { Link } from 'react-router'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import SmartphoneIcon from '@mui/icons-material/Smartphone'

function Register() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Card sx={{ maxWidth: { xs: 325, sm: 448 }, p: { xs: 2, sm: 7 } }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Crear Cuenta
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Ingresa tus detalles para registrarte en Krixx y acceder a
              nuestros servicios.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Nombre completo</Typography>
            <OutlinedInput
              size="small"
              placeholder="Nombre y apellido"
              sx={{ width: '100%' }}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Correo Electrónico</Typography>
            <OutlinedInput
              size="small"
              placeholder="correo@ejemplo.com"
              sx={{ width: '100%' }}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Número de Teléfono</Typography>
            <OutlinedInput
              size="small"
              placeholder="Número de Teléfono"
              sx={{ width: '100%' }}
              startAdornment={
                <InputAdornment position="start">
                  <SmartphoneIcon sx={{ fontSize: 18 }} />
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
            <Typography variant="overline">Confirmar Contraseña</Typography>
            <OutlinedInput
              size="small"
              type="password"
              placeholder="Confirmar Password"
              sx={{ width: '100%' }}
              startAdornment={
                <InputAdornment position="start">
                  <LockIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid size={12}></Grid>
          <Grid size={12}>
            <Button variant="contained" fullWidth>
              Registrarse
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="text" component={Link} fullWidth to="/login">
              ¿Ya tienes una cuenta? Inicia Sesión
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default Register
