'use strict'

const cron = require('node-cron')
const moment = require('moment')

//MODELS
const Activity = use('App/Models/Activity')
const Backup = use('App/Models/Backup')

//SERVICES
const MailService = use('App/Services/MailService')

class StartService {
  static cronHourly() {
    cron.schedule('55 * * * *', async () => {
      const activities = await Activity.query()
        .where('status', 'running')
        .fetch()

      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
      if (activities) {
        const acts = activities.toJSON()
        acts.forEach(async (item) => {
          const createdAtPlus2Hours = moment(item.created_at)
            .add(2, 'hours')
            .format('YYYY-MM-DD HH:mm:ss')
          if (currentTime > createdAtPlus2Hours) {
            const activity = await Activity.findBy('uuid', item.uuid)
            const backup = await Backup.query()
              .with('user')
              .where('id', activity.backup_id)
              .first()

            activity.status = 'error'

            //ENVIAR EMAIL
            if (backup) {
              const bkp = backup.toJSON()

              await MailService.sendFailBackup({
                name: bkp.user.name,
                email: bkp.user.email,
              })

              await activity.save()
            }
          }
        })
      }
    })
  }
}

module.exports = StartService
