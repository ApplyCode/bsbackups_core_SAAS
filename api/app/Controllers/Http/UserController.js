'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

//MODELS
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    try {
      const users = await User.query().with('plan').fetch()
      return response.status(200).json(users)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { name, email, password, description, plan_id, expires_in } =
        request.all()

      const user = await User.create({
        name,
        email,
        password,
        description,
        plan_id,
        expires_in,
        photo: '1.jpg',
      })

      return response.json(user)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const user = await User.findBy('uuid', params.id)
      return response.status(200).json(user)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { name, email, password, description, plan_id, expires_in } =
        request.all()

      const user = await User.findBy('uuid', params.id)

      user.name = name
      user.email = email
      user.description = description
      user.plan_id = plan_id
      user.expires_in = expires_in

      await user.save()

      return response.json(user)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const user = await User.findBy('uuid', params.id)
      await user.delete()
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

module.exports = UserController
