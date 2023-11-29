'use strict'

//MODELS
const Backup = use('App/Models/Backup')

//SERVICES
const MailService = use('App/Services/MailService')

class BackupMailController {
  async store({ request, response, auth, params }) {
    try {
      const { type, id } = params
      const backup = (
        await Backup.query().with('user').where('uuid', id).first()
      ).toJSON()

      if (type === 'success') {
        await MailService.sendSuccessBackup({
          name: backup.name,
          email: backup.user.email,
        })
      } else {
        await MailService.sendFailBackup({
          name: backup.name,
          email: backup.user.email,
        })
      }
      return response.status(200).send('Reiceved')
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = BackupMailController
