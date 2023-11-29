import api from "../../services/api"

/* ACTIONS TYPES*/
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  CANCEL_ACCOUNT,
  CHANGE_PLAN,
} from "./actionTypes"

export const updateProfile = async data => {
  const response = await api.put("/profile", data)
  return {
    type: UPDATE_PROFILE,
    payload: response.data,
  }
}

export const getProfile = async () => {
  const response = await api.get("/profile")
  return {
    type: GET_PROFILE,
    payload: response.data,
  }
}

export const changePassword = async data => {
  const response = await api.put("/change-password", data)
  return {
    type: CHANGE_PASSWORD,
    payload: response.data,
  }
}

export const cancelAccount = async () => {
  const response = await api.delete("/profile")
  return {
    type: CANCEL_ACCOUNT,
    payload: response.data,
  }
}

export const changePlan = async id => {
  const response = await api.put("/change-plan/" + id)
  return {
    type: CHANGE_PLAN,
    payload: response.data,
  }
}
