'use strict'

const DeviceType = use('App/Models/DeviceType')

class DeviceTypeSeeder {
  async run() {
    const types = [
      {
        name: 'Windows 64 bits',
        slug: 'win_64',
        description: 'Dispositivo para rodar no windows 64 bits.',
      },
      {
        name: 'Windows 32 bits',
        slug: 'win_32',
        description: 'Dispositivo para rodar no windows 32 bits.',
      },
    ]
    for (let type of types) {
      await DeviceType.findOrCreate({ slug: type.slug }, type)
    }
  }
}

module.exports = DeviceTypeSeeder
