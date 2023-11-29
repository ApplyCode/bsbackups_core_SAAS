import {
  RECOVER_PASSWORD,
  RESET_PASSWORD,
  GET_RECOVER_TOKEN,
} from "./actionTypes"

const INITIAL_STATE = {
  email: "",
  token: null,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECOVER_PASSWORD:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
