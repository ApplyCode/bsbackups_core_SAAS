'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Device extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeCreate', 'UuidHook.generate')
    this.addTrait('@provider:Lucid/SoftDeletes')
  }
}

module.exports = Device
