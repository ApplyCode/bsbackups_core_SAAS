'use strict'

const Env = use('Env')

const Stripe = require('stripe')

//SERVICES
const UserService = use('App/Services/UserService')

class WebhookController {
  async store({ request, response }) {
    const stripe = new Stripe(Env.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    })
    const sig = request.header('stripe-signature')

    const stripePayload = request.raw()
    let event

    try {
      event = stripe.webhooks.constructEvent(
        stripePayload,
        sig,
        Env.get('STRIPE_WHSEC_KEY')
      )
      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          break

        case 'customer.subscription.created':
          break

        case 'customer.created':
          break
        case 'checkout.session.completed':
          const data = event.data.object
          if (Env.get('NODE_ENV') === 'development') {
            //console.log('CHECKOUT SESSION COMPLETED')
            //console.log(data)
          }
          if (data.status === 'complete') {
            await UserService.createAccount({
              customer_id: data.customer,
              name:
                data.custom_fields.length > 0
                  ? data.custom_fields[0].text.value
                  : '',
              email: data.customer_details.email,
              phone: data.customer_details.phone || null,
              metadata: data.metadata,
            })
          }
          break
        case 'invoice.upcoming':
          console.log(event.data.object)

        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`)
      }

      response.status(200).send('Received')
    } catch (err) {
      console.log(err)
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
  }
}

module.exports = WebhookController
