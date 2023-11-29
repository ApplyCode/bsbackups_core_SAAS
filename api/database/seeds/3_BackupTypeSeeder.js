'use strict'

const BackupType = use('App/Models/BackupType')

class BackupTypeSeeder {
  async run() {
    const types = [
      {
        name: 'Arquivo',
        slug: 'file',
        description: 'Dispositivo para rodar no windows 64 bits.',
      },
    ]
    for (let type of types) {
      await BackupType.findOrCreate({ slug: type.slug }, type)
    }
  }
}

module.exports = BackupTypeSeeder
