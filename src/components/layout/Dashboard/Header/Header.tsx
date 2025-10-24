import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import Button from '@mui/material/Button'
import { Box, Container, IconButton, InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import { useAuthStore } from '../../../../store/authStore'
import styles from './Header.module.scss'
import { routesDashboard } from '@/routes/dashboardRoutes'

function Header() {
  const { isAuthenticated, login, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchText, setSearchText] = React.useState('')
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null)
  const isUpdatingFromURL = React.useRef(false)

  React.useEffect(() => {
    isUpdatingFromURL.current = true
    if (location.pathname.startsWith(routesDashboard.search + '/')) {
      // Extraer el término de búsqueda de la URL /search/termino
      const searchTerm = decodeURIComponent(location.pathname.replace(routesDashboard.search + '/', ''))
      setSearchText(searchTerm)
    } else if (location.pathname === routesDashboard.search) {
      // Estamos en la página de búsqueda sin término
      setSearchText('')
    } else {
      // Estamos en otra página
      setSearchText('')
    }
    // Permitir que el próximo cambio sea considerado del usuario
    setTimeout(() => {
      isUpdatingFromURL.current = false
    }, 0)
  }, [location.pathname])

  const handleSearch = React.useCallback((value: string) => {
    if (value.trim().length > 0) {
      const searchUrl = routesDashboard.searchText(value.trim())
      console.log('Navegando a:', searchUrl)
      navigate(searchUrl)
    } else {
      console.log('Navegando a búsqueda vacía:', routesDashboard.search)
      navigate(routesDashboard.search)
    }
  }, [navigate])

  // Debounce effect para búsqueda automática (solo cuando el usuario escribe)
  React.useEffect(() => {
    // Limpiar timeout anterior si existe
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // Solo hacer debounce si no estamos actualizando desde la URL
    if (!isUpdatingFromURL.current && searchText.trim().length > 0) {
      debounceRef.current = setTimeout(() => {
        handleSearch(searchText)
      }, 700)
    }

    // Cleanup del timeout al desmontar el componente
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [searchText, handleSearch])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // Cancelar el debounce y buscar inmediatamente
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      handleSearch(searchText)
    }
  }

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
      <Container 
        maxWidth={false} 
        className={styles.header__container}
        sx={{ 
          width: '100%', 
          maxWidth: 'none !important',
          px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          margin: 0
        }}
      >
        {/* Logo */}
          <Button component={Link} to={routesDashboard.home} className={styles.header__logo} sx={{ p: 0, minWidth: 0 }}>
            <img src="/krix-logo.svg" alt="Krix" />
          </Button>

        {/* Navigation */}
        <nav className={styles.header__nav}>
            <Button component={Link} to={routesDashboard.home} className={styles['header__nav-item']}>
              Inicio
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
                  isUpdatingFromURL.current = false
                  setSearchText(e.target.value)
                }}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        size="small"
                        onClick={() => handleSearch(searchText)}
                        edge="start"
                      >
                        <SearchIcon />
                      </IconButton>
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
                            handleSearch('')
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
                onClick={() => navigate(routesDashboard.cart)}
                className={styles['header__actions-cart']}
              >
                <ShoppingCartIcon />
              </IconButton>
            )}
            <IconButton
              onClick={() => navigate(isAuthenticated ? '/profile' : '/auth/login')}
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
