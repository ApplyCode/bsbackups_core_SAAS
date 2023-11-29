'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.boolean('first_access').defaultTo(false)
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('first_access')
    })
  }
}

module.exports = AlterUserSchema
