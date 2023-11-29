'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
  up() {
    this.create('devices', (table) => {
      table.increments()
      table.uuid('uuid').notNullable().unique()
      table.string('name').nullable()
      table.boolean('active').defaultTo(true)
      table.integer('device_types_id').unsigned().index()
      table
        .foreign('device_types_id')
        .references('id')
        .on('device_types')
        .onDelete('cascade')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('devices')
  }
}

module.exports = DeviceSchema
