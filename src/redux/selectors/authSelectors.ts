interface Auth {
  authenticated: boolean
}

export interface State {
  auth: Auth
}

export const getAuthenticated = (state: State) => state.auth.authenticated
