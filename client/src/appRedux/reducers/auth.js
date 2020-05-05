import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  RESET
} from '../ActionType'

const initState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  msg: undefined,
  msgAdd: undefined,
  check: undefined
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        msg: undefined
      }
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        msg: payload
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.token,
        msgAdd: 'You have added user successfully!',
        check: true
      }
    case ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
        msgAdd: payload,
        check: false
      }
    case RESET:
      return {
        ...state,
        check: undefined
      }
    default:
      return state
  }
}