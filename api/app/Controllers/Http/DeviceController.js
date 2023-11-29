'use strict'

//MODELS
const Device = use('App/Models/Device')

class DeviceController {
  /* CREATE A DEVICE*/
  async store({ request, response, auth }) {
    try {
      const { name, device_types_id } = request.all()

      const device = await Device.create({
        name,
        device_types_id: device_types_id,
        user_id: auth.user.id,
      })

      return response.json(device)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* UPDATE A DEVICE */
  async update({ response, request, params }) {
    try {
      const { name, device_types_id } = request.all()
      const device = await Device.findBy('uuid', params.id)
      device.name = name
      device.device_types_id = device_types_id
      await device.save()
      return response.json(device)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* SHOW A DEVICE */
  async show({ response, params }) {
    try {
      const device = await Device.findBy('uuid', params.id)
      return response.status(200).json(device)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* LIST ALL DEVICE BY USER */
  async index({ response, auth }) {
    try {
      const devices = await Device.query()
        .where({ user_id: auth.user.id })
        .fetch()
      return response.status(200).json(devices)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* DESTROY A DEVICE */
  async destroy({ response, params }) {
    try {
      const device = await Device.findBy('uuid', params.id)
      await device.delete()
      return response.status(200).json({
        msg: 'Deletado com sucesso!',
        uuid: params.id,
      })
    } catch (e) {
      return response
        .status(500)
        .send('Ocorreu um erro, entre em contato com o suporte.')
    }
  }
}

module.exports = DeviceController
