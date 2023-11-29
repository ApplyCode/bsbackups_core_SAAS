import api from "../../services/api"

/* ACTIONS TYPES*/
import {
  RECOVER_PASSWORD,
  RESET_PASSWORD,
  GET_RECOVER_TOKEN,
} from "./actionTypes"

export const recoverPassword = async data => {
  const response = await api.post("/recover-password", data)
  return {
    type: RECOVER_PASSWORD,
    payload: response.data,
  }
}

export const resetPassword = async (id, data) => {
  const response = await api.put(`/recover-password/${id}`, data)
  return {
    type: RESET_PASSWORD,
    payload: response.data,
  }
}

export const getRecoverToken = async id => {
  const response = await api.get(`/recover-password/${id}`)
  return {
    type: GET_RECOVER_PASSWORD,
    payload: response.data,
  }
}
