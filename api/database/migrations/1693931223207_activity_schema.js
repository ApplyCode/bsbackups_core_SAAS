'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitySchema extends Schema {
  up() {
    this.create('activities', (table) => {
      table.increments()
      table.uuid('uuid').notNullable().unique()
      table.integer('backup_id').unsigned().index()
      table
        .foreign('backup_id')
        .references('id')
        .on('backups')
        .onDelete('cascade')
      table.string('status').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
