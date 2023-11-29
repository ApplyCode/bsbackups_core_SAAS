'use strict'

const CryptoJS = require('crypto-js')

//MODELS
const Backup = use('App/Models/Backup')
const User = use('App/Models/User')
const Storage = use('App/Models/Storage')
const Activity = use('App/Models/Activity')

//SERVICES
const B2Service = use('App/Services/B2Service')
const ReportService = use('App/Services/ReportService')

class DashboardController {
  async index({ auth, response }) {
    try {
      const backups = await Backup.query()
        .where('user_id', auth.user.id)
        .getCount()

      const user = await User.query()
        .with('plan')
        .with('backups')
        .where('id', auth.user.id)
        .first()

      const activities = await Activity.query()
        .with('backup')
        .whereHas('backup', (builder) => {
          builder.where('user_id', auth.user.id)
        })
        .orderBy('created_at', 'desc')
        .limit(10)
        .fetch()

      const dataActivities = await ReportService.getReportActivityByStatus(
        auth.user.id
      )

      var quote,
        allocated_volume,
        available_volume = 0

      if (user) {
        quote = user.toJSON().plan.quota

        var backupss = user.toJSON().backups

        if (backupss.length > 0) {
          const storage = await Storage.find(1)

          var bytesKey = CryptoJS.AES.decrypt(
            storage.application_key,
            storage.bucket
          )
          var originalKey = bytesKey.toString(CryptoJS.enc.Utf8)

          var bytesAccount = CryptoJS.AES.decrypt(
            storage.key_id,
            storage.bucket
          )
          var originalAccount = bytesAccount.toString(CryptoJS.enc.Utf8)

          var uuids = []
          console.log(backupss)
          for (let item of backupss) {
            uuids.push(item.uuid)
          }
          allocated_volume = await B2Service.getTotalSizeForFolders({
            key_id: originalAccount,
            application_key: originalKey,
            bucketName: storage.bucket,
            folderNames: uuids,
          })

          allocated_volume = parseFloat(allocated_volume.toFixed(2))
        }
      }
      if (allocated_volume > 0) {
        available_volume = parseFloat((quote - allocated_volume).toFixed(2))
      } else {
        available_volume = quote
      }
      return response.status(200).json(
        Object.assign({
          quote,
          allocated_volume,
          available_volume,
          backups,
          activities,
          dataActivities,
        })
      )
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

module.exports = DashboardController
