import {combineReducers} from 'redux'
import auth from './auth'
import setting from './setting'
import control from './control'
export default combineReducers({
    auth,
    setting,
    control
})