import {
  LOADING_SETTING,
  SETTING_LIGHT_SUCCESS,
  SETTING_LIGHT_FAIL,
  RESET_SETTING
} from '../ActionType'

import callApi from '../../utils/callApi'
import { setAuthToken } from '../../utils/setAuthToken'

export const lightSetting = data => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  dispatch({ type: LOADING_SETTING });
  try {
    const res = await callApi('/api/setting/light', 'POST', data);

    dispatch({
      type: SETTING_LIGHT_SUCCESS,
      payload: res.data
    })
    dispatch({type: RESET_SETTING});
  } catch (error) {
    dispatch({
      type: SETTING_LIGHT_FAIL,
      payload: error.response.data
    });
    dispatch({type: RESET_SETTING});
  }
}

export const reset = () => dispatch => {
  dispatch({ type: RESET_SETTING })
}
