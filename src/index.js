
import Router from 'preact-router'

import './style'

import Home     from './routes/home'
import Content  from './routes/content'
import Userpage from './routes/userpage'

const App = () =>
    <Router>
        <Home     path="/" />
        <Content  path="/content/:category_id?/:thread_id?/:comment_id?" />
        <Userpage path="/user/:user_id" />
    </Router>

export default App;
