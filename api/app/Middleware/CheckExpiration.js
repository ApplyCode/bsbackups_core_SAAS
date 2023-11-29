'use strict'

//MODELS
const User = use('App/Models/User')

//LIBS
const moment = require('moment')

class CheckExpiration {
  async handle({ auth, response }, next) {
    try {
      const user = await auth.getUser()
      if (user.expires_in !== null) {
        const userExpiration = moment(user.expires_in)
        const currentDateTime = moment()
        if (userExpiration.isBefore(currentDateTime)) {
          return response.status(401).send({
            message: 'Sua conta expirou. Renove sua conta!',
            expires: true,
          })
        }
      }
    } catch (error) {
      return response.status(401).send({ message: 'Usuário não autenticado.' })
    }

    await next()
  }
}

module.exports = CheckExpiration
