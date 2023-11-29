'use strict'

const CryptoJS = require('crypto-js')

//MODELS
const Backup = use('App/Models/Backup')
const BackupRecord = use('App/Models/BackupRecord')

//SERVICES
const B2Service = use('App/Services/B2Service')
const RetentionService = use('App/Services/RetentionService')

class RetentionController {
  /* APLICAR POLÍTICA DE RETENÇÃO */
  async store({ params, response }) {
    const { id } = params
    const backup = (
      await Backup.query().with('storage').where('uuid', id).first()
    ).toJSON()

    const backupRecord = await BackupRecord.query()
      .where('backup_id', backup.id)
      .getCount()

    /* EXECUTAR POLÍTICA DE RETENÇÃO */
    if (backupRecord >= backup.retention) {
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

      await RetentionService.applyRetentionPolicy({
        backup_id: backup.id,
        uuid: backup.uuid,
        keyId: originalAccount,
        applicationKey: originalKey,
        bucket: backup.storage.bucket,
        countRetention: backup.retention,
        countBackupRecord: backupRecord,
      })
    }

    return response.status(200).send(true)
  }
}

module.exports = RetentionController
