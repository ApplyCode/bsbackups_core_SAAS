import api from "../../services/api"

/* ACTIONS TYPES*/
import { GET_DASHBOARD } from "./actionTypes"

export const getDashboard = async () => {
  const response = await api.get("/dashboard")
  return {
    type: GET_DASHBOARD,
    payload: response.data,
  }
}
