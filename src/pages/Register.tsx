import { useState } from 'react'
import { Link } from 'react-router'
import { useForm, Controller } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import SmartphoneIcon from '@mui/icons-material/Smartphone'

import InputMUI from '@/components/ui/Input/Input'
import NotificationAlert from '@/components/ui/NotificationAlert'

import { signUp } from '@/services/authService'
import { PLACEHOLDER } from '@/utils/constant/placeholder'
import {
  RULES_EMAIL,
  MESSAGE_RULES_REQUIRED,
  MESSAGE_VALIDATE_PASSWORD,
} from '@/utils/constant/rules'

import { BoxStyled, CardStyled } from '@/pages/styled/CommonStyled'

import type { AlertColor } from '@mui/material/Alert'

type RegisterFormData = {
  fullName: string
  email: string
  phone: string
  password: string
  confirmarPassword: string
}

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmarPassword: '',
}

function Register() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<AlertColor>('success')

  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ defaultValues, mode: 'onChange' })

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    try {
      await signUp(data)
      setAlertType('success')
      setMessage('¡Gracias por registrarte en nuestra plataforma!')
      setOpenSnackbar(true)
    } catch (error) {
      console.error(error)
      setAlertType('error')
      setMessage('El usuario ya esta registrado!')
      setOpenSnackbar(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BoxStyled component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardStyled>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center' }}
            >
              Crear Cuenta
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Ingresa tus detalles para registrarte en Krix y acceder a
              nuestros servicios.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Nombre completo</Typography>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: MESSAGE_RULES_REQUIRED['FULLNAME'] }}
              render={({ field }) => (
                <InputMUI
                  field={field}
                  Icon={PersonIcon}
                  error={errors.fullName?.message}
                  placeholder={PLACEHOLDER['FULL_NAME']}
                />
              )}
            />
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
            <Typography variant="overline">Número de Teléfono</Typography>
            <Controller
              name="phone"
              control={control}
              rules={{ required: MESSAGE_RULES_REQUIRED['PHONE'] }}
              render={({ field }) => (
                <InputMUI
                  field={field}
                  Icon={SmartphoneIcon}
                  error={errors.phone?.message}
                  placeholder={PLACEHOLDER['PHONE']}
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
          </Grid>
          <Grid size={12}>
            <Typography variant="overline">Confirmar Contraseña</Typography>
            <Controller
              name="confirmarPassword"
              control={control}
              rules={{
                required: MESSAGE_RULES_REQUIRED['CONFIRMPASSWORD'],
                validate: (value) =>
                  value === watch('password') || MESSAGE_VALIDATE_PASSWORD,
              }}
              render={({ field }) => (
                <InputMUI
                  field={field}
                  Icon={LockIcon}
                  error={errors.confirmarPassword?.message}
                  placeholder={PLACEHOLDER['CONFIRM_PASSWORD']}
                  type="password"
                />
              )}
            />
          </Grid>
          <Grid size={12}></Grid>
          <Grid size={12}>
            <Button
              type="submit"
              loading={loading}
              variant="contained"
              fullWidth
            >
              Registrarse
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="text" component={Link} fullWidth to="/login">
              ¿Ya tienes una cuenta? Inicia Sesión
            </Button>
          </Grid>
        </Grid>
      </CardStyled>
      <NotificationAlert
        message={message}
        open={openSnackbar}
        severity={alertType}
        handleClose={handleCloseSnackbar}
      />
    </BoxStyled>
  )
}

export default Register
