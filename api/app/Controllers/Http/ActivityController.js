'use strict'

//MODELS
const Activity = use('App/Models/Activity')
const Backup = use('App/Models/Backup')

//SERVICES
const MailService = use('App/Services/MailService')

/* STATUS

running = Em Execução
error = Erro
success = Sucesso

*/

class ActivityController {
  /* LIST ALL ACITIVITIES OF A USER */
  async index({ response, auth }) {
    try {
      const activities = await Activity.query()
        .with('backup')
        .whereHas('backup', (builder) => {
          builder.where('user_id', auth.user.id)
        })
        .fetch()
      return response.status(200).json(activities)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }

  /* CREATE A ACTIVITY */
  async store({ request, response, auth, params }) {
    try {
      const { status, backup_id } = request.all()

      const activity = await Activity.create({
        status: status,
        backup_id: backup_id,
      })
      return response.json(activity)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
    return true
  }

  /* UPDATE A ACTIVITY */
  async update({ request, response, auth, params }) {
    try {
      const { status } = request.all()

      const activity = await Activity.findBy('uuid', params.id)
      const backup = await Backup.query()
        .with('user')
        .where('id', activity.backup_id)
        .first()

      activity.status = status

      //ENVIAR EMAIL
      if (backup) {
        const bkp = backup.toJSON()
        if (status === 'error') {
          await MailService.sendFailBackup({
            name: bkp.user.name,
            email: bkp.user.email,
          })
        }
        if (status === 'success') {
          await MailService.sendSuccessBackup({
            name: bkp.user.name,
            email: bkp.user.email,
          })
        }
      }
      await activity.save()

      return response.json(activity)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
    return true
  }
  /* EXCLUIR UMA ATIVIDADE */
  async destroy({ response, params }) {
    try {
      const activity = await Activity.findBy('uuid', params.id)
      await activity.delete()
      return response
        .status(200)
        .json({ msg: 'Atividade deletada com sucesso.', uuid: params.id })
    } catch (e) {
      return response
        .status(500)
        .send('Ocorreu um erro, entre em contato com o suporte.')
    }
  }
}

module.exports = ActivityController
