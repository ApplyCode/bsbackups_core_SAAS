module.exports = function (
  /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
  Route
) {
  return Route.group(() => {
    Route.put('/', 'ProfileController.update')
    Route.get('/', 'ProfileController.index')
    Route.delete('/', 'ProfileController.destroy')
  })
    .prefix('api/v1/profile')
    .middleware(['auth'])
}
