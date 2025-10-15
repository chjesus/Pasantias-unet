import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js'

import { userPool } from '@/utils/config/cognitoConfig'

type RegisterFormData = {
  fullName: string
  email: string
  phone: string
  password: string
  confirmarPassword: string
}

type ConfirmForgotPassword = {
  email: string
  code: string
  newPassword: string
}

type tokenType = { accessToken: string; idToken: string; refreshToken: string }

export const signUp = (data: RegisterFormData) => {
  const { fullName, email, phone, password } = data

  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
    new CognitoUserAttribute({ Name: 'name', Value: fullName }),
    new CognitoUserAttribute({ Name: 'phone_number', Value: phone }),
  ]

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err)
        return
      }
      const cognitoUser = result?.user
      resolve(cognitoUser?.getUsername())
    })
  })
}

export const signIn = (email: string, password: string) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  })

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })

  return new Promise<tokenType>((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const TOKEN = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }
        resolve(TOKEN)
      },
      onFailure: (err) => reject(err),
    })
  })
}

export const forgotPassword = (email: string) => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: () => {
        resolve({
          success: true,
          message: 'Se ha enviado un código de verificación a tu email',
        })
      },
      onFailure: (err) => {
        reject(err)
      },
    })
  })
}

export const confirmForgotPassword = (data: ConfirmForgotPassword) => {
  const { email, code, newPassword } = data

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(code, newPassword, {
      onSuccess: () => {
        resolve({ success: true, message: 'Contraseña restablecida con éxito' })
      },
      onFailure: (err) => {
        reject(err)
      },
    })
  })
}

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser()

  if (cognitoUser) cognitoUser.signOut()
}

export const getCurrentUser = () => {
  return userPool.getCurrentUser()
}
