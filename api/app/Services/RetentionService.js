'use strict'

//LIBS
const B2 = require('backblaze-b2')

//MODELS
const BackupRecord = use('App/Models/BackupRecord')

class RetentionService {
  /* MÉTODO PARA APLICAR POLÍTICA DE RETENÇÃO DO SERVIÇO */
  static async applyRetentionPolicy({
    backup_id,
    uuid,
    keyId,
    applicationKey,
    bucket,
    countRetention,
    countBackupRecord,
  }) {
    const b2 = new B2({
      applicationKeyId: keyId,
      applicationKey: applicationKey,
    })

    try {
      let qnt = countBackupRecord - countRetention
      if (qnt == 0) qnt = 1
      const records = await BackupRecord.query()
        .where({ backup_id })
        .orderBy('id', 'asc')
        .limit(qnt)
        .fetch()

      if (records) {
        const r = records.toJSON()

        await r.forEach(async (record) => {
          var filename = `bsbackups/${uuid}/${record.file}`
          await b2.authorize()
          let response = await b2.getBucket({ bucketName: bucket })
          let bucket_id = response.data.buckets[0].bucketId
          let listfile = await b2.listFileVersions({
            bucketId: bucket_id,
            maxFileCount: 1000,
          })

          listfile.data.files.forEach(async (file) => {
            if (file.fileName == filename) {
              let del = await b2.deleteFileVersion({
                fileId: file.fileId,
                fileName: filename,
              })

              if (del) {
                await BackupRecord.query().where({ id: record.id }).delete()
                return true
              }
            }
          })
        })
        return true
      }
    } catch (e) {
      console.log(err)
      return false
    }
  }
}

module.exports = RetentionService
