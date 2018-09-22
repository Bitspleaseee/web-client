
import Router from 'preact-router'
import { Provider } from 'preact-redux'
import { createStore } from 'redux'
import reducers from './reducers/'

import './style'

import Home     from './routes/home'
import Content  from './routes/content'
import Userpage from './routes/userpage'

const store = createStore(reducers)

const App = () =>
    <Provider store={store}>
        <Router>
            <Home     path="/" />
            <Content  path="/content/:category_id?/:thread_id?/:comment_id?" />
            <Userpage path="/user/:user_id" />
        </Router>
    </Provider>

export default App;
