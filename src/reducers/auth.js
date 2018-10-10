export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_PENDING':
      return { ...state, pending: true, error: undefined }
    case 'AUTHENTICATED': {
      const { username } = action.payload
      return { ...state, error: undefined, authenticated: true, username, pending: false }
    }
    case 'USER_REGISTERED': {
      return { ...state, pending: false, error: undefined, registered: true }
    }
    case 'DEAUTHENTICATED':
      return { ...state, error: undefined, authenticated: false, username: null, pending: false }
    case 'AUTH_REQUEST_ERROR':
      return { ...state, error: action.payload, pending: false }
    case 'INTERNAL_SERVER_ERROR':
      return { ...state, error: 'Internal server error occured', pending: false }
    default:
      return state
  }
}
