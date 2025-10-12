import { Link } from 'react-router-dom'
import { Box, Container, IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import { useAuthStore } from '../../../../store/authStore'
import styles from './Header.module.scss'

function Header() {
  const { isAuthenticated, login, logout } = useAuthStore()

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout()
    } else {
      login({
        id: '1',
        name: 'Usuario de Prueba',
        email: 'test@example.com'
      })
    }
  }

  return (
    <header className={styles.header}>
      <Container maxWidth={false} className={styles.header__container}>
        {/* Logo */}
        <Link to="/" className={styles.header__logo}>
          <img src="/krix-logo.svg" alt="Krix" />
        </Link>

        {/* Navigation */}
        <nav className={styles.header__nav}>
          <Link to="/" className={styles['header__nav-item']}>
            Inicio
          </Link>
          <Link to="/servicios" className={styles['header__nav-item']}>
            Servicios
          </Link>
          <Link to="/nosotros" className={styles['header__nav-item']}>
            Nosotros
          </Link>
          <Link to="/contacto" className={styles['header__nav-item']}>
            Contacto
          </Link>
        </nav>

        {/* Search */}
        <Box component="div" className={styles.header__search}>
          <TextField
            placeholder="Busca un servicio..."
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Actions */}
        <div className={styles.header__actions}>
          {isAuthenticated && (
            <IconButton
              component={Link}
              to="/carrito"
              className={styles['header__actions-cart']}
            >
              <ShoppingCartIcon />
            </IconButton>
          )}
          <IconButton
            component={Link}
            to={isAuthenticated ? "/perfil" : "/login"}
            className={styles['header__actions-profile']}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            onClick={handleAuthClick}
            sx={{
              bgcolor: isAuthenticated ? 'primary.main' : 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: isAuthenticated ? 'primary.dark' : 'error.dark',
              }
            }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </IconButton>
        </div>
      </Container>
    </header>
  )
}

export default Header
