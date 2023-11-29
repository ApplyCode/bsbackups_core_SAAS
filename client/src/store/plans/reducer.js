import { ADD_NEW_PLAN, GET_PLANS, UPDATE_PLAN, GET_PLAN } from "./actionTypes"

const INITIAL_STATE = {
  list: [],
  name: "",
  slug: "",
  description: "",
  quota: 0,
  backups: 0,
  devices: 0,
  price_stripe_id: "",
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NEW_PLAN:
      return { ...state, ...action.payload }
    case GET_PLANS:
      return { ...state, list: action.payload }
    case GET_PLAN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
