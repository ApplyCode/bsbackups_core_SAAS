'use strict'

//MODELS
const Backup = use('App/Models/Backup')

//SERVIVCES
const BackupService = use('App/Services/BackupService')
const B2Service = use('App/Services/B2Service')

const CryptoJS = require('crypto-js')

class BackupController {
  /* LIST ALL BACKUPS OF A USER */
  async index({ response, auth }) {
    try {
      const backups = await Backup.query()
        .with('storage')
        .with('device')
        .where({ user_id: auth.user.id })
        .fetch()
      return response.status(200).json(backups)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }

  /* CREATE A BACKUP */
  async store({ request, response, auth }) {
    try {
      const {
        name,
        device_id,
        retention,
        path,
        cron_expression,
        mode_schedule,
        frequency,
        hour,
        day_month,
        days_week,
        encryption,
      } = request.all()

      const backup = await BackupService.createBackup({
        name,
        device_id,
        retention,
        path,
        cron_expression,
        mode_schedule,
        frequency,
        hour,
        day_month,
        days_week,
        encryption,
        user_id: auth.user.id,
      })

      return response.json(backup)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
    return true
  }

  /* CREATE A BACKUP */
  async update({ request, response, auth, params }) {
    try {
      const {
        name,
        device_id,
        retention,
        path,
        cron_expression,
        mode_schedule,
        frequency,
        hour,
        day_month,
        days_week,
        encryption,
      } = request.all()

      const backup = await BackupService.updateBackup({
        id: params.id,
        name,
        device_id,
        retention,
        path,
        cron_expression,
        mode_schedule,
        frequency,
        hour,
        day_month,
        days_week,
        encryption,
      })

      return response.json(backup)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
    return true
  }
  /* EXCLUIR UM BACKUP */
  async destroy({ response, params }) {
    try {
      const backup = await Backup.findBy('uuid', params.id)
      await backup.delete()
      return response
        .status(200)
        .json({ msg: 'Backup deletado com sucesso.', uuid: params.id })
    } catch (e) {
      return response
        .status(500)
        .send('Ocorreu um erro, entre em contato com o suporte.')
    }
  }

  /* EXIBIR DADOS DE UM BACKUP ESPECÍFICO */
  async show({ response, params }) {
    try {
      const backup = await Backup.findBy('uuid', params.id)
      await backup.load('storage')
      var files
      if (backup) {
        var bkp = backup.toJSON()
        var bytesKey = CryptoJS.AES.decrypt(
          bkp.storage.application_key,
          bkp.storage.bucket
        )
        var originalKey = bytesKey.toString(CryptoJS.enc.Utf8)

        var bytesAccount = CryptoJS.AES.decrypt(
          bkp.storage.key_id,
          bkp.storage.bucket
        )
        var originalAccount = bytesAccount.toString(CryptoJS.enc.Utf8)
        files = await B2Service.listFilesInFolder({
          key_id: originalAccount,
          application_key: originalKey,
          backup_id: params.id,
          bucket: bkp.storage.bucket,
        })
      }

      return response
        .status(200)
        .json(
          Object.assign({
            backup,
            files: files ? files.files.reverse().sort((a, b) => b - a) : null,
          })
        )
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = BackupController
