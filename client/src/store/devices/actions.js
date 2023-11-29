import api from "../../services/api"

/* ACTIONS TYPES*/
import {
  ADD_NEW_DEVICE,
  GET_DEVICES,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  GET_DEVICE,
} from "./actionTypes"

export const addNewDevice = async data => {
  const response = await api.post("/devices", data)
  return {
    type: ADD_NEW_DEVICE,
    payload: response.data,
  }
}

export const getDevices = async () => {
  const response = await api.get("/devices")
  return {
    type: GET_DEVICES,
    payload: response.data,
  }
}

export const deleteDevice = async id => {
  const response = await api.delete(`/devices/${id}`)
  return {
    type: DELETE_DEVICE,
    payload: response.data,
  }
}

export const updateDevice = async (id, data) => {
  const response = await api.put(`/devices/${id}`, data)
  return {
    type: UPDATE_DEVICE,
    payload: response.data,
  }
}

export const getDevice = async id => {
  const response = await api.get(`/devices/${id}`)
  return {
    type: GET_DEVICE,
    payload: response.data,
  }
}
