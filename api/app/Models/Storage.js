'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const CryptoJS = require('crypto-js')

class Storage extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (storageInstance) => {
      if (storageInstance.dirty.key_id) {
        storageInstance.key_id = CryptoJS.AES.encrypt(
          storageInstance.key_id,
          storageInstance.bucket
        ).toString()
      }

      if (storageInstance.dirty.application_key) {
        storageInstance.application_key = CryptoJS.AES.encrypt(
          storageInstance.application_key,
          storageInstance.bucket
        ).toString()
      }
    })
  }
  static get hidden() {
    return ['created_at', 'updated_at', 'id']
  }
}

module.exports = Storage
