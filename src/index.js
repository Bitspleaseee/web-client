import Router, { route } from 'preact-router'
import { Provider } from 'preact-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/'
import createBrowserHistory from 'history/createHashHistory'

import Login from './routes/login.js'
import Signup from './routes/signup.js'
import Dashboard from './routes/dashboard.js'
import Thread from './routes/thread.js'
import { payload } from './actions'

// Setup for Redux devtools
let composeEnhancer
if (process.env.NODE_ENV === 'development') {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
  composeEnhancer = compose
}

// Combines middlewares
const middlewares = [thunk]
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')

  middlewares.push(logger)
}

export const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(...middlewares))
)

// Emit a action based on the size of the window
const media = window.matchMedia('(max-width: 650px)')
media.addListener(m => {
  store.dispatch(payload('MEDIA_QUERY')({ 'mobile': m.matches }))
})

// Redirect to '/signup' if not authenticated and trying to access '/'
const router = e => {
  const { auth } = store.getState()
  if (e.url === '/' && !auth.authenticated) {
    route('/signup', true)
  } else if ((e.url === '/login' || e.url === '/signup') && auth.authenticated) {
    route('/', true)
  }
}

const App = () =>
  <Provider store={store}>
    <Router history={createBrowserHistory()} onChange={router}>
      <Dashboard path='/' />
      <Login path='/login' />
      <Signup path='/signup' />
      <Thread path='/thread/:id' />
    </Router>
  </Provider>

export default App
