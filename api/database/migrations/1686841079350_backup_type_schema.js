'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BackupTypeSchema extends Schema {
  up() {
    this.create('backup_types', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('slug').notNullable().unique()
      table.text('description').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('backup_types')
  }
}

module.exports = BackupTypeSchema
