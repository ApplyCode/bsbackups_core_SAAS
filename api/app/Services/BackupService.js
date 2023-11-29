'use strict'

//MODELS
const Backup = use('App/Models/Backup')

//HELPERS
const {
  formatPath,
  convertToCronExpressionMonthly,
  convertToCronExpressionDaily,
  convertToCronExpressionWeekly,
} = use('App/Helpers/Utils')

//LIBS
const moment = require('moment')

/* FREQUENCY

1. MENSALMENTE
2. SEMANALEMENTE
3. DIARIAMENTE

*/
class BackupService {
  static async createBackup({
    name,
    device_id,
    path,
    retention,
    cron_expression,
    mode_schedule,
    frequency,
    hour,
    day_month,
    days_week,
    user_id,
  }) {
    try {
      var backup
      if (mode_schedule == false) {
        backup = await Backup.create({
          name,
          device_id,
          user_id: user_id,
          storage_id: 1,
          backup_types_id: 1,
          retention,
          path: formatPath(path),
          cron_expression,
          mode_schedule,
        })
      } else {
        if (frequency === '1') {
          //MENSALMENTE
          backup = await Backup.create({
            name,
            device_id,
            user_id: user_id,
            storage_id: 1,
            backup_types_id: 1,
            retention,
            path: formatPath(path),
            frequency,
            hour,
            mode_schedule,
            day_month,
            cron_expression: convertToCronExpressionMonthly(
              day_month,
              moment(hour).format('HH'),
              moment(hour).format('mm')
            ),
          })
        } else if (frequency === '2') {
          //SEMANALMENTE
          backup = await Backup.create({
            name,
            device_id,
            user_id: user_id,
            storage_id: 1,
            backup_types_id: 1,
            retention,
            path: formatPath(path),
            frequency,
            hour,
            mode_schedule,
            days_week: JSON.stringify(days_week),
            cron_expression: convertToCronExpressionWeekly(
              days_week,
              moment(hour).format('HH'),
              moment(hour).format('mm')
            ),
          })
        } else {
          //DIARIAMENTE
          backup = await Backup.create({
            name,
            device_id,
            user_id: user_id,
            storage_id: 1,
            backup_types_id: 1,
            retention,
            path: formatPath(path),
            frequency,
            hour,
            mode_schedule,
            cron_expression: convertToCronExpressionDaily(
              moment(hour).format('HH'),
              moment(hour).format('mm')
            ),
          })
        }
      }
      return backup
    } catch (e) {
      console.log(e)
      return false
    }
  }

  static async updateBackup({
    name,
    device_id,
    path,
    retention,
    cron_expression,
    mode_schedule,
    frequency,
    hour,
    day_month,
    days_week,
    id,
  }) {
    try {
      var backup = await Backup.findBy('uuid', id)
      backup.name = name
      backup.device_id = device_id
      backup.retention = retention
      backup.path = formatPath(path)
      backup.mode_schedule = mode_schedule

      if (mode_schedule == false) {
        backup.cron_expression = cron_expression
      } else {
        backup.frequency = frequency
        backup.hour = hour

        if (frequency === '1') {
          //MENSALMENTE
          backup.day_month = day_month
          backup.cron_expression = convertToCronExpressionMonthly(
            day_month,
            moment(hour).format('HH'),
            moment(hour).format('mm')
          )
        }
        if (frequency === '2') {
          //SEMANALMENTE
          backup.days_week = JSON.stringify(days_week)
          backup.cron_expression = convertToCronExpressionWeekly(
            days_week,
            moment(hour).format('HH'),
            moment(hour).format('mm')
          )
        }
        if (frequency === '3') {
          //DIARIAMENTE
          backup.cron_expression = convertToCronExpressionDaily(
            moment(hour).format('HH'),
            moment(hour).format('mm')
          )
        }
      }

      await backup.save()
      return backup
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

module.exports = BackupService
