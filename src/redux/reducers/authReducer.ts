import { AUTHENTICATE_USER, REVOKE_AUTHENTICATION } from '../actions'

interface AuthenticateUserAction {
  type: typeof AUTHENTICATE_USER
}

interface RevokeAuthenticationAction {
  type: typeof REVOKE_AUTHENTICATION
}

type AuthActions = AuthenticateUserAction | RevokeAuthenticationAction

const INITIAL_STATE = {
  authenticated: false,
}

const authReducer = (state = INITIAL_STATE, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        authenticated: true,
      }

    case REVOKE_AUTHENTICATION:
      return {
        authenticated: false,
      }

    default:
      return state
  }
}

export default authReducer
