'use strict'

//MODELS
const Plan = use('App/Models/Plan')

class PlanController {
  /* CREATE A PLAN */
  async store({ request, response, auth }) {
    try {
      const {
        name,
        slug,
        description,
        quota,
        backups,
        devices,
        price_stripe_id,
      } = request.all()

      const plan = await Plan.create({
        name,
        slug,
        description,
        quota,
        backups,
        devices,
        price_stripe_id,
      })

      return response.json(plan)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* UPDATE A PLAN */
  async update({ response, request, params }) {
    try {
      const {
        name,
        slug,
        description,
        quota,
        backups,
        devices,
        price_stripe_id,
      } = request.all()
      const plan = await Plan.find(params.id)
      plan.name = name
      plan.slug = slug
      plan.description = description
      plan.quota = quota
      plan.backups = backups
      plan.devices = devices
      plan.price_stripe_id = price_stripe_id
      await plan.save()
      return response.json(plan)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* SHOW A PLAN */
  async show({ response, params }) {
    try {
      const plan = await Plan.find(params.id)

      return response.status(200).json(plan)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* LIST ALL PLANS */
  async index({ response, auth }) {
    try {
      const plans = await Plan.query().fetch()
      return response.status(200).json(plans)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = PlanController
