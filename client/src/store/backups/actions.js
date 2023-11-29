import api from "../../services/api"

import {
  CREATE_BACKUP,
  GET_BACKUPS,
  DELETE_BACKUP,
  GET_BACKUP,
  UPDATE_BACKUP,
  DOWNLOAD_BACKUP,
  BACKUP_RECORDS,
  DOWNLOAD_BACKUP_FILENAME,
} from "./actionTypes"

export const createBackup = async data => {
  const response = await api.post("/backups", data)
  return {
    type: CREATE_BACKUP,
    payload: response.data,
  }
}

export const getBackups = async () => {
  const response = await api.get("/backups")
  return {
    type: GET_BACKUPS,
    payload: response.data,
  }
}

export const deleteBackup = async id => {
  const response = await api.delete(`/backups/${id}`)
  return {
    type: DELETE_BACKUP,
    payload: response.data,
  }
}

export const getBackup = async id => {
  const response = await api.get(`/backups/${id}`)
  return {
    type: GET_BACKUP,
    payload: response.data,
  }
}

export const updateBackup = async (id, data) => {
  const response = await api.put(`/backups/${id}`, data)
  return {
    type: UPDATE_BACKUP,
    payload: response.data,
  }
}

export const downloadBackup = async (backup_id, file_id) => {
  const response = await api.post(`/download-backup/${backup_id}/${file_id}`)
  return {
    type: DOWNLOAD_BACKUP,
    payload: response.data,
  }
}

export const downloadBackupFilename = async (backup_id, filename) => {
  const response = await api.post(
    `/download-backup/recordfile/${backup_id}/${filename}`
  )
  return {
    type: DOWNLOAD_BACKUP_FILENAME,
    payload: response.data,
  }
}

export const getBackupRecords = async () => {
  const response = await api.get("/backup-records")
  return {
    type: BACKUP_RECORDS,
    payload: response.data,
  }
}
