import { styled } from '@mui/material/styles'

const FooterStyled = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  width: '100%',
}))

export default FooterStyled