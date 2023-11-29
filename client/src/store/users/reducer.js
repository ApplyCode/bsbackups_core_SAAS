import {
  ADD_NEW_USER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
  GET_USER,
} from "./actionTypes"

const INITIAL_STATE = {
  list: [],
  name: "",
  uuid: null,
  email: "",
  description: "",
  admin: false,
  plan_id: null,
  expires_in: null,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NEW_USER:
      return { ...state, ...action.payload }
    case GET_USERS:
      return { ...state, list: action.payload }
    case GET_USER:
      return { ...state, ...action.payload }
    case DELETE_USER:
      return {
        ...state,
        list: state.list.filter(item => item.uuid !== action.payload.uuid),
      }
    default:
      return state
  }
}
