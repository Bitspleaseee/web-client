import Router from 'preact-router'
import { Provider } from 'preact-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/'
import createHashHistory from 'history/createHashHistory'

import 'preact-material-components/style.css'
import './style.css'

import Home from './routes/home.js'
import Login from './routes/login.js'
import Signup from './routes/signup.js'

// Setup for Redux devtools
let composeEnhancers
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
} else {
  composeEnhancers = compose
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

const App = () =>
  <Provider store={store}>
    <Router history={createHashHistory()}>
      <Home path='/' />
      <Login path='/login' />
      <Signup path='/signup' />
    </Router>
  </Provider>

export default App
