'use strict'

//MODELS
const User = use('App/Models/User')
const Plan = use('App/Models/Plan')

//SERVICES
const StripeService = use('App/Services/StripeService')

class ChangePlanController {
  async update({ response, request, params, auth }) {
    try {
      const { id } = params

      if (id != auth.user.plan_id) {
        if (auth.user.customer_stripe_id) {
          const subscription = await StripeService.getSubscriptionByCustomerId(
            auth.user.customer_stripe_id
          )

          const plan = await Plan.find(id)

          await StripeService.upgradeSubscription(
            subscription.id,
            plan.price_stripe_id
          )
          await StripeService.removeItensSubscription(subscription.id)

          const user = await User.find(auth.user.id)
          user.plan_id = id
          await user.save()
        }
      }
      return response.json({ message: 'Plano alterado com sucesso!' })
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = ChangePlanController
