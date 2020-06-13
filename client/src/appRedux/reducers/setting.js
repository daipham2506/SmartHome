import {
  LOADING_SETTING,
  SETTING_LIGHT_SUCCESS,
  SETTING_LIGHT_FAIL,
  RESET_SETTING
} from '../ActionType'

const initState = {
  msg: "",
  check: undefined,
  loading: false,
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING_SETTING:
      return {
        ...state,
        loading: true,
      }
    case SETTING_LIGHT_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: payload,
        check: true
      }
    case SETTING_LIGHT_FAIL:
      return {
        ...state,
        loading: false,
        msg: payload,
        check: false
      }
    case RESET_SETTING:
      return {
        ...state,
        check: undefined
      }
    default:
      return state
  }
}