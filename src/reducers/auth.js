import { AUTHENTICATED, DEAUTHENTICATED } from '../actions/auth'

export default (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      const { username } = action.payload
      return { ...state, authenticated: true, username }
    case DEAUTHENTICATED:
      return { ...state, authenticated: false, username: null }
    default:
      return state
  }
}
