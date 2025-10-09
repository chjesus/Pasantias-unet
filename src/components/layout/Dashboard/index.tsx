import { Outlet } from 'react-router'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Header from './Header'

function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ width: '100%', flexGrow: 1 }}>
        <Header />
        <Container maxWidth="lg" sx={{ p: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default DashboardLayout
