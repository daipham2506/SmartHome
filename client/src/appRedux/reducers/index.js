import {combineReducers} from 'redux'
import auth from './auth'
import setting from './setting'
export default combineReducers({
    auth,
    setting,
})