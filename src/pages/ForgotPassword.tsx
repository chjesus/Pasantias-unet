import { useState } from 'react'
import { Link } from 'react-router'
import { useForm, Controller } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

import InputMUI from '@/components/ui/Input/Input'
import NotificationAlert from '@/components/ui/NotificationAlert'

import { forgotPassword, confirmForgotPassword } from '@/services/authService'
import { PLACEHOLDER } from '@/utils/constant/placeholder'
import { RULES_EMAIL, MESSAGE_RULES_REQUIRED } from '@/utils/constant/rules'

import { BoxStyled, CardStyled } from '@/pages/styled/CommonStyled'

import type { AlertColor } from '@mui/material/Alert'
type LoginFormData = { email: string; code?: string; password?: string }
const defaultValues = { email: '', code: '', password: '' }

function ForgotPassword() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<AlertColor>('success')
  const [code, setCode] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues, mode: 'onChange' })

  const handleCloseSnackbar = () => setOpenSnackbar(false)

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    try {
      if (code) {
        await confirmForgotPassword({
          email: data.email,
          code: data.code!,
          newPassword: data.password!,
        })
        setAlertType('success')
        setMessage('Se ha restablecido la contraseña con éxito.')
        setOpenSnackbar(true)
        setCode(false)
      } else {
        setCode(true)
        await forgotPassword(data.email)
        setAlertType('info')
        setMessage('Se ha enviado un código de verificación a su correo.')
        setOpenSnackbar(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
              Olvidé mi contraseña
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Ingrese su dirección de correo electrónico a continuación y le
              enviaremos un enlace seguro para restablecer su contraseña.
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
          {code && (
            <Grid size={12}>
              <Typography variant="overline">Código de Verificación</Typography>
              <Controller
                name="code"
                control={control}
                rules={{ required: MESSAGE_RULES_REQUIRED['CODE'] }}
                render={({ field }) => (
                  <InputMUI
                    field={field}
                    Icon={VpnKeyIcon}
                    error={errors.code?.message}
                    placeholder={PLACEHOLDER['CODE']}
                  />
                )}
              />
            </Grid>
          )}
          {code && (
            <Grid size={12}>
              <Typography variant="overline">Nueva contraseña</Typography>
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
          )}
          <Grid size={12}>
            <Button
              type="submit"
              loading={loading}
              variant="contained"
              fullWidth
            >
              Enviar solicitud
            </Button>
          </Grid>
          <Grid size={12}>
            <Button variant="text" component={Link} fullWidth to="/login">
              Volver al inicio de sesión
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

export default ForgotPassword
