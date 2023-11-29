'use strict'

const User = use('App/Models/User')

class AdminAuth {
  async handle({ auth, response }, next) {
    try {
      const user = await auth.getUser()
      if (!user.admin) {
        return response
          .status(403)
          .send({ message: 'Apenas administradores podem executar essa ação.' })
      }
    } catch (error) {
      return response.status(401).send({ message: 'Usuário não autenticado.' })
    }

    await next()
  }
}

module.exports = AdminAuth
