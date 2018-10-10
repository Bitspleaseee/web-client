const jsonRequest = host => method => bodyFn => url => data => {
  // TODO has to be removed before deploy
  // console.group(`'${method}' '${host + url}'`)
  // console.log(JSON.stringify(data, null, '\t'))
  // console.groupEnd()

  return fetch(host + url, {
    method,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: bodyFn(data)
  })
    .then(res => {
      if (res.headers.get('content-type') !== 'application/json') {
        throw TypeError('Response was not json')
      } else {
        return res.json()
      }
    })
    .then(data => ({ 'payload': {}, ...data }))
}

export const payload = type => (data = {}) =>
  ({
    'type': type,
    'payload': data
  })

const domainRequest = jsonRequest(`http://${window.location.hostname}`)

export const postJson = domainRequest('POST')(JSON.stringify)
export const getJson = url => domainRequest('GET')(_ => null)(url)()
