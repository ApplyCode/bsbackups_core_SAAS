module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.get('/', 'DashboardController.index')
  })
    .prefix('api/v1/dashboard')
    .middleware(['auth', 'checkExpiration'])
}
