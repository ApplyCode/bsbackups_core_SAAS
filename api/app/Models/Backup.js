'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Backup extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', 'UuidHook.generate')
    this.addTrait('@provider:Lucid/SoftDeletes')
  }
  storage() {
    return this.belongsTo('App/Models/Storage', 'storage_id')
  }
  records() {
    return this.hasMany('App/Models/BackupRecord')
  }
  device() {
    return this.belongsTo('App/Models/Device')
  }
  user() {
    return this.belongsTo("App/Models/User")
  }
}

module.exports = Backup
