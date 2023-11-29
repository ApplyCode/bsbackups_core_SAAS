'use strict'

//MODELS
const BackupRecord = use('App/Models/BackupRecord')

class BackupRecordController {
  /* REGISTRAR BACKUP REALIZADO COM SUCESSO */
  async store({ request, response, auth }) {
    try {
      const { file, backup_id } = request.all()

      const record = await BackupRecord.create({
        backup_id,
        user_id: auth.user.id,
        file,
      })

      return response.json(record)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* LISTAR BACKUPS REGISTRADOS */
  async index({ request, response, auth }) {
    try {
      const backups = await BackupRecord.query()
        .with('backup')
        .where({ user_id: auth.user.id })
        .orderBy('id', 'desc')
        .fetch()
      return response.status(200).json(backups)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = BackupRecordController
