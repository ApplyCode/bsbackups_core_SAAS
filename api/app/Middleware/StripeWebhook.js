'use strict'

class StripeWebhookMiddleware {
  async handle({ request, response }, next) {
    request.request.headers['content-type'] = '*/*'
    await next()
  }
}

module.exports = StripeWebhookMiddleware
