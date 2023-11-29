'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StorageSchema extends Schema {
  up() {
    this.create('storages', (table) => {
      table.increments()
      table.string('name', 254).notNullable().unique()
      table.string('provider').notNullable()
      table.string('key_id').nullable()
      table.string('application_key').nullable()
      table.string('bucket').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('storages')
  }
}

module.exports = StorageSchema
