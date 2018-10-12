export default (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_USER_PENDING':
    case 'DEAUTHETICATE_PENDING':
    case 'AUTHENTICATE_PENDING':
      return { ...state, error: null, pending: true }
    case 'AUTHENTICATED': {
      return { ...state, error: null, pending: false, authenticated: true }
    }
    case 'USER_REGISTERED': {
      return { ...state, error: null, pending: false, registered: true }
    }
    case 'DEAUTHENTICATED':
      return { ...state, error: null, pending: false, authenticated: false }
    case 'LOCAL_AUTH_ERROR':
    case 'AUTH_REQUEST_ERROR':
      return { ...state, error: action.payload, pending: false }
    case 'INTERNAL_SERVER_ERROR':
      return { ...state, error: 'Internal server error', pending: false }
    case 'ACCEPTED_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}
