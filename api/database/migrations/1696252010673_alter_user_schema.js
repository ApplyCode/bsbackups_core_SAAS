'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.timestamp('recover_password_at').nullable()
      table.string('recover_password').nullable().unique()
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('recover_password_at')
      table.dropColumn('recover_password')
    })
  }
}

module.exports = AlterUserSchema
