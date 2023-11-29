'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BackupRecord extends Model {
  backup() {
    return this.belongsTo('App/Models/Backup', 'backup_id', 'id')
  }
}

module.exports = BackupRecord
