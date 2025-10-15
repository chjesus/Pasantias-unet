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
        // console.error('Error during sign up:', err)
        reject(err)
        return
      }
      const cognitoUser = result?.user
      // console.log('User name is ' + cognitoUser?.getUsername())
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

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('Access token: ' + result.getAccessToken().getJwtToken())
    },
    onFailure: (err) => {
      console.error('Error during sign in:', err)
    },
  })
}

export const signOut = () => {
  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser) {
    cognitoUser.signOut()
  }
}

export const getCurrentUser = () => {
  return userPool.getCurrentUser()
}
