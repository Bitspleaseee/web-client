import { postJson, payload } from './'

const authRequest = postJson('/api/auth/')

export const authenticate = ({ username, password }) => dispatch => {
  dispatch(payload('AUTHENTICATE_PENDING')())
  authRequest(payload('AUTHENTICATE')({ username, password }))
    .then(res => dispatch(res))
    .catch(e => dispatch(payload('LOCAL_AUTH_ERROR')(e)))
}

export const deauthenticate = _ => dispatch => {
  dispatch(payload('DEAUTHENTICATE_PENDING')())
  authRequest(payload('DEAUTHENTICATE')())
    .then(res => dispatch(res))
    .catch(e => dispatch(payload('LOCAL_AUTH_ERROR')(e)))
}

export const registerUser = ({ username, password, email }) => dispatch => {
  dispatch(payload('REGISTER_USER_PENDING')())
  authRequest(payload('REGISTER_USER')({ username, password, email }))
    .then(res => dispatch(res))
    .catch(e => dispatch(payload('LOCAL_AUTH_ERROR')(e)))
}
