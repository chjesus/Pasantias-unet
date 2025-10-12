import { Outlet } from 'react-router'

import Container from '@mui/material/Container'

import HeaderAuth from './Header'
import FooterAuth from './Footer'

import { BoxStyled } from './indexStyled'

function AuthLayout() {
  return (
    <BoxStyled as="main">
      <HeaderAuth />
      <Container maxWidth="lg" sx={{ px: 3, display: 'flex', flexGrow: 1 }}>
        <Outlet />
      </Container>
      <FooterAuth />
    </BoxStyled>
  )
}

export default AuthLayout
