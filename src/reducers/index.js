import { combineReducers } from 'redux'
import auth from './auth'
import content from './content'

const media = (state = {}, action) => {
  switch (action.type) {
    case 'MEDIA_QUERY':
      const { mobile } = action.payload
      return { ...state, mobile }
    default:
      return state
  }
}

export default combineReducers({
  auth,
  content,
  media
})
