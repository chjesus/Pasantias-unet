import { Link } from 'react-router'
import { useForm, Controller } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import InfoIcon from '@mui/icons-material/Info'

import InputMUI from '@/components/ui/Input/Input'

import { signIn } from '@/services/authService'
import { PLACEHOLDER } from '@/utils/constant/placeholder'
import { RULES_EMAIL, MESSAGE_RULES_REQUIRED } from '@/utils/constant/rules'

import {
  BoxStyled,
  CardStyled,
  ButtonLinkStyled,
} from '@/pages/styled/CommonStyled'

type LoginFormData = { email: string; password: string }
const defaultValues = { email: '', password: '' }

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues, mode: 'onChange' })

  const onSubmit = (data: LoginFormData) => {
    signIn(data.email, data.password)
  }

  return (
    <BoxStyled component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardStyled>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Iniciar Sesión en Krixx
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Ingresa tus credenciales para acceder a tu cuenta.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Correo Electrónico</Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: MESSAGE_RULES_REQUIRED['EMAIL'],
                pattern: {
                  value: RULES_EMAIL['REGEX'],
                  message: RULES_EMAIL['MESSAGE'],
                },
              }}
              render={({ field }) => (
                <InputMUI
                  field={field}
                  Icon={EmailIcon}
                  error={errors.email?.message}
                  placeholder={PLACEHOLDER['EMAIL']}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Contraseña</Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: MESSAGE_RULES_REQUIRED['PASSWORD'] }}
              render={({ field }) => (
                <InputMUI
                  field={field}
                  Icon={LockIcon}
                  error={errors.password?.message}
                  placeholder={PLACEHOLDER['PASSWORD']}
                  type="password"
                />
              )}
            />
            <ButtonLinkStyled component={Link} to="/forgot-password">
              Olvidé mi contraseña
            </ButtonLinkStyled>
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Iniciar Sesión
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="outlined" component={Link} to="/signup" fullWidth>
              Registrarse
            </Button>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              o
            </Typography>
          </Grid>
          <Grid size={12}>
            <Button variant="contained" startIcon={<InfoIcon />} fullWidth>
              Necesito Servicio Urgente
            </Button>
          </Grid>
        </Grid>
      </CardStyled>
    </BoxStyled>
  )
}

export default Login
