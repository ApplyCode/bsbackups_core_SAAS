'use strict'

//MODELS
const User = use('App/Models/User')

//SERVICES
const MailService = use('App/Services/MailService')

//LIBS
const moment = require('moment')
const uuid = require('uuid')

class RecoverPasswordController {
  /* ENVIAR EMAIL DE RECUPERAÇÃO */
  async store({ request, response }) {
    try {
      const { email } = request.all()

      const user = await User.findBy('email', email)
      const token = uuid.v4()

      user.recover_password = token
      user.recover_password_at = moment().format('YYYY-MM-DD HH:mm:ss')

      await user.save()

      //ENVIAR EMAIL DE RECUPERAÇÃO
      if (user) await MailService.sendEmailRecover({ email, token })

      return response.json({ message: true })
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* RESET PASSWORD */
  async update({ request, response, params }) {
    try {
      const { password } = request.all()
      const { id } = params

      const user = await User.findBy('recover_password', id)
      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')

      /* VERIFICAR SE PASSOU 1 HORA */
      const createdAtPlus1Hours = moment(user.recover_password_at)
        .add(1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss')

      if (currentTime > createdAtPlus1Hours) {
        return response
          .status(401)
          .send('O tempo de resetar a senha terminou, gere um novo token!')
      }

      user.recover_password = null
      user.recover_password_at = null
      user.password = password

      await user.save()

      return response.json({ message: true })
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = RecoverPasswordController
