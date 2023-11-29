import { GET_DASHBOARD } from "./actionTypes"

const INITIAL_STATE = {
  quote: 0,
  allocated_volume: 0,
  available_volume: 0,
  backups: 0,
  activities: [],
  dataActivities: { count: [], percentage: [] },
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
