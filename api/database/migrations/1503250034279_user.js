'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.uuid('uuid').notNullable().unique()
      table.string('name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.text('description').nullable()
      table.boolean('admin').defaultTo(false)
      table.integer('plan_id').unsigned().notNullable()
      table.foreign('plan_id').references('id').on('plans').onDelete('CASCADE')
      table.timestamp('expires_in').nullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
