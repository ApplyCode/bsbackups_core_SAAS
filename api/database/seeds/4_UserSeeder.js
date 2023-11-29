'use strict'

const User = use('App/Models/User')

class UserSeeder {
  async run() {
    const users = [
      {
        email: 'admin@bsbackups.com.br',
        password: 'teste123',
        name: 'Admin',
        admin: true,
        plan_id: 1,
        photo: '1.jpg',
      },
      {
        email: 'devs@blueskysoftwares.com.br',
        password: 'dev123',
        name: 'Dev',
        admin: true,
        plan_id: 1,
        photo: '1.jpg',
      },
    ]
    for (let usr of users) {
      await User.findOrCreate({ email: usr.email }, usr)
    }
  }
}

module.exports = UserSeeder
