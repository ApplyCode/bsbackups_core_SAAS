'use strict'

//MODELS
const Storage = use('App/Models/Storage')

class StorageController {
  /* CREATE A STORAGE */
  async store({ request, response, auth }) {
    try {
      const { name, key_id, application_key, bucket } = request.all()
      const storage = await Storage.create({
        name,
        provider: 'b2',
        key_id,
        application_key,
        bucket,
      })

      return response.json(storage)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = StorageController
