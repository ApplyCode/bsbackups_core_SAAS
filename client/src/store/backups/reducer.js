import {
  CREATE_BACKUP,
  GET_BACKUPS,
  GET_BACKUP,
  DELETE_BACKUP,
  UPDATE_BACKUP,
  BACKUP_RECORDS,
} from "./actionTypes"

const INITIAL_STATE = {
  list: [],
  files: [],
  backup: {
    name: "",
    uuid: null,
  },
  records: [],
  name: "",
  uuid: null,
  device_id: null,
  retention: 9999,
  path: "",
  cron_expression: "",
  mode_schedule: true,
  frequency: null,
  hour: "",
  day_month: null,
  days_week: null,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_BACKUP:
      return { ...state, ...action.payload }
    case GET_BACKUPS:
      return { ...state, list: action.payload }
    case GET_BACKUP:
      return { ...state, ...action.payload }
    case DELETE_BACKUP:
      return {
        ...state,
        list: state.list.filter(item => item.uuid !== action.payload.uuid),
      }
    case BACKUP_RECORDS:
      return { ...state, records: action.payload }
    default:
      return state
  }
}
