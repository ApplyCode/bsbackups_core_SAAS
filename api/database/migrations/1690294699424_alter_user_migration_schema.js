'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.string('photo').nullable().after('description')
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('photo')
    })
  }
}

module.exports = AlterUserSchema
