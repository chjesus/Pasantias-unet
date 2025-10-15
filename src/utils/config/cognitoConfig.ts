import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: import.meta.env.VITE_APP_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
}

export const userPool = new CognitoUserPool(poolData)
