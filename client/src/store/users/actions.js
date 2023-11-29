import api from "../../services/api"

/* ACTIONS TYPES*/
import {
  ADD_NEW_USER,
  GET_USERS,
  UPDATE_USER,
  GET_USER,
  DELETE_USER,
} from "./actionTypes"

export const addNewUser = async data => {
  const response = await api.post("/users", data)
  return {
    type: ADD_NEW_USER,
    payload: response.data,
  }
}

export const getUsers = async () => {
  const response = await api.get("/users")
  return {
    type: GET_USERS,
    payload: response.data,
  }
}

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data)
  return {
    type: UPDATE_USER,
    payload: response.data,
  }
}

export const getUser = async id => {
  const response = await api.get(`/users/${id}`)
  return {
    type: GET_USER,
    payload: response.data,
  }
}

export const deleteUser = async id => {
  const response = await api.delete(`/users/${id}`)
  return {
    type: DELETE_USER,
    payload: response.data,
  }
}
