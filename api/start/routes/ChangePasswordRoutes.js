module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.put('/', 'ChangePasswordController.update')
  })
    .prefix('api/v1/change-password')
    .middleware(['auth'])
}
