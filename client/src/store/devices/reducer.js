import {
  ADD_NEW_DEVICE,
  GET_DEVICES,
  UPDATE_DEVICE,
  DELETE_DEVICE,
  GET_DEVICE,
} from "./actionTypes"

const INITIAL_STATE = {
  list: [],
  name: "",
  device_types_id: null,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NEW_DEVICE:
      return { ...state, ...action.payload }
    case GET_DEVICES:
      return { ...state, list: action.payload }
    case GET_DEVICE:
      return { ...state, ...action.payload }
    case DELETE_DEVICE:
      return {
        ...state,
        list: state.list.filter(item => item.uuid !== action.payload.uuid),
      }
    default:
      return state
  }
}
