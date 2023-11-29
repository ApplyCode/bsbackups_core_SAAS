'use strict'

const CryptoJS = require('crypto-js')

//MODELS
const Backup = use('App/Models/Backup')

//SERVICES
const B2Service = use('App/Services/B2Service')

class DownloadBackupController {
  /* BAIXAR UM BACKUP ESPECÍFICO PELO ID */
  async show({ params, response }) {
    const { id, fileId } = params
    const backup = (
      await Backup.query().with('storage').where('uuid', id).first()
    ).toJSON()

    var bytesKey = CryptoJS.AES.decrypt(
      backup.storage.application_key,
      backup.storage.bucket
    )
    var originalKey = bytesKey.toString(CryptoJS.enc.Utf8)

    var bytesAccount = CryptoJS.AES.decrypt(
      backup.storage.key_id,
      backup.storage.bucket
    )
    var originalAccount = bytesAccount.toString(CryptoJS.enc.Utf8)

    const buffer = await B2Service.downloadFileById({
      key_id: originalAccount,
      application_key: originalKey,
      file_id: fileId,
    })
    return response.status(200).send(buffer.toString('base64'))
  }
  /* BAIXAR BACKUP ESPECÍFICO PELO FILENAME */
  async store({ params, response }) {
    const { id, filename } = params

    const backup = (
      await Backup.query().with('storage').where('uuid', id).first()
    ).toJSON()

    var bytesKey = CryptoJS.AES.decrypt(
      backup.storage.application_key,
      backup.storage.bucket
    )
    var originalKey = bytesKey.toString(CryptoJS.enc.Utf8)

    var bytesAccount = CryptoJS.AES.decrypt(
      backup.storage.key_id,
      backup.storage.bucket
    )
    var originalAccount = bytesAccount.toString(CryptoJS.enc.Utf8)

    const fileId = await B2Service.getFileIdByName({
      key_id: originalAccount,
      application_key: originalKey,
      bucket: backup.storage.bucket || '',
      backup_id: id,
      fileName: filename,
    })

    const buffer = await B2Service.downloadFileById({
      key_id: originalAccount,
      application_key: originalKey,
      file_id: fileId,
    })

    return response.status(200).send(buffer.toString('base64'))
  }
}

module.exports = DownloadBackupController
