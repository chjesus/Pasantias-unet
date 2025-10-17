import { Link, useLocation } from 'react-router'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import HeaderStyled from './HeaderAuthStyled'

function HeaderAuth() {
  const location = useLocation()
  const currentPath = location.pathname
  const shouldShowButtons = currentPath === '/forgot-password'

  return (
    <HeaderStyled>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid size="grow">
          <Typography variant="h6">Krix</Typography>
        </Grid>
        {shouldShowButtons && (
          <Grid size="auto" sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" component={Link} to="/login">
              Iniciar sesión
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/signup"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Registrarse
            </Button>
          </Grid>
        )}
      </Grid>
    </HeaderStyled>
  )
}

export default HeaderAuth
