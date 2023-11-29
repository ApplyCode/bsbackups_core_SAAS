import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  CANCEL_ACCOUNT,
} from "./actionTypes"

const INITIAL_STATE = {
  user: {
    name: "",
    photo: "01.jpg",
    email: "",
    uuid: null,
    expires_in: null,
    canceled_at: null,
    plan: {
      name: "",
      slug: "",
      description: null,
      quota: 0,
      backups: 0,
      devices: 0,
    },
    admin: false,
    first_access: false,
  },
  nextInvoice: {
    nextInvoiceDate: null,
    nextInvoiceAmount: null,
  },
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { ...state, ...action.payload }
    case GET_PROFILE:
      return { ...state, ...action.payload }
    case CHANGE_PASSWORD:
      return { ...state, ...action.payload }
    case CANCEL_ACCOUNT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
