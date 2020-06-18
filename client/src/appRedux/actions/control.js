import {
  LOADING_CONTROL,
  CONTROL_SUCCESS,
  CONTROL_FAIL, 
  RESET_CONTROL
} from '../ActionType'

import callApi from '../../utils/callApi'
import { setAuthToken } from '../../utils/setAuthToken'

export const controlDevice = data => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  dispatch({ type: LOADING_CONTROL });
  try {
    const res = await callApi('/api/control', 'POST', data);

    dispatch({
      type: CONTROL_SUCCESS,
      payload: res.data
    })
    dispatch({type: RESET_CONTROL});
  } catch (error) {
    dispatch({
      type: CONTROL_FAIL,
      payload: error.response.data
    });
    dispatch({type: RESET_CONTROL});
  }
}
