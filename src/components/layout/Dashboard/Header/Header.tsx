import React from 'react'
import { Link, useNavigate } from 'react-router'
import Button from '@mui/material/Button'
import { Box, Container, IconButton, InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import { useAuthStore } from '../../../../store/authStore'
import styles from './Header.module.scss'

function Header() {
  const { isAuthenticated, login, logout } = useAuthStore()
  const navigate = useNavigate()
  const [searchText, setSearchText] = React.useState('')

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
          <Button component={Link} to="/" className={styles.header__logo} sx={{ p: 0, minWidth: 0 }}>
            <img src="/krix-logo.svg" alt="Krix" />
          </Button>

        {/* Navigation */}
        <nav className={styles.header__nav}>
            <Button component={Link} to="/services" className={styles['header__nav-item']}>
              Inicio
            </Button>
            <Button component={Link} to="/about-us" className={styles['header__nav-item']}>
              Nosotros
            </Button>
            <Button component={Link} to="/contact" className={styles['header__nav-item']}>
              Contacto
            </Button>
        </nav>

        {/* Search */}
        <Box component="div" className={styles.header__search}>
              <TextField
                placeholder="Busca un servicio..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchText}
                onChange={e => {
                  const value = e.target.value
                  setSearchText(value)
                  if (value.trim().length > 0) {
                    navigate(`/search/${encodeURIComponent(value)}`)
                  }
                }}
                onBlur={() => setSearchText('')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    searchText ? (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          aria-label="Limpiar búsqueda"
                          onClick={() => {
                            setSearchText('')
                            navigate('/search')
                          }}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  )
                }}
              />
        </Box>

        {/* Actions */}
        <div className={styles.header__actions}>
            {isAuthenticated && (
              <IconButton
                onClick={() => navigate('/cart')}
                className={styles['header__actions-cart']}
              >
                <ShoppingCartIcon />
              </IconButton>
            )}
            <IconButton
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
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
