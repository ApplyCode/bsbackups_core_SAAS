'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.timestamp('canceled_at').nullable()
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('canceled_at')
    })
  }
}

module.exports = AlterUserSchema
