import { Link } from 'react-router'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import EmailIcon from '@mui/icons-material/Email'

import { BoxStyled, CardStyled } from '@/pages/styled/CommonStyled'

function ForgotPassword() {
  return (
    <BoxStyled>
      <CardStyled>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Olvidé mi contraseña
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Ingrese su dirección de correo electrónico a continuación y le
              enviaremos un enlace seguro para restablecer su contraseña.
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
            <Button variant="contained" fullWidth>
              Enviar solicitud
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="text" component={Link} fullWidth to="/login">
              Volver al inicio de sesión
            </Button>
          </Grid>
        </Grid>
      </CardStyled>
    </BoxStyled>
  )
}

export default ForgotPassword
