module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.post('/', 'WebhookController.store')
  })
    .prefix('api/v1/webhooks')
    .middleware(['stripeWebhook'])
}
