import { postJson, payload } from './'

const authRequest = postJson('/api/auth/')

export const LOCAL_REQUEST_ERROR = 'LOCAL_REQUEST_ERROR'

export const AUTHENTICATE = 'AUTHENTICATE'
export const AUTHENTICATED = 'AUTHENTICATED'
export const PENDING_AUTHENTICATE = 'PENDING_AUTHENTICATE'

export const DEAUTHENTICATED = 'DEAUTHENTICATED'
export const DEAUTHENTICATE = 'DEAUTHENTICATE'
export const PENDING_DEAUTHENTICATE = 'PENDING_DEAUTHENTICATE'

export const USER_REGISTERED = 'USER_REGISTERED'
export const REGISTER_USER = 'REGISTER_USER'
export const PENDING_REGISTER_USER = 'PENDING_REGISTER_USER'

export const authenticate = ({ username, password }) => dispatch => {
  dispatch(payload(PENDING_AUTHENTICATE)({ username }))

  authRequest(payload(AUTHENTICATE)({ username, password }))
    .then(res => dispatch(res))
    .catch(e => {
      console.error(e)
      dispatch(payload(LOCAL_REQUEST_ERROR)(e))
    })
}

export const deauthenticate = _ => dispatch => {
  dispatch(payload(PENDING_DEAUTHENTICATE)())

  authRequest(payload('DEAUTHENTICATE')())
    .then(res => dispatch(res))
    .catch(e => dispatch(payload(LOCAL_REQUEST_ERROR)(e)))
}

export const registerUser = ({ username, password, email }) => dispatch => {
  dispatch(payload(PENDING_REGISTER_USER)())

  authRequest(payload(REGISTER_USER)({ username, password, email }))
    .then(res => dispatch(res))
    .catch(e => dispatch(payload(LOCAL_REQUEST_ERROR)(e)))
}
