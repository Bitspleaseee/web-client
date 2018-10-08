const jsonRequest = host => method => url => data => {
  console.group(`'${method}' '${host + url}'`)
  console.log(JSON.stringify(data, null, '\t'))
  console.groupEnd()

  return fetch(host + url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
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

const domainRequest = jsonRequest('http://localhost:9234')

export const postJson = domainRequest('POST')
export const getJson = domainRequest('GET')
