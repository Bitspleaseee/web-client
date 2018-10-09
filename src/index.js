import Router from 'preact-router'
import { Provider } from 'preact-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/'
import createBrowserHistory from 'history/createHashHistory'

import './style.css'

import Home from './routes/home.js'
import Login from './routes/login.js'
import Signup from './routes/signup.js'
import Dashboard from './routes/dashboard.js'

// Setup for Redux devtools
let composeEnhancers
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
  composeEnhancers = compose
}

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

const media = window.matchMedia('(max-width: 650px)')
media.addListener(m => {
  store.dispatch({ 'type': 'MEDIA_QUERY', 'payload': { 'mobile': m.matches } })
})

const App = () =>
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Home path='/' />
      <Dashboard path='/dashboard' />
      <Login path='/login' />
      <Signup path='/signup' />
    </Router>
  </Provider>

export default App
