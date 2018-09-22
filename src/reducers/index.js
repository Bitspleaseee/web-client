
import { combineReducers } from 'redux'
import { LOGGED_IN, LOGGED_OUT } from '../actions/'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGGED_IN:
            const { name, id } = action.payload
            return {...state, logged_in: true, name, id }
        case LOGGED_OUT:
            return {...state, logged_in: false, name: null, id: null }
        default:
            return state
    }
}

export default combineReducers({
    user: userReducer
})
