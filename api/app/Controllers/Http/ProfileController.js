'use strict'

//MODELS
const User = use('App/Models/User')

//LIBS
const moment = require('moment')

//SERVICES
const StripeService = use('App/Services/StripeService')
const MaiLService = use('App/Services/MailService')

class ProfileController {
  /* GET PROFILE */
  async index({ response, auth }) {
    try {
      const user = await User.query()
        .with('plan')
        .where('id', auth.user.id)
        .first()

      var nextInvoice = {
        nextInvoiceDate: null,
        nextInvoiceAmount: null,
      }

      if (user) {
        var usr = user.toJSON()
        if (usr.customer_stripe_id !== null) {
          const subscription = await StripeService.getSubscriptionByCustomerId(
            user.customer_stripe_id
          )
          nextInvoice = await StripeService.getNextInvoiceDateAndAmount(
            subscription.id
          )
        }
      }

      return response.status(200).json(Object.assign({ user, nextInvoice }))
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* UPDATE INFO PROFILE */
  async update({ response, request, auth }) {
    try {
      const { name, photo } = request.all()
      const user = await User.find(auth.user.id)
      user.name = name
      user.photo = photo
      await user.save()
      return response.json(user)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
  /* CANCELAR CONTA */
  async destroy({ response, auth }) {
    try {
      const user = await User.find(auth.user.id)
      user.canceled_at = new Date()
      await user.save()
      await MailService.sendCancelAccount({
        name: user.name,
        email: user.email,
      })
      return response.json(user)
    } catch (e) {
      console.log(e)
      return response
        .status(500)
        .send('Ocorreu algum erro, tente novamente mais tarde!')
    }
  }
}

module.exports = ProfileController
