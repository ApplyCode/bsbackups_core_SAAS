'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with auths
 */
class AuthController {
  /**
   * Create/save a new auth.
   * POST auths
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)
      return response.status(200).json(token)
    } catch (e) {
      console.log(e)
      return response.status(500).send('Credenciais incorreta.')
    }
  }

  /**
   * Update auth details.
   * PUT or PATCH auths/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  async destroy({ auth, response }) {
    try {
      await auth.logout()
      return response.send('Logout')
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu um erro, tente novamente mais tarde.')
    }
  }
}

module.exports = AuthController
