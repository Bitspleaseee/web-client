export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_PENDING':
      return { ...state, pending: true }
    case 'AUTHENTICATED': {
      const { username } = action.payload
      return { ...state, authenticated: true, username, pending: false }
    }
    case 'USER_REGISTERED': {
      return { ...state, pending: false }
    }
    case 'DEAUTHENTICATED':
      return { ...state, authenticated: false, username: null, pending: false }
    case 'AUTH_REQUEST_ERROR':
      return { ...state, error: action.payload, pending: false }
    default:
      return state
  }
}
