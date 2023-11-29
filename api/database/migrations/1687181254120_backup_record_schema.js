'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BackupRecordSchema extends Schema {
  up() {
    this.create('backup_records', (table) => {
      table.increments()
      table.integer('backup_id').unsigned().index()
      table
        .foreign('backup_id')
        .references('id')
        .on('backups')
        .onDelete('cascade')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.string('file').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('backup_records')
  }
}

module.exports = BackupRecordSchema
