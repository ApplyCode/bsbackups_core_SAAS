'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterPlanSchema extends Schema {
  up() {
    this.alter('plans', (table) => {
      table.string('price_stripe_id').nullable()
    })
  }

  down() {
    this.alter('plans', (table) => {
      table.string('price_stripe_id')
    })
  }
}

module.exports = AlterPlanSchema
