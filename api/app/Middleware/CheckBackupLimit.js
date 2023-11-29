'use strict'

//MODELS
const User = use('App/Models/User')
const Storage = use('App/Models/Storage')
const CryptoJS = require('crypto-js')
const B2Service = use('App/Services/B2Service')

class CheckBackupLimit {
  async handle({ auth, response }, next) {
    try {
      const user = await auth.getUser()
      const userQuote = (
        await User.query().with('plan').where('id', auth.user.id).first()
      ).toJSON()
      // Verifique a cota de uso do plano aqui
      const quote = userQuote.plan.quota
      const backups = await user.backups().fetch()

      if (backups.rows.length > 0) {
        const storage = await Storage.find(1)

        const bytesKey = CryptoJS.AES.decrypt(
          storage.application_key,
          storage.bucket
        )
        const originalKey = bytesKey.toString(CryptoJS.enc.Utf8)

        const bytesAccount = CryptoJS.AES.decrypt(
          storage.key_id,
          storage.bucket
        )
        const originalAccount = bytesAccount.toString(CryptoJS.enc.Utf8)

        const uuids = backups.rows.map((item) => item.uuid)
        const allocated_volume = await B2Service.getTotalSizeForFolders({
          key_id: originalAccount,
          application_key: originalKey,
          bucketName: storage.bucket,
          folderNames: uuids,
        })

        const allocatedVolumeFloat = parseFloat(allocated_volume.toFixed(2))
        const available_volume = quote - allocatedVolumeFloat

        if (available_volume < 0) {
          return response
            .status(400)
            .json({ message: 'Limite de armazenamento excedido.' })
        }
      }
    } catch (error) {
      return response.status(401).send({ message: 'Usuário não autenticado.' })
    }

    await next()
  }
}

module.exports = CheckBackupLimit
