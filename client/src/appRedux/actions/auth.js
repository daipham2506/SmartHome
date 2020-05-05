import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOADING,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  RESET
} from '../ActionType'

import callApi from '../../utils/callApi'
import { setAuthToken } from '../../utils/setAuthToken'

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
      setAuthToken(localStorage.token)
  }
  try {
      const res = await callApi('/api/auth');

      dispatch({
          type: USER_LOADED,
          payload: res.data
      })
  } catch (error) {
      dispatch({
          type: AUTH_ERROR
      })
  }
}

// Login User
export const login = (formData) => async dispatch => {
  dispatch({ type: LOADING })
  try {
    const res = await callApi('/api/auth', 'POST', formData)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
    
  } catch (err) {
    const error = err.response.data.msg;

    dispatch({
      type: LOGIN_FAIL,
      payload: error
    })
  }
}

// Add User
export const addUser = (newUser) => async dispatch => {
  dispatch({ type: LOADING })
  try {
    const res = await callApi('/api/users', 'POST', newUser)

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: res.data
    })

  } catch (err) {
    const error = err.response.data.error;

    dispatch({
      type: ADD_USER_FAIL,
      payload: error
    })
  }
}

// reset alert 
export const reset = () => dispatch => {
  dispatch({ type: RESET })
}

// logout 
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
