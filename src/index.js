import Router from 'preact-router'
import { Provider } from 'preact-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/'

import 'preact-material-components/style.css'
import './style.css'

import Home from './routes/home.js'
import Login from './routes/login.js'
import Signup from './routes/signup.js'

// Setup for Redux devtools
const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

const App = () =>
  <Provider store={store}>
    <Router>
      <Home path='/' />
      <Login path='/login' />
      <Signup path='/signup' />
    </Router>
  </Provider>

export default App
