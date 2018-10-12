// The end abstractions which the actions are expected to use
//
// The signature of this function is in full:
//
// url => typeErr => type => data => dispatch => { .. }
export const getToRedux = url => requestToRedux(_ => a => a)(getJson(url))

export const postToRedux = url => requestToRedux(payload)(postJson(url))

// Abstracts all the variables in a fetch call
const jsonRequest = host => method => bodyFn => url => data =>
  fetch(host + url, {
    method,
    mode: 'cors', // TODO maybe remove?
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: bodyFn(data)
  })
    .then(res => {
      if (res.headers.get('content-type') !== 'application/json') {
        throw Error('expected a JSON object in return')
      } else {
        return res.json()
      }
    })
    // Ensure there is always a payload field to match a redux object
    .then(resData => ({ 'payload': {}, ...resData }))

// Creates a simple JSON payload based on type and data
export const payload = type => (data = {}) =>
  ({
    'type': type,
    'payload': data
  })

// A json request to a specific host
const hostRequest = jsonRequest(
  process.env.NODE_ENV === 'production'
    ? `http://${window.location.hostname}`
    : 'http://localhost:9234'
)

// Abstactions over GET and POST requests to the host specified above
export const postJson = hostRequest('POST')(JSON.stringify)
export const getJson = url => _ => hostRequest('GET')(_ => null)(url)()

// An abstraction over the actions to perform when making a request to insert
// the request into the redux store
export const requestToRedux = payloader => requester => typeErr => type => data => dispatch => {
  dispatch(payload(`${type}_PENDING`)())
  requester(payloader(type)(data))
    .then(res => dispatch(res))
    .catch(e => dispatch(payload(typeErr)(e.toString())))
}
