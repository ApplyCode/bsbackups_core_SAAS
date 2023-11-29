'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanSchema extends Schema {
  up() {
    this.create('plans', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.text('description').nullable()
      table.integer('quota').defaultTo(0)
      table.integer('backups').defaultTo(0)
      table.integer('devices').defaultTo(0)
      table.timestamps()
    })
  }

  down() {
    this.drop('plans')
  }
}

module.exports = PlanSchema
