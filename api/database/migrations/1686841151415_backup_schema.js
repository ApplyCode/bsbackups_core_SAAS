'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BackupSchema extends Schema {
  up() {
    this.create('backups', (table) => {
      table.increments()
      table.uuid('uuid').notNullable().unique()
      table.string('name', 254).notNullable()
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.integer('device_id').unsigned().nullable()
      table
        .foreign('device_id')
        .references('id')
        .on('devices')
        .onDelete('SET NULL')
      table.integer('storage_id').unsigned().index()
      table
        .foreign('storage_id')
        .references('id')
        .on('storages')
        .onDelete('cascade')
      table.integer('backup_types_id').unsigned().index()
      table
        .foreign('backup_types_id')
        .references('id')
        .on('backup_types')
        .onDelete('cascade')
      table.integer('retention').default(0)
      table.string('path').nullable()
      table.string('cron_expression').notNullable()
      table.string('status').nullable()
      table.boolean('mode_schedule').defaultTo(true)
      table.string('frequency').nullable()
      table.string('hour').nullable()
      table.string('day_month').nullable()
      table.json('days_week').nullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('backups')
  }
}

module.exports = BackupSchema
