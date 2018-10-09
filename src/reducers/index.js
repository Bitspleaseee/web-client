import { combineReducers } from 'redux'
import auth from './auth'
import content from './content'

export default combineReducers({
  auth,
  content
})
