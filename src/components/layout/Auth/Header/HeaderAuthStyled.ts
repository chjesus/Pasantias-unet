import { styled } from '@mui/material/styles'

const HeaderStyled = styled('header')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
  width: '100%',
  zIndex: '10',
}))

export default HeaderStyled
