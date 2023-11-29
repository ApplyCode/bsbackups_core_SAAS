'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceTypesSchema extends Schema {
  up() {
    this.create('device_types', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('slug').notNullable().unique()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('device_types')
  }
}

module.exports = DeviceTypesSchema
