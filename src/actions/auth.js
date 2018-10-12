import { postToRedux, payload } from './'

const authRequest = postToRedux('/api/auth/')('LOCAL_AUTH_ERROR')

export const authenticate = ({ username, password }) => (dispatch, getState) => {
  const { auth } = getState()
  if (auth.authenticated) {
    return dispatch(payload('LOCAL_AUTH_ERROR')('Already authenticated'))
  } else {
    return authRequest('AUTHENTICATE')({ username, password })(dispatch)
  }
}
export const deauthenticate = _ => (dispatch, getState) => {
  const { auth } = getState()
  if (auth.authenticated) {
    return authRequest('DEAUTHENTICATE')()(dispatch)
  } else {
    return dispatch(payload('LOCAL_AUTH_ERROR')('Already un-authenticated'))
  }
}
export const registerUser = ({ username, email, password }) =>
  authRequest('REGISTER_USER')({ username, email, password })

export const acceptError = _ => payload('ACCEPTED_ERROR')()
