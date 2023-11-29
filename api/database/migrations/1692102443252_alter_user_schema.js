'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.string('customer_stripe_id').nullable()
      table.string('phone').nullable()
    })
  }

  down() {
    this.alter('users', (table) => {
      table.dropColumn('customer_stripe_id')
      table.dropColumn('phone')
    })
  }
}

module.exports = AlterUserSchema
