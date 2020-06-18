import {
  LOADING_CONTROL,
  CONTROL_SUCCESS,
  CONTROL_FAIL, 
  RESET_CONTROL
} from '../ActionType'

const initState = {
  msg: "",
  check: undefined,
  loading: false,
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOADING_CONTROL:
      return {
        ...state,
        loading: true,
      }
    case CONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: payload,
        check: true
      }
    case CONTROL_FAIL:
      return {
        ...state,
        loading: false,
        msg: payload,
        check: false
      }
    case RESET_CONTROL:
      return {
        ...state,
        check: undefined
      }
    default:
      return state
  }
}