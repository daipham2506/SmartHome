import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  RESET,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
  FORGOT_PASS_FAIL,
  FORGOT_PASS_SUCCESS,
  RESET_MSG
} from '../ActionType'

const initState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  msg: undefined,
  msgAdd: undefined,
  msgReset: undefined,
  msgForgot: undefined,
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

    case RESET_PASS_SUCCESS:
      return {
        ...state,
        msgReset: payload,
        check: true,
        loading: false
      }

    case RESET_PASS_FAIL:
      return {
        ...state,
        msgReset: payload,
        check: false,
        loading: false
      }

    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        msgForgot: payload,
        check: true,
        loading: false
      }

    case FORGOT_PASS_FAIL:
      return {
        ...state,
        msgForgot: payload,
        check: false,
        loading: false
      }

    case RESET_MSG:
      return {
        ...state,
        msg: undefined,
        msgAdd: undefined,
        msgReset: undefined,
        msgForgot: undefined,
      }
      
    default:
      return state
  }
}