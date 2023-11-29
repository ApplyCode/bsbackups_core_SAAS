import api from "../../services/api"

/* ACTIONS TYPES*/
import { ADD_NEW_PLAN, GET_PLANS, UPDATE_PLAN, GET_PLAN } from "./actionTypes"

export const addNewPlan = async data => {
  const response = await api.post("/plans", data)
  return {
    type: ADD_NEW_PLAN,
    payload: response.data,
  }
}

export const getPlans = async () => {
  const response = await api.get("/plans")
  return {
    type: GET_PLANS,
    payload: response.data,
  }
}

export const updatePlan = async (id, data) => {
  const response = await api.put(`/plans/${id}`, data)
  return {
    type: UPDATE_PLAN,
    payload: response.data,
  }
}

export const getPlan = async id => {
  const response = await api.get(`/plans/${id}`)
  return {
    type: GET_PLAN,
    payload: response.data,
  }
}
