import { AUTHENTICATE_USER, REVOKE_AUTHENTICATION } from './index'

export const authenticateUser = () => {
  return {
    type: AUTHENTICATE_USER,
  }
}

export const revokeAuthentication = () => {
  return {
    type: REVOKE_AUTHENTICATION,
  }
}
