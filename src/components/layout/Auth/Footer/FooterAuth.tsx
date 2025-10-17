import FooterStyled from './FooterAuthStyled'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import FacebookIcon from '@mui/icons-material/Facebook'
import XIcon from '@mui/icons-material/X'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'

function FooterAuth() {
  return (
    <FooterStyled>
      <Grid container sx={{ alignItems: 'center' }} gap={{ xs: 1, sm: 0 }}>
        <Grid size={{ xs: 12, sm: 'grow' }} order={{ xs: 2, sm: 1 }}>
          <Typography
            variant="body2"
            component="p"
            textAlign={{ xs: 'center', sm: 'left' }}
          >
            © 2024 Krix. Todos los derechos reservados.
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 'auto' }}
          sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}
          order={{ xs: 1, sm: 2 }}
        >
          <FacebookIcon sx={{ cursor: 'pointer', fontSize: 24 }} />
          <XIcon sx={{ cursor: 'pointer', fontSize: 24 }} />
          <LinkedInIcon sx={{ cursor: 'pointer', fontSize: 24 }} />
          <InstagramIcon sx={{ cursor: 'pointer', fontSize: 24 }} />
        </Grid>
      </Grid>
    </FooterStyled>
  )
}

export default FooterAuth
